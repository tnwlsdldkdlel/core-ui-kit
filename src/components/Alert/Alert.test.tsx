import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Alert } from './Alert'

describe('Alert', () => {
  describe('렌더링', () => {
    it('기본적으로 렌더링된다', () => {
      render(<Alert title="제목" description="설명" />)
      expect(screen.getByText('제목')).toBeInTheDocument()
      expect(screen.getByText('설명')).toBeInTheDocument()
    })

    it('모든 variant가 렌더링된다', () => {
      const { rerender } = render(<Alert variant="info" title="Info" />)
      expect(screen.getByText('Info')).toBeInTheDocument()

      rerender(<Alert variant="success" title="Success" />)
      expect(screen.getByText('Success')).toBeInTheDocument()

      rerender(<Alert variant="warning" title="Warning" />)
      expect(screen.getByText('Warning')).toBeInTheDocument()

      rerender(<Alert variant="error" title="Error" />)
      expect(screen.getByText('Error')).toBeInTheDocument()
    })

    it('제목만 렌더링할 수 있다', () => {
      render(<Alert title="제목만" />)
      expect(screen.getByText('제목만')).toBeInTheDocument()
    })

    it('설명만 렌더링할 수 있다', () => {
      render(<Alert description="설명만" />)
      expect(screen.getByText('설명만')).toBeInTheDocument()
    })

    it('children을 렌더링할 수 있다', () => {
      render(<Alert>children 내용</Alert>)
      expect(screen.getByText('children 내용')).toBeInTheDocument()
    })

    it('아이콘이 기본적으로 표시된다', () => {
      const { container } = render(<Alert variant="info" title="제목" />)
      const icon = container.querySelector('svg')
      expect(icon).toBeInTheDocument()
    })

    it('커스텀 아이콘을 사용할 수 있다', () => {
      const CustomIcon = () => <span data-testid="custom-icon">Custom</span>
      render(<Alert icon={<CustomIcon />} title="제목" />)
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    })

    it('icon을 null로 설정하면 아이콘이 표시되지 않는다', () => {
      const { container } = render(<Alert icon={null} title="제목" />)
      const icon = container.querySelector('svg[aria-hidden="true"]')
      expect(icon).not.toBeInTheDocument()
    })

    it('액션 버튼을 렌더링할 수 있다', () => {
      render(
        <Alert
          title="제목"
          actions={<button>액션 버튼</button>}
        />
      )
      expect(screen.getByText('액션 버튼')).toBeInTheDocument()
    })
  })

  describe('Dismissible', () => {
    it('dismissible이 false일 때 닫기 버튼이 표시되지 않는다', () => {
      render(<Alert title="제목" dismissible={false} />)
      expect(screen.queryByLabelText('알림 닫기')).not.toBeInTheDocument()
    })

    it('dismissible이 true일 때 닫기 버튼이 표시된다', () => {
      render(<Alert title="제목" dismissible />)
      expect(screen.getByLabelText('알림 닫기')).toBeInTheDocument()
    })

    it('닫기 버튼 클릭 시 Alert가 사라진다', async () => {
      const user = userEvent.setup()
      render(<Alert title="제목" dismissible />)

      const dismissButton = screen.getByLabelText('알림 닫기')
      await user.click(dismissButton)

      expect(screen.queryByText('제목')).not.toBeInTheDocument()
    })

    it('닫기 버튼 클릭 시 onDismiss가 호출된다', async () => {
      const user = userEvent.setup()
      const handleDismiss = vi.fn()
      render(<Alert title="제목" dismissible onDismiss={handleDismiss} />)

      const dismissButton = screen.getByLabelText('알림 닫기')
      await user.click(dismissButton)

      expect(handleDismiss).toHaveBeenCalledTimes(1)
    })
  })

  describe('접근성', () => {
    it('기본적으로 role="status"를 사용한다', () => {
      render(<Alert title="제목" />)
      const alert = screen.getByRole('status')
      expect(alert).toBeInTheDocument()
    })

    it('urgent가 true일 때 role="alert"를 사용한다', () => {
      render(<Alert title="제목" urgent />)
      const alert = screen.getByRole('alert')
      expect(alert).toBeInTheDocument()
    })

    it('아이콘에 aria-hidden="true"가 있다', () => {
      const { container } = render(<Alert title="제목" />)
      const iconContainer = container.querySelector('[aria-hidden="true"]')
      expect(iconContainer).toBeInTheDocument()
    })

    it('닫기 버튼에 aria-label이 있다', () => {
      render(<Alert title="제목" dismissible />)
      const dismissButton = screen.getByLabelText('알림 닫기')
      expect(dismissButton).toBeInTheDocument()
    })
  })

  describe('Variant 스타일', () => {
    it('info variant가 올바른 스타일을 적용한다', () => {
      const { container } = render(<Alert variant="info" title="Info" />)
      const alert = container.firstChild as HTMLElement
      expect(alert.className).toContain('bg-info-50')
      expect(alert.className).toContain('border-info-500')
    })

    it('success variant가 올바른 스타일을 적용한다', () => {
      const { container } = render(<Alert variant="success" title="Success" />)
      const alert = container.firstChild as HTMLElement
      expect(alert.className).toContain('bg-success-50')
      expect(alert.className).toContain('border-success-500')
    })

    it('warning variant가 올바른 스타일을 적용한다', () => {
      const { container } = render(<Alert variant="warning" title="Warning" />)
      const alert = container.firstChild as HTMLElement
      expect(alert.className).toContain('bg-warning-50')
      expect(alert.className).toContain('border-warning-500')
    })

    it('error variant가 올바른 스타일을 적용한다', () => {
      const { container } = render(<Alert variant="error" title="Error" />)
      const alert = container.firstChild as HTMLElement
      expect(alert.className).toContain('bg-error-50')
      expect(alert.className).toContain('border-error-500')
    })
  })

  describe('복합 사용', () => {
    it('제목, 설명, 액션을 모두 포함할 수 있다', () => {
      render(
        <Alert
          title="제목"
          description="설명"
          actions={<button>액션</button>}
        />
      )
      expect(screen.getByText('제목')).toBeInTheDocument()
      expect(screen.getByText('설명')).toBeInTheDocument()
      expect(screen.getByText('액션')).toBeInTheDocument()
    })

    it('dismissible과 urgent를 함께 사용할 수 있다', () => {
      render(<Alert title="제목" dismissible urgent />)
      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByLabelText('알림 닫기')).toBeInTheDocument()
    })
  })
})

