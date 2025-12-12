import { forwardRef, type ReactNode, useState } from 'react'
import { type InputState, type Size } from '../../types'

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'suffix'> {
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
  /**
   * Prefix Adornment (input 앞에 표시되는 요소)
   */
  prefix?: ReactNode
  /**
   * Suffix Adornment (input 뒤에 표시되는 요소)
   */
  suffix?: ReactNode
  /**
   * Clear 버튼 표시 여부
   * @default false
   */
  clearable?: boolean
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
      prefix,
      suffix,
      clearable = false,
      className = '',
      id,
      disabled,
      readOnly,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    // Controlled/Uncontrolled 상태 관리
    const [internalValue, setInternalValue] = useState(
      props.defaultValue?.toString() || ''
    )
    const isControlled = value !== undefined
    const currentValue = isControlled ? (value ?? '') : internalValue
    const hasValue =
      currentValue !== '' &&
      currentValue !== null &&
      currentValue !== undefined &&
      String(currentValue).trim() !== ''

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value)
      }
      onChange?.(e)
    }

    const handleClear = () => {
      if (!isControlled) {
        setInternalValue('')
      }
      // Controlled인 경우 onChange를 통해 부모 컴포넌트에서 처리
      if (onChange) {
        const syntheticEvent = {
          target: { value: '' },
          currentTarget: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>
        onChange(syntheticEvent)
      }
      // Input 요소에 포커스 유지
      setTimeout(() => {
        if (typeof ref === 'object' && ref?.current) {
          ref.current.focus()
        }
      }, 0)
    }

    // State 스타일 클래스
    const stateClasses = {
      default:
        'border-neutral-300 focus:border-primary-600 focus:ring-primary-500',
      error:
        'border-danger-600 focus:border-danger-600 focus:ring-danger-500',
      success:
        'border-success-600 focus:border-success-600 focus:ring-success-500',
    }

    // Size 스타일 클래스 (padding은 adornment에 따라 조정)
    const sizeClasses = {
      sm: 'h-8 text-sm',
      md: 'h-10 text-base',
      lg: 'h-12 text-lg',
    }

    // Padding 클래스 (adornment 유무에 따라)
    const paddingClasses = {
      sm: prefix
        ? 'pl-8 pr-3'
        : suffix || (clearable && hasValue)
          ? 'pl-3 pr-8'
          : prefix && (suffix || (clearable && hasValue))
            ? 'px-8'
            : 'px-3',
      md: prefix
        ? 'pl-10 pr-4'
        : suffix || (clearable && hasValue)
          ? 'pl-4 pr-10'
          : prefix && (suffix || (clearable && hasValue))
            ? 'px-10'
            : 'px-4',
      lg: prefix
        ? 'pl-12 pr-6'
        : suffix || (clearable && hasValue)
          ? 'pl-6 pr-12'
          : prefix && (suffix || (clearable && hasValue))
            ? 'px-12'
            : 'px-6',
    }

    // 공통 스타일 클래스
    const baseClasses =
      'w-full border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed read-only:bg-neutral-50 read-only:cursor-default'

    const inputClasses = `${baseClasses} ${stateClasses[state]} ${sizeClasses[size]} ${paddingClasses[size]} ${className}`

    // Helper Text 또는 Error Message ID 생성
    const helperId = id ? `${id}-helper` : undefined
    const hasHelperText = state === 'error' ? errorMessage : helperText

    // Clear 버튼 아이콘
    const ClearIcon = () => (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    )

    return (
      <div className="w-full">
        <div className="relative">
          {/* Prefix Adornment */}
          {prefix && (
            <div
              className={`absolute left-0 top-0 flex items-center justify-center text-neutral-500 ${
                size === 'sm' ? 'pl-3' : size === 'md' ? 'pl-4' : 'pl-6'
              } ${sizeClasses[size]}`}
            >
              {prefix}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={id}
            className={inputClasses}
            disabled={disabled}
            readOnly={readOnly}
            value={currentValue}
            onChange={handleChange}
            aria-invalid={state === 'error' ? true : undefined}
            aria-describedby={hasHelperText ? helperId : undefined}
            {...props}
          />

          {/* Suffix Adornment 또는 Clear 버튼 */}
          {(suffix || (clearable && hasValue && !disabled && !readOnly)) && (
            <div
              className={`absolute right-0 top-0 flex items-center justify-center ${
                size === 'sm' ? 'pr-3' : size === 'md' ? 'pr-4' : 'pr-6'
              } ${sizeClasses[size]}`}
            >
              {clearable && hasValue && !disabled && !readOnly ? (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-neutral-400 hover:text-neutral-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
                  aria-label="입력 내용 지우기"
                >
                  <ClearIcon />
                </button>
              ) : (
                suffix && <span className="text-neutral-500">{suffix}</span>
              )}
            </div>
          )}
        </div>

        {/* Helper Text 또는 Error Message */}
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

