import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from './Tabs'

const meta: Meta<typeof TabsRoot> = {
  title: 'Components/Tabs',
  component: TabsRoot,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '탭 컴포넌트입니다. TabsRoot, TabsList, TabsTrigger, TabsContent로 구성되며, Controlled/Uncontrolled 상태를 지원하고 키보드 내비게이션과 접근성 기능을 제공합니다.',
      },
      story: {
        inline: false,
        iframeHeight: 600,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: '활성화된 탭 값 (Controlled)',
    },
    onValueChange: {
      action: 'valueChanged',
      description: '탭 값 변경 핸들러',
    },
    defaultValue: {
      control: 'text',
      description: '기본 활성화 탭 값 (Uncontrolled)',
    },
  },
}

export default meta
type Story = StoryObj<typeof TabsRoot>

/**
 * 기본 Tabs (Uncontrolled)
 */
export const Default: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => {
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-2xl">
          <TabsRoot defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">탭 1</TabsTrigger>
              <TabsTrigger value="tab2">탭 2</TabsTrigger>
              <TabsTrigger value="tab3">탭 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <div className="p-6 bg-white border border-neutral-200 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">탭 1 콘텐츠</h3>
                <p className="text-neutral-600">
                  이것은 첫 번째 탭의 콘텐츠입니다.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="tab2">
              <div className="p-6 bg-white border border-neutral-200 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">탭 2 콘텐츠</h3>
                <p className="text-neutral-600">
                  이것은 두 번째 탭의 콘텐츠입니다.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="tab3">
              <div className="p-6 bg-white border border-neutral-200 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">탭 3 콘텐츠</h3>
                <p className="text-neutral-600">
                  이것은 세 번째 탭의 콘텐츠입니다.
                </p>
              </div>
            </TabsContent>
          </TabsRoot>
        </div>
      </div>
    )
  },
}

/**
 * Controlled 상태
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('tab1')

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-4">
        <div className="text-sm text-neutral-600">
          현재 선택된 탭: <span className="font-semibold">{value}</span>
        </div>
        <div className="w-full max-w-2xl">
          <TabsRoot value={value} onValueChange={setValue}>
            <TabsList>
              <TabsTrigger value="tab1">탭 1</TabsTrigger>
              <TabsTrigger value="tab2">탭 2</TabsTrigger>
              <TabsTrigger value="tab3">탭 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <div className="p-6 bg-white border border-neutral-200 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">탭 1 콘텐츠</h3>
                <p className="text-neutral-600">
                  이것은 첫 번째 탭의 콘텐츠입니다.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="tab2">
              <div className="p-6 bg-white border border-neutral-200 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">탭 2 콘텐츠</h3>
                <p className="text-neutral-600">
                  이것은 두 번째 탭의 콘텐츠입니다.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="tab3">
              <div className="p-6 bg-white border border-neutral-200 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">탭 3 콘텐츠</h3>
                <p className="text-neutral-600">
                  이것은 세 번째 탭의 콘텐츠입니다.
                </p>
              </div>
            </TabsContent>
          </TabsRoot>
        </div>
      </div>
    )
  },
}

/**
 * 많은 탭
 */
export const ManyTabs: Story = {
  render: () => {
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-4xl">
          <TabsRoot defaultValue="tab1">
            <TabsList>
              {Array.from({ length: 8 }, (_, i) => (
                <TabsTrigger key={`tab${i + 1}`} value={`tab${i + 1}`}>
                  탭 {i + 1}
                </TabsTrigger>
              ))}
            </TabsList>
            {Array.from({ length: 8 }, (_, i) => (
              <TabsContent key={`tab${i + 1}`} value={`tab${i + 1}`}>
                <div className="p-6 bg-white border border-neutral-200 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">탭 {i + 1} 콘텐츠</h3>
                  <p className="text-neutral-600">
                    이것은 {i + 1}번째 탭의 콘텐츠입니다.
                  </p>
                </div>
              </TabsContent>
            ))}
          </TabsRoot>
        </div>
      </div>
    )
  },
}

/**
 * 비활성화된 탭
 */
