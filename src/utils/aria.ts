/**
 * ARIA 속성 헬퍼 함수
 */

/**
 * 고유 ID 생성
 */
export function generateId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * ARIA 속성 객체 생성
 */
export interface AriaAttributes {
  role?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'aria-expanded'?: boolean
  'aria-selected'?: boolean
  'aria-disabled'?: boolean
  'aria-hidden'?: boolean
  'aria-live'?: 'polite' | 'assertive' | 'off'
  'aria-atomic'?: boolean
  'aria-modal'?: boolean
  'aria-haspopup'?: 'true' | 'false' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'
}

/**
 * Dialog ARIA 속성 생성
 */
export function createDialogAriaProps(
  titleId?: string,
  descriptionId?: string
): AriaAttributes {
  return {
    role: 'dialog',
    'aria-modal': true,
    ...(titleId && { 'aria-labelledby': titleId }),
    ...(descriptionId && { 'aria-describedby': descriptionId }),
  }
}

/**
 * Listbox ARIA 속성 생성
 */
export function createListboxAriaProps(
  labelId?: string,
  expanded?: boolean
): AriaAttributes {
  return {
    role: 'listbox',
    ...(labelId && { 'aria-labelledby': labelId }),
    ...(expanded !== undefined && { 'aria-expanded': expanded }),
  }
}

/**
 * Option ARIA 속성 생성
 */
export function createOptionAriaProps(
  selected?: boolean,
  disabled?: boolean
): AriaAttributes {
  return {
    role: 'option',
    ...(selected !== undefined && { 'aria-selected': selected }),
    ...(disabled !== undefined && { 'aria-disabled': disabled }),
  }
}

/**
 * Tab ARIA 속성 생성
 */
export function createTabAriaProps(selected: boolean): AriaAttributes {
  return {
    role: 'tab',
    'aria-selected': selected,
  }
}

/**
 * Tabpanel ARIA 속성 생성
 */
export function createTabpanelAriaProps(tabId?: string): AriaAttributes {
  return {
    role: 'tabpanel',
    ...(tabId && { 'aria-labelledby': tabId }),
  }
}

/**
 * Status/Alert ARIA 속성 생성
 */
export function createStatusAriaProps(
  urgent: boolean = false,
  atomic: boolean = true
): AriaAttributes {
  return {
    role: 'status',
    'aria-live': urgent ? 'assertive' : 'polite',
    'aria-atomic': atomic,
  }
}

