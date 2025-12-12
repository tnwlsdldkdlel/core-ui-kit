# CoreUI Kit 작업 계획서

## 개요

이 문서는 CoreUI Kit 프로젝트의 단계별 개발 계획을 정의합니다. PRD에 명시된 요구사항을 기반으로 3단계(Phase)로 나누어 체계적으로 진행합니다.

## Phase 1: 기초 컴포넌트 및 인프라 구축

### 목표
- 프로젝트 기본 구조 및 개발 환경 완성
- 가장 기본적인 컴포넌트 구현 및 패턴 수립
- Storybook 기본 설정 및 문서화 구조 확립

### 작업 범위

#### 1.1 프로젝트 인프라
- [x] React + TypeScript + Tailwind CSS 프로젝트 설정
- [x] Storybook 설정 및 기본 Addon 구성
- [x] Vitest + React Testing Library 테스트 환경 구축
- [x] CI/CD 파이프라인 설정 (GitHub Actions)
- [x] 컴포넌트 디렉토리 구조 정의
- [x] 공통 유틸리티 함수 및 타입 정의
- [x] 디자인 토큰 (색상, 간격, 타이포그래피) 정의

#### 1.2 Button 컴포넌트
- [x] 기본 Button 컴포넌트 구현
  - Variants: Primary, Secondary, Tertiary/Ghost, Danger
  - Sizes: sm, md (기본), lg
  - States: Default, Hover, Focus, Active, Disabled, Loading
- [x] IconButton 구현 (aria-label 필수)
- [x] leadingIcon/trailingIcon 지원
- [x] Storybook Stories 작성
  - 모든 variant/size 조합
  - Controls Addon 연동
  - A11y Addon 검사
- [x] 테스트 작성
  - 렌더링 테스트
  - 클릭 이벤트 테스트
  - 키보드 상호작용 (Tab, Enter, Space)
  - 접근성 테스트 (aria-label, role)

#### 1.3 Badge 컴포넌트
- [x] Badge 컴포넌트 구현
  - Variants: solid, subtle (기본), outline
  - Sizes: sm (기본), md
- [x] Storybook Stories 작성
- [x] 테스트 작성
  - 렌더링 테스트
  - 접근성 테스트 (aria-hidden for decorative icons)

#### 1.4 Input 컴포넌트 (기본)
- [x] 기본 Input 컴포넌트 구현
  - States: Default, Focused, Error, Success, Disabled, ReadOnly
  - Sizes: sm, md (기본), lg
- [x] Label 및 Helper Text 구조
- [x] Storybook Stories 작성
- [x] 테스트 작성
  - 렌더링 테스트
  - 포커스 관리 테스트
  - 접근성 테스트 (label-id 연결, aria-describedby, aria-invalid)

### 완료 기준 (Definition of Done)
- [x] Button, Badge, Input 컴포넌트 구현 완료
- [x] 각 컴포넌트의 Storybook Docs 페이지 완성
- [x] 필수 상호작용 시나리오 테스트 통과
- [x] A11y Addon 검사 통과
- [x] 코드 리뷰 및 리팩토링 완료

### 예상 기간
2-3주

---

## Phase 2: 상호작용 컴포넌트 구현

### 목표
- 복잡한 상호작용이 필요한 컴포넌트 구현
- 포커스 관리 및 키보드 내비게이션 패턴 확립
- Portal 및 포커스 트랩 구현

### 작업 범위

#### 2.1 Input 컴포넌트 (고급 기능)
- [ ] Prefix/Suffix Adornments 구현
- [ ] Clear 버튼 기능 (선택)
- [ ] Error Text 표시 및 ARIA 속성 연결
- [ ] Storybook Stories 업데이트
- [ ] 테스트 보완

#### 2.2 Modal 컴포넌트
- [ ] Modal 컴포넌트 구현
  - React Portal 사용
  - Body 스크롤 방지
  - 오버레이 클릭 처리 (기본적으로 닫히지 않음)
- [ ] Focus Trap 구현
  - 열릴 때 첫 번째 포커스 가능 요소로 포커스 이동
  - Tab 키로 모달 내부 순환
  - ESC 키로 닫기
  - 닫힐 때 트리거 요소로 포커스 복귀
