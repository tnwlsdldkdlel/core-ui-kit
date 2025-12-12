import {
  forwardRef,
  useEffect,
  useRef,
  type ReactNode,
  type KeyboardEvent,
} from 'react'
import { createPortal } from 'react-dom'
import { zIndex } from '../../tokens'
import { getPortalContainer, isStorybookEnvironment } from '../../utils/portal'

export interface ModalProps {
  /**
   * Modal 열림/닫힘 상태
   */
  open: boolean
  /**
   * Modal 닫기 핸들러
   */
  onClose: () => void
  /**
   * Modal 제목
   */
  title?: string
  /**
   * Modal 내용
   */
  children: ReactNode
  /**
   * 오버레이 클릭 시 닫기 여부
   * @default false
   */
  closeOnOverlayClick?: boolean
  /**
   * ESC 키로 닫기 여부
   * @default true
   */
  closeOnEscape?: boolean
  /**
   * 닫기 버튼 표시 여부
   * @default true
   */
  showCloseButton?: boolean
  /**
   * Modal 크기
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /**
   * 트리거 요소 (포커스 복귀용)
   */
  triggerRef?: React.RefObject<HTMLElement | null>
}

/**
 * Modal 컴포넌트
 *
 * 다이얼로그 모달 컴포넌트입니다. Portal을 사용하여 렌더링되며,
 * Focus Trap과 접근성 기능을 제공합니다.
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onClose,
      title,
      children,
      closeOnOverlayClick = false,
      closeOnEscape = true,
      showCloseButton = true,
      size = 'md',
      triggerRef,
      ...props
    }
  ) => {
    const modalRef = useRef<HTMLDivElement>(null)
    const previousActiveElement = useRef<HTMLElement | null>(null)
    const firstFocusableRef = useRef<HTMLElement | null>(null)
    const lastFocusableRef = useRef<HTMLElement | null>(null)

    // Body 스크롤 방지
    useEffect(() => {
      if (open) {
        // 현재 스크롤 위치 저장
        const scrollY = window.scrollY
        document.body.style.position = 'fixed'
        document.body.style.top = `-${scrollY}px`
        document.body.style.width = '100%'

        return () => {
          document.body.style.position = ''
          document.body.style.top = ''
          document.body.style.width = ''
          window.scrollTo(0, scrollY)
        }
      }
    }, [open])

    // 포커스 가능한 요소 찾기
    const getFocusableElements = (): HTMLElement[] => {
      if (!modalRef.current) return []

      const selector = [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(', ')

      return Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(selector)
      ).filter((el) => {
        const style = window.getComputedStyle(el)
        return style.display !== 'none' && style.visibility !== 'hidden'
      })
    }

    // 첫 번째 포커스 가능 요소로 포커스 이동
    useEffect(() => {
      if (open && modalRef.current) {
        // 현재 활성 요소 저장 (포커스 복귀용)
        previousActiveElement.current = document.activeElement as HTMLElement

        // 포커스 가능한 요소 찾기
        const focusableElements = getFocusableElements()
        if (focusableElements.length > 0) {
          firstFocusableRef.current = focusableElements[0]
          lastFocusableRef.current = focusableElements[focusableElements.length - 1]
          // 첫 번째 요소로 포커스 이동
          setTimeout(() => {
            firstFocusableRef.current?.focus()
          }, 0)
        }
      }
    }, [open])

    // ESC 키 처리
    useEffect(() => {
      if (!open || !closeOnEscape) return

      const handleEscape = (e: globalThis.KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }

      document.addEventListener('keydown', handleEscape)
      return () => {
        document.removeEventListener('keydown', handleEscape)
      }
    }, [open, closeOnEscape, onClose])

    // Focus Trap: Tab 키로 모달 내부 순환
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== 'Tab') return

      const focusableElements = getFocusableElements()
      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey) {
        // Shift + Tab: 역방향
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        // Tab: 정방향
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    // 포커스 복귀
    useEffect(() => {
      if (!open) {
        // 트리거 요소가 있으면 그곳으로, 없으면 이전 활성 요소로
        const elementToFocus =
          triggerRef?.current || previousActiveElement.current
        if (elementToFocus) {
          setTimeout(() => {
            elementToFocus.focus()
          }, 0)
        }
      }
    }, [open, triggerRef])

    // 오버레이 클릭 처리
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        onClose()
      }
    }

    if (!open) return null

    // Size 클래스
    const sizeClasses = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      full: 'max-w-full mx-4',
    }

    const titleId = title ? `modal-title-${Math.random().toString(36).substr(2, 9)}` : undefined

    // Storybook 환경에 맞는 z-index 선택
    const overlayZIndex = isStorybookEnvironment()
      ? zIndex.storybookModalBackdrop
      : zIndex.modalBackdrop
    const modalZIndex = isStorybookEnvironment()
      ? zIndex.storybookModal
      : zIndex.modal

    const modalContent = (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black/50"
        onClick={handleOverlayClick}
        role="presentation"
        style={{
          // Storybook 환경에서도 안정적으로 작동하도록 인라인 스타일 보강
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: overlayZIndex,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Modal */}
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()}
          className={`relative bg-white rounded-lg shadow-xl ${sizeClasses[size]} w-full max-w-[calc(100vw-2rem)] max-h-[90vh] overflow-hidden flex flex-col m-4`}
          style={{
            zIndex: modalZIndex,
          }}
          {...props}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-6 border-b border-neutral-200">
              {title && (
                <h2 id={titleId} className="text-xl font-semibold text-neutral-900">
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className="ml-auto text-neutral-400 hover:text-neutral-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
                  aria-label="모달 닫기"
                >
                  <svg
                    className="w-6 h-6"
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
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">{children}</div>
        </div>
      </div>
    )

    // Storybook 환경과 일반 환경에 맞는 Portal 대상 선택
    const portalContainer = getPortalContainer()
    return createPortal(modalContent, portalContainer)
  }
)

Modal.displayName = 'Modal'

