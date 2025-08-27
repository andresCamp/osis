'use client'

import { motion, useScroll, useTransform, MotionValue } from 'motion/react'
import { useRef } from 'react'
import Image, { StaticImageData } from 'next/image'

interface Screen {
  title: string
  image: StaticImageData
}

interface StackedScreensProps {
  screens: Screen[]
}

export function StackedScreens({ screens }: StackedScreensProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  return (
    <div ref={containerRef} className="relative">
      {/* Create scroll space */}
      <div style={{ height: `${screens.length * 100}vh` }} />
      
      {/* Fixed positioned screens */}
      <div className="fixed inset-0">
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
  
  // Calculate when this screen should animate
  const segmentSize = 0.8 / (totalScreens - 1) // Divide by screens minus 1 since last doesn't fade
  const startOffset = 0.1 // Start at 10% scroll
  
  const startProgress = startOffset + (index * segmentSize)
  const endProgress = startOffset + ((index + 1) * segmentSize)
  
  // Create smooth transitions - hooks must be called unconditionally
  const blur = useTransform(
    scrollProgress,
    isLastScreen 
      ? [0, 1] // Last screen: no change across scroll
      : [startProgress, startProgress + segmentSize * 0.3, endProgress],
    isLastScreen
      ? ['blur(0px)', 'blur(0px)'] // Last screen never blurs
      : ['blur(0px)', 'blur(0px)', 'blur(20px)']
  )
  
  const opacity = useTransform(
    scrollProgress,
    isLastScreen
      ? [0, 1] // Last screen: no change across scroll
      : [startProgress, startProgress + segmentSize * 0.5, endProgress],
    isLastScreen
      ? [1, 1] // Last screen never fades
      : [1, 1, 0]
  )

  const processedText = screen.title.replace(/\\n/g, '\n')

  return (
    <motion.div
      className="absolute inset-0 w-full h-full bg-black"
      style={{
        filter: blur,
        opacity: opacity,
        zIndex: totalScreens - index,
      }}
    >
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src={screen.image} 
          alt={screen.title} 
          fill 
          sizes="100vw" 
          style={{
            objectFit: 'cover',
          }}
          quality={100}
          priority={index === 0}
        />
      </div>
      
      <div className="absolute inset-0 p-9 flex items-center justify-center z-10">
        <motion.p 
          className="text-white text-center text-4xl md:text-5xl leading-12 md:leading-14 whitespace-pre-line"
          style={{ opacity }}
        >
          {processedText}
        </motion.p>
      </div>
    </motion.div>
  )
}