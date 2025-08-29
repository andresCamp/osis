"use client"

import * as React from "react"
import { CheckIcon, Copy } from "lucide-react"

export const ReferralLink = () => {
  const [copied, setCopied] = React.useState(false)
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 text-lg xl:text-sm text-white/50 hover:text-white/60 transition-colors mx-auto cursor-pointer"
    >
      <span>Send to a friend</span>
      {copied ? (
        <CheckIcon className="w-4 h-4 text-green-500" />
      ) : (
        <Copy className="w-4 h-4 text-white/60" />
      )}
    </button>
  )
}
