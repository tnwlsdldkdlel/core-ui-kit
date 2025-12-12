import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'
import { Label } from './Label'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '폼 입력을 위한 텍스트 입력 컴포넌트입니다. 다양한 상태와 크기를 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: 'Input 상태',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input 크기',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    readOnly: {
      control: 'boolean',
      description: '읽기 전용 상태',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
    errorMessage: {
      control: 'text',
      description: '에러 메시지 (state가 error일 때 표시)',
    },
    helperText: {
      control: 'text',
      description: 'Helper 텍스트 (state가 default일 때 표시)',
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

/**
 * 기본 Input
 */
export const Default: Story = {
  args: {
    placeholder: '입력하세요',
    id: 'input-default',
  },
  render: (args) => (
    <div className="w-80">
      <Label htmlFor="input-default">이름</Label>
      <Input {...args} />
    </div>
  ),
}

/**
 * 모든 Size
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <Label htmlFor="input-sm">Small</Label>
        <Input id="input-sm" size="sm" placeholder="Small input" />
      </div>
      <div>
        <Label htmlFor="input-md">Medium (기본)</Label>
        <Input id="input-md" size="md" placeholder="Medium input" />
      </div>
      <div>
        <Label htmlFor="input-lg">Large</Label>
        <Input id="input-lg" size="lg" placeholder="Large input" />
      </div>
    </div>
  ),
}

/**
 * 모든 State
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <Label htmlFor="input-default-state">Default</Label>
        <Input
          id="input-default-state"
          placeholder="Default state"
          helperText="Helper text"
        />
      </div>
      <div>
        <Label htmlFor="input-error-state">Error</Label>
        <Input
          id="input-error-state"
          state="error"
          placeholder="Error state"
          errorMessage="에러 메시지가 표시됩니다"
        />
      </div>
      <div>
        <Label htmlFor="input-success-state">Success</Label>
        <Input
          id="input-success-state"
          state="success"
          placeholder="Success state"
        />
      </div>
    </div>
  ),
}

/**
 * Disabled 상태
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <Label htmlFor="input-disabled">Disabled</Label>
        <Input
          id="input-disabled"
          disabled
          placeholder="Disabled input"
          defaultValue="비활성화된 입력"
        />
      </div>
      <div>
        <Label htmlFor="input-disabled-error">Disabled (Error)</Label>
        <Input
          id="input-disabled-error"
          state="error"
          disabled
          placeholder="Disabled error input"
          defaultValue="비활성화된 에러 입력"
        />
      </div>
    </div>
  ),
}

/**
 * ReadOnly 상태
 */
export const ReadOnly: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <Label htmlFor="input-readonly">ReadOnly</Label>
        <Input
          id="input-readonly"
          readOnly
          placeholder="ReadOnly input"
          defaultValue="읽기 전용 입력"
        />
      </div>
      <div>
        <Label htmlFor="input-readonly-success">ReadOnly (Success)</Label>
        <Input
          id="input-readonly-success"
          state="success"
          readOnly
          placeholder="ReadOnly success input"
          defaultValue="읽기 전용 성공 입력"
        />
      </div>
    </div>
  ),
}

/**
 * Label과 함께 사용
 */
export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <Label htmlFor="input-with-label">이름</Label>
        <Input id="input-with-label" placeholder="이름을 입력하세요" />
      </div>
      <div>
        <Label htmlFor="input-required" required>
          이메일
        </Label>
        <Input
          id="input-required"
          type="email"
          placeholder="email@example.com"
          helperText="이메일 주소를 입력하세요"
        />
      </div>
      <div>
        <Label htmlFor="input-error-label">비밀번호</Label>
        <Input
          id="input-error-label"
          type="password"
          state="error"
          errorMessage="비밀번호는 8자 이상이어야 합니다"
        />
      </div>
    </div>
  ),
}

/**
 * 모든 조합
 */
export const AllCombinations: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold capitalize">{size}</h3>
          <div className="flex flex-col gap-2">
            {(['default', 'error', 'success'] as const).map((state) => (
              <div key={state}>
                <Label htmlFor={`input-${size}-${state}`}>
                  {size.toUpperCase()} - {state}
                </Label>
                <Input
                  id={`input-${size}-${state}`}
                  size={size}
                  state={state}
                  placeholder={`${size} ${state} input`}
                  {...(state === 'error'
                    ? { errorMessage: '에러 메시지' }
                    : state === 'default'
                      ? { helperText: 'Helper text' }
                      : {})}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

