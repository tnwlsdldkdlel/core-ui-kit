import { forwardRef } from 'react'
import { type InputState, type Size } from '../../types'

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Input 상태
   * @default 'default'
   */
  state?: InputState
  /**
   * Input 크기
   * @default 'md'
   */
  size?: Size
  /**
   * 에러 메시지 (state가 'error'일 때 표시)
   */
  errorMessage?: string
  /**
   * Helper 텍스트 (state가 'default'일 때 표시)
   */
  helperText?: string
}

/**
 * Input 컴포넌트
 *
 * 폼 입력을 위한 텍스트 입력 컴포넌트입니다.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      state = 'default',
      size = 'md',
      errorMessage,
      helperText,
      className = '',
      id,
      disabled,
      readOnly,
      ...props
    },
    ref
  ) => {
    // State 스타일 클래스
    const stateClasses = {
      default:
        'border-neutral-300 focus:border-primary-600 focus:ring-primary-500',
      error:
        'border-danger-600 focus:border-danger-600 focus:ring-danger-500',
      success:
        'border-success-600 focus:border-success-600 focus:ring-success-500',
    }

    // Size 스타일 클래스
    const sizeClasses = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-6 text-lg',
    }

    // 공통 스타일 클래스
    const baseClasses =
      'w-full border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed read-only:bg-neutral-50 read-only:cursor-default'

    const classes = `${baseClasses} ${stateClasses[state]} ${sizeClasses[size]} ${className}`

    // Helper Text 또는 Error Message ID 생성
    const helperId = id ? `${id}-helper` : undefined
    const hasHelperText = state === 'error' ? errorMessage : helperText

    return (
      <div className="w-full">
        <input
          ref={ref}
          id={id}
          className={classes}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={state === 'error' ? true : undefined}
          aria-describedby={hasHelperText ? helperId : undefined}
          {...props}
        />
        {hasHelperText && (
          <p
            id={helperId}
            className={`mt-1 text-sm ${
              state === 'error' ? 'text-danger-600' : 'text-neutral-600'
            }`}
          >
            {state === 'error' ? errorMessage : helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

