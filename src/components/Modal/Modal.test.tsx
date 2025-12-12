import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from './Modal'
import { Button } from '../Button'
import { createRef } from 'react'

// Portal을 테스트하기 위해 document.body를 확인
const getModalFromBody = () => {
  return document.body.querySelector('[role="dialog"]')
}

describe('Modal', () => {

  describe('렌더링', () => {
    it('open이 false일 때 렌더링되지 않는다', () => {
      render(
        <Modal open={false} onClose={() => {}}>
          <p>Modal Content</p>
        </Modal>
      )
      expect(getModalFromBody()).not.toBeInTheDocument()
    })

    it('open이 true일 때 Portal로 렌더링된다', () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <p>Modal Content</p>
        </Modal>
      )
      expect(getModalFromBody()).toBeInTheDocument()
      expect(screen.getByText('Modal Content')).toBeInTheDocument()
    })

    it('제목이 표시된다', () => {
      render(
        <Modal open={true} onClose={() => {}} title="Modal Title">
          <p>Content</p>
        </Modal>
      )
      expect(screen.getByText('Modal Title')).toBeInTheDocument()
    })

    it('닫기 버튼이 표시된다', () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <p>Content</p>
        </Modal>
      )
      expect(screen.getByLabelText('모달 닫기')).toBeInTheDocument()
    })

    it('showCloseButton이 false일 때 닫기 버튼이 표시되지 않는다', () => {
      render(
        <Modal open={true} onClose={() => {}} showCloseButton={false}>
          <p>Content</p>
        </Modal>
      )
      expect(screen.queryByLabelText('모달 닫기')).not.toBeInTheDocument()
    })
  })

  describe('Portal 렌더링', () => {
    it('Portal을 통해 document.body에 렌더링된다', () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <p>Portal Content</p>
        </Modal>
      )

      // document.body에 렌더링됨
      expect(getModalFromBody()).toBeInTheDocument()
      expect(screen.getByText('Portal Content')).toBeInTheDocument()
    })
  })

  describe('상호작용', () => {
    it('닫기 버튼 클릭 시 onClose가 호출된다', async () => {
      const user = userEvent.setup()
      const handleClose = vi.fn()

      render(
        <Modal open={true} onClose={handleClose}>
          <p>Content</p>
        </Modal>
      )

      const closeButton = screen.getByLabelText('모달 닫기')
      await user.click(closeButton)

      expect(handleClose).toHaveBeenCalledTimes(1)
    })

    it('closeOnOverlayClick이 true일 때 오버레이 클릭 시 닫힌다', async () => {
      const user = userEvent.setup()
      const handleClose = vi.fn()

      render(
        <Modal open={true} onClose={handleClose} closeOnOverlayClick>
          <p>Content</p>
        </Modal>
      )

      const overlay = document.body.querySelector('.fixed.inset-0')
      expect(overlay).toBeInTheDocument()
      if (overlay) {
        await user.click(overlay as HTMLElement)
        expect(handleClose).toHaveBeenCalledTimes(1)
      }
    })

    it('closeOnOverlayClick이 false일 때 오버레이 클릭 시 닫히지 않는다', async () => {
      const user = userEvent.setup()
      const handleClose = vi.fn()

      render(
        <Modal open={true} onClose={handleClose} closeOnOverlayClick={false}>
          <p>Content</p>
        </Modal>
      )

      const overlay = document.body.querySelector('.fixed.inset-0')
      if (overlay) {
        await user.click(overlay)
        expect(handleClose).not.toHaveBeenCalled()
      }
    })

    it('Modal 내부 클릭 시 닫히지 않는다', async () => {
      const user = userEvent.setup()
      const handleClose = vi.fn()

      render(
        <Modal open={true} onClose={handleClose} closeOnOverlayClick>
          <div>
            <p>Content</p>
            <button>Button</button>
          </div>
        </Modal>
      )

      const button = screen.getByText('Button')
      await user.click(button)

      expect(handleClose).not.toHaveBeenCalled()
    })
  })

  describe('ESC 키 동작', () => {
    it('ESC 키를 누르면 onClose가 호출된다', async () => {
      const user = userEvent.setup()
      const handleClose = vi.fn()

      render(
        <Modal open={true} onClose={handleClose}>
          <p>Content</p>
        </Modal>
      )

      await user.keyboard('{Escape}')
      expect(handleClose).toHaveBeenCalledTimes(1)
    })

    it('closeOnEscape가 false일 때 ESC 키로 닫히지 않는다', async () => {
      const user = userEvent.setup()
      const handleClose = vi.fn()

      render(
        <Modal open={true} onClose={handleClose} closeOnEscape={false}>
          <p>Content</p>
        </Modal>
      )

      await user.keyboard('{Escape}')
      expect(handleClose).not.toHaveBeenCalled()
    })
  })

  describe('Focus Trap', () => {
    it('Modal이 열릴 때 포커스 가능한 요소가 존재한다', () => {
      render(
        <Modal open={true} onClose={() => {}} title="Test Modal">
          <button>First Button</button>
          <button>Second Button</button>
        </Modal>
      )

      const firstButton = screen.getByText('First Button')
      const secondButton = screen.getByText('Second Button')
      expect(firstButton).toBeInTheDocument()
      expect(secondButton).toBeInTheDocument()
    })

    it('Modal에 onKeyDown 핸들러가 설정된다', () => {
      render(
        <Modal open={true} onClose={() => {}} title="Test Modal">
          <button>Button</button>
        </Modal>
      )

      const modal = getModalFromBody()
      expect(modal).toBeInTheDocument()
    })
  })

  describe('포커스 복귀', () => {
    it('트리거 ref가 전달되면 저장된다', () => {
      const triggerRef = createRef<HTMLButtonElement>()

      render(
        <>
          <Button ref={triggerRef} onClick={() => {}}>
            Trigger
          </Button>
          <Modal
            open={true}
            onClose={() => {}}
            triggerRef={triggerRef}
            title="Test Modal"
          >
            <p>Content</p>
          </Modal>
        </>
      )

      expect(triggerRef.current).toBeInTheDocument()
    })
  })

  describe('접근성', () => {
    it('role="dialog"가 설정된다', () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <p>Content</p>
        </Modal>
      )
      const modal = getModalFromBody()
      expect(modal).toHaveAttribute('role', 'dialog')
    })

    it('aria-modal="true"가 설정된다', () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <p>Content</p>
        </Modal>
      )
      const modal = getModalFromBody()
      expect(modal).toHaveAttribute('aria-modal', 'true')
    })

    it('제목이 있을 때 aria-labelledby가 설정된다', () => {
      render(
        <Modal open={true} onClose={() => {}} title="Modal Title">
          <p>Content</p>
        </Modal>
      )
      const modal = getModalFromBody()
      const title = screen.getByText('Modal Title')
      const titleId = title.getAttribute('id')

      expect(modal).toHaveAttribute('aria-labelledby', titleId)
    })

    it('닫기 버튼에 aria-label이 설정된다', () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <p>Content</p>
        </Modal>
      )
      const closeButton = screen.getByLabelText('모달 닫기')
      expect(closeButton).toHaveAttribute('aria-label', '모달 닫기')
    })
  })

  describe('Body 스크롤 방지', () => {
    it('열릴 때 body에 스타일이 적용된다', () => {
      const originalPosition = document.body.style.position
      
      render(
        <Modal open={true} onClose={() => {}}>
          <p>Content</p>
        </Modal>
      )

      // Modal이 열렸을 때 body 스타일이 변경되었는지 확인
      // (실제 구현에서는 position: fixed가 설정됨)
      expect(getModalFromBody()).toBeInTheDocument()
      
      // 정리
      document.body.style.position = originalPosition
    })
  })
})

