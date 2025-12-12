/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 색상 토큰
      colors: {
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
      },
      // 간격 토큰
      spacing: {
        // 컴포넌트 높이
        'component-sm': '2rem', // 32px
        'component-md': '2.5rem', // 40px
        'component-lg': '3rem', // 48px
      },
      // Border radius
      borderRadius: {
        'component': '0.375rem', // 6px (rounded-md)
      },
      // 타이포그래피
      fontSize: {
        // 이미 Tailwind 기본값과 일치하므로 extend만 사용
      },
      fontWeight: {
        // 이미 Tailwind 기본값과 일치하므로 extend만 사용
      },
      // 그림자
      boxShadow: {
        'component': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      },
      // 전환 효과
      transitionDuration: {
        'component': '200ms',
      },
      transitionTimingFunction: {
        'component': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
