'use client'

import { motion, useScroll, useTransform, MotionValue } from 'motion/react'
import { useRef } from 'react'
import Image, { StaticImageData } from 'next/image'
import { useMediaQuery } from '@/hooks/use-media-query'

interface Screen {
  id: string
  indicatorLabel: string
  title: string
  image: StaticImageData
  className?: string
}

interface StackedScreensProps {
  screens: Screen[]
}

const SCREEN_HOLD_VIEWPORTS = 1
const SCREEN_TRANSITION_VIEWPORTS = 0.7
const SCREEN_ENTRY_BLUR_AMOUNT = 14
const SCREEN_EXIT_BLUR_AMOUNT = 12
const DOT_IDLE_HEIGHT = 8
const DOT_ACTIVE_HEIGHT = 32

export function StackedScreens({ screens }: StackedScreensProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const viewportUnit = isMobile ? '100dvh' : '100vh'
  const totalScrollViewports = getTotalScrollViewports(screens.length)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })
  const storyProgress = useTransform(scrollYProgress, (latest) => latest * totalScrollViewports)

  const scrollToScreen = (index: number) => {
    if (!containerRef.current) return
    const containerTop = containerRef.current.offsetTop
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight
    const scrollPosition = containerTop + viewportHeight * getScreenStart(index)
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    })
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        height: `calc(${totalScrollViewports + 1} * ${viewportUnit})`,
      }}
    >
      <div
        className="sticky top-0 overflow-hidden"
        style={{
          height: viewportUnit,
        }}
      >
        {screens.map((screen, index) => (
          <AnimatedScreen
            key={screen.id}
            screen={screen}
            index={index}
            totalScreens={screens.length}
            storyProgress={storyProgress}
          />
        ))}
        <ScrollIndicator
          screens={screens}
          storyProgress={storyProgress}
          onDotClick={scrollToScreen}
        />
      </div>
    </div>
  )
}

interface AnimatedScreenProps {
  screen: Screen
  index: number
  totalScreens: number
  storyProgress: MotionValue<number>
}

function AnimatedScreen({ screen, index, totalScreens, storyProgress }: AnimatedScreenProps) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const opacity = useTransform(storyProgress, (latest) =>
    getScreenOpacity(latest, index, totalScreens)
  )
  const imageBlur = useTransform(storyProgress, (latest) =>
    `blur(${getScreenBlur(latest, index, totalScreens)}px)`
  )

  const processedText = screen.title.replace(/\\n/g, '\n')

  return (
    <motion.div
      className="absolute inset-0 w-full h-full overflow-visible bg-black"
      style={{
        opacity,
        zIndex: totalScreens - index,
        // Use dynamic viewport height on mobile to avoid browser chrome issues
        height: isMobile ? '100dvh' : undefined,
        overflow: isMobile ? 'visible' : undefined,
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          filter: imageBlur,
        }}
      >
        <Image
          src={screen.image}
          alt={screen.title}
          fill
          sizes="100vw"
          priority={index === 0}
          className={screen.className}
        />
      </motion.div>
      <div className="absolute inset-0 p-10 flex items-center justify-center z-10">
        <motion.p
          className="text-white text-center text-4xl md:text-5xl leading-12 md:leading-14 md:whitespace-pre-line"
        >
          {processedText}
        </motion.p>
      </div>
    </motion.div>
  )
}

interface ScrollIndicatorProps {
  screens: Screen[]
  storyProgress: MotionValue<number>
  onDotClick: (index: number) => void
}

function ScrollIndicator({ screens, storyProgress, onDotClick }: ScrollIndicatorProps) {
  const totalScreens = screens.length

  return (
    <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
      {screens.map((screen, index) => (
        <ScrollDot
          key={screen.id}
          index={index}
          label={screen.indicatorLabel}
          storyProgress={storyProgress}
          totalScreens={totalScreens}
          onClick={() => onDotClick(index)}
        />
      ))}
    </div>
  )
}

interface ScrollDotProps {
  index: number
  label: string
  storyProgress: MotionValue<number>
  totalScreens: number
  onClick: () => void
}

function ScrollDot({ index, label, storyProgress, totalScreens, onClick }: ScrollDotProps) {
  const pillHeight = useTransform(storyProgress, (latest) =>
    getIndicatorHeight(latest, index, totalScreens)
  )
  const opacity = useTransform(storyProgress, (latest) =>
    getIndicatorOpacity(latest, index, totalScreens)
  )

  return (
    <button
      onClick={onClick}
      className="flex w-2 items-center justify-center"
      aria-label={`Go to ${label}`}
    >
      <motion.div
        className="w-2 rounded-full bg-white"
        style={{
          height: pillHeight,
          opacity,
        }}
      />
    </button>
  )
}

