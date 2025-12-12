import type { Preview } from '@storybook/react'
import '../src/index.css'

// Storybook 환경에서 Modal Portal이 정상 작동하도록 스타일 주입
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.id = 'storybook-modal-fix'
  style.textContent = `
    /* Storybook 환경에서 Modal Portal이 정상 작동하도록 보장 */
    body#storybook-root-body,
    body[id*="storybook"] {
      position: relative !important;
      transform: none !important;
      overflow: visible !important;
    }
    
    /* Storybook iframe 내부 body 스타일 보장 */
    iframe[id*="storybook-preview"] body {
      position: relative !important;
      transform: none !important;
      overflow: visible !important;
    }
  `
  // 이미 추가된 스타일이 있으면 제거 후 재추가
  const existingStyle = document.getElementById('storybook-modal-fix')
  if (existingStyle) {
    existingStyle.remove()
  }
  document.head.appendChild(style)
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
    // Docs 탭에서 iframe 모드 사용 (inlineStories 비활성화)
    docs: {
      story: {
        inline: false, // iframe 모드로 렌더링하여 fixed positioning 정상 작동
        iframeHeight: 600,
      },
    },
  },
}

export default preview

