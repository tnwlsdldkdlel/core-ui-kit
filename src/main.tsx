import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="p-8">
      <h1 className="text-2xl font-bold">CoreUI Kit</h1>
      <p className="mt-4 text-gray-600">UI 컴포넌트 라이브러리</p>
    </div>
  </StrictMode>,
)

