# 접근성 (A11y) 체크리스트

이 문서는 CoreUI Kit의 모든 컴포넌트에 대한 접근성 검증 체크리스트입니다.

## ARIA 속성 검증

### Button 컴포넌트
- [x] `aria-busy` 속성 (loading 상태)
- [x] `aria-hidden="true"` (장식용 아이콘)
- [x] 키보드 접근성 (Tab, Enter, Space)
- [x] 포커스 링 표시

### Badge 컴포넌트
- [x] `aria-hidden="true"` (장식용 아이콘)
- [x] 의미론적 HTML (`<span>` 사용)

### Input 컴포넌트
- [x] `aria-invalid` 속성 (error 상태)
- [x] `aria-describedby` 속성 (helperText, errorMessage)
- [x] `label`과 `id` 연결
- [x] 키보드 접근성 (Tab, 모든 입력 키)

### Modal 컴포넌트
- [x] `role="dialog"`
- [x] `aria-modal="true"`
- [x] `aria-labelledby` (제목 연결)
- [x] `aria-label` (닫기 버튼)
- [x] Focus Trap 구현
- [x] ESC 키로 닫기
- [x] 포커스 복귀

### Dropdown 컴포넌트
- [x] 트리거: `aria-haspopup="listbox"`
- [x] 트리거: `aria-expanded`
- [x] 트리거: `aria-controls`
- [x] 콘텐츠: `role="listbox"`
- [x] 옵션: `role="option"`
- [x] 옵션: `aria-selected`
- [x] 옵션: `aria-disabled`
- [x] Roving Tabindex 구현
- [x] 키보드 내비게이션 (ArrowDown/ArrowUp, Home/End, Enter/Space)

### Tabs 컴포넌트
- [x] `role="tablist"` (TabsList)
- [x] `role="tab"` (TabsTrigger)
- [x] `aria-selected` (TabsTrigger)
- [x] `aria-controls` (TabsTrigger)
- [x] `role="tabpanel"` (TabsContent)
- [x] `aria-labelledby` (TabsContent)
- [x] `aria-disabled` (비활성화된 탭)
- [x] Roving Tabindex 구현
- [x] 키보드 내비게이션 (ArrowLeft/ArrowRight, Home/End, Enter/Space)

### Alert 컴포넌트
- [x] `role="status"` (기본)
- [x] `role="alert"` (urgent=true)
- [x] `aria-hidden="true"` (장식용 아이콘)
- [x] `aria-label` (닫기 버튼)

### Toast 컴포넌트
- [x] `role="status"`
- [x] `aria-live="polite"` (기본)
- [x] `aria-live="assertive"` (urgent=true)
- [x] `aria-atomic="true"`
- [x] `aria-label` (닫기 버튼)
- [x] `aria-hidden="true"` (장식용 아이콘)

## 키보드 내비게이션 일관성

### 공통 패턴
- [x] 모든 상호작용 요소는 Tab으로 접근 가능
- [x] Enter/Space로 활성화
- [x] ESC로 닫기 (Modal, Dropdown)
- [x] 포커스 링 표시 (focus:ring-2)

### 컴포넌트별 키보드 지원
- [x] **Button**: Tab, Enter, Space
- [x] **Input**: Tab, 모든 입력 키
- [x] **Modal**: Tab (Focus Trap), ESC
- [x] **Dropdown**: Enter/Space (토글), ArrowDown/ArrowUp (탐색), Home/End, ESC
- [x] **Tabs**: ArrowLeft/ArrowRight (탐색), Home/End, Enter/Space
- [x] **Alert**: Tab (닫기 버튼), Enter/Space (닫기)
- [x] **Toast**: Tab (닫기 버튼), Enter/Space (닫기)

## 색상 대비 검증

모든 컴포넌트는 WCAG AA 기준을 준수합니다:

- [x] **Button**: 텍스트와 배경 대비 4.5:1 이상
- [x] **Badge**: 텍스트와 배경 대비 4.5:1 이상
- [x] **Input**: 텍스트와 배경 대비 4.5:1 이상
- [x] **Modal**: 텍스트와 배경 대비 4.5:1 이상
- [x] **Dropdown**: 텍스트와 배경 대비 4.5:1 이상
- [x] **Tabs**: 텍스트와 배경 대비 4.5:1 이상
- [x] **Alert**: 텍스트와 배경 대비 4.5:1 이상
- [x] **Toast**: 텍스트와 배경 대비 4.5:1 이상

## 스크린 리더 지원

- [x] 모든 상호작용 요소에 적절한 레이블 제공
- [x] 상태 변경 시 `aria-live` 사용 (Toast, Alert)
- [x] 장식용 요소에 `aria-hidden="true"` 적용
- [x] 의미론적 HTML 사용

## 포커스 관리

- [x] Modal: Focus Trap 및 포커스 복귀
- [x] Dropdown: Roving Tabindex 및 포커스 복귀
- [x] Tabs: Roving Tabindex
- [x] 모든 컴포넌트: 명확한 포커스 표시

## 검증 도구

- [x] Storybook A11y Addon 사용
- [x] React Testing Library로 접근성 테스트
- [x] 키보드 내비게이션 수동 테스트
- [x] 스크린 리더 테스트 (권장)

## 참고 자료

- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [React A11y Best Practices](https://reactjs.org/docs/accessibility.html)

