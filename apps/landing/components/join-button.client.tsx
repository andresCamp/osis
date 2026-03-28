'use client'

import { useState } from 'react'
import { CopyBox } from './copy-box.client'

export const JoinButton = () => {
  const [flash, setFlash] = useState(false)

  const handleCopy = () => {
    setFlash(true)
    setTimeout(() => setFlash(false), 600)
  }

  return (
    <div className="py-4 pointer-events-auto">
      <div className="group relative">
        <div
          className={`absolute rounded-lg animate-rainbow-spin transition-all duration-500 ${flash ? '-inset-3 opacity-100 blur-xl' : '-inset-1 opacity-0 group-hover:opacity-50 blur-md'}`}
          style={{ background: 'conic-gradient(from var(--rainbow-angle), #ff0000, #ff8000, #ffff00, #00ff00, #0080ff, #8000ff, #ff0080, #ff0000)' }}
        />
        <div className="relative">
          <CopyBox value="npx skills add andresCamp/osis" onCopy={handleCopy} />
        </div>
      </div>
    </div>
  )
}
