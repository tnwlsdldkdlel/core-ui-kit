# 제품 요구사항 정의서: CoreUI Kit

## 1. 개요 (Introduction)

### 1.1 프로젝트 이름
**CoreUI Kit**

### 1.2 목표 및 목적 (Goals and Objectives)

CoreUI Kit 프로젝트의 주된 목표는 견고하고 재사용 가능한 UI 컴포넌트 라이브러리를 구축하여 실제 프론트엔드 개발 관행을 시뮬레이션하는 것입니다.

1.  **Storybook**을 활용하여 UI 컴포넌트를 독립적으로 개발하고 문서화하는 **실무 경험**을 습득합니다.
2.  Storybook을 통해 컴포넌트 상태 및 변형을 디자이너 및 기획자와 명확하게 공유하여 협업 워크플로우의 기반을 구축합니다.
3.  접근성 및 디자인 시스템 모범 사례를 준수하는 필수 재사용 UI 컴포넌트 세트를 구현합니다.

### 1.3 대상 사용자 (Target Audience)

* **주요 사용자:** 구축된 컴포넌트를 실제 애플리케이션에서 활용할 프론트엔드 개발자.
* **보조 사용자:** 모든 UI 상태와 변형에 대한 시각적 기준점(Single Source of Truth)이 필요한 디자이너 및 기획자 (Storybook을 통해 접근).

## 2. 기술 범위 및 스택 (Technical Scope and Stack)

### 2.1 기술 스택 (Technology Stack)

| 범주 | 기술 | 선정 이유 |
| :--- | :--- | :--- |
| **프레임워크** | React | 컴포넌트 기반 UI 개발을 위한 산업 표준입니다. |
| **언어** | TypeScript | 타입 안전성을 보장하고 코드 품질을 향상시킵니다. |
| **스타일링** | Tailwind CSS | 유틸리티 우선 프레임워크입니다. |
| **문서화** | Storybook | 컴포넌트 격리, 문서화 및 상태 시각화를 위한 핵심 도구입니다. |

### 2.2 핵심 컴포넌트 범위 (Core Components in Scope)

1.  **폼 요소:** Button, Input, Dropdown
2.  **상호작용:** Modal
3.  **내비게이션/정보:** Tabs, Alert, Toast Notification
4.  **표시:** Badge

## 3. Storybook 활용 목표 (Storybook Objectives)

| 기능 | 설명 |
| :--- | :--- |
| **Args / Controls 연동** | Controls Addon을 사용하여 Props를 실시간으로 조작하며 테스트할 수 있도록 구현합니다. |
| **Storybook Docs** | 실제 디자인 시스템 문서 구조를 모방하여 포괄적인 사용 가이드 및 Props 테이블을 작성합니다. |
| **A11y Addon** | 모든 핵심 컴포넌트에 대한 기본적인 접근성 검사(색상 대비, 포커스 관리 등)를 수행합니다. |
| **시각적 회귀 고려** | 주요 컴포넌트 상태를 스토리로 고정하여, UI 깨짐을 신속하게 감지할 수 있는 구조를 만듭니다. |

## 4. 기능 요구사항 (Functional Requirements)

### 4.1 Button 컴포넌트 (`<Button>`)

| 측면 | 요구사항 요약 |
| :--- | :--- |
| **유형 (Variants)** | `Primary` (채워진), `Secondary` (테두리/틴티드), `Tertiary/Ghost` (텍스트 중심), `Danger` (위험 행동). |
| **크기 (Sizes)** | `sm` (`h-8`), `md` (`h-10` - 기본), `lg` (`h-12`). |
| **상태 (States)** | `Default`, `Hover`, `Focus/Focus-visible`, `Active/Pressed`, `Disabled`, **`Loading`** 상태 (스피너 및 비활성화 로직 포함). |
| **아이콘 지원** | 텍스트와 함께 `leadingIcon`/`trailingIcon` 지원. 아이콘 전용 `IconButton`은 **`aria-label`을 필수**로 요구. |

### 4.2 Input 컴포넌트 (`<Input>`)

| 측면 | 요구사항 요약 |
| :--- | :--- |
| **상태 (States)** | `Default`, `Active/Focused`, `Error` (`aria-invalid`), `Success/Valid`, `Disabled`, `ReadOnly`. |
| **크기 (Sizing)** | 버튼 크기와 일치: `sm` (`h-8`), `md` (`h-10` - 기본), `lg` (`h-12`). |
| **추가 요소 (Adornments)** | 내부 `Prefix`/`Suffix` 및 외부 `Helper Text`/`Error Text` 지원. **선택:** Clear 버튼. |
| **접근성** | `id`와 `label` (`htmlFor`) 연결 필수. 에러 상태는 `aria-describedby` 및 `aria-invalid="true"` 사용. |

### 4.3 Modal 컴포넌트 (`<Modal>`)

