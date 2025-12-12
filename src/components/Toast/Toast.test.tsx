import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ToastProvider } from './ToastProvider'
import { useToast } from './useToast'

// Portal을 테스트하기 위해 document.body를 확인
const getToastFromBody = () => {
  return document.body.querySelector('[role="status"]')
}

// Toast를 표시하는 테스트 컴포넌트
function ToastTestComponent() {
  const { toast } = useToast()

  return (
    <div>
      <button onClick={() => toast({ title: 'Test Toast', description: 'Test description' })}>
        Show Toast
      </button>
    </div>
  )
}

describe('Toast', () => {
  beforeEach(() => {
    // Portal cleanup을 위해 기존 Toast 제거
    const existingToasts = document.body.querySelectorAll('[role="status"]')
    existingToasts.forEach((toast) => toast.remove())
  })

  afterEach(() => {
    // Portal cleanup
    const existingToasts = document.body.querySelectorAll('[role="status"]')
    existingToasts.forEach((toast) => toast.remove())
  })

  describe('렌더링', () => {
    it('ToastProvider가 정상적으로 렌더링된다', () => {
      render(
        <ToastProvider>
          <div>Test</div>
        </ToastProvider>
      )
      expect(screen.getByText('Test')).toBeInTheDocument()
    })

    it('toast 함수로 Toast를 표시할 수 있다', async () => {
      const user = userEvent.setup()
      render(
        <ToastProvider>
          <ToastTestComponent />
        </ToastProvider>
      )

      const showButton = screen.getByText('Show Toast')
      await user.click(showButton)

      await waitFor(
        () => {
          const toast = getToastFromBody()
          expect(toast).toBeInTheDocument()
          expect(toast?.textContent).toContain('Test Toast')
          expect(toast?.textContent).toContain('Test description')
        },
        { timeout: 3000 }
      )
    })
  })

  describe('자동 닫힘', () => {
    it('duration이 설정되면 자동으로 닫힌다', async () => {
      vi.useFakeTimers()
      const user = userEvent.setup({ delay: null, advanceTimers: vi.advanceTimersByTime })
      const TestComponent = () => {
        const { toast } = useToast()
        return (
          <button
            onClick={() =>
              toast({
                title: 'Auto Close',
                description: 'This will close automatically',
                duration: 1000,
              })
            }
          >
            Show Auto Close Toast
          </button>
        )
      }

      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      )

      const button = screen.getByText('Show Auto Close Toast')
      await user.click(button)

      await waitFor(
        () => {
          const toast = getToastFromBody()
          expect(toast?.textContent).toContain('Auto Close')
        },
        { timeout: 3000 }
      )

      act(() => {
        vi.advanceTimersByTime(1000)
      })

      await waitFor(
        () => {
          const toast = getToastFromBody()
          expect(toast).not.toBeInTheDocument()
        },
        { timeout: 3000 }
      )

      vi.useRealTimers()
    })
  })

  describe('수동 닫기', () => {
    it('닫기 버튼 클릭 시 Toast가 닫힌다', async () => {
      const user = userEvent.setup()
      render(
        <ToastProvider>
          <ToastTestComponent />
        </ToastProvider>
      )

      const showButton = screen.getByText('Show Toast')
      await user.click(showButton)

      await waitFor(
        () => {
          const toast = getToastFromBody()
          expect(toast?.textContent).toContain('Test Toast')
        },
        { timeout: 3000 }
      )

      const closeButton = document.body.querySelector('[aria-label="알림 닫기"]') as HTMLElement
      expect(closeButton).toBeInTheDocument()
      await user.click(closeButton)

      await waitFor(
        () => {
          const toast = getToastFromBody()
          expect(toast).not.toBeInTheDocument()
        },
        { timeout: 3000 }
      )
    })
  })

  describe('접근성', () => {
    it('role="status"를 사용한다', async () => {
      const user = userEvent.setup()
      render(
        <ToastProvider>
          <ToastTestComponent />
        </ToastProvider>
      )

      const showButton = screen.getByText('Show Toast')
      await user.click(showButton)

      await waitFor(
        () => {
          const toast = getToastFromBody()
          expect(toast).toBeInTheDocument()
        },
        { timeout: 3000 }
      )
    })

    it('기본적으로 aria-live="polite"를 사용한다', async () => {
      const user = userEvent.setup()
      render(
        <ToastProvider>
          <ToastTestComponent />
        </ToastProvider>
      )

      const showButton = screen.getByText('Show Toast')
      await user.click(showButton)

      await waitFor(
        () => {
          const toast = getToastFromBody()
          expect(toast).toBeInTheDocument()
          expect(toast).toHaveAttribute('aria-live', 'polite')
        },
        { timeout: 3000 }
      )
    })

    it('urgent가 true일 때 aria-live="assertive"를 사용한다', async () => {
      const user = userEvent.setup()
      const TestComponent = () => {
        const { toast } = useToast()
        return (
          <button
            onClick={() =>
              toast({
                title: 'Urgent Toast',
                urgent: true,
              })
            }
          >
            Show Urgent Toast
          </button>
        )
      }

      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      )

      const showButton = screen.getByText('Show Urgent Toast')
      await user.click(showButton)

      await waitFor(
        () => {
          const toast = getToastFromBody()
          expect(toast).toBeInTheDocument()
          expect(toast).toHaveAttribute('aria-live', 'assertive')
        },
        { timeout: 3000 }
      )
    })
  })
})
