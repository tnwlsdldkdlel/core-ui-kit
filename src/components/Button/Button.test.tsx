import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'
import { IconButton } from './IconButton'

describe('Button', () => {
  describe('렌더링', () => {
    it('기본 버튼이 렌더링된다', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
    })

    it('모든 variant가 렌더링된다', () => {
      const { rerender } = render(<Button variant="primary">Primary</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()

      rerender(<Button variant="secondary">Secondary</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()

      rerender(<Button variant="tertiary">Tertiary</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()

      rerender(<Button variant="danger">Danger</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('모든 size가 렌더링된다', () => {
      const { rerender } = render(<Button size="sm">Small</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()

      rerender(<Button size="md">Medium</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()

      rerender(<Button size="lg">Large</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('disabled 상태가 적용된다', () => {
      render(<Button disabled>Disabled</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('loading 상태가 적용된다', () => {
      render(<Button loading>Loading</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute('aria-busy', 'true')
    })

    it('leadingIcon과 trailingIcon이 렌더링된다', () => {
      const LeadingIcon = () => <span data-testid="leading-icon">+</span>
      const TrailingIcon = () => <span data-testid="trailing-icon">✓</span>

      render(
        <Button leadingIcon={<LeadingIcon />} trailingIcon={<TrailingIcon />}>
          Button
        </Button>
      )

      expect(screen.getByTestId('leading-icon')).toBeInTheDocument()
      expect(screen.getByTestId('trailing-icon')).toBeInTheDocument()
    })
  })

  describe('상호작용', () => {
    it('클릭 이벤트가 동작한다', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()

      render(<Button onClick={handleClick}>Click me</Button>)
      await user.click(screen.getByRole('button'))

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('disabled 상태에서는 클릭이 동작하지 않는다', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()

      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      )
      await user.click(screen.getByRole('button'))

      expect(handleClick).not.toHaveBeenCalled()
    })

    it('loading 상태에서는 클릭이 동작하지 않는다', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()

      render(
        <Button loading onClick={handleClick}>
          Loading
        </Button>
      )
      await user.click(screen.getByRole('button'))

      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('키보드 상호작용', () => {
    it('Enter 키로 클릭할 수 있다', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()

      render(<Button onClick={handleClick}>Button</Button>)
      screen.getByRole('button').focus()
      await user.keyboard('{Enter}')

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('Space 키로 클릭할 수 있다', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()

      render(<Button onClick={handleClick}>Button</Button>)
      screen.getByRole('button').focus()
      await user.keyboard(' ')

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('Tab 키로 포커스를 이동할 수 있다', async () => {
      const user = userEvent.setup()

      render(
        <>
          <Button>First</Button>
          <Button>Second</Button>
        </>
      )

      const firstButton = screen.getByRole('button', { name: 'First' })
      const secondButton = screen.getByRole('button', { name: 'Second' })

      firstButton.focus()
      expect(firstButton).toHaveFocus()

      await user.tab()
      expect(secondButton).toHaveFocus()
    })
  })

  describe('접근성', () => {
    it('button role을 가진다', () => {
      render(<Button>Button</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('loading 상태일 때 aria-busy 속성을 가진다', () => {
      render(<Button loading>Loading</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
    })

    it('아이콘에 aria-hidden이 적용된다', () => {
      const Icon = () => <span>+</span>
      render(<Button leadingIcon={<Icon />}>Button</Button>)

      const icon = screen.getByText('+')
      const wrapper = icon.parentElement
      expect(wrapper).toHaveAttribute('aria-hidden', 'true')
    })
  })
})

describe('IconButton', () => {
  describe('렌더링', () => {
    it('아이콘이 렌더링된다', () => {
      const Icon = () => <span data-testid="icon">+</span>
      render(<IconButton icon={<Icon />} aria-label="Add item" />)

      expect(screen.getByTestId('icon')).toBeInTheDocument()
    })

    it('aria-label이 필수로 적용된다', () => {
      const Icon = () => <span>+</span>
      render(<IconButton icon={<Icon />} aria-label="Add item" />)

      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-label',
        'Add item'
      )
    })

    it('모든 variant가 렌더링된다', () => {
      const Icon = () => <span>+</span>
      const { rerender } = render(
        <IconButton icon={<Icon />} aria-label="Button" variant="primary" />
      )
      expect(screen.getByRole('button')).toBeInTheDocument()

      rerender(
        <IconButton icon={<Icon />} aria-label="Button" variant="secondary" />
      )
      expect(screen.getByRole('button')).toBeInTheDocument()

      rerender(
        <IconButton icon={<Icon />} aria-label="Button" variant="tertiary" />
      )
      expect(screen.getByRole('button')).toBeInTheDocument()

      rerender(
        <IconButton icon={<Icon />} aria-label="Button" variant="danger" />
      )
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('모든 size가 렌더링된다', () => {
      const Icon = () => <span>+</span>
      const { rerender } = render(
        <IconButton icon={<Icon />} aria-label="Button" size="sm" />
      )
      expect(screen.getByRole('button')).toBeInTheDocument()

      rerender(
        <IconButton icon={<Icon />} aria-label="Button" size="md" />
      )
      expect(screen.getByRole('button')).toBeInTheDocument()

      rerender(
        <IconButton icon={<Icon />} aria-label="Button" size="lg" />
      )
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('loading 상태일 때 아이콘이 숨겨진다', () => {
      const Icon = () => <span data-testid="icon">+</span>
      render(
        <IconButton icon={<Icon />} aria-label="Button" loading />
      )

      expect(screen.queryByTestId('icon')).not.toBeInTheDocument()
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
    })
  })

  describe('접근성', () => {
    it('button role을 가진다', () => {
      const Icon = () => <span>+</span>
      render(<IconButton icon={<Icon />} aria-label="Add item" />)

      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('아이콘에 aria-hidden이 적용된다', () => {
      const Icon = () => <span data-testid="icon">+</span>
      render(<IconButton icon={<Icon />} aria-label="Add item" />)

      const icon = screen.getByTestId('icon')
      const wrapper = icon.parentElement
      expect(wrapper).toHaveAttribute('aria-hidden', 'true')
    })
  })
})

