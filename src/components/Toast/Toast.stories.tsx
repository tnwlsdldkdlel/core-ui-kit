import type { Meta, StoryObj } from '@storybook/react'
import { ToastProvider } from './ToastProvider'
import { useToast } from './useToast'
import { Button } from '../Button'

const meta: Meta<typeof ToastProvider> = {
  title: 'Components/Toast',
  component: ToastProvider,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '일시적인 알림을 표시하는 플로팅 컴포넌트입니다. Portal을 사용하여 렌더링되며, duration 기반 자동 닫힘과 스택 관리를 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ToastProvider>

// Toast를 표시하는 데모 컴포넌트
function ToastDemo() {
  const { toast } = useToast()

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-4">Toast 예제</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() =>
              toast({
                variant: 'info',
                title: '정보',
                description: '이것은 정보 Toast입니다.',
              })
            }
          >
            Info Toast
          </Button>
          <Button
            onClick={() =>
              toast({
                variant: 'success',
                title: '성공',
                description: '작업이 성공적으로 완료되었습니다.',
              })
            }
          >
            Success Toast
          </Button>
          <Button
            onClick={() =>
              toast({
                variant: 'warning',
                title: '경고',
                description: '주의가 필요한 상황입니다.',
              })
            }
          >
            Warning Toast
          </Button>
          <Button
            onClick={() =>
              toast({
                variant: 'error',
                title: '오류',
                description: '오류가 발생했습니다.',
              })
            }
          >
            Error Toast
          </Button>
        </div>
      </div>
    </div>
  )
}

/**
 * 기본 Toast
 */
export const Default: Story = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
}

// 자동 닫힘 데모
function AutoCloseDemo() {
  const { toast } = useToast()

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-4">자동 닫힘 데모</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() =>
              toast({
                variant: 'success',
                title: '3초 후 자동 닫힘',
                description: '이 Toast는 3초 후 자동으로 닫힙니다.',
                duration: 3000,
              })
            }
          >
            3초 자동 닫힘
          </Button>
          <Button
            onClick={() =>
              toast({
                variant: 'info',
                title: '10초 후 자동 닫힘',
                description: '이 Toast는 10초 후 자동으로 닫힙니다.',
                duration: 10000,
              })
            }
          >
            10초 자동 닫힘
          </Button>
          <Button
            onClick={() =>
              toast({
                variant: 'warning',
                title: '자동 닫힘 없음',
                description: '이 Toast는 자동으로 닫히지 않습니다.',
                duration: 0,
              })
            }
          >
            자동 닫힘 없음
          </Button>
        </div>
      </div>
    </div>
  )
}

/**
 * 자동 닫힘 데모
 */
export const AutoClose: Story = {
  render: () => (
    <ToastProvider>
      <AutoCloseDemo />
    </ToastProvider>
  ),
}

// Toast 스택 데모
function ToastStackDemo() {
  const { toast } = useToast()

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-4">Toast 스택 데모</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => {
              toast({ variant: 'info', title: 'Toast 1', description: '첫 번째 Toast' })
              setTimeout(() => {
                toast({ variant: 'success', title: 'Toast 2', description: '두 번째 Toast' })
              }, 500)
              setTimeout(() => {
                toast({ variant: 'warning', title: 'Toast 3', description: '세 번째 Toast' })
              }, 1000)
            }}
          >
            여러 Toast 표시
          </Button>
        </div>
      </div>
    </div>
  )
}

/**
 * Toast 스택 데모
 */
export const ToastStack: Story = {
  render: () => (
    <ToastProvider>
      <ToastStackDemo />
    </ToastProvider>
  ),
}

// 긴급 알림 데모
function UrgentDemo() {
  const { toast } = useToast()

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-4">긴급 알림 데모</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() =>
              toast({
                variant: 'error',
                title: '긴급 오류',
                description: '이 Toast는 aria-live="assertive"를 사용합니다.',
                urgent: true,
              })
            }
          >
            긴급 알림
          </Button>
        </div>
      </div>
    </div>
  )
}

/**
 * 긴급 알림 데모
 */
export const Urgent: Story = {
  render: () => (
    <ToastProvider>
      <UrgentDemo />
    </ToastProvider>
  ),
}

// 액션 버튼 포함 데모
function WithActionsDemo() {
  const { toast } = useToast()

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-4">액션 버튼 포함 데모</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() =>
              toast({
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
              })
            }
          >
            액션 버튼 포함
          </Button>
        </div>
      </div>
    </div>
  )
}

/**
 * 액션 버튼 포함 데모
 */
export const WithActions: Story = {
  render: () => (
    <ToastProvider>
      <WithActionsDemo />
    </ToastProvider>
  ),
}

// 모든 Variant 비교
function AllVariantsDemo() {
  const { toast } = useToast()

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-4">모든 Variant 비교</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() =>
              toast({
                variant: 'info',
                title: 'Info',
                description: '정보 Toast입니다.',
              })
            }
          >
            Info
          </Button>
          <Button
            onClick={() =>
              toast({
                variant: 'success',
                title: 'Success',
                description: '성공 Toast입니다.',
              })
            }
          >
            Success
          </Button>
          <Button
            onClick={() =>
              toast({
                variant: 'warning',
                title: 'Warning',
                description: '경고 Toast입니다.',
              })
            }
          >
            Warning
          </Button>
          <Button
            onClick={() =>
              toast({
                variant: 'error',
                title: 'Error',
                description: '오류 Toast입니다.',
              })
            }
          >
            Error
          </Button>
        </div>
      </div>
    </div>
  )
}

/**
 * 모든 Variant 비교
 */
export const AllVariants: Story = {
  render: () => (
    <ToastProvider>
      <AllVariantsDemo />
    </ToastProvider>
  ),
}

