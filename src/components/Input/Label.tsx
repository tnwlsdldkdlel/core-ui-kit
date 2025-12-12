import { forwardRef, type ReactNode } from 'react'

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Label 텍스트
   */
  children: ReactNode
  /**
   * 필수 표시 여부
   * @default false
   */
  required?: boolean
}

/**
 * Label 컴포넌트
 *
 * Input과 연결되는 레이블 컴포넌트입니다.
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, required = false, className = '', ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={`block text-sm font-medium text-neutral-700 mb-1 ${className}`}
        {...props}
      >
        {children}
        {required && (
          <span className="text-danger-600 ml-1" aria-label="필수">
            *
          </span>
        )}
      </label>
    )
  }
)

Label.displayName = 'Label'

