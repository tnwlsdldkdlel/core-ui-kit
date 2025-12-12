import { forwardRef, useState, type ReactNode } from 'react'
import { type Variant } from '../../types'

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Alert variant
   * @default 'info'
   */
  variant?: Variant
  /**
   * 닫기 버튼 표시 여부
   * @default false
   */
  dismissible?: boolean
  /**
   * 닫기 버튼 클릭 핸들러
   */
  onDismiss?: () => void
  /**
   * 아이콘 (선택 사항)
   */
  icon?: ReactNode
  /**
   * 제목 (선택 사항)
   */
  title?: ReactNode
  /**
   * 설명 (선택 사항)
   */
  description?: ReactNode
  /**
   * 액션 버튼들 (선택 사항)
   */
  actions?: ReactNode
  /**
   * 긴급 알림 여부 (role="alert" 사용)
   * @default false
   */
  urgent?: boolean
  /**
   * Alert 내용 (title, description이 없을 때 사용)
   */
  children?: ReactNode
}

/**
 * Alert 컴포넌트
 *
 * 사용자에게 중요한 정보나 상태를 알리는 인라인 알림 컴포넌트입니다.
 * dismissible 옵션을 통해 닫을 수 있으며, 다양한 variant를 지원합니다.
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'info',
      dismissible = false,
      onDismiss,
      icon,
      title,
      description,
      actions,
      urgent = false,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const [isDismissed, setIsDismissed] = useState(false)

    const handleDismiss = () => {
      setIsDismissed(true)
      onDismiss?.()
    }

    if (isDismissed) {
      return null
    }

    // Variant 스타일 클래스
    const variantClasses = {
      info: 'bg-info-50 border-info-500 text-info-900',
      success: 'bg-success-50 border-success-500 text-success-900',
      warning: 'bg-warning-50 border-warning-500 text-warning-900',
      error: 'bg-error-50 border-error-500 text-error-900',
    }

    // 아이콘 색상 클래스
    const iconColorClasses = {
      info: 'text-info-600',
      success: 'text-success-600',
      warning: 'text-warning-600',
      error: 'text-error-600',
    }

    // 기본 아이콘 (variant별)
    const defaultIcons = {
      info: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      success: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      warning: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
      error: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    }

    // icon이 명시적으로 null이면 아이콘을 표시하지 않음
    // icon이 undefined이면 기본 아이콘 사용
    const displayIcon = icon === null ? null : icon ?? defaultIcons[variant]
    const role = urgent ? 'alert' : 'status'

    return (
      <div
        ref={ref}
        role={role}
        className={`
          flex gap-3 p-4 rounded-lg border-l-4
          ${variantClasses[variant]}
          ${className}
        `}
        {...props}
      >
        {/* 아이콘 */}
        {displayIcon && (
          <div className={`flex-shrink-0 ${iconColorClasses[variant]}`} aria-hidden="true">
            {displayIcon}
          </div>
        )}

        {/* 콘텐츠 영역 */}
        <div className="flex-1 min-w-0">
          {/* 제목 */}
          {title && (
            <div className="font-semibold mb-1" id={props.id ? `${props.id}-title` : undefined}>
              {title}
            </div>
          )}

          {/* 설명 또는 children */}
          {description && (
            <div
              className="text-sm"
              id={props.id ? `${props.id}-description` : undefined}
              aria-describedby={title && props.id ? `${props.id}-title` : undefined}
            >
              {description}
            </div>
          )}
          {!description && children && (
            <div
              className="text-sm"
              id={props.id ? `${props.id}-description` : undefined}
              aria-describedby={title && props.id ? `${props.id}-title` : undefined}
            >
              {children}
            </div>
          )}

          {/* 액션 버튼들 */}
          {actions && <div className="mt-3 flex gap-2">{actions}</div>}
        </div>

        {/* 닫기 버튼 */}
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className="flex-shrink-0 text-neutral-400 hover:text-neutral-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
            aria-label="알림 닫기"
          >
            <svg
              className="w-5 h-5"
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
          </button>
        )}
      </div>
    )
  }
)

Alert.displayName = 'Alert'

