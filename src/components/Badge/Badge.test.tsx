import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'

describe('Badge', () => {
  describe('렌더링', () => {
    it('기본 Badge가 렌더링된다', () => {
      render(<Badge>Badge</Badge>)
      expect(screen.getByText('Badge')).toBeInTheDocument()
    })

    it('모든 variant가 렌더링된다', () => {
      const { rerender } = render(<Badge variant="solid">Solid</Badge>)
      expect(screen.getByText('Solid')).toBeInTheDocument()

      rerender(<Badge variant="subtle">Subtle</Badge>)
      expect(screen.getByText('Subtle')).toBeInTheDocument()

      rerender(<Badge variant="outline">Outline</Badge>)
      expect(screen.getByText('Outline')).toBeInTheDocument()
    })

    it('모든 size가 렌더링된다', () => {
      const { rerender } = render(<Badge size="sm">Small</Badge>)
      expect(screen.getByText('Small')).toBeInTheDocument()

      rerender(<Badge size="md">Medium</Badge>)
      expect(screen.getByText('Medium')).toBeInTheDocument()
    })

    it('아이콘이 렌더링된다', () => {
      const Icon = () => <span data-testid="icon">✓</span>
      render(
        <Badge icon={<Icon />}>Badge</Badge>
      )

      expect(screen.getByTestId('icon')).toBeInTheDocument()
      expect(screen.getByText('Badge')).toBeInTheDocument()
    })
  })

  describe('접근성', () => {
    it('아이콘에 aria-hidden이 적용된다', () => {
      const Icon = () => <span data-testid="icon">✓</span>
      render(<Badge icon={<Icon />}>Badge</Badge>)

      const icon = screen.getByTestId('icon')
      const wrapper = icon.parentElement
      expect(wrapper).toHaveAttribute('aria-hidden', 'true')
    })

    it('텍스트 내용이 접근 가능하다', () => {
      render(<Badge>Accessible Badge</Badge>)
      expect(screen.getByText('Accessible Badge')).toBeInTheDocument()
    })
  })
})

