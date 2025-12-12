import { useState, useCallback, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { type Variant } from '../../types'
import { getPortalContainer, isStorybookEnvironment } from '../../utils/portal'
import { zIndex } from '../../tokens'
import { Toast } from './Toast'
import { ToastContext } from './ToastContext'

export interface ToastOptions {
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

interface ToastItem extends ToastOptions {
  id: string
}

/**
 * ToastProvider 컴포넌트
 *
 * Toast 스택을 관리하는 Provider입니다.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const toast = useCallback((options: ToastOptions): string => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const newToast: ToastItem = { ...options, id }
    setToasts((prev) => {
      const updated = [...prev, newToast]
      return updated
    })
    return id
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const dismissAll = useCallback(() => {
    setToasts([])
  }, [])

  const contextValue = {
    toasts,
    toast,
    dismiss,
    dismissAll,
  }

  // Storybook 환경에 맞는 z-index 선택
  const toastZIndex = isStorybookEnvironment()
    ? zIndex.storybookModal
    : zIndex.modal

  const portalContainer = getPortalContainer()

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {toasts.length > 0 &&
        createPortal(
          <div
            style={{
              position: 'fixed',
              top: '1rem',
              right: '1rem',
              zIndex: toastZIndex,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              pointerEvents: 'none',
            }}
          >
            {toasts.map((toastItem) => (
              <div key={toastItem.id} style={{ pointerEvents: 'auto' }}>
                <Toast
                  id={toastItem.id}
                  variant={toastItem.variant}
                  duration={toastItem.duration}
                  onClose={dismiss}
                  icon={toastItem.icon}
                  title={toastItem.title}
                  description={toastItem.description}
                  actions={toastItem.actions}
                  urgent={toastItem.urgent}
                >
                  {toastItem.children}
                </Toast>
              </div>
            ))}
          </div>,
          portalContainer
        )}
    </ToastContext.Provider>
  )
}

