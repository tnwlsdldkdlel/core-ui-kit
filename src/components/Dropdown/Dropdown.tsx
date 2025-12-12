import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type KeyboardEvent,
} from 'react'
import { createPortal } from 'react-dom'
import { zIndex } from '../../tokens'
import { getPortalContainer, isStorybookEnvironment } from '../../utils/portal'

export interface DropdownOption {
  /**
   * 옵션 값
   */
  value: string
  /**
   * 옵션 라벨
   */
  label: string
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean
}

export interface DropdownProps {
  /**
   * Dropdown 열림/닫힘 상태 (Controlled)
   */
  open?: boolean
  /**
   * Dropdown 열림/닫힘 상태 변경 핸들러 (Controlled)
   */
  onOpenChange?: (open: boolean) => void
  /**
   * 선택된 값
   */
  value?: string
  /**
   * 값 변경 핸들러
   */
  onValueChange?: (value: string) => void
  /**
   * 옵션 목록
   */
  options: DropdownOption[]
  /**
   * 트리거 버튼 텍스트 또는 커스텀 트리거
   */
  trigger?: ReactNode
  /**
   * 트리거 버튼 텍스트 (trigger가 없을 때 사용)
   */
  placeholder?: string
  /**
   * 트리거 버튼 크기
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean
  /**
   * 트리거 요소 참조
   */
  triggerRef?: React.RefObject<HTMLElement | null>
}

/**
 * Dropdown 컴포넌트
 *
 * 선택 가능한 옵션 목록을 표시하는 드롭다운 컴포넌트입니다.
 * Portal을 사용하여 렌더링되며, 키보드 내비게이션과 접근성 기능을 제공합니다.
 */
