import { useEffect, useRef, type ReactNode } from 'react'
import { type Variant } from '../../types'

export interface ToastProps {
  /**
   * Toast ID (고유 식별자)
   */
  id: string
  /**
   * Toast variant
   * @default 'info'
   */
  variant?: Variant
  /**
   * 자동 닫힘 시간 (ms). 0이면 자동 닫힘 안 함
   * @default 5000
   */
  duration?: number
  /**
   * 닫기 핸들러
   */
  onClose: (id: string) => void
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
   * 중요 알림 여부 (aria-live="assertive" 사용)
   * @default false
   */
  urgent?: boolean
  /**
   * Toast 내용 (title, description이 없을 때 사용)
   */
  children?: ReactNode
}

/**
 * Toast 컴포넌트
 *
 * 일시적인 알림을 표시하는 플로팅 컴포넌트입니다.
 * Portal을 사용하여 렌더링되며, duration 기반 자동 닫힘을 지원합니다.
 */
export function Toast({
  id,
  variant = 'info',
  duration = 5000,
  onClose,
  icon,
  title,
  description,
  actions,
  urgent = false,
  children,
}: ToastProps) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // 자동 닫힘 처리
  useEffect(() => {
    if (duration > 0) {
      timeoutRef.current = setTimeout(() => {
        onClose(id)
      }, duration)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [duration, id, onClose])

  // Variant 스타일 클래스
  const variantClasses = {
    info: 'bg-white border-info-500 text-neutral-900 shadow-lg',
    success: 'bg-white border-success-500 text-neutral-900 shadow-lg',
    warning: 'bg-white border-warning-500 text-neutral-900 shadow-lg',
    error: 'bg-white border-error-500 text-neutral-900 shadow-lg',
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

  const displayIcon = icon === null ? null : icon ?? defaultIcons[variant]
  const ariaLive = urgent ? 'assertive' : 'polite'

  const handleClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    onClose(id)
  }

  const toastContent = (
    <div
      role="status"
      aria-live={ariaLive}
      aria-atomic="true"
      className={`
        flex gap-3 p-4 rounded-lg border-l-4 min-w-[300px] max-w-md
        ${variantClasses[variant]}
        shadow-lg
      `}
      style={{
        animation: 'slideInRight 0.3s ease-out',
      }}
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
        {title && <div className="font-semibold mb-1">{title}</div>}

        {/* 설명 또는 children */}
        {description && <div className="text-sm text-neutral-600">{description}</div>}
        {!description && children && <div className="text-sm text-neutral-600">{children}</div>}

        {/* 액션 버튼들 */}
        {actions && <div className="mt-3 flex gap-2">{actions}</div>}
      </div>

      {/* 닫기 버튼 */}
      <button
        type="button"
        onClick={handleClose}
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
    </div>
  )

  // Toast 컴포넌트는 Portal을 사용하지 않음 (ToastProvider에서 Portal 사용)
  return toastContent
}

