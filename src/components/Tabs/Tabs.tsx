import {
  createContext,
  useContext,
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type KeyboardEvent,
  type HTMLAttributes,
} from 'react'

// Tabs Context
interface TabsContextValue {
  value?: string
  onValueChange?: (value: string) => void
  setActiveTabId: (id: string) => void
  setActiveIndex: (index: number) => void
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined)

const useTabsContext = () => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs components must be used within TabsRoot')
  }
  return context
}

// TabsRoot Props
export interface TabsRootProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 활성화된 탭 값 (Controlled)
   */
  value?: string
  /**
   * 탭 값 변경 핸들러 (Controlled)
   */
  onValueChange?: (value: string) => void
  /**
   * 기본 활성화 탭 값 (Uncontrolled)
   */
  defaultValue?: string
  /**
   * Tabs 내용
   */
  children: ReactNode
}

/**
 * TabsRoot 컴포넌트
 *
 * Tabs 컴포넌트의 루트 컨테이너입니다.
 * Controlled/Uncontrolled 상태를 지원합니다.
 */
export const TabsRoot = forwardRef<HTMLDivElement, TabsRootProps>(
  ({ value: controlledValue, onValueChange, defaultValue, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue)
    const [, setActiveTabId] = useState<string>('')
    const [, setActiveIndex] = useState<number>(0)

    // Controlled/Uncontrolled 상태 관리
    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : internalValue

    const handleValueChange = (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }

    const contextValue: TabsContextValue = {
      value,
      onValueChange: handleValueChange,
      setActiveTabId,
      setActiveIndex,
    }

    return (
      <TabsContext.Provider value={contextValue}>
        <div ref={ref} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    )
  }
)

TabsRoot.displayName = 'TabsRoot'

// TabsList Props
export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * TabsList 내용
   */
  children: ReactNode
}

/**
 * TabsList 컴포넌트
 *
 * 탭 트리거들을 감싸는 컨테이너입니다.
 */
export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="tablist"
        className={`inline-flex items-center gap-1 bg-neutral-100 p-1 rounded-lg ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

TabsList.displayName = 'TabsList'

// TabsTrigger Props
export interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * 탭 값 (고유 식별자)
   */
  value: string
  /**
   * 탭 라벨
   */
  children: ReactNode
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean
}

/**
 * TabsTrigger 컴포넌트
 *
 * 개별 탭 트리거 버튼입니다.
 */
export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, children, disabled = false, className = '', ...props }, ref) => {
    const {
      value: activeValue,
      onValueChange,
      setActiveTabId,
      setActiveIndex,
    } = useTabsContext()

    const triggerRef = useRef<HTMLButtonElement>(null)
    const isActive = activeValue === value
    const triggerId = `tab-trigger-${value}`
    const panelId = `tab-panel-${value}`

    // 포커스 가능한 탭 인덱스 찾기
    useEffect(() => {
      if (isActive && triggerRef.current) {
        const tabsList = triggerRef.current.closest('[role="tablist"]')
        if (tabsList) {
          const triggers = Array.from(
            tabsList.querySelectorAll<HTMLElement>('[role="tab"]:not([disabled])')
          )
          const index = triggers.indexOf(triggerRef.current)
          if (index !== -1) {
            setActiveIndex(index)
            setActiveTabId(triggerId)
          }
        }
      }
    }, [isActive, triggerId, setActiveIndex, setActiveTabId])

    // 클릭 핸들러
    const handleClick = () => {
      if (!disabled) {
        onValueChange?.(value)
      }
    }

    // 키보드 핸들러
    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return

      const tabsList = triggerRef.current?.closest('[role="tablist"]')
      if (!tabsList) return

      const triggers = Array.from(
        tabsList.querySelectorAll<HTMLElement>('[role="tab"]:not([disabled])')
      )
      const currentIndex = triggers.indexOf(triggerRef.current!)

      switch (e.key) {
        case 'ArrowLeft': {
          e.preventDefault()
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : triggers.length - 1
          triggers[prevIndex]?.focus()
          break
        }
        case 'ArrowRight': {
          e.preventDefault()
          const nextIndex = currentIndex < triggers.length - 1 ? currentIndex + 1 : 0
          triggers[nextIndex]?.focus()
          break
        }
        case 'Home': {
          e.preventDefault()
          triggers[0]?.focus()
          break
        }
        case 'End': {
          e.preventDefault()
          triggers[triggers.length - 1]?.focus()
          break
        }
        case 'Enter':
        case ' ': {
          e.preventDefault()
          onValueChange?.(value)
          break
        }
      }
    }

    return (
      <button
        ref={(node) => {
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
          triggerRef.current = node
        }}
        type="button"
        role="tab"
        id={triggerId}
        aria-controls={panelId}
        aria-selected={isActive}
        aria-disabled={disabled}
        disabled={disabled}
        tabIndex={isActive ? 0 : -1}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={`
          px-4 py-2 text-sm font-medium rounded-md transition-colors
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${
            isActive
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
          }
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    )
  }
)

TabsTrigger.displayName = 'TabsTrigger'

// TabsContent Props
export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 탭 값 (고유 식별자)
   */
  value: string
  /**
   * 탭 콘텐츠
   */
  children: ReactNode
}

/**
 * TabsContent 컴포넌트
 *
 * 개별 탭의 콘텐츠 패널입니다.
 */
export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, children, className = '', ...props }, ref) => {
    const { value: activeValue } = useTabsContext()
    const isActive = activeValue === value
    const triggerId = `tab-trigger-${value}`
    const panelId = `tab-panel-${value}`

    if (!isActive) return null

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={panelId}
        aria-labelledby={triggerId}
        className={`mt-4 ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

TabsContent.displayName = 'TabsContent'

