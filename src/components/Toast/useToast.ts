import { useContext } from 'react'
import { ToastContext } from './ToastContext'

/**
 * useToast 훅
 *
 * Toast를 표시하기 위한 훅입니다.
 */
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

