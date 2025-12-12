# CoreUI Kit

재사용 가능한 React UI 컴포넌트 라이브러리입니다. 접근성(A11y)을 우선 고려하여 설계되었으며, TypeScript와 Tailwind CSS를 기반으로 구축되었습니다.

## 📖 Storybook

컴포넌트 문서와 예제를 확인하세요:

🔗 **[Storybook 라이브 데모](https://tnwlsdldkdlel.github.io/core-ui-kit/)**

## ✨ 주요 특징

- 🎨 **접근성 우선**: WAI-ARIA 가이드라인을 준수하며, 키보드 내비게이션과 스크린 리더 지원
- 🎯 **타입 안전성**: TypeScript로 작성되어 타입 안전성 보장
- 🎨 **Tailwind CSS**: 유틸리티 우선 스타일링으로 커스터마이징 용이
- 📚 **완전한 문서화**: Storybook을 통한 상세한 문서와 예제
- 🧪 **테스트 커버리지**: Vitest와 React Testing Library를 사용한 포괄적인 테스트
- 🚀 **성능 최적화**: 메모이제이션과 최적화된 렌더링

## 기술 스택

- **React** - 컴포넌트 기반 UI 개발
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 유틸리티 우선 스타일링
- **Storybook** - 컴포넌트 문서화 및 개발
- **Vitest** - 테스트 프레임워크
- **React Testing Library** - 컴포넌트 테스트

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### Storybook 실행

```bash
npm run storybook
```

Storybook은 기본적으로 `http://localhost:6006`에서 실행됩니다.

### 테스트 실행

```bash
npm test
```

### 빌드

```bash
npm run build
```

### 린트

```bash
npm run lint
```

## 컴포넌트 목록

### 기본 컴포넌트

- **Button** - 다양한 variant와 size를 지원하는 버튼 컴포넌트
- **Badge** - 상태 표시용 배지 컴포넌트
- **Input** - 폼 입력 필드 컴포넌트 (prefix/suffix 지원)

### 상호작용 컴포넌트

- **Modal** - 다이얼로그 모달 컴포넌트 (Focus Trap, Portal 지원)
- **Dropdown** - 선택 가능한 옵션 목록 (Roving Tabindex 지원)
- **Tabs** - 탭 내비게이션 컴포넌트 (Controlled/Uncontrolled 지원)

### 알림 컴포넌트

- **Alert** - 인라인 알림 컴포넌트 (dismissible 지원)
- **Toast** - 플로팅 알림 컴포넌트 (스택 관리, 자동 닫힘 지원)

각 컴포넌트의 상세한 사용법은 [Storybook](https://tnwlsdldkdlel.github.io/core-ui-kit/)에서 확인할 수 있습니다.

## 사용 예제

### Button

```tsx
import { Button } from '@core-ui-kit/components'

function App() {
  return (
    <div>
      <Button variant="primary" size="md">
        클릭하세요
      </Button>
    </div>
  )
}
```

### Modal

```tsx
import { Modal } from '@core-ui-kit/components'
import { useState } from 'react'

function App() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>모달 열기</button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="모달 제목"
      >
        모달 내용
      </Modal>
    </>
  )
}
```

### Toast

```tsx
import { ToastProvider, useToast } from '@core-ui-kit/components'

function App() {
  return (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  )
}

function ToastDemo() {
  const { toast } = useToast()

  return (
    <button
      onClick={() =>
        toast({
          variant: 'success',
          title: '성공',
          description: '작업이 완료되었습니다.',
        })
      }
    >
      Toast 표시
    </button>
  )
}
```

## 프로젝트 구조

```
src/
  components/     # UI 컴포넌트
    Button/
    Modal/
    Dropdown/
    ...
  utils/          # 유틸리티 함수
    focus.ts      # 포커스 관리
    keyboard.ts   # 키보드 이벤트 핸들러
    aria.ts       # ARIA 속성 헬퍼
    portal.ts     # Portal 유틸리티
  tokens/         # 디자인 토큰
  types/          # TypeScript 타입 정의
  test/           # 테스트 설정
```

## 접근성 (A11y)

모든 컴포넌트는 WAI-ARIA 가이드라인을 준수합니다:

- **키보드 내비게이션**: 모든 상호작용 요소는 키보드로 접근 가능
- **스크린 리더 지원**: 적절한 ARIA 속성 사용
- **포커스 관리**: Focus Trap 및 포커스 복귀 지원
- **색상 대비**: WCAG AA 기준 준수

## 기여하기

이 프로젝트에 기여하고 싶으시다면:

1. 이 저장소를 포크하세요
2. 새로운 기능 브랜치를 생성하세요 (`git checkout -b feat/amazing-feature`)
3. 변경사항을 커밋하세요 (`git commit -m 'feat: Add amazing feature'`)
4. 브랜치에 푸시하세요 (`git push origin feat/amazing-feature`)
5. Pull Request를 생성하세요

## 라이선스

MIT

## 링크

- [Storybook 데모](https://tnwlsdldkdlel.github.io/core-ui-kit/)
- [GitHub 저장소](https://github.com/tnwlsdldkdlel/core-ui-kit)

