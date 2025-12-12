import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Dropdown } from './Dropdown'
import type { DropdownOption } from './Dropdown'

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '선택 가능한 옵션 목록을 표시하는 드롭다운 컴포넌트입니다. Portal을 사용하여 렌더링되며, 키보드 내비게이션과 접근성 기능을 제공합니다.',
      },
      story: {
        inline: false,
        iframeHeight: 600,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Dropdown 열림/닫힘 상태 (Controlled)',
    },
    onOpenChange: {
      action: 'openChanged',
      description: 'Dropdown 열림/닫힘 상태 변경 핸들러',
    },
    value: {
      control: 'text',
      description: '선택된 값',
    },
    onValueChange: {
      action: 'valueChanged',
      description: '값 변경 핸들러',
    },
    options: {
      control: 'object',
      description: '옵션 목록',
    },
    placeholder: {
      control: 'text',
      description: '트리거 버튼 텍스트 (값이 없을 때)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '트리거 버튼 크기',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
  },
}

export default meta
type Story = StoryObj<typeof Dropdown>

const basicOptions: DropdownOption[] = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
  { value: 'option4', label: '옵션 4' },
  { value: 'option5', label: '옵션 5' },
]

/**
 * 기본 Dropdown
 */
export const Default: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => {
    const [value, setValue] = useState<string>()

    return (
      <div className="flex items-center justify-center min-h-screen">
        <Dropdown
          value={value}
          onValueChange={setValue}
          options={basicOptions}
          placeholder="옵션을 선택하세요"
        />
      </div>
    )
  },
}

/**
 * 다양한 크기
 */
export const Sizes: Story = {
  render: () => {
    const [value1, setValue1] = useState<string>()
    const [value2, setValue2] = useState<string>()
    const [value3, setValue3] = useState<string>()

    return (
      <div className="flex items-center justify-center min-h-screen gap-4">
        <Dropdown
          size="sm"
          value={value1}
          onValueChange={setValue1}
          options={basicOptions}
          placeholder="Small"
        />
        <Dropdown
          size="md"
          value={value2}
          onValueChange={setValue2}
          options={basicOptions}
          placeholder="Medium"
        />
        <Dropdown
          size="lg"
          value={value3}
          onValueChange={setValue3}
          options={basicOptions}
          placeholder="Large"
        />
      </div>
    )
  },
}

/**
 * 선택된 값 표시
 */
export const WithSelectedValue: Story = {
  render: () => {
    const [value, setValue] = useState<string>('option2')

    return (
      <div className="flex items-center justify-center min-h-screen">
        <Dropdown
          value={value}
          onValueChange={setValue}
          options={basicOptions}
          placeholder="옵션을 선택하세요"
        />
      </div>
    )
  },
}

/**
 * 비활성화된 옵션
 */
export const WithDisabledOptions: Story = {
  render: () => {
    const [value, setValue] = useState<string>()

    const optionsWithDisabled: DropdownOption[] = [
      { value: 'option1', label: '옵션 1' },
      { value: 'option2', label: '옵션 2', disabled: true },
      { value: 'option3', label: '옵션 3' },
      { value: 'option4', label: '옵션 4', disabled: true },
      { value: 'option5', label: '옵션 5' },
    ]

    return (
      <div className="flex items-center justify-center min-h-screen">
        <Dropdown
          value={value}
          onValueChange={setValue}
          options={optionsWithDisabled}
          placeholder="옵션을 선택하세요"
        />
      </div>
    )
  },
}

/**
 * 긴 옵션 목록
 */
export const LongList: Story = {
  render: () => {
    const [value, setValue] = useState<string>()

    const longOptions: DropdownOption[] = Array.from({ length: 20 }, (_, i) => ({
      value: `option${i + 1}`,
      label: `옵션 ${i + 1}`,
    }))

    return (
      <div className="flex items-center justify-center min-h-screen">
        <Dropdown
          value={value}
          onValueChange={setValue}
          options={longOptions}
          placeholder="옵션을 선택하세요"
        />
      </div>
    )
  },
}

/**
 * 비활성화된 Dropdown
 */
export const Disabled: Story = {
  render: () => {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Dropdown
          disabled
          options={basicOptions}
          placeholder="비활성화됨"
        />
      </div>
    )
  },
}

/**
 * Controlled 상태
 */
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<string>()

    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {open ? '닫기' : '열기'}
          </button>
          <button
            type="button"
            onClick={() => setValue('option3')}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            옵션 3 선택
          </button>
        </div>
        <Dropdown
          open={open}
          onOpenChange={setOpen}
          value={value}
          onValueChange={setValue}
          options={basicOptions}
          placeholder="옵션을 선택하세요"
        />
      </div>
    )
  },
}

/**
 * 키보드 내비게이션 데모
 */
export const KeyboardNavigation: Story = {
  render: () => {
    const [value, setValue] = useState<string>()

    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-sm text-neutral-600 max-w-md text-center">
          <p className="font-semibold mb-2">키보드 단축키:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter/Space: Dropdown 열기/닫기, 옵션 선택</li>
            <li>ArrowDown/ArrowUp: 옵션 탐색</li>
            <li>Home/End: 첫/마지막 옵션으로 이동</li>
            <li>Escape: Dropdown 닫기</li>
          </ul>
        </div>
        <Dropdown
          value={value}
          onValueChange={setValue}
          options={basicOptions}
          placeholder="키보드로 탐색해보세요"
        />
      </div>
    )
  },
}

