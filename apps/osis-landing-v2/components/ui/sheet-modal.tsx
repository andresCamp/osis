"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import logo from "@/public/logos/osis-logo.svg"
import Image from "next/image"

type SheetModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  initialHeight?: string // e.g., "50vh"
  children: React.ReactNode
}

export function SheetModal({ open, onOpenChange, title, description, initialHeight = "50vh", children }: SheetModalProps) {
  React.useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100]">
      <div
        data-state="open"
        className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-[100] bg-black/50 backdrop-blur-xs"
      />
      <div
        data-state="open"
        className={cn(
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-[100] flex justify-center items-start overflow-y-auto overscroll-contain",
        )}
        aria-modal="true"
        role="dialog"
        onClick={(e) => { if (e.target === e.currentTarget) onOpenChange(false) }}
        style={{ paddingTop: `calc(100vh - ${initialHeight})` }}
      >
        <div
          data-state="open"
          className={cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom w-full max-w-xl rounded-t-4xl bg-black text-white border border-white/10",
            "mx-auto flex flex-col min-h-full",
          )}
        >
          <div className="px-4 pt-6 pb-2 text-center w-full flex flex-col flex-shrink-0 items-center justify-center">
            <Image src={logo} alt="Osis" width={25} height={25} />
            <h2 className="text-3xl mt-4 font-semibold">{title}</h2>
            {description && (
              <p className="text-gray-300 text-lg mt-1">{description}</p>
            )}
          </div>
          <div className="px-4 flex-1">
            {children}
          </div>
          <div className="px-4 pb-4 pt-16 flex-shrink-0">
            <button
              onClick={() => onOpenChange(false)}
              className="w-full py-4 text-lg bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
