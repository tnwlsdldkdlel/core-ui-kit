# 코드 리뷰 및 리팩토링 보고서

## 개요

Phase 1 완료를 위한 코드 리뷰 및 리팩토링을 진행했습니다. 발견된 문제점과 수정 사항을 정리합니다.

## 발견된 문제점 및 수정 사항

### 1. Input 컴포넌트 Fragment 사용 문제

#### 문제점
- Input 컴포넌트에서 React Fragment(`<>...</>`)를 사용하여 input 요소와 helper text를 반환하고 있었습니다.
- Storybook 빌드 시 "S2[e] is not a function" 오류가 발생했습니다.
- Fragment는 빌드/번들링 과정에서 일부 환경에서 문제를 일으킬 수 있습니다.

#### 수정 내용
- Fragment를 `div` 래퍼로 변경하여 단일 루트 요소를 반환하도록 수정했습니다.
- 이로 인해 빌드 안정성이 향상되고 Storybook 배포 시 오류가 해결되었습니다.

**수정 전:**
```tsx
return (
  <>
    <input ... />
    {hasHelperText && <p>...</p>}
  </>
)
```

**수정 후:**
```tsx
return (
  <div className="w-full">
    <input ... />
    {hasHelperText && <p>...</p>}
  </div>
)
```

### 2. Badge 컴포넌트 타입 일관성 개선

#### 문제점
- Badge 컴포넌트의 `size` prop이 `'sm' | 'md'`로 하드코딩되어 있었습니다.
- 다른 컴포넌트(Button, Input)는 공통 `Size` 타입을 사용하고 있어 타입 일관성이 부족했습니다.
- `Size` 타입에는 `'lg'`도 포함되어 있지만, Badge는 `'lg'`를 지원하지 않습니다.

#### 수정 내용
- `size` prop의 타입을 `Exclude<Size, 'lg'>`로 변경하여 타입 일관성을 개선했습니다.
- 공통 타입을 재사용하면서도 Badge의 제약사항(`lg` 미지원)을 명확히 표현했습니다.

**수정 전:**
```tsx
size?: 'sm' | 'md'
```

**수정 후:**
```tsx
size?: Exclude<Size, 'lg'>
```

## 검증 결과

### 테스트
- ✅ 모든 테스트 통과 (52개)
  - Button: 22개
  - Badge: 6개
  - Input: 24개

### 빌드
- ✅ 프로젝트 빌드 성공
- ✅ Storybook 빌드 성공

### 린트
- ✅ ESLint 오류 없음

## 결론

리팩토링을 통해 다음과 같은 개선을 달성했습니다:

1. **빌드 안정성 향상**: Input 컴포넌트의 Fragment 문제 해결로 Storybook 배포 오류 해결
2. **타입 일관성 개선**: Badge 컴포넌트가 공통 타입 시스템을 사용하도록 개선
3. **코드 품질 향상**: 모든 테스트 통과 및 빌드 성공 확인

Phase 1의 모든 완료 기준을 충족하여 다음 단계로 진행할 수 있습니다.

