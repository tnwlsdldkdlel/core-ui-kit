/**
 * 키보드 이벤트 핸들러 유틸리티 함수
 */

import type { KeyboardEvent } from 'react'

/**
 * 키보드 이벤트 타입
 */
export type KeyboardHandler = (e: KeyboardEvent<HTMLElement>) => void

/**
 * Roving Tabindex를 위한 키보드 핸들러 옵션
 */
export interface RovingTabindexOptions {
  /**
   * 현재 활성 인덱스
   */
  activeIndex: number
  /**
   * 활성 인덱스 변경 핸들러
   */
  setActiveIndex: (index: number) => void
  /**
   * 포커스 가능한 요소 목록
   */
  focusableElements: HTMLElement[]
  /**
   * 선택 핸들러 (Enter/Space 키)
   */
  onSelect?: (index: number) => void
  /**
   * 수평 방향 여부 (ArrowLeft/ArrowRight 사용)
   * @default false (ArrowUp/ArrowDown 사용)
   */
  horizontal?: boolean
}

/**
 * Roving Tabindex 키보드 핸들러 생성
 */
export function createRovingTabindexHandler(
  options: RovingTabindexOptions
): KeyboardHandler {
  const {
    activeIndex,
    setActiveIndex,
    focusableElements,
    onSelect,
    horizontal = false,
  } = options

  return (e: KeyboardEvent<HTMLElement>) => {
    const { key } = e
    const maxIndex = focusableElements.length - 1

    if (horizontal) {
      switch (key) {
        case 'ArrowLeft': {
          e.preventDefault()
          const prevIndex = activeIndex > 0 ? activeIndex - 1 : maxIndex
          setActiveIndex(prevIndex)
          focusableElements[prevIndex]?.focus()
          break
        }
        case 'ArrowRight': {
          e.preventDefault()
          const nextIndex = activeIndex < maxIndex ? activeIndex + 1 : 0
          setActiveIndex(nextIndex)
          focusableElements[nextIndex]?.focus()
          break
        }
        case 'Home': {
          e.preventDefault()
          setActiveIndex(0)
          focusableElements[0]?.focus()
          break
        }
        case 'End': {
          e.preventDefault()
          setActiveIndex(maxIndex)
          focusableElements[maxIndex]?.focus()
          break
        }
        case 'Enter':
        case ' ': {
          e.preventDefault()
          onSelect?.(activeIndex)
          break
        }
      }
    } else {
      switch (key) {
        case 'ArrowUp': {
          e.preventDefault()
          const prevIndex = activeIndex > 0 ? activeIndex - 1 : maxIndex
          setActiveIndex(prevIndex)
          focusableElements[prevIndex]?.focus()
          break
        }
        case 'ArrowDown': {
          e.preventDefault()
          const nextIndex = activeIndex < maxIndex ? activeIndex + 1 : 0
          setActiveIndex(nextIndex)
          focusableElements[nextIndex]?.focus()
          break
        }
        case 'Home': {
          e.preventDefault()
          setActiveIndex(0)
          focusableElements[0]?.focus()
          break
        }
        case 'End': {
          e.preventDefault()
          setActiveIndex(maxIndex)
          focusableElements[maxIndex]?.focus()
          break
        }
        case 'Enter':
        case ' ': {
          e.preventDefault()
          onSelect?.(activeIndex)
          break
        }
      }
    }
  }
}

/**
 * Focus Trap을 위한 키보드 핸들러 생성
 */
export function createFocusTrapHandler(
  container: HTMLElement | null,
  onEscape?: () => void
): KeyboardHandler {
  return (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape') {
      onEscape?.()
      return
    }

    if (e.key !== 'Tab') return

    if (!container) return

    const focusableElements = Array.from(
      container.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => {
      const style = window.getComputedStyle(el)
      return style.display !== 'none' && style.visibility !== 'hidden'
    })

    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (e.shiftKey) {
      // Shift + Tab: 역방향
      if (document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      }
    } else {
      // Tab: 정방향
      if (document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }
  }
}

