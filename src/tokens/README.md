# 디자인 토큰 (Design Tokens)

CoreUI Kit에서 사용하는 디자인 토큰 정의입니다.

## 개요

디자인 토큰은 색상, 간격, 타이포그래피 등 UI의 시각적 속성을 일관되게 관리하기 위한 값입니다. 이 토큰들은 TypeScript로 정의되어 타입 안정성을 제공하며, Tailwind CSS 설정과 동기화되어 있습니다.

## 구조

```
src/tokens/
  ├── index.ts      # 디자인 토큰 정의 및 타입
  └── README.md     # 이 문서
```

## 색상 (Colors)

### Primary (Blue)
- `primary.600`: 기본 Primary 색상 (`#2563eb`)
- `primary.700`: Hover 상태 (`#1d4ed8`)
- `primary.800`: Active 상태 (`#1e40af`)

### Danger (Red)
- `danger.600`: 기본 Danger 색상 (`#dc2626`)
- `danger.700`: Hover 상태 (`#b91c1c`)
- `danger.800`: Active 상태 (`#991b1b`)

### Neutral (Gray)
- `neutral.300`: Disabled 배경 (`#d1d5db`)
- `neutral.500`: Disabled 텍스트 (`#6b7280`)

### Semantic Colors
- `info`: 정보성 메시지 (Alert, Toast)
- `success`: 성공 메시지
- `warning`: 경고 메시지
- `error`: 오류 메시지

## 간격 (Spacing)

### 컴포넌트 높이
- `componentHeight.sm`: 32px (h-8) - 작은 크기
- `componentHeight.md`: 40px (h-10) - 기본 크기
- `componentHeight.lg`: 48px (h-12) - 큰 크기

### 패딩 (가로)
- `paddingX.sm`: 12px (px-3)
- `paddingX.md`: 16px (px-4)
- `paddingX.lg`: 24px (px-6)

### 간격 (Gap)
- `gap.xs`: 4px (gap-1)
- `gap.sm`: 8px (gap-2) - 기본 간격
- `gap.md`: 16px (gap-4)
- `gap.lg`: 24px (gap-6)
- `gap.xl`: 32px (gap-8)

### Border Radius
- `radius.sm`: 4px (rounded)
- `radius.md`: 6px (rounded-md) - 기본
- `radius.lg`: 8px (rounded-lg)
- `radius.full`: 9999px (rounded-full)

## 타이포그래피 (Typography)

### Font Size
- `fontSize.xs`: 12px (text-xs)
- `fontSize.sm`: 14px (text-sm) - 작은 크기
- `fontSize.base`: 16px (text-base) - 기본 크기
- `fontSize.lg`: 18px (text-lg) - 큰 크기

### Font Weight
- `fontWeight.normal`: 400
- `fontWeight.medium`: 500 - 기본
- `fontWeight.semibold`: 600
- `fontWeight.bold`: 700

## 사용 방법

### TypeScript에서 사용

```typescript
import { tokens } from '@/tokens'

// 색상 사용
const primaryColor = tokens.colors.primary[600]

// 간격 사용
const buttonHeight = tokens.spacing.componentHeight.md

// 타이포그래피 사용
const fontSize = tokens.typography.fontSize.base
```

### Tailwind CSS에서 사용

디자인 토큰은 Tailwind CSS 설정과 동기화되어 있으므로, Tailwind 클래스를 직접 사용할 수 있습니다:

```tsx
// 색상
<div className="bg-primary-600 hover:bg-primary-700" />

// 간격
<button className="h-10 px-4" /> // componentHeight.md + paddingX.md

// 타이포그래피
<span className="text-base font-medium" />
```

## 확장

새로운 디자인 토큰을 추가할 때는:

1. `src/tokens/index.ts`에 토큰 정의 추가
2. `tailwind.config.js`에 Tailwind 설정 추가 (필요한 경우)
3. 이 문서 업데이트

## 참고

- 모든 색상 값은 Tailwind CSS 기본 색상 팔레트를 기반으로 합니다.
- 간격 값은 4px 기준 그리드 시스템을 따릅니다.
- 타이포그래피는 브라우저 기본 크기(16px)를 기준으로 합니다.

