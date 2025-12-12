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
  async postVisit(page: Page, context: { id: string; title: string }) {
    // Storybook A11y Addon이 이미 접근성 검사를 수행하므로
    // 여기서는 기본적인 검증만 수행합니다
    
    // 스토리가 정상적으로 렌더링되었는지 확인
    const root = await page.locator('#storybook-root')
    await root.waitFor({ state: 'visible' })
    
    // Modal 컴포넌트 스토리에 대한 추가 검증
    if (context.title.includes('Components/Modal')) {
      await testModalRendering(page, context)
    }
    
    // TODO: @axe-core/playwright 설치 후 접근성 검사 추가 가능
    // import { injectAxe, checkA11y } from '@axe-core/playwright'
    // await injectAxe(page)
    // await checkA11y(page, '#storybook-root', { ... })
  },
}

/**
 * Modal 컴포넌트 렌더링 테스트
 */
async function testModalRendering(page: Page, context: { id: string; title: string }) {
  // Modal 열기 버튼이 있는 경우 클릭
  const openButton = page.locator('button:has-text("Modal 열기"), button:has-text("오버레이 클릭으로 닫기"), button:has-text("제목 없는 Modal"), button:has-text("닫기 버튼 없는 Modal"), button:has-text("폼 Modal 열기"), button:has-text("긴 콘텐츠 Modal")')
  
  if (await openButton.count() > 0) {
    // 버튼 클릭하여 Modal 열기
    await openButton.first().click()
    
    // Modal이 렌더링될 때까지 대기
    await page.waitForTimeout(100)
    
    // 오버레이 확인 (fixed positioning, 배경색)
    const overlay = page.locator('[role="presentation"]').first()
    if (await overlay.count() > 0) {
      const overlayStyles = await overlay.evaluate((el) => {
        const styles = window.getComputedStyle(el)
        return {
          position: styles.position,
          zIndex: styles.zIndex,
          backgroundColor: styles.backgroundColor,
          display: styles.display,
        }
      })
      
      // 오버레이가 fixed positioning인지 확인
      if (overlayStyles.position !== 'fixed') {
        throw new Error(
          `Modal overlay should have position: fixed, but got: ${overlayStyles.position}`
        )
      }
      
      // 오버레이가 보이는지 확인 (배경색이 투명하지 않아야 함)
      if (
        overlayStyles.backgroundColor === 'rgba(0, 0, 0, 0)' ||
        overlayStyles.backgroundColor === 'transparent'
      ) {
        throw new Error(
          `Modal overlay should be visible, but backgroundColor is: ${overlayStyles.backgroundColor}`
        )
      }
      
      // z-index가 충분히 높은지 확인 (10000 이상)
      const zIndexValue = parseInt(overlayStyles.zIndex, 10)
      if (zIndexValue < 10000) {
        console.warn(
          `Modal overlay z-index (${zIndexValue}) might be too low for Storybook environment`
        )
      }
    }
    
    // Modal 다이얼로그 확인
    const modalDialog = page.locator('[role="dialog"]').first()
    if (await modalDialog.count() > 0) {
      const dialogStyles = await modalDialog.evaluate((el) => {
        const styles = window.getComputedStyle(el)
        return {
          position: styles.position,
          display: styles.display,
        }
      })
      
      // Modal이 flex 컨테이너 내부에 있는지 확인
      const parentStyles = await modalDialog.evaluate((el) => {
        const parent = el.parentElement
        if (!parent) return null
        const styles = window.getComputedStyle(parent)
        return {
          display: styles.display,
          alignItems: styles.alignItems,
          justifyContent: styles.justifyContent,
        }
      })
      
      if (parentStyles) {
        // 부모가 flex 컨테이너여야 중앙 정렬이 가능
        if (parentStyles.display !== 'flex') {
          throw new Error(
            `Modal parent should have display: flex for centering, but got: ${parentStyles.display}`
          )
        }
      }
    }
  }
}

export default config