- [ ] 접근성 구현
  - role="dialog"
  - aria-modal="true"
  - aria-labelledby (헤더 제목 연결)
- [ ] Storybook Stories 작성
  - 다양한 크기 및 콘텐츠 예제
  - A11y Addon 검사
- [ ] 테스트 작성
  - Portal 렌더링 테스트
  - Focus Trap 테스트
  - ESC 키 동작 테스트
  - 포커스 복귀 테스트
  - 접근성 테스트

#### 2.3 Dropdown 컴포넌트
- [ ] Dropdown 컴포넌트 구현
  - Portal 사용
  - 트리거 (Button/IconButton) 지원
  - 외부 클릭, ESC 입력 시 닫힘
- [ ] 키보드 상호작용 구현
  - Enter/Space: 토글/선택
  - ArrowDown/ArrowUp: 항목 탐색 (Roving Tabindex)
  - Home/End: 첫/마지막 항목으로 이동
- [ ] 포커스 관리
  - Roving Tabindex 방식
  - 열릴 때 선택된 항목 또는 첫 번째 활성화 항목으로 포커스 이동
- [ ] 접근성 구현
  - 트리거: aria-haspopup="listbox", aria-expanded
  - 콘텐츠: role="listbox"
  - 항목: role="option"
- [ ] Storybook Stories 작성
  - 다양한 옵션 구성
  - 키보드 상호작용 데모
  - A11y Addon 검사
- [ ] 테스트 작성
  - Portal 렌더링 테스트
  - 키보드 내비게이션 테스트
  - 선택 동작 테스트
  - 접근성 테스트

#### 2.4 Tabs 컴포넌트
- [ ] Tabs 컴포넌트 구현
  - TabsRoot, TabsList, TabsTrigger, TabsContent 구조
  - Controlled/Uncontrolled 상태 지원
- [ ] 키보드 상호작용 구현
  - ArrowLeft/ArrowRight: 탭 탐색 (Roving Tabindex)
  - Home/End: 첫/마지막 탭으로 이동
  - Enter/Space: 탭 활성화
- [ ] 접근성 구현
  - role="tablist"
  - role="tab" + aria-selected
  - role="tabpanel"
- [ ] Storybook Stories 작성
  - 다양한 탭 구성
  - Controlled/Uncontrolled 예제
  - A11y Addon 검사
- [ ] 테스트 작성
  - 탭 전환 테스트
  - 키보드 내비게이션 테스트
  - Controlled/Uncontrolled 상태 테스트
  - 접근성 테스트

### 완료 기준 (Definition of Done)
- [ ] Modal, Dropdown, Tabs 컴포넌트 구현 완료
- [ ] 모든 컴포넌트의 포커스 관리 및 키보드 내비게이션 정상 작동
- [ ] Storybook Docs 페이지 완성
- [ ] 필수 상호작용 시나리오 테스트 통과
- [ ] A11y Addon 검사 통과
- [ ] 코드 리뷰 및 리팩토링 완료

### 예상 기간
3-4주

---

## Phase 3: 알림 컴포넌트 및 최종 통합

### 목표
- 알림 컴포넌트 구현
- 전체 컴포넌트 라이브러리 통합 및 최적화
- 문서화 완성 및 배포 준비

### 작업 범위

#### 3.1 Alert 컴포넌트
- [ ] Alert 컴포넌트 구현
  - Variants: info, success, warning, error
  - dismissible 옵션 지원
  - 아이콘, 제목, 설명, 액션 슬롯 지원
- [ ] 접근성 구현
  - role="status" (기본)
  - role="alert" (긴급 오류)
- [ ] Storybook Stories 작성
  - 모든 variant 예제
  - dismissible 동작 데모
  - A11y Addon 검사
- [ ] 테스트 작성
  - 렌더링 테스트
  - dismiss 동작 테스트
  - 접근성 테스트

#### 3.2 Toast 컴포넌트
- [ ] Toast 컴포넌트 구현
  - Toast 스택 관리 시스템
  - duration 기반 자동 닫힘
  - 수동 닫기 지원
  - Variants: info, success, warning, error
  - 아이콘, 제목, 설명, 액션 슬롯 지원
