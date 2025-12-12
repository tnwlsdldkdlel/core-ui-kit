import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

// 아이콘 예제
const CheckIcon = () => (
  <svg
    className="w-3 h-3"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
)

const XIcon = () => (
  <svg
    className="w-3 h-3"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
)

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '상태나 카테고리를 표시하는 작은 뱃지 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'subtle', 'outline'],
      description: 'Badge 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Badge 크기',
    },
    children: {
      control: 'text',
      description: 'Badge 내용',
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

/**
 * 기본 Badge
 */
export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'subtle',
    size: 'sm',
  },
}

/**
 * 모든 Variant
 */
export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Badge variant="solid">Solid</Badge>
      <Badge variant="subtle">Subtle</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
}

/**
 * 모든 Size
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
    </div>
  ),
}

/**
 * 아이콘과 함께 사용
 */
export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Badge icon={<CheckIcon />}>Success</Badge>
        <Badge variant="solid" icon={<CheckIcon />}>
          Success
        </Badge>
        <Badge variant="outline" icon={<XIcon />}>
          Error
        </Badge>
      </div>
    </div>
  ),
}

/**
 * 모든 Variant와 Size 조합
 */
export const AllCombinations: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(['solid', 'subtle', 'outline'] as const).map((variant) => (
        <div key={variant} className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold capitalize">{variant}</h3>
          <div className="flex items-center gap-4">
            {(['sm', 'md'] as const).map((size) => (
              <Badge key={size} variant={variant} size={size}>
                {size.toUpperCase()}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

/**
 * 실제 사용 예제
 */
export const Examples: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span>상태:</span>
        <Badge variant="solid" icon={<CheckIcon />}>
          활성
        </Badge>
        <Badge variant="subtle">대기</Badge>
        <Badge variant="outline">비활성</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>카테고리:</span>
        <Badge size="sm">React</Badge>
        <Badge size="sm">TypeScript</Badge>
        <Badge size="sm">Storybook</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>알림:</span>
        <Badge variant="solid" size="md">
          3
        </Badge>
        <Badge variant="subtle" size="md">
          New
        </Badge>
      </div>
    </div>
  ),
}

