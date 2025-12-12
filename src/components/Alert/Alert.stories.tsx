import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from './Alert'
import { Button } from '../Button'

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '사용자에게 중요한 정보나 상태를 알리는 인라인 알림 컴포넌트입니다. dismissible 옵션을 통해 닫을 수 있으며, 다양한 variant를 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Alert variant',
    },
    dismissible: {
      control: 'boolean',
      description: '닫기 버튼 표시 여부',
    },
    urgent: {
      control: 'boolean',
      description: '긴급 알림 여부 (role="alert" 사용)',
    },
    icon: {
      control: false,
      description: '커스텀 아이콘',
    },
    title: {
      control: 'text',
      description: 'Alert 제목',
    },
    description: {
      control: 'text',
      description: 'Alert 설명',
    },
    actions: {
      control: false,
      description: '액션 버튼들',
    },
    onDismiss: {
      action: 'dismissed',
      description: '닫기 버튼 클릭 핸들러',
    },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

/**
 * 기본 Alert (Info)
 */
export const Default: Story = {
  args: {
    variant: 'info',
    title: '정보 알림',
    description: '이것은 정보 알림입니다.',
  },
}

/**
 * Success Alert
 */
export const Success: Story = {
  args: {
    variant: 'success',
    title: '성공',
    description: '작업이 성공적으로 완료되었습니다.',
  },
}

/**
 * Warning Alert
 */
export const Warning: Story = {
  args: {
    variant: 'warning',
    title: '경고',
    description: '주의가 필요한 상황입니다.',
  },
}

/**
 * Error Alert
 */
export const Error: Story = {
  args: {
    variant: 'error',
    title: '오류',
    description: '오류가 발생했습니다. 다시 시도해주세요.',
  },
}

/**
 * Dismissible Alert
 */
export const Dismissible: Story = {
  args: {
    variant: 'info',
    title: '닫을 수 있는 알림',
    description: '닫기 버튼을 클릭하여 이 알림을 닫을 수 있습니다.',
    dismissible: true,
  },
}

/**
 * 긴급 알림 (role="alert")
 */
export const Urgent: Story = {
  args: {
    variant: 'error',
    title: '긴급 오류',
    description: '이 알림은 role="alert"를 사용하여 스크린 리더가 즉시 읽습니다.',
    urgent: true,
  },
}

/**
 * 아이콘 없이 표시
 */
export const WithoutIcon: Story = {
  args: {
    variant: 'info',
    title: '아이콘 없는 알림',
    description: 'icon prop을 제공하지 않으면 기본 아이콘이 표시됩니다.',
    icon: null,
  },
}

/**
 * 커스텀 아이콘
 */
export const CustomIcon: Story = {
  args: {
    variant: 'info',
    title: '커스텀 아이콘',
    description: '원하는 아이콘을 사용할 수 있습니다.',
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
}

/**
 * 액션 버튼 포함
 */
export const WithActions: Story = {
  args: {
    variant: 'warning',
    title: '확인이 필요합니다',
    description: '이 작업을 계속하시겠습니까?',
    actions: (
      <>
        <Button size="sm" variant="primary">
          확인
        </Button>
        <Button size="sm" variant="secondary">
          취소
        </Button>
      </>
    ),
  },
}

/**
 * 제목만 있는 Alert
 */
export const TitleOnly: Story = {
  args: {
    variant: 'info',
    title: '제목만 있는 알림',
  },
}

/**
 * 설명만 있는 Alert
 */
export const DescriptionOnly: Story = {
  args: {
    variant: 'info',
    description: '설명만 있는 알림입니다.',
  },
}

/**
 * children 사용
 */
export const WithChildren: Story = {
  args: {
    variant: 'info',
    children: (
      <div>
        <p className="font-semibold mb-1">children을 사용한 알림</p>
        <p className="text-sm">title과 description 대신 children을 사용할 수 있습니다.</p>
      </div>
    ),
  },
}

/**
 * 긴 텍스트
 */
export const LongContent: Story = {
  args: {
    variant: 'info',
    title: '긴 내용이 있는 알림',
    description:
      '이것은 매우 긴 설명 텍스트입니다. Alert 컴포넌트는 긴 내용도 잘 처리할 수 있습니다. 여러 줄의 텍스트가 있어도 레이아웃이 깨지지 않습니다.',
  },
}

/**
 * 모든 Variant 비교
 */
export const AllVariants: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <Alert variant="info" title="Info" description="정보 알림입니다." />
        <Alert variant="success" title="Success" description="성공 알림입니다." />
        <Alert variant="warning" title="Warning" description="경고 알림입니다." />
        <Alert variant="error" title="Error" description="오류 알림입니다." />
      </div>
    )
  },
}

/**
 * Dismissible 모든 Variant
 */
export const AllDismissible: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <Alert
          variant="info"
          title="Info"
          description="닫을 수 있는 정보 알림입니다."
          dismissible
        />
        <Alert
          variant="success"
          title="Success"
          description="닫을 수 있는 성공 알림입니다."
          dismissible
        />
        <Alert
          variant="warning"
          title="Warning"
          description="닫을 수 있는 경고 알림입니다."
          dismissible
        />
        <Alert
          variant="error"
          title="Error"
          description="닫을 수 있는 오류 알림입니다."
          dismissible
        />
      </div>
    )
  },
}

