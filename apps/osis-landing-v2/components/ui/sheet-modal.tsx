"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type SheetModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialHeight?: string // e.g., "50vh"
  children: React.ReactNode
}

export function SheetModal({ open, onOpenChange, initialHeight = "50vh", children }: SheetModalProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const [dragStartY, setDragStartY] = React.useState(0)
  const [dragCurrentY, setDragCurrentY] = React.useState(0)
  const sheetRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [open])

  const handleDragStart = (clientY: number) => {
    setIsDragging(true)
    setDragStartY(clientY)
    setDragCurrentY(clientY)
  }

  const handleDragMove = (clientY: number) => {
    if (!isDragging) return
    const deltaY = clientY - dragStartY
    if (deltaY > 0) { // Only allow downward drag
      setDragCurrentY(clientY)
      if (sheetRef.current) {
        sheetRef.current.style.transform = `translateY(${deltaY}px)`
      }
    }
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    const deltaY = dragCurrentY - dragStartY
    const threshold = 100 // Close if dragged down more than 100px
    
    if (deltaY > threshold) {
      onOpenChange(false)
    } else {
      // Snap back
      if (sheetRef.current) {
        sheetRef.current.style.transform = 'translateY(0px)'
      }
    }
    setIsDragging(false)
  }

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
          ref={sheetRef}
          data-state="open"
          className={cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom w-full max-w-xl rounded-t-4xl bg-black text-white border border-white/10",
            "mx-auto flex flex-col min-h-full transition-transform duration-200",
          )}
        >
          <div 
            className="px-4 pt-6 pb-2 w-full flex flex-col flex-shrink-0 items-center justify-center cursor-grab active:cursor-grabbing"
            onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientY)}
            onTouchEnd={handleDragEnd}
            onMouseDown={(e) => handleDragStart(e.clientY)}
            onMouseMove={(e) => handleDragMove(e.clientY)}
            onMouseUp={handleDragEnd}
          >
            <div className="w-12 h-1 bg-white/20 rounded-full mb-4" />
          </div>
          <div className="flex-1">
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
