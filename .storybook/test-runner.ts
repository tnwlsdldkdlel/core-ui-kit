import type { TestRunnerConfig } from '@storybook/test-runner'
import type { Page } from 'playwright'

const config: TestRunnerConfig = {
  /**
   * 각 스토리 방문 전 실행
   * - 페이지 로드 대기
   */
  async preVisit(page: Page) {
    // 페이지 로드 대기
    await page.waitForLoadState('networkidle')
  },
  
  /**
   * 각 스토리 방문 후 검증
   * - Storybook A11y Addon이 자동으로 접근성 검사를 수행합니다
   * - 추가적인 접근성 테스트가 필요한 경우 @axe-core/playwright를 설치하여 사용할 수 있습니다
   */
  async postVisit(page: Page) {
    // Storybook A11y Addon이 이미 접근성 검사를 수행하므로
    // 여기서는 기본적인 검증만 수행합니다
    
    // 스토리가 정상적으로 렌더링되었는지 확인
    const root = await page.locator('#storybook-root')
    await root.waitFor({ state: 'visible' })
    
    // TODO: @axe-core/playwright 설치 후 접근성 검사 추가 가능
    // import { injectAxe, checkA11y } from '@axe-core/playwright'
    // await injectAxe(page)
    // await checkA11y(page, '#storybook-root', { ... })
  },
}

export default config