- [ ] 접근성 구현
  - role="status"
  - aria-live="polite" (기본)
  - aria-live="assertive" (중요 알림)
- [ ] Storybook Stories 작성
  - Toast 스택 데모
  - 자동 닫힘 동작 데모
  - 다양한 variant 예제
  - A11y Addon 검사
- [ ] 테스트 작성
  - Toast 스택 관리 테스트
  - 자동 닫힘 테스트
  - 접근성 테스트

#### 3.3 공통 기능 및 최적화
- [ ] 공통 유틸리티 함수 정리
  - 포커스 관리 유틸리티
  - 키보드 이벤트 핸들러
  - ARIA 속성 헬퍼
- [ ] 타입 정의 통합 및 개선
- [ ] 성능 최적화
  - 불필요한 리렌더링 방지
  - 메모이제이션 적용
- [ ] 접근성 개선
  - 모든 컴포넌트의 ARIA 속성 검증
  - 키보드 내비게이션 일관성 확인
  - 색상 대비 검증

#### 3.4 문서화 및 배포 준비
- [ ] Storybook 문서화 완성
  - 모든 컴포넌트의 사용 가이드 작성
  - Props 테이블 완성
  - 예제 코드 보완
- [ ] README 업데이트
  - 설치 및 사용 가이드
  - 컴포넌트 목록 및 링크
  - 기여 가이드
- [ ] 코드 품질 개선
  - ESLint 규칙 준수
  - TypeScript 타입 안전성 확보
  - 코드 리뷰 및 리팩토링
- [ ] 테스트 커버리지 확보
  - 모든 컴포넌트의 핵심 기능 테스트
  - 엣지 케이스 테스트
  - 통합 테스트

### 완료 기준 (Definition of Done)
- [ ] Alert, Toast 컴포넌트 구현 완료
- [ ] 모든 컴포넌트의 Storybook Docs 페이지 완성
- [ ] 전체 컴포넌트 라이브러리 통합 테스트 통과
- [ ] A11y Addon 검사 통과
- [ ] 테스트 커버리지 목표 달성 (80% 이상 권장)
- [ ] 문서화 완료
- [ ] 코드 리뷰 및 최종 리팩토링 완료

### 예상 기간
2-3주

---

## 전체 일정 요약

| Phase | 주요 컴포넌트 | 예상 기간 | 누적 기간 |
|-------|--------------|----------|----------|
| Phase 1 | Button, Badge, Input (기본) | 2-3주 | 2-3주 |
| Phase 2 | Input (고급), Modal, Dropdown, Tabs | 3-4주 | 5-7주 |
| Phase 3 | Alert, Toast, 통합 및 최적화 | 2-3주 | 7-10주 |

**총 예상 기간: 7-10주**

## 공통 작업 항목 (모든 Phase)

### 개발 표준
- TypeScript 타입 안전성 유지
- Tailwind CSS 유틸리티 클래스 활용
- 접근성 (A11y) 우선 고려
- 반응형 디자인 고려

### 테스트 전략
- 각 컴포넌트 구현 시 테스트 병행 작성
- Storybook Play Function 활용
- Storybook Test Runner로 통합 테스트
- A11y Addon으로 접근성 검사

### 문서화
- 각 컴포넌트 구현 시 Storybook Stories 동시 작성
- Props 및 사용 예제 문서화
- 접근성 가이드라인 문서화

## 리스크 및 고려사항

### 기술적 리스크
- React Portal 및 Focus Trap 구현 복잡도
- Roving Tabindex 패턴의 일관성 유지
- Toast 스택 관리의 성능 이슈

### 완화 방안
- Phase 1에서 기본 패턴 확립
- 공통 유틸리티 함수로 재사용성 확보
- 단계별 테스트로 조기 문제 발견

## 다음 단계

Phase 1 작업을 시작하기 전에:
1. 컴포넌트 디렉토리 구조 최종 확정
2. 디자인 토큰 정의
3. 공통 타입 및 유틸리티 함수 기본 구조 작성
4. Button 컴포넌트 프로토타입 구현

