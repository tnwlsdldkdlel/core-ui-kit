import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from './Tabs'

describe('Tabs', () => {
  describe('렌더링', () => {
    it('기본 구조가 렌더링된다', () => {
      render(
        <TabsRoot defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
            <TabsTrigger value="tab2">탭 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">콘텐츠 1</TabsContent>
          <TabsContent value="tab2">콘텐츠 2</TabsContent>
        </TabsRoot>
      )

      expect(screen.getByRole('tablist')).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: '탭 1' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: '탭 2' })).toBeInTheDocument()
    })

    it('TabsList에 role="tablist"가 있다', () => {
      render(
        <TabsRoot defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
          </TabsList>
        </TabsRoot>
      )

      expect(screen.getByRole('tablist')).toBeInTheDocument()
    })

    it('TabsTrigger에 role="tab"이 있다', () => {
      render(
        <TabsRoot defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
          </TabsList>
        </TabsRoot>
      )

      expect(screen.getByRole('tab')).toBeInTheDocument()
    })

    it('활성화된 탭의 콘텐츠만 렌더링된다', () => {
      render(
        <TabsRoot defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
            <TabsTrigger value="tab2">탭 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">콘텐츠 1</TabsContent>
          <TabsContent value="tab2">콘텐츠 2</TabsContent>
        </TabsRoot>
      )

      expect(screen.getByText('콘텐츠 1')).toBeInTheDocument()
      expect(screen.queryByText('콘텐츠 2')).not.toBeInTheDocument()
    })

    it('활성화된 탭에 aria-selected="true"가 있다', () => {
      render(
        <TabsRoot defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
            <TabsTrigger value="tab2">탭 2</TabsTrigger>
          </TabsList>
        </TabsRoot>
      )

      const tab1 = screen.getByRole('tab', { name: '탭 1' })
      const tab2 = screen.getByRole('tab', { name: '탭 2' })

      expect(tab1).toHaveAttribute('aria-selected', 'true')
      expect(tab2).toHaveAttribute('aria-selected', 'false')
    })

    it('TabsContent에 role="tabpanel"이 있다', () => {
      render(
        <TabsRoot defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">콘텐츠 1</TabsContent>
        </TabsRoot>
      )

      expect(screen.getByRole('tabpanel')).toBeInTheDocument()
    })
  })

  describe('상호작용', () => {
    it('탭 클릭 시 해당 콘텐츠가 표시된다', async () => {
      const user = userEvent.setup()
      render(
        <TabsRoot defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
            <TabsTrigger value="tab2">탭 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">콘텐츠 1</TabsContent>
          <TabsContent value="tab2">콘텐츠 2</TabsContent>
        </TabsRoot>
      )

      const tab2 = screen.getByRole('tab', { name: '탭 2' })
      await user.click(tab2)

      expect(screen.queryByText('콘텐츠 1')).not.toBeInTheDocument()
      expect(screen.getByText('콘텐츠 2')).toBeInTheDocument()
      expect(tab2).toHaveAttribute('aria-selected', 'true')
    })

    it('비활성화된 탭은 클릭해도 활성화되지 않는다', async () => {
      const user = userEvent.setup()
      render(
        <TabsRoot defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
            <TabsTrigger value="tab2" disabled>
              탭 2
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">콘텐츠 1</TabsContent>
          <TabsContent value="tab2">콘텐츠 2</TabsContent>
        </TabsRoot>
      )

      const tab2 = screen.getByRole('tab', { name: '탭 2' })
      expect(tab2).toHaveAttribute('aria-disabled', 'true')
      expect(tab2).toHaveAttribute('disabled')

      await user.click(tab2)

      // 탭 1이 여전히 활성화되어 있어야 함
      expect(screen.getByText('콘텐츠 1')).toBeInTheDocument()
      expect(screen.queryByText('콘텐츠 2')).not.toBeInTheDocument()
    })
  })

  describe('키보드 내비게이션', () => {
    it('ArrowRight으로 다음 탭으로 이동한다', async () => {
      const user = userEvent.setup()
      render(
        <TabsRoot defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
            <TabsTrigger value="tab2">탭 2</TabsTrigger>
            <TabsTrigger value="tab3">탭 3</TabsTrigger>
          </TabsList>
        </TabsRoot>
      )

      const tab1 = screen.getByRole('tab', { name: '탭 1' })
      tab1.focus()

      await user.keyboard('{ArrowRight}')

      const tab2 = screen.getByRole('tab', { name: '탭 2' })
      expect(tab2).toHaveFocus()
    })

    it('ArrowLeft으로 이전 탭으로 이동한다', async () => {
      const user = userEvent.setup()
      render(
        <TabsRoot defaultValue="tab2">
          <TabsList>
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
            <TabsTrigger value="tab2">탭 2</TabsTrigger>
            <TabsTrigger value="tab3">탭 3</TabsTrigger>
          </TabsList>
        </TabsRoot>
      )

      const tab2 = screen.getByRole('tab', { name: '탭 2' })
      tab2.focus()

      await user.keyboard('{ArrowLeft}')

      const tab1 = screen.getByRole('tab', { name: '탭 1' })
      expect(tab1).toHaveFocus()
    })

    it('Home 키로 첫 번째 탭으로 이동한다', async () => {
      const user = userEvent.setup()
      render(
        <TabsRoot defaultValue="tab3">
          <TabsList>
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
            <TabsTrigger value="tab2">탭 2</TabsTrigger>
            <TabsTrigger value="tab3">탭 3</TabsTrigger>
          </TabsList>
        </TabsRoot>
      )

      const tab3 = screen.getByRole('tab', { name: '탭 3' })
      tab3.focus()

      await user.keyboard('{Home}')

      const tab1 = screen.getByRole('tab', { name: '탭 1' })
      expect(tab1).toHaveFocus()
    })

    it('End 키로 마지막 탭으로 이동한다', async () => {
      const user = userEvent.setup()
      render(
        <TabsRoot defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
            <TabsTrigger value="tab2">탭 2</TabsTrigger>
            <TabsTrigger value="tab3">탭 3</TabsTrigger>
          </TabsList>
        </TabsRoot>
      )

      const tab1 = screen.getByRole('tab', { name: '탭 1' })
      tab1.focus()

      await user.keyboard('{End}')

      const tab3 = screen.getByRole('tab', { name: '탭 3' })
      expect(tab3).toHaveFocus()
    })

    it('Enter 키로 탭을 활성화한다', async () => {
      const user = userEvent.setup()
      render(
        <TabsRoot defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
            <TabsTrigger value="tab2">탭 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">콘텐츠 1</TabsContent>
          <TabsContent value="tab2">콘텐츠 2</TabsContent>
        </TabsRoot>
      )

      const tab2 = screen.getByRole('tab', { name: '탭 2' })
      tab2.focus()

      await user.keyboard('{Enter}')

      expect(screen.queryByText('콘텐츠 1')).not.toBeInTheDocument()
      expect(screen.getByText('콘텐츠 2')).toBeInTheDocument()
      expect(tab2).toHaveAttribute('aria-selected', 'true')
    })

    it('Space 키로 탭을 활성화한다', async () => {
      const user = userEvent.setup()
      render(
        <TabsRoot defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
            <TabsTrigger value="tab2">탭 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">콘텐츠 1</TabsContent>
          <TabsContent value="tab2">콘텐츠 2</TabsContent>
        </TabsRoot>
      )

      const tab2 = screen.getByRole('tab', { name: '탭 2' })
      tab2.focus()

      await user.keyboard(' ')

      expect(screen.queryByText('콘텐츠 1')).not.toBeInTheDocument()
      expect(screen.getByText('콘텐츠 2')).toBeInTheDocument()
      expect(tab2).toHaveAttribute('aria-selected', 'true')
    })

    it('비활성화된 탭은 키보드로 건너뛴다', async () => {
      const user = userEvent.setup()
      render(
        <TabsRoot defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
            <TabsTrigger value="tab2" disabled>
              탭 2
            </TabsTrigger>
            <TabsTrigger value="tab3">탭 3</TabsTrigger>
          </TabsList>
        </TabsRoot>
      )

      const tab1 = screen.getByRole('tab', { name: '탭 1' })
      tab1.focus()

      await user.keyboard('{ArrowRight}')

      // 비활성화된 탭 2를 건너뛰고 탭 3으로 이동해야 함
      const tab3 = screen.getByRole('tab', { name: '탭 3' })
      expect(tab3).toHaveFocus()
    })
  })

  describe('Controlled 상태', () => {
    it('value prop으로 활성화된 탭을 제어할 수 있다', () => {
      const { rerender } = render(
        <TabsRoot value="tab1">
          <TabsList>
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
            <TabsTrigger value="tab2">탭 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">콘텐츠 1</TabsContent>
          <TabsContent value="tab2">콘텐츠 2</TabsContent>
        </TabsRoot>
      )

      expect(screen.getByText('콘텐츠 1')).toBeInTheDocument()
      expect(screen.queryByText('콘텐츠 2')).not.toBeInTheDocument()

      rerender(
        <TabsRoot value="tab2">
          <TabsList>
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
            <TabsTrigger value="tab2">탭 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">콘텐츠 1</TabsContent>
          <TabsContent value="tab2">콘텐츠 2</TabsContent>
        </TabsRoot>
      )

      expect(screen.queryByText('콘텐츠 1')).not.toBeInTheDocument()
      expect(screen.getByText('콘텐츠 2')).toBeInTheDocument()
    })

    it('onValueChange가 호출된다', async () => {
      const user = userEvent.setup()
      const handleValueChange = vi.fn()

      render(
        <TabsRoot value="tab1" onValueChange={handleValueChange}>
          <TabsList>
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
            <TabsTrigger value="tab2">탭 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">콘텐츠 1</TabsContent>
          <TabsContent value="tab2">콘텐츠 2</TabsContent>
        </TabsRoot>
      )

      const tab2 = screen.getByRole('tab', { name: '탭 2' })
      await user.click(tab2)

      expect(handleValueChange).toHaveBeenCalledWith('tab2')
      expect(handleValueChange).toHaveBeenCalledTimes(1)
    })
  })

  describe('Uncontrolled 상태', () => {
    it('defaultValue로 초기 활성화 탭을 설정할 수 있다', () => {
      render(
        <TabsRoot defaultValue="tab2">
          <TabsList>
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
            <TabsTrigger value="tab2">탭 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">콘텐츠 1</TabsContent>
          <TabsContent value="tab2">콘텐츠 2</TabsContent>
        </TabsRoot>
      )

      expect(screen.queryByText('콘텐츠 1')).not.toBeInTheDocument()
      expect(screen.getByText('콘텐츠 2')).toBeInTheDocument()

      const tab2 = screen.getByRole('tab', { name: '탭 2' })
      expect(tab2).toHaveAttribute('aria-selected', 'true')
    })
  })

  describe('접근성', () => {
    it('TabsList에 role="tablist"가 있다', () => {
      render(
        <TabsRoot defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
          </TabsList>
        </TabsRoot>
      )

      expect(screen.getByRole('tablist')).toBeInTheDocument()
    })

    it('TabsTrigger에 role="tab"과 aria-selected가 있다', () => {
      render(
        <TabsRoot defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
            <TabsTrigger value="tab2">탭 2</TabsTrigger>
          </TabsList>
        </TabsRoot>
      )

      const tabs = screen.getAllByRole('tab')
      expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
      expect(tabs[1]).toHaveAttribute('aria-selected', 'false')
    })

    it('TabsContent에 role="tabpanel"과 aria-labelledby가 있다', () => {
      render(
        <TabsRoot defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">콘텐츠 1</TabsContent>
        </TabsRoot>
      )

      const panel = screen.getByRole('tabpanel')
      expect(panel).toBeInTheDocument()
      expect(panel).toHaveAttribute('aria-labelledby', 'tab-trigger-tab1')
    })

    it('TabsTrigger와 TabsContent가 aria-controls/aria-labelledby로 연결된다', () => {
      render(
        <TabsRoot defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">콘텐츠 1</TabsContent>
        </TabsRoot>
      )

      const trigger = screen.getByRole('tab')
      const panel = screen.getByRole('tabpanel')

      expect(trigger).toHaveAttribute('aria-controls', 'tab-panel-tab1')
      expect(panel).toHaveAttribute('aria-labelledby', 'tab-trigger-tab1')
    })

    it('비활성화된 탭에 aria-disabled="true"가 있다', () => {
      render(
        <TabsRoot defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
            <TabsTrigger value="tab2" disabled>
              탭 2
            </TabsTrigger>
          </TabsList>
        </TabsRoot>
      )

      const tab2 = screen.getByRole('tab', { name: '탭 2' })
      expect(tab2).toHaveAttribute('aria-disabled', 'true')
    })
  })
})

