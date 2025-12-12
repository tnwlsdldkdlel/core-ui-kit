/**
 * Portal 유틸리티 함수
 *
 * Storybook 환경과 일반 환경에서 적절한 Portal 대상을 선택합니다.
 */

/**
 * Storybook 환경인지 확인
 */
export function isStorybookEnvironment(): boolean {
  if (typeof window === 'undefined') return false
  
  // Storybook의 특징적인 요소나 전역 변수 확인
  return (
    window.location?.pathname?.includes('/iframe.html') ||
    window.location?.pathname?.includes('/storybook') ||
    document.getElementById('storybook-root') !== null ||
    document.querySelector('[id*="storybook"]') !== null ||
    // @ts-expect-error - Storybook 전역 변수
    window.__STORYBOOK_ADDONS_CHANNEL__ !== undefined
  )
}

/**
 * Portal로 사용할 최적의 DOM 요소를 반환
 *
 * - Storybook 환경: #storybook-root 또는 body
 * - 일반 환경: document.body
 */
export function getPortalContainer(): HTMLElement {
  if (typeof document === 'undefined') {
    throw new Error('getPortalContainer can only be called in browser environment')
  }

  if (isStorybookEnvironment()) {
    // Storybook 환경에서는 #storybook-root를 우선 사용
    const storybookRoot = document.getElementById('storybook-root')
    if (storybookRoot) {
      return storybookRoot
    }
    
    // #storybook-root가 없으면 body 사용
    return document.body
  }

  // 일반 환경에서는 body 사용
  return document.body
}

