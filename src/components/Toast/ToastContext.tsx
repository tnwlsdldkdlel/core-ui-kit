import { createContext } from 'react'
import type { ToastOptions } from './ToastProvider'

interface ToastItem extends ToastOptions {
  id: string
}

interface ToastContextValue {
  toasts: ToastItem[]
  toast: (options: ToastOptions) => string
  dismiss: (id: string) => void
  dismissAll: () => void
}

export const ToastContext = createContext<ToastContextValue | undefined>(undefined)

