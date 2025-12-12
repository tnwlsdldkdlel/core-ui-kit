import { forwardRef, memo, type ReactNode } from 'react'
import { type BadgeVariant, type Size } from '../../types'

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Badge 스타일 변형
   * @default 'subtle'
   */
  variant?: BadgeVariant
  /**
   * Badge 크기 (lg는 지원하지 않음)
   * @default 'sm'
   */
  size?: Exclude<Size, 'lg'>
  /**
   * Badge 내용
   */
  children: ReactNode
  /**
   * 아이콘 (선택 사항)
   */
  icon?: ReactNode
}

/**
 * Badge 컴포넌트
 *
 * 상태나 카테고리를 표시하는 작은 뱃지 컴포넌트입니다.
 */
const BadgeComponent = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'subtle',
      size = 'sm',
      children,
      icon,
      className = '',
      ...props
    },
    ref
  ) => {
    // Variant 스타일 클래스
    const variantClasses = {
      solid:
        'bg-blue-600 text-white border-transparent',
      subtle:
        'bg-blue-100 text-blue-700 border-transparent',
      outline:
        'bg-transparent text-blue-700 border-blue-600 border',
    }

    // Size 스타일 클래스
    const sizeClasses = {
      sm: 'h-5 px-2 text-xs',
      md: 'h-6 px-2.5 text-sm',
    }

    // 공통 스타일 클래스
    const baseClasses =
      'inline-flex items-center gap-1 font-medium rounded-full border transition-colors'

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

    return (
      <span ref={ref} className={classes} {...props}>
        {icon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
        {children}
      </span>
    )
  }
)

BadgeComponent.displayName = 'Badge'

// 성능 최적화: props가 변경되지 않으면 리렌더링 방지
export const Badge = memo(BadgeComponent)