export const WithDisabledTab: Story = {
  render: () => {
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-2xl">
          <TabsRoot defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">탭 1</TabsTrigger>
              <TabsTrigger value="tab2" disabled>
                탭 2 (비활성화)
              </TabsTrigger>
              <TabsTrigger value="tab3">탭 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <div className="p-6 bg-white border border-neutral-200 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">탭 1 콘텐츠</h3>
                <p className="text-neutral-600">
                  이것은 첫 번째 탭의 콘텐츠입니다.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="tab2">
              <div className="p-6 bg-white border border-neutral-200 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">탭 2 콘텐츠</h3>
                <p className="text-neutral-600">
                  이것은 두 번째 탭의 콘텐츠입니다. (비활성화되어 있어 선택할 수 없습니다)
                </p>
              </div>
            </TabsContent>
            <TabsContent value="tab3">
              <div className="p-6 bg-white border border-neutral-200 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">탭 3 콘텐츠</h3>
                <p className="text-neutral-600">
                  이것은 세 번째 탭의 콘텐츠입니다.
                </p>
              </div>
            </TabsContent>
          </TabsRoot>
        </div>
      </div>
    )
  },
}

/**
 * 긴 콘텐츠
 */
export const LongContent: Story = {
  render: () => {
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-2xl">
          <TabsRoot defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">탭 1</TabsTrigger>
              <TabsTrigger value="tab2">탭 2</TabsTrigger>
              <TabsTrigger value="tab3">탭 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <div className="p-6 bg-white border border-neutral-200 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">탭 1 콘텐츠</h3>
                <div className="space-y-4">
                  {Array.from({ length: 10 }, (_, i) => (
                    <p key={i} className="text-neutral-600">
                      이것은 {i + 1}번째 단락입니다. 긴 콘텐츠가 있어도 탭이 정상적으로
                      작동합니다.
                    </p>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="tab2">
              <div className="p-6 bg-white border border-neutral-200 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">탭 2 콘텐츠</h3>
                <div className="space-y-4">
                  {Array.from({ length: 15 }, (_, i) => (
                    <p key={i} className="text-neutral-600">
                      이것은 {i + 1}번째 단락입니다. 더 많은 콘텐츠가 있습니다.
                    </p>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="tab3">
              <div className="p-6 bg-white border border-neutral-200 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">탭 3 콘텐츠</h3>
                <div className="space-y-4">
                  {Array.from({ length: 8 }, (_, i) => (
                    <p key={i} className="text-neutral-600">
                      이것은 {i + 1}번째 단락입니다. 탭 콘텐츠는 스크롤 가능합니다.
                    </p>
                  ))}
                </div>
              </div>
            </TabsContent>
          </TabsRoot>
        </div>
      </div>
    )
  },
}

/**
 * 키보드 내비게이션 데모
 */
export const KeyboardNavigation: Story = {
  render: () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-4">
        <div className="text-sm text-neutral-600 max-w-md text-center">
          <p className="font-semibold mb-2">키보드 단축키:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>ArrowLeft/ArrowRight: 탭 탐색</li>
            <li>Home/End: 첫/마지막 탭으로 이동</li>
            <li>Enter/Space: 탭 활성화</li>
          </ul>
        </div>
        <div className="w-full max-w-2xl">
          <TabsRoot defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">탭 1</TabsTrigger>
              <TabsTrigger value="tab2">탭 2</TabsTrigger>
              <TabsTrigger value="tab3">탭 3</TabsTrigger>
              <TabsTrigger value="tab4">탭 4</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <div className="p-6 bg-white border border-neutral-200 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">탭 1 콘텐츠</h3>
                <p className="text-neutral-600">키보드로 탐색해보세요.</p>
              </div>
            </TabsContent>
            <TabsContent value="tab2">
              <div className="p-6 bg-white border border-neutral-200 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">탭 2 콘텐츠</h3>
                <p className="text-neutral-600">ArrowLeft/ArrowRight로 이동할 수 있습니다.</p>
              </div>
            </TabsContent>
            <TabsContent value="tab3">
              <div className="p-6 bg-white border border-neutral-200 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">탭 3 콘텐츠</h3>
                <p className="text-neutral-600">Home/End로 첫/마지막 탭으로 이동할 수 있습니다.</p>
              </div>
            </TabsContent>
            <TabsContent value="tab4">
              <div className="p-6 bg-white border border-neutral-200 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">탭 4 콘텐츠</h3>
                <p className="text-neutral-600">Enter/Space로 탭을 활성화할 수 있습니다.</p>
              </div>
            </TabsContent>
          </TabsRoot>
        </div>
      </div>
    )
  },
}