| 측면 | 요구사항 요약 |
| :--- | :--- |
| **구조/동작** | **React Portal** 사용 필수. **Body 스크롤 방지** 필수. 오버레이 클릭은 기본적으로 닫히지 않음. |
| **포커스/키보드** | **Focus Trap (포커스 트랩) 필수**. **ESC 키로 닫기 필수**. 닫힐 때 포커스는 트리거 요소로 **복귀 필수**. |
| **접근성** | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` (헤더 제목 연결) 필수. |

### 4.4 Dropdown 컴포넌트 (`<Dropdown>`)

| 측면 | 요구사항 요약 |
| :--- | :--- |
| **구조** | 트리거는 `Button`/`IconButton` 지원. 콘텐츠는 **Portal** 사용. 선택, 외부 클릭, ESC 입력 시 닫힘. |
| **키보드 상호작용** | `Enter`/`Space` (토글/선택), **Roving Tabindex**를 통한 `ArrowDown`/`ArrowUp` 탐색, `Home`/`End` 지원. |
| **포커스 관리** | **Roving Tabindex** 방식 권장. 열릴 때 포커스는 선택된 항목 또는 첫 번째 활성화 항목으로 이동. |
| **접근성** | 트리거는 `aria-haspopup="listbox"`, `aria-expanded`. 콘텐츠/항목은 `role="listbox"` / `role="option"`. |

### 4.5 Tabs 컴포넌트 (`<Tabs>`)

| 측면 | 요구사항 요약 |
| :--- | :--- |
| **구조/동작** | Controlled/Uncontrolled 상태 지원. `TabsRoot`, `TabsList`, `TabsTrigger`, `TabsContent`로 구성. |
| **키보드** | **Roving Tabindex**를 통한 탐색 (`ArrowLeft`/`ArrowRight`, `Home`/`End`). `Enter`/`Space`로 활성화. |
| **접근성** | `role="tablist"`, `role="tab"` + `aria-selected`, `role="tabpanel"`. |

### 4.6 Alert 및 Toast 컴포넌트

| 컴포넌트 | 목적 / 동작 | 접근성 (WAI-ARIA) |
| :--- | :--- | :--- |
| **Alert** (인라인) | 지속적인 페이지 메시지. `dismissible` 옵션 지원. | **`role="status"`** (기본) 또는 **`role="alert"`** (긴급 오류). |
| **Toast** (플로팅) | 일시적인 알림 (스택 형태). `duration` (자동 닫힘) 지원. | **`role="status"`** + **`aria-live="polite"`** (기본). 중요 알림은 `aria-live="assertive"` 사용 가능. |
| **공통** | 상태 `Variant` (info, success, warning, error)를 공유하며, 아이콘, 제목, 설명, 액션 슬롯 지원. |

### 4.7 Badge 컴포넌트 (`<Badge>`)

* **목적:** 비대화형 상태/레이블 표시 (NEW, ACTIVE 등).
* **유형/크기:** `solid`, **`subtle` (기본)**, `outline`. 크기 `sm` (기본), `md`.
* **콘텐츠:** 텍스트 라벨 필수.
* **접근성:** 일반적인 비대화형 배지는 별도의 ARIA 역할 불필요. 장식용 아이콘은 `aria-hidden="true"` 사용.

## 5. 품질 보증 및 테스트 (Quality Assurance and Testing)

### 5.1 테스트 전략 및 환경

| 측면 | 요구사항 |
| :--- | :--- |
| **테스트 유형 (필수)** | **유닛 테스트**, **상호작용 / 통합 테스트** (RTL 기반), **접근성 테스트** (A11y Addon). |
| **테스트 도구** | **Vitest** + **React Testing Library (RTL)**, **Storybook (Play Function)**, **Storybook Test Runner**. |
| **완료의 정의 (DoD)** | 1. Storybook Docs 페이지 완성. 2. 필수 상호작용 시나리오 통과. 3. 접근성 (A11y) 기준 및 핵심 ARIA 속성 확인. |

### 5.2 공통 테스트 체크리스트

| 체크 범주 | 주요 테스트 항목 |
| :--- | :--- |
| **렌더링 및 변형 확인** | 모든 `variant`/`size` 조합이 오류 없이 렌더링. 기본 속성 동작 검증. |
| **키보드 상호작용 확인** | Tab/Shift+Tab 흐름 및 `focus-visible` 표시 확인. 컴포넌트별 핵심 키 동작(ESC, 화살표, Enter 등)이 올바르게 작동하는지 검증. |
| **접근성 (WAI-ARIA)** | 핵심 ARIA 속성(`role`, `aria-expanded`, `aria-modal`)의 정확성. Input `label`-`id` 연결 및 에러 상태 ARIA 속성 사용 확인. |
| **엣지 케이스 / 상태 확인** | `disabled`, `loading`, `readOnly` 상태 등에서 안정성 유지. 열린 컴포넌트가 외부/ESC 트리거 시 올바르게 닫히는지 확인. |