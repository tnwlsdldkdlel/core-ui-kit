import type { Meta, StoryObj } from '@storybook/react'
import { useState, useRef } from 'react'
import { Modal } from './Modal'
import { Button } from '../Button'
import { Input } from '../Input'
import { Label } from '../Input/Label'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen', // Storybook Canvas의 기본 padding 영향 제거
    docs: {
      description: {
        component:
          '다이얼로그 모달 컴포넌트입니다. Portal을 사용하여 렌더링되며, Focus Trap과 접근성 기능을 제공합니다.',
      },
      // Docs 탭에서 iframe 모드 사용 (fixed positioning 정상 작동)
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
      description: 'Modal 열림/닫힘 상태',
    },
    onClose: {
      action: 'closed',
      description: 'Modal 닫기 핸들러',
    },
    title: {
      control: 'text',
      description: 'Modal 제목',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: '오버레이 클릭 시 닫기 여부',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'ESC 키로 닫기 여부',
    },
    showCloseButton: {
      control: 'boolean',
      description: '닫기 버튼 표시 여부',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Modal 크기',
    },
  },
}

export default meta
type Story = StoryObj<typeof Modal>

/**
 * 기본 Modal
 */
export const Default: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => {
    const [open, setOpen] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)

    return (
      <>
        <div className="flex items-center justify-center min-h-screen">
          <Button ref={buttonRef} onClick={() => setOpen(true)}>
            Modal 열기
          </Button>
        </div>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="기본 Modal"
          triggerRef={buttonRef}
        >
          <p className="text-neutral-600">
            이것은 기본 Modal입니다. ESC 키를 누르거나 닫기 버튼을 클릭하여
            닫을 수 있습니다.
          </p>
        </Modal>
      </>
    )
  },
}

/**
 * 다양한 크기
 */
export const Sizes: Story = {
  render: () => {
    const [openSize, setOpenSize] = useState<'sm' | 'md' | 'lg' | 'xl' | null>(
      null
    )

    return (
      <>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex gap-2">
            {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
              <Button key={size} onClick={() => setOpenSize(size)}>
                {size.toUpperCase()} 크기
              </Button>
            ))}
          </div>
        </div>
        {openSize && (
          <Modal
            open={true}
            onClose={() => setOpenSize(null)}
            title={`${openSize.toUpperCase()} 크기 Modal`}
            size={openSize}
          >
            <p className="text-neutral-600">
              이것은 {openSize.toUpperCase()} 크기의 Modal입니다.
            </p>
          </Modal>
        )}
      </>
    )
  },
}

/**
 * 오버레이 클릭으로 닫기
 */
export const CloseOnOverlayClick: Story = {
  args: {
    open: true,
    title: ""
  },

  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <div className="flex items-center justify-center min-h-screen">
          <Button onClick={() => setOpen(true)}>오버레이 클릭으로 닫기</Button>
        </div>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="오버레이 클릭으로 닫기"
          closeOnOverlayClick
        >
          <p className="text-neutral-600">
            오버레이를 클릭하면 Modal이 닫힙니다.
          </p>
        </Modal>
      </>
    )
  }
}

/**
 * 제목 없음
 */
export const WithoutTitle: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <div className="flex items-center justify-center min-h-screen">
          <Button onClick={() => setOpen(true)}>제목 없는 Modal</Button>
        </div>
        <Modal open={open} onClose={() => setOpen(false)}>
          <p className="text-neutral-600">제목이 없는 Modal입니다.</p>
        </Modal>
      </>
    )
  },
}

/**
 * 닫기 버튼 없음
 */
export const WithoutCloseButton: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <div className="flex items-center justify-center min-h-screen">
          <Button onClick={() => setOpen(true)}>닫기 버튼 없는 Modal</Button>
        </div>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="닫기 버튼 없음"
          showCloseButton={false}
        >
          <div className="flex flex-col gap-4">
            <p className="text-neutral-600">
              닫기 버튼이 없는 Modal입니다. ESC 키나 오버레이 클릭으로 닫을 수
              있습니다.
            </p>
            <Button onClick={() => setOpen(false)}>닫기</Button>
          </div>
        </Modal>
      </>
    )
  },
}

/**
 * 폼 예제
 */
export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    return (
      <>
        <div className="flex items-center justify-center min-h-screen">
          <Button onClick={() => setOpen(true)}>폼 Modal 열기</Button>
        </div>
        <Modal
          open={open}
          onClose={() => {
            setOpen(false)
            setName('')
            setEmail('')
          }}
          title="사용자 정보 입력"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault()
              alert(`이름: ${name}, 이메일: ${email}`)
              setOpen(false)
              setName('')
              setEmail('')
            }}
            className="flex flex-col gap-4"
          >
            <div>
              <Label htmlFor="modal-name" required>
                이름
              </Label>
              <Input
                id="modal-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력하세요"
              />
            </div>
            <div>
              <Label htmlFor="modal-email" required>
                이메일
              </Label>
              <Input
                id="modal-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setOpen(false)
                  setName('')
                  setEmail('')
                }}
              >
                취소
              </Button>
              <Button type="submit">저장</Button>
            </div>
          </form>
        </Modal>
      </>
    )
  },
}

/**
 * 긴 콘텐츠
 */
export const LongContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <div className="flex items-center justify-center min-h-screen">
          <Button onClick={() => setOpen(true)}>긴 콘텐츠 Modal</Button>
        </div>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="긴 콘텐츠 예제"
        >
          <div className="space-y-4">
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i} className="text-neutral-600">
                이것은 {i + 1}번째 단락입니다. Modal 내부에서 스크롤이 가능합니다.
                긴 콘텐츠가 있어도 Modal이 화면을 벗어나지 않습니다.
              </p>
            ))}
          </div>
        </Modal>
      </>
    )
  },
}

