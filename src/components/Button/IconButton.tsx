import { forwardRef, type ReactNode } from 'react'
import { type Size } from '../../types'
import { Button } from './Button'

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * 아이콘
   */
  icon: ReactNode
  /**
   * 접근성을 위한 레이블 (필수)
   */
  'aria-label': string
  /**
   * 버튼 크기
   * @default 'md'
   */
  size?: Size
  /**
   * 버튼 스타일 변형
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger'
  /**
   * 로딩 상태
   * @default false
   */
  loading?: boolean
}

/**
 * IconButton 컴포넌트
 *
 * 아이콘만 표시하는 버튼 컴포넌트입니다.
 * 접근성을 위해 aria-label이 필수입니다.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = 'md', variant = 'primary', loading = false, ...props }, ref) => {
    // IconButton 크기 클래스 (정사각형)
    const sizeClasses = {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
    }

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        loading={loading}
        className={`${sizeClasses[size]} p-0`}
        {...props}
      >
        {!loading && <span aria-hidden="true">{icon}</span>}
      </Button>
    )
  }
)

IconButton.displayName = 'IconButton'

