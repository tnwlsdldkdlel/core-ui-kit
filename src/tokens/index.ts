/**
 * 디자인 토큰 정의
 *
 * CoreUI Kit에서 사용하는 색상, 간격, 타이포그래피 등의 디자인 토큰을 정의합니다.
 * 이 토큰들은 Tailwind CSS 설정과 일치해야 합니다.
 */

/**
 * 색상 토큰
 */
export const colors = {
  // Primary (Blue)
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb', // 기본 Primary
    700: '#1d4ed8', // Hover
    800: '#1e40af', // Active
    900: '#1e3a8a',
  },
  // Danger (Red)
  danger: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626', // 기본 Danger
    700: '#b91c1c', // Hover
    800: '#991b1b', // Active
    900: '#7f1d1d',
  },
  // Neutral (Gray)
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db', // Disabled background
    400: '#9ca3af',
    500: '#6b7280', // Disabled text
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  // Semantic colors (Alert, Toast 등에서 사용)
  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#f59e0b',
    600: '#d97706',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',
    600: '#dc2626',
  },
} as const

/**
 * 간격 토큰 (Spacing)
 */
export const spacing = {
  // 컴포넌트 높이
  componentHeight: {
    sm: '2rem', // 32px / h-8
    md: '2.5rem', // 40px / h-10
    lg: '3rem', // 48px / h-12
  },
  // 패딩 (가로)
  paddingX: {
    sm: '0.75rem', // 12px / px-3
    md: '1rem', // 16px / px-4
    lg: '1.5rem', // 24px / px-6
  },
  // 간격 (Gap)
  gap: {
    xs: '0.25rem', // 4px / gap-1
    sm: '0.5rem', // 8px / gap-2
    md: '1rem', // 16px / gap-4
    lg: '1.5rem', // 24px / gap-6
    xl: '2rem', // 32px / gap-8
  },
  // Border radius
  radius: {
    sm: '0.25rem', // 4px / rounded
    md: '0.375rem', // 6px / rounded-md
    lg: '0.5rem', // 8px / rounded-lg
    full: '9999px', // rounded-full
  },
  // Border width
  borderWidth: {
    thin: '1px',
    medium: '2px',
    thick: '4px',
  },
  // Focus ring
  focusRing: {
    width: '2px',
    offset: '2px',
  },
} as const

/**
 * 타이포그래피 토큰
 */
export const typography = {
  // Font size
  fontSize: {
    xs: '0.75rem', // 12px / text-xs
    sm: '0.875rem', // 14px / text-sm
    base: '1rem', // 16px / text-base
    lg: '1.125rem', // 18px / text-lg
    xl: '1.25rem', // 20px / text-xl
    '2xl': '1.5rem', // 24px / text-2xl
    '3xl': '1.875rem', // 30px / text-3xl
  },
  // Font weight
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  // Line height
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
} as const

/**
 * 그림자 토큰
 */
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
} as const

/**
 * 전환 효과 토큰
 */
export const transitions = {
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const

/**
 * Z-index 토큰
 *
 * Storybook UI의 z-index는 일반적으로 9999 이하이므로,
 * Modal은 10000 이상의 값을 사용하여 충돌을 방지합니다.
 */
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

/**
 * 디자인 토큰 타입
 */
export type ColorToken = typeof colors
export type SpacingToken = typeof spacing
export type TypographyToken = typeof typography
export type ShadowToken = typeof shadows
export type TransitionToken = typeof transitions
export type ZIndexToken = typeof zIndex

/**
 * 모든 디자인 토큰
 */
export const tokens = {
  colors,
  spacing,
  typography,
  shadows,
  transitions,
  zIndex,
} as const

