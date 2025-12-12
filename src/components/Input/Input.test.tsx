import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'
import { Label } from './Label'

describe('Input', () => {
  describe('렌더링', () => {
    it('기본 Input이 렌더링된다', () => {
      render(<Input id="test-input" />)
      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
      expect(input.tagName).toBe('INPUT')
    })

    it('placeholder가 올바르게 표시된다', () => {
      render(<Input id="test-input" placeholder="입력하세요" />)
      expect(screen.getByPlaceholderText('입력하세요')).toBeInTheDocument()
    })

    it('value가 올바르게 표시된다', () => {
      render(<Input id="test-input" value="테스트 값" onChange={() => {}} />)
      const input = screen.getByRole('textbox') as HTMLInputElement
      expect(input.value).toBe('테스트 값')
    })

    it('state에 따라 올바른 클래스가 적용된다', () => {
      const { rerender } = render(<Input id="test-input" state="default" />)
      let input = screen.getByRole('textbox')
      expect(input).toHaveClass('border-neutral-300')

      rerender(<Input id="test-input" state="error" />)
      input = screen.getByRole('textbox')
      expect(input).toHaveClass('border-danger-600')

      rerender(<Input id="test-input" state="success" />)
      input = screen.getByRole('textbox')
      expect(input).toHaveClass('border-success-600')
    })

    it('size에 따라 올바른 클래스가 적용된다', () => {
      const { rerender } = render(<Input id="test-input" size="sm" />)
      let input = screen.getByRole('textbox')
      expect(input).toHaveClass('h-8')

      rerender(<Input id="test-input" size="md" />)
      input = screen.getByRole('textbox')
      expect(input).toHaveClass('h-10')

      rerender(<Input id="test-input" size="lg" />)
      input = screen.getByRole('textbox')
      expect(input).toHaveClass('h-12')
    })

    it('disabled 상태일 때 올바른 클래스가 적용된다', () => {
      render(<Input id="test-input" disabled />)
      const input = screen.getByRole('textbox')
      expect(input).toBeDisabled()
      expect(input).toHaveClass('disabled:bg-neutral-100')
    })

    it('readOnly 상태일 때 올바른 클래스가 적용된다', () => {
      render(<Input id="test-input" readOnly />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('readOnly')
      expect(input).toHaveClass('read-only:bg-neutral-50')
    })

    it('helperText가 표시된다', () => {
      render(<Input id="test-input" helperText="Helper text" />)
      expect(screen.getByText('Helper text')).toBeInTheDocument()
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-describedby', 'test-input-helper')
    })

    it('errorMessage가 표시된다', () => {
      render(
        <Input id="test-input" state="error" errorMessage="에러 메시지" />
      )
      expect(screen.getByText('에러 메시지')).toBeInTheDocument()
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-describedby', 'test-input-helper')
    })
  })

  describe('상호작용', () => {
    it('입력이 가능하다', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(<Input id="test-input" onChange={handleChange} />)
      const input = screen.getByRole('textbox')

      await user.type(input, '테스트')
      expect(handleChange).toHaveBeenCalled()
      expect(input).toHaveValue('테스트')
    })

    it('disabled 상태일 때 입력이 불가능하다', async () => {
      const user = userEvent.setup()
      render(<Input id="test-input" disabled />)
      const input = screen.getByRole('textbox')

      expect(input).toBeDisabled()
      await user.type(input, '테스트')
      expect(input).toHaveValue('')
    })

    it('readOnly 상태일 때 입력이 불가능하다', async () => {
      const user = userEvent.setup()
      render(<Input id="test-input" readOnly defaultValue="읽기 전용" />)
      const input = screen.getByRole('textbox')

      await user.type(input, '추가')
      expect(input).toHaveValue('읽기 전용')
    })

    it('포커스가 가능하다', async () => {
      const user = userEvent.setup()
      render(<Input id="test-input" />)
      const input = screen.getByRole('textbox')

      await user.tab()
      expect(input).toHaveFocus()
    })

    it('포커스 해제가 가능하다', async () => {
      const user = userEvent.setup()
      render(
        <>
          <Input id="test-input" />
          <button>다음</button>
        </>
      )
      const input = screen.getByRole('textbox')
      const button = screen.getByRole('button')

      await user.tab()
      expect(input).toHaveFocus()

      await user.tab()
      expect(button).toHaveFocus()
      expect(input).not.toHaveFocus()
    })
  })

  describe('접근성', () => {
    it('label과 id가 연결된다', () => {
      render(
        <>
          <Label htmlFor="test-input">이름</Label>
          <Input id="test-input" />
        </>
      )
      const label = screen.getByText('이름')
      const input = screen.getByRole('textbox')

      expect(label).toHaveAttribute('for', 'test-input')
      expect(input).toHaveAttribute('id', 'test-input')
    })

    it('error 상태일 때 aria-invalid가 true이다', () => {
      render(<Input id="test-input" state="error" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })

    it('default 상태일 때 aria-invalid가 없다', () => {
      render(<Input id="test-input" state="default" />)
      const input = screen.getByRole('textbox')
      expect(input).not.toHaveAttribute('aria-invalid')
    })

    it('success 상태일 때 aria-invalid가 없다', () => {
      render(<Input id="test-input" state="success" />)
      const input = screen.getByRole('textbox')
      expect(input).not.toHaveAttribute('aria-invalid')
    })

    it('helperText가 있을 때 aria-describedby가 설정된다', () => {
      render(<Input id="test-input" helperText="Helper text" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-describedby', 'test-input-helper')

      const helper = screen.getByText('Helper text')
      expect(helper).toHaveAttribute('id', 'test-input-helper')
    })

    it('errorMessage가 있을 때 aria-describedby가 설정된다', () => {
      render(
        <Input id="test-input" state="error" errorMessage="에러 메시지" />
      )
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-describedby', 'test-input-helper')

      const error = screen.getByText('에러 메시지')
      expect(error).toHaveAttribute('id', 'test-input-helper')
    })

    it('helperText나 errorMessage가 없을 때 aria-describedby가 없다', () => {
      render(<Input id="test-input" />)
      const input = screen.getByRole('textbox')
      expect(input).not.toHaveAttribute('aria-describedby')
    })
  })
})

describe('Label', () => {
  describe('렌더링', () => {
    it('기본 Label이 렌더링된다', () => {
      render(<Label htmlFor="test-input">이름</Label>)
      expect(screen.getByText('이름')).toBeInTheDocument()
      expect(screen.getByText('이름').tagName).toBe('LABEL')
    })

    it('required일 때 필수 표시가 나타난다', () => {
      render(
        <Label htmlFor="test-input" required>
          이메일
        </Label>
      )
      const label = screen.getByText('이메일')
      expect(label).toBeInTheDocument()

      const required = screen.getByText('*')
      expect(required).toBeInTheDocument()
      expect(required).toHaveAttribute('aria-label', '필수')
    })

    it('required가 false일 때 필수 표시가 없다', () => {
      render(<Label htmlFor="test-input">이름</Label>)
      expect(screen.queryByText('*')).not.toBeInTheDocument()
    })
  })
})

