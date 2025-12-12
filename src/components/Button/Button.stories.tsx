import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import { IconButton } from './IconButton'

// 아이콘 예제 (실제 프로젝트에서는 아이콘 라이브러리 사용)
const PlusIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
)

const CheckIcon = () => (
  <svg
    className="w-5 h-5"
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

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '다양한 variant, size, state를 지원하는 버튼 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'danger'],
      description: '버튼 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '버튼 크기',
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    children: {
      control: 'text',
      description: '버튼 내용',
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

/**
 * 기본 버튼
 */
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
}

/**
 * 모든 Variant
 */
export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
}

/**
 * 모든 Size
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

/**
 * 모든 State
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button>Default</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
      </div>
      <div className="flex gap-4">
        <Button variant="secondary">Default</Button>
        <Button variant="secondary" disabled>
          Disabled
        </Button>
        <Button variant="secondary" loading>
          Loading
        </Button>
      </div>
    </div>
  ),
}

/**
 * 아이콘과 함께 사용
 */
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button leadingIcon={<PlusIcon />}>Add Item</Button>
        <Button trailingIcon={<CheckIcon />}>Complete</Button>
        <Button leadingIcon={<PlusIcon />} trailingIcon={<CheckIcon />}>
          Both Icons
        </Button>
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
      {(['primary', 'secondary', 'tertiary', 'danger'] as const).map(
        (variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold capitalize">{variant}</h3>
            <div className="flex items-center gap-4">
              {(['sm', 'md', 'lg'] as const).map((size) => (
                <Button key={size} variant={variant} size={size}>
                  {size.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  ),
}

/**
 * IconButton 예제
 */
export const IconButtonExample: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <IconButton
          icon={<PlusIcon />}
          aria-label="Add item"
          variant="primary"
        />
        <IconButton
          icon={<PlusIcon />}
          aria-label="Add item"
          variant="secondary"
        />
        <IconButton
          icon={<PlusIcon />}
          aria-label="Add item"
          variant="tertiary"
        />
        <IconButton
          icon={<PlusIcon />}
          aria-label="Delete item"
          variant="danger"
        />
      </div>
      <div className="flex items-center gap-4">
        <IconButton
          icon={<PlusIcon />}
          aria-label="Add item small"
          size="sm"
        />
        <IconButton
          icon={<PlusIcon />}
          aria-label="Add item medium"
          size="md"
        />
        <IconButton icon={<PlusIcon />} aria-label="Add item large" size="lg" />
      </div>
      <div className="flex gap-4">
        <IconButton
          icon={<PlusIcon />}
          aria-label="Add item"
          disabled
        />
        <IconButton
          icon={<PlusIcon />}
          aria-label="Add item"
          loading
        />
      </div>
    </div>
  ),
}

