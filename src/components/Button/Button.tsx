import { forwardRef, memo, type ReactNode } from 'react'
import { type ButtonVariant, type Size } from '../../types'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼 스타일 변형
   * @default 'primary'
   */
  variant?: ButtonVariant
  /**
   * 버튼 크기
   * @default 'md'
   */
  size?: Size
  /**
   * 로딩 상태
   * @default false
   */
  loading?: boolean
  /**
   * 앞쪽 아이콘
   */
  leadingIcon?: ReactNode
  /**
   * 뒤쪽 아이콘
   */
  trailingIcon?: ReactNode
  /**
   * 버튼 내용
   */
  children?: ReactNode
}

/**
 * Button 컴포넌트
 *
 * 다양한 variant, size, state를 지원하는 버튼 컴포넌트입니다.
 */
const ButtonComponent = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      leadingIcon,
      trailingIcon,
      children,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    // Variant 스타일 클래스
    const variantClasses = {
      primary:
        'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800 disabled:bg-gray-300 disabled:text-gray-500',
      secondary:
        'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 active:bg-blue-100 disabled:border-gray-300 disabled:text-gray-500',
      tertiary:
        'bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500 active:bg-blue-100 disabled:text-gray-500',
      danger:
        'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800 disabled:bg-gray-300 disabled:text-gray-500',
    }

    // Size 스타일 클래스
    const sizeClasses = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-6 text-lg',
    }

    // 공통 스타일 클래스
    const baseClasses =
      'inline-flex items-center justify-center gap-2 font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed'

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

    return (
      <button
        ref={ref}
        type="button"
        className={classes}
        disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leadingIcon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {leadingIcon}
          </span>
        )}
        {children && <span>{children}</span>}
        {!loading && trailingIcon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {trailingIcon}
          </span>
        )}
      </button>
    )
  }
)

ButtonComponent.displayName = 'Button'

// 성능 최적화: props가 변경되지 않으면 리렌더링 방지
export const Button = memo(ButtonComponent)

