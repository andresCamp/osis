'use client'

import { motion, useScroll, useTransform, MotionValue } from 'motion/react'
import React, { useRef } from 'react'
import Image, { StaticImageData } from 'next/image'
import { useMediaQuery } from '@/hooks/use-media-query'

interface Screen {
  title: string
  image?: StaticImageData
  className?: string
  content?: React.ReactNode
}

interface StackedScreensProps {
  screens: Screen[]
}

export function StackedScreens({ screens }: StackedScreensProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const scrollToScreen = (index: number) => {
    // Each screen takes exactly 1 viewport height
    const scrollPosition = window.innerHeight * index
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    })
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Create scroll space */}
      <div style={{ height: `${screens.length * 100}vh` }} />
      
      {/* Fixed positioned screens */}
      <div className="fixed inset-0" style={{ height: isMobile ? '100dvh' : undefined }}>
        {screens.map((screen, index) => (
          <AnimatedScreen
            key={index}
            screen={screen}
            index={index}
            totalScreens={screens.length}
            scrollProgress={scrollYProgress}
          />
        ))}
      </div>
      
      {/* Scroll indicator */}
      <ScrollIndicator 
        totalScreens={screens.length} 
        scrollProgress={scrollYProgress}
        onDotClick={scrollToScreen}
      />
    </div>
  )
}

interface AnimatedScreenProps {
  screen: Screen
  index: number
  totalScreens: number
  scrollProgress: MotionValue<number>
}

function AnimatedScreen({ screen, index, totalScreens, scrollProgress }: AnimatedScreenProps) {
  const isLastScreen = index === totalScreens - 1
  const isMobile = useMediaQuery('(max-width: 768px)')
  
  // Each screen gets exactly 1/totalScreens of the scroll range
  const segmentSize = 1 / totalScreens
  
  // Each screen starts animating at its index position
  const startProgress = index * segmentSize
  const endProgress = (index + 1) * segmentSize
  const midPoint = (startProgress + endProgress) / 2
  
  // Create smooth transitions - hooks must be called unconditionally
  const blur = useTransform(
    scrollProgress,
    isLastScreen 
      ? [0, 1] // Last screen: no change across scroll
      : [0, startProgress, midPoint, endProgress],
    isLastScreen
      ? ['blur(0px)', 'blur(0px)'] // Last screen never blurs
      : ['blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(25px)']
  )
  
  const opacity = useTransform(
    scrollProgress,
    isLastScreen
      ? [0, 1] // Last screen: no change across scroll
      : [0, startProgress, midPoint, endProgress],
    isLastScreen
      ? [1, 1] // Last screen never fades
      : [1, 1, 1, 0]
  )

  const processedText = screen.title.replace(/\\n/g, '\n')

  return (
    <motion.div
      className="absolute inset-0 w-full h-full overflow-visible bg-black"
      style={{
        filter: blur,
        opacity: opacity,
        zIndex: totalScreens - index,
        // Use dynamic viewport height on mobile to avoid browser chrome issues
        height: isMobile ? '100dvh' : undefined,
        overflow: isMobile ? 'visible' : undefined,
      }}
    >
      {screen.content ? (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {screen.content}
        </div>
      ) : (
        <>
          {screen.image && (
            <Image
              src={screen.image}
              alt={screen.title}
              fill
              sizes="100vw"
              priority={index === 0}
              className={screen.className}
            />
          )}
          <div className="absolute inset-0 p-10 flex items-center justify-center z-10">
            <motion.p
              className="text-white text-center text-4xl md:text-5xl leading-12 md:leading-14 md:whitespace-pre-line"
              style={{ opacity }}
            >
              {processedText}
            </motion.p>
          </div>
        </>
      )}
    </motion.div>
  )
}

interface ScrollIndicatorProps {
  totalScreens: number
  scrollProgress: MotionValue<number>
  onDotClick: (index: number) => void
}

function ScrollIndicator({ totalScreens, scrollProgress, onDotClick }: ScrollIndicatorProps) {
  // Peak each dot when a new 100vh screen hits the top of the viewport
  // Map progress [0..1] -> [0..totalScreens], clamped just below the max to avoid overflow
  const activeIndex = useTransform(scrollProgress, (v) => Math.min(v * totalScreens, totalScreens - 0.001))
  
  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
      {Array.from({ length: totalScreens }).map((_, index) => (
        <ScrollDot
          key={index}
          index={index}
          activeIndex={activeIndex}
          onClick={() => onDotClick(index)}
        />
      ))}
    </div>
  )
}

interface ScrollDotProps {
  index: number
  activeIndex: MotionValue<number>
  onClick: () => void
}

function ScrollDot({ index, activeIndex, onClick }: ScrollDotProps) {
  // Transform height based on proximity to active index
  const height = useTransform(
    activeIndex,
    [index - 0.5, index, index + 0.5],
    ['8px', '32px', '8px']
  )
  
  // Transform opacity based on proximity to active index
  const opacity = useTransform(
    activeIndex,
    [index - 0.5, index, index + 0.5],
    [0.3, 1, 0.3]
  )
  
  return (
    <motion.button
      onClick={onClick}
      className="w-2 rounded-full bg-white"
      style={{
        height,
        opacity
      }}
      aria-label={`Go to screen ${index + 1}`}
    />
  )
}