export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      open: controlledOpen,
      onOpenChange,
      value,
      onValueChange,
      options,
      trigger,
      placeholder = '선택하세요',
      size = 'md',
      disabled = false,
      triggerRef: externalTriggerRef,
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<HTMLButtonElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const activeIndexRef = useRef<number>(-1)
    const previousActiveElement = useRef<HTMLElement | null>(null)

    // Controlled/Uncontrolled 상태 관리
    const isControlled = controlledOpen !== undefined
    const open = isControlled ? controlledOpen : internalOpen
    const setOpen = (newOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(newOpen)
      }
      onOpenChange?.(newOpen)
    }

    // 선택된 옵션 찾기
    const selectedOption = options.find((opt) => opt.value === value)
    const displayText = selectedOption?.label || placeholder

    // 활성화된 옵션 인덱스 찾기 (선택된 값 또는 첫 번째 활성화된 옵션)
    const getInitialActiveIndex = (): number => {
      if (value) {
        const index = options.findIndex((opt) => opt.value === value && !opt.disabled)
        if (index !== -1) return index
      }
      return options.findIndex((opt) => !opt.disabled)
    }

    // 포커스 가능한 옵션 인덱스 목록
    const getFocusableIndices = (): number[] => {
      return options
        .map((opt, index) => (!opt.disabled ? index : -1))
        .filter((index) => index !== -1)
    }

    // 특정 인덱스의 옵션 요소로 포커스 이동
    const focusOption = (index: number) => {
      if (!contentRef.current) return

      const focusableIndices = getFocusableIndices()
      if (focusableIndices.length === 0) return

      // 인덱스 범위 조정
      let targetIndex = index
      if (targetIndex < 0) targetIndex = focusableIndices.length - 1
      if (targetIndex >= focusableIndices.length) targetIndex = 0

      const actualIndex = focusableIndices[targetIndex]
      activeIndexRef.current = targetIndex

      const optionElement = contentRef.current.querySelector(
        `[data-option-index="${actualIndex}"]`
      ) as HTMLElement

      if (optionElement) {
        optionElement.focus()
        // jsdom 환경에서는 scrollIntoView가 지원되지 않을 수 있음
        if (typeof optionElement.scrollIntoView === 'function') {
          optionElement.scrollIntoView({ 
            block: 'nearest',
            behavior: 'smooth',
            inline: 'nearest'
          })
        } else if (contentRef.current) {
          // scrollIntoView가 없는 경우 수동으로 스크롤 계산
          const container = contentRef.current
          const optionTop = optionElement.offsetTop
          const optionHeight = optionElement.offsetHeight
          const containerTop = container.scrollTop
          const containerHeight = container.clientHeight

          // 옵션이 보이지 않는 경우 스크롤 조정
          if (optionTop < containerTop) {
            container.scrollTop = optionTop
          } else if (optionTop + optionHeight > containerTop + containerHeight) {
            container.scrollTop = optionTop + optionHeight - containerHeight
          }
        }
      }
    }

    // 외부 클릭 감지
    useEffect(() => {
      if (!open) return

      const handleClickOutside = (e: globalThis.MouseEvent) => {
        const target = e.target as Node
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(target) &&
          triggerRef.current &&
          !triggerRef.current.contains(target)
        ) {
          setOpen(false)
        }
      }

      // 다음 프레임에서 이벤트 리스너 추가 (현재 클릭 이벤트가 처리된 후)
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside)
      }, 0)

      return () => {
        clearTimeout(timeoutId)
        document.removeEventListener('mousedown', handleClickOutside)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    // ESC 키 처리
    useEffect(() => {
      if (!open) return

      const handleEscape = (e: globalThis.KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault()
          setOpen(false)
          // 트리거로 포커스 복귀
          const elementToFocus = externalTriggerRef?.current || triggerRef.current
          if (elementToFocus) {
            setTimeout(() => {
              elementToFocus.focus()
            }, 0)
          }
        }
      }

      document.addEventListener('keydown', handleEscape)
      return () => {
        document.removeEventListener('keydown', handleEscape)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, externalTriggerRef])

    // Dropdown 열릴 때 포커스 관리
    useEffect(() => {
      if (open && contentRef.current) {
        // 현재 활성 요소 저장
        previousActiveElement.current = document.activeElement as HTMLElement

        // 초기 활성 인덱스 설정
        const initialIndex = getInitialActiveIndex()
        if (initialIndex !== -1) {
          activeIndexRef.current = getFocusableIndices().indexOf(initialIndex)
          if (activeIndexRef.current === -1) {
            activeIndexRef.current = 0
          }
        } else {
          activeIndexRef.current = 0
        }

        // 첫 번째 포커스 가능한 옵션으로 포커스 이동
        setTimeout(() => {
          focusOption(activeIndexRef.current)
        }, 0)
      } else {
        activeIndexRef.current = -1
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    // 트리거 클릭 핸들러
    const handleTriggerClick = () => {
      if (disabled) return
      setOpen(!open)
    }

    // 트리거 키보드 핸들러
    const handleTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setOpen(!open)
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        if (!open) {
          setOpen(true)
        }
      }
    }

    // 옵션 클릭 핸들러
    const handleOptionClick = (option: DropdownOption) => {
      if (option.disabled) return

      onValueChange?.(option.value)
      setOpen(false)

      // 트리거로 포커스 복귀
      const elementToFocus = externalTriggerRef?.current || triggerRef.current
      if (elementToFocus) {
        setTimeout(() => {
          elementToFocus.focus()
        }, 0)
      }
    }

    // 콘텐츠 키보드 핸들러
    const handleContentKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      const focusableIndices = getFocusableIndices()
      if (focusableIndices.length === 0) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          focusOption(activeIndexRef.current + 1)
          break
        case 'ArrowUp':
          e.preventDefault()
          focusOption(activeIndexRef.current - 1)
          break
        case 'Home':
          e.preventDefault()
          focusOption(0)
          break
        case 'End':
          e.preventDefault()
          focusOption(focusableIndices.length - 1)
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          if (activeIndexRef.current >= 0 && activeIndexRef.current < focusableIndices.length) {
            const actualIndex = focusableIndices[activeIndexRef.current]
            const option = options[actualIndex]
            if (!option.disabled) {
              handleOptionClick(option)
            }
          }
          break
        case 'Escape': {
          e.preventDefault()
          setOpen(false)
          const elementToFocus = externalTriggerRef?.current || triggerRef.current
          if (elementToFocus) {
            setTimeout(() => {
              elementToFocus.focus()
            }, 0)
          }
          break
        }
      }
    }

    // 트리거 위치 계산 (Portal 위치 조정용)
    const [triggerPosition, setTriggerPosition] = useState<{
      top: number
      left: number
      width: number
    } | null>(null)

    useEffect(() => {
      if (open && triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect()
        setTriggerPosition({
          top: rect.bottom + window.scrollY + 4, // 4px 간격
          left: rect.left + window.scrollX,
          width: rect.width,
        })
      } else {
        setTriggerPosition(null)
      }
    }, [open])

    // Storybook 환경에 맞는 z-index 선택
    const dropdownZIndex = isStorybookEnvironment()
      ? zIndex.storybookModalBackdrop
      : zIndex.dropdown

    const triggerId = `dropdown-trigger-${Math.random().toString(36).substr(2, 9)}`
    const contentId = `dropdown-content-${Math.random().toString(36).substr(2, 9)}`

    const dropdownContent = open && triggerPosition ? (
      <div
        ref={contentRef}
        className="dropdown-scrollbar absolute bg-white border border-neutral-200 rounded-lg shadow-lg py-1 min-w-[200px] max-h-[300px] overflow-y-auto overflow-x-hidden"
        role="listbox"
        id={contentId}
        aria-labelledby={triggerId}
        style={{
          top: `${triggerPosition.top}px`,
          left: `${triggerPosition.left}px`,
          width: `${triggerPosition.width}px`,
          zIndex: dropdownZIndex,
          // 스크롤바 스타일 (Firefox)
          scrollbarWidth: 'thin' as const,
          scrollbarColor: '#cbd5e1 #f1f5f9',
        }}
        onKeyDown={handleContentKeyDown}
      >
        {options.map((option, index) => {
          const isSelected = option.value === value
          const isDisabled = option.disabled || false
          const focusableIndices = getFocusableIndices()
          const focusableIndex = focusableIndices.indexOf(index)
          const isActive = focusableIndex === activeIndexRef.current

          return (
            <div
              key={option.value}
              role="option"
              aria-selected={isSelected}
              aria-disabled={isDisabled}
              data-option-index={index}
              tabIndex={isActive ? 0 : -1}
              className={`
                px-4 py-2 text-sm cursor-pointer transition-colors
                ${isSelected ? 'bg-blue-50 text-blue-600 font-medium' : 'text-neutral-900'}
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-neutral-100'}
                ${isActive ? 'bg-neutral-100' : ''}
              `}
              onClick={() => handleOptionClick(option)}
              onMouseEnter={() => {
                if (!isDisabled && focusableIndex !== -1) {
                  activeIndexRef.current = focusableIndex
                  const optionElement = contentRef.current?.querySelector(
                    `[data-option-index="${index}"]`
                  ) as HTMLElement
                  if (optionElement) {
                    optionElement.focus()
                  }
                }
              }}
            >
              {option.label}
            </div>
          )
        })}
      </div>
    ) : null

    return (
      <div ref={dropdownRef} className="relative inline-block" {...props}>
        <button
          ref={triggerRef}
          id={triggerId}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? contentId : undefined}
          aria-disabled={disabled}
          disabled={disabled}
          onClick={handleTriggerClick}
          onKeyDown={handleTriggerKeyDown}
          className={`
            inline-flex items-center justify-between gap-2
            px-4 py-2 text-sm font-medium
            bg-white border border-neutral-300 rounded-md
            hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors
            ${size === 'sm' ? 'h-8 px-3 text-xs' : ''}
            ${size === 'md' ? 'h-10 px-4 text-sm' : ''}
            ${size === 'lg' ? 'h-12 px-6 text-base' : ''}
          `}
        >
          <span>{trigger || displayText}</span>
          <svg
            className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {dropdownContent &&
          createPortal(
            <div
              ref={ref}
              className="fixed inset-0"
              style={{ zIndex: dropdownZIndex - 1, pointerEvents: 'none' }}
            >
              <div style={{ pointerEvents: 'auto' }}>{dropdownContent}</div>
            </div>,
            getPortalContainer()
          )}
      </div>
    )
  }
)

Dropdown.displayName = 'Dropdown'

