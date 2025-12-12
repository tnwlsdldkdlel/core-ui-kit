/**
 * 포커스 관리 유틸리티 함수
 */

/**
 * 포커스 가능한 요소 선택자
 */
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

/**
 * 요소가 포커스 가능한지 확인
 */
function isFocusable(element: HTMLElement): boolean {
  if (element.tabIndex < 0) return false

  const style = window.getComputedStyle(element)
  return style.display !== 'none' && style.visibility !== 'hidden'
}

/**
 * 컨테이너 내의 모든 포커스 가능한 요소를 반환
 */
export function getFocusableElements(
  container: HTMLElement | null
): HTMLElement[] {
  if (!container) return []

  const elements = Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
  )

  return elements.filter(isFocusable)
}

/**
 * 첫 번째 포커스 가능한 요소로 포커스 이동
 */
export function focusFirstElement(container: HTMLElement | null): boolean {
  const elements = getFocusableElements(container)
  if (elements.length === 0) return false

  elements[0].focus()
  return true
}

/**
 * 마지막 포커스 가능한 요소로 포커스 이동
 */
export function focusLastElement(container: HTMLElement | null): boolean {
  const elements = getFocusableElements(container)
  if (elements.length === 0) return false

  elements[elements.length - 1].focus()
  return true
}

/**
 * 다음 포커스 가능한 요소로 이동 (순환)
 */
export function focusNextElement(
  container: HTMLElement | null,
  currentElement: HTMLElement | null
): boolean {
  if (!currentElement) return focusFirstElement(container)

  const elements = getFocusableElements(container)
  const currentIndex = elements.indexOf(currentElement)

  if (currentIndex === -1) return focusFirstElement(container)

  const nextIndex = (currentIndex + 1) % elements.length
  elements[nextIndex].focus()
  return true
}

/**
 * 이전 포커스 가능한 요소로 이동 (순환)
 */
export function focusPreviousElement(
  container: HTMLElement | null,
  currentElement: HTMLElement | null
): boolean {
  if (!currentElement) return focusLastElement(container)

  const elements = getFocusableElements(container)
  const currentIndex = elements.indexOf(currentElement)

  if (currentIndex === -1) return focusLastElement(container)

  const prevIndex = currentIndex === 0 ? elements.length - 1 : currentIndex - 1
  elements[prevIndex].focus()
  return true
}

