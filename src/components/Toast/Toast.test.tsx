import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
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


})
