# Modal 컴포넌트 Storybook 렌더링 문제 해결

## 문제 상황

Modal 컴포넌트가 Storybook에서 다음과 같은 문제가 발생했습니다:

1. **오버레이가 표시되지 않음**: Modal의 배경 오버레이가 보이지 않음
2. **중앙 정렬 실패**: Modal이 화면 중앙에 위치하지 않음
3. **z-index 충돌**: Storybook UI 요소에 가려짐

## 원인 분석

### 1. `position: fixed` 문제

Storybook 환경에서는 다음과 같은 이유로 `position: fixed`가 제대로 작동하지 않을 수 있습니다:

- **Canvas vs Docs 탭**: Docs 탭에서 `inlineStories: true`로 설정되면 iframe이 아닌 인라인으로 렌더링되어 `fixed` positioning이 부모 컨테이너 기준으로 작동
- **부모 요소의 transform/overflow**: Storybook의 루트 요소나 body에 `transform`이나 `overflow` 속성이 있으면 `fixed` positioning의 기준점이 변경됨
- **iframe 렌더링**: Storybook의 iframe 내부에서 `fixed` positioning이 예상대로 작동하지 않을 수 있음

### 2. z-index 충돌

Storybook의 UI 요소들(툴바, 사이드바 등)이 높은 z-index 값을 사용하므로, Modal의 기본 z-index(1040, 1050)가 충분하지 않을 수 있습니다.

### 3. Portal 컨테이너 선택

일반적으로 `document.body`에 Portal을 렌더링하지만, Storybook 환경에서는 `#storybook-root`를 사용하는 것이 더 안정적일 수 있습니다.

## 해결 방법

### 1. Storybook 환경 감지 및 Portal 컨테이너 선택

`src/utils/portal.ts`에 Storybook 환경을 감지하고 적절한 Portal 컨테이너를 선택하는 유틸리티 함수를 추가했습니다:

```typescript
export function isStorybookEnvironment(): boolean {
  if (typeof window === 'undefined') return false
  
  return (
    window.location?.pathname?.includes('/iframe.html') ||
    window.location?.pathname?.includes('/storybook') ||
    document.getElementById('storybook-root') !== null ||
    document.querySelector('[id*="storybook"]') !== null ||
    window.__STORYBOOK_ADDONS_CHANNEL__ !== undefined
  )
}

export function getPortalContainer(): HTMLElement {
  if (isStorybookEnvironment()) {
    const storybookRoot = document.getElementById('storybook-root')
    if (storybookRoot) {
      return storybookRoot
    }
    return document.body
  }
  return document.body
}
```

### 2. z-index 토큰 추가

`src/tokens/index.ts`에 Storybook 환경을 위한 높은 z-index 값을 추가했습니다:

```typescript
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  // Storybook UI와 충돌 방지를 위한 높은 z-index 값
  storybookModalBackdrop: 10000,
  storybookModal: 10001,
} as const
```

### 3. Modal 컴포넌트 수정

`src/components/Modal/Modal.tsx`에서 다음과 같이 수정했습니다:

#### a) Storybook 환경에 맞는 z-index 선택

```typescript
const overlayZIndex = isStorybookEnvironment()
  ? zIndex.storybookModalBackdrop
  : zIndex.modalBackdrop
const modalZIndex = isStorybookEnvironment()
  ? zIndex.storybookModal
  : zIndex.modal
```

#### b) 인라인 스타일 보강

Tailwind 클래스만으로는 Storybook 환경에서 불안정할 수 있으므로, 인라인 스타일로 보강했습니다:

```typescript
<div
  className="fixed inset-0 flex items-center justify-center bg-black/50"
  style={{
    // Storybook 환경에서도 안정적으로 작동하도록 인라인 스타일 보강
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: overlayZIndex,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }}
>
```

#### c) Portal 컨테이너 동적 선택

```typescript
const portalContainer = getPortalContainer()
return createPortal(modalContent, portalContainer)
```

### 4. Storybook Preview 설정

`.storybook/preview.ts`에서 다음과 같이 설정했습니다:

#### a) Docs 탭에서 iframe 모드 사용

```typescript
parameters: {
  docs: {
    story: {
      inline: false, // iframe 모드로 렌더링하여 fixed positioning 정상 작동
      iframeHeight: 600,
    },
  },
}
```

#### b) body/html 스타일 보장

```typescript
// Storybook 환경에서 body와 html의 스타일을 보장
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    body#storybook-root-body,
    body[id*="storybook"] {
      position: relative !important;
      transform: none !important;
      overflow: visible !important;
    }
    
    iframe[id*="storybook-preview"] body {
      position: relative !important;
      transform: none !important;
      overflow: visible !important;
    }
  `
  document.head.appendChild(style)
}
```

### 5. Storybook Stories 설정

`src/components/Modal/Modal.stories.tsx`에서 각 Story에 `layout: 'fullscreen'`을 추가했습니다:

```typescript
export const Default: Story = {
  parameters: {
    layout: 'fullscreen', // Storybook Canvas의 기본 padding 영향 제거
  },
  // ...
}
```

또한 모달을 여는 버튼을 중앙에 배치하기 위해 컨테이너를 추가했습니다:

```typescript
<div className="flex items-center justify-center min-h-screen">
  <Button onClick={() => setOpen(true)}>Modal 열기</Button>
</div>
```

## 해결 결과

이러한 수정을 통해:

1. ✅ **오버레이 정상 표시**: 배경 오버레이가 정상적으로 표시됨
2. ✅ **중앙 정렬 성공**: Modal이 화면 중앙에 정확히 위치함
3. ✅ **z-index 충돌 해결**: Storybook UI 요소 위에 Modal이 표시됨
4. ✅ **Canvas와 Docs 탭 모두 정상 작동**: 두 탭 모두에서 Modal이 정상적으로 렌더링됨

## 체크리스트

Storybook에서 Portal을 사용하는 컴포넌트(Modal, Dropdown, Toast 등)를 구현할 때 다음을 확인하세요:

- [ ] Storybook 환경 감지 (`isStorybookEnvironment()`)
- [ ] 적절한 Portal 컨테이너 선택 (`getPortalContainer()`)
- [ ] Storybook용 높은 z-index 값 사용
- [ ] 인라인 스타일로 `position: fixed` 보강
- [ ] `layout: 'fullscreen'` 설정 (필요한 경우)
- [ ] Docs 탭에서 `inline: false` 설정
- [ ] body/html 스타일 보장 (preview.ts 또는 preview-head.html)

## 참고 자료

- [Storybook - Inline Stories](https://storybook.js.org/docs/react/writing-docs/docs-page#inline-stories)
- [MDN - position: fixed](https://developer.mozilla.org/en-US/docs/Web/CSS/position#fixed)
- [CSS Tricks - Fixed Positioning](https://css-tricks.com/absolute-relative-fixed-positioining-how-do-they-differ/)

