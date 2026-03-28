'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface CopyBoxProps {
  value: string
  className?: string
  onCopy?: () => void
}

export function CopyBox({ value, className = '', onCopy }: CopyBoxProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    onCopy?.()
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`inline-flex items-center rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm w-auto cursor-pointer ${className}`} onClick={handleCopy}>
      <button
        onClick={handleCopy}
        className="flex items-center justify-center px-3 py-3 text-white/60 hover:text-white transition-colors cursor-pointer"
        aria-label="Copy to clipboard"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
      <span
        className="whitespace-nowrap text-white/90 font-mono text-sm md:text-base py-3 pr-4"
      >
        {value}
      </span>
    </div>
  )
}