function getScreenOpacity(progress: number, index: number, totalScreens: number) {
  const holdStart = getScreenStart(index)
  const entryStart = holdStart - SCREEN_TRANSITION_VIEWPORTS
  const holdEnd = holdStart + SCREEN_HOLD_VIEWPORTS
  const exitEnd = holdEnd + SCREEN_TRANSITION_VIEWPORTS
  const isFirstScreen = index === 0
  const isLastScreen = index === totalScreens - 1

  if (isFirstScreen && progress <= holdEnd) return 1

  if (progress < entryStart) return 0

  if (!isFirstScreen && progress < holdStart) {
    return easeInOutCubic(clamp((progress - entryStart) / SCREEN_TRANSITION_VIEWPORTS, 0, 1))
  }

  if (progress <= holdEnd) {
    return 1
  }

  if (isLastScreen) return 1

  if (progress >= exitEnd) return 0

  return 1 - easeInOutCubic(clamp((progress - holdEnd) / SCREEN_TRANSITION_VIEWPORTS, 0, 1))
}

function getScreenBlur(progress: number, index: number, totalScreens: number) {
  const holdStart = getScreenStart(index)
  const entryStart = holdStart - SCREEN_TRANSITION_VIEWPORTS
  const holdEnd = holdStart + SCREEN_HOLD_VIEWPORTS
  const exitEnd = holdEnd + SCREEN_TRANSITION_VIEWPORTS
  const isFirstScreen = index === 0
  const isLastScreen = index === totalScreens - 1

  if (isFirstScreen && progress <= holdEnd) return 0

  if (progress < entryStart) return SCREEN_ENTRY_BLUR_AMOUNT

  if (!isFirstScreen && progress < holdStart) {
    return (1 - easeInOutCubic(clamp((progress - entryStart) / SCREEN_TRANSITION_VIEWPORTS, 0, 1))) * SCREEN_ENTRY_BLUR_AMOUNT
  }

  if (progress <= holdEnd) {
    return 0
  }

  if (isLastScreen) return 0

  if (progress >= exitEnd) return SCREEN_EXIT_BLUR_AMOUNT

  return easeInOutCubic(clamp((progress - holdEnd) / SCREEN_TRANSITION_VIEWPORTS, 0, 1)) * SCREEN_EXIT_BLUR_AMOUNT
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function easeInOutCubic(value: number) {
  if (value < 0.5) return 4 * value * value * value

  return 1 - Math.pow(-2 * value + 2, 3) / 2
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3)
}

function getIndicatorOpacity(progress: number, index: number, totalScreens: number) {
  const amount = getIndicatorAmount(progress, index, totalScreens)
  const nextScreenStart = getScreenStart(index + 1)

  if (amount > 0) return 0.35 + amount * 0.65

  if (progress >= nextScreenStart) return 0.55

  return 0.35
}

function getIndicatorHeight(progress: number, index: number, totalScreens: number) {
  const amount = getIndicatorAmount(progress, index, totalScreens)
  return `${DOT_IDLE_HEIGHT + (DOT_ACTIVE_HEIGHT - DOT_IDLE_HEIGHT) * amount}px`
}

function getScreenStart(index: number) {
  return index * (SCREEN_HOLD_VIEWPORTS + SCREEN_TRANSITION_VIEWPORTS)
}

function getTotalScrollViewports(screenCount: number) {
  if (screenCount === 0) return 0

  return screenCount * SCREEN_HOLD_VIEWPORTS + (screenCount - 1) * SCREEN_TRANSITION_VIEWPORTS
}

function getIndicatorAmount(progress: number, index: number, totalScreens: number) {
  const holdStart = getScreenStart(index)
  const holdEnd = holdStart + SCREEN_HOLD_VIEWPORTS
  const previousTransitionStart = holdStart - SCREEN_TRANSITION_VIEWPORTS
  const isFirstScreen = index === 0
  const isLastScreen = index === totalScreens - 1

  if (!isFirstScreen && progress < previousTransitionStart) return 0

  if (!isFirstScreen && progress < holdStart) {
    return clamp((progress - previousTransitionStart) / SCREEN_TRANSITION_VIEWPORTS, 0, 1)
  }

  if (progress <= holdEnd) {
    return 1
  }

  if (isLastScreen) return 1

  const nextScreenStart = getScreenStart(index + 1)

  if (progress < nextScreenStart) {
    return 1 - clamp((progress - holdEnd) / SCREEN_TRANSITION_VIEWPORTS, 0, 1)
  }

  return 0
}
