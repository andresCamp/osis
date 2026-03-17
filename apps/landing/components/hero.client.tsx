'use client'

import Image from 'next/image'
import { CopyBox } from './copy-box.client'

const benefits = [
  'Product context that lives in your repo, not a SaaS silo',
  'Stop vibe coding and start building with clarity',
  'Specs your agents can actually read and build from',
]

const logos = [
  { src: '/logos/apple.svg', alt: 'Apple' },
  { src: '/logos/amazon.svg', alt: 'Amazon' },
  { src: '/logos/ycombinator.svg', alt: 'Y Combinator' },
  { src: '/logos/meta.svg', alt: 'Meta' },
  { src: '/logos/google.svg', alt: 'Google' },
  { src: '/logos/claude.svg', alt: 'Claude' },
  { src: '/logos/chatgpt.svg', alt: 'ChatGPT' },
]

export function HeroContent() {
  return (
    <div className="max-w-2xl space-y-8 text-center px-6">
      <h1 className="text-4xl md:text-5xl text-white leading-tight whitespace-nowrap">
        Build products people love, faster
      </h1>
      <p className="text-lg md:text-xl text-white/70 leading-relaxed">
        Osis automates product strategy and documentation using frameworks from the world&apos;s best companies
      </p>

      <div
        className="relative overflow-hidden w-full"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}
      >
        <div className="flex animate-scroll w-max will-change-transform">
          {[0, 1].map((set) => (
            <div key={set} className="flex gap-4 shrink-0" style={{ paddingRight: '1rem' }}>
              {logos.map((logo) => (
                <div key={`${logo.alt}-${set}`} className="relative h-7 w-24 shrink-0">
                  <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {benefits.map((line) => (
          <div key={line} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <span className="text-sm md:text-base text-white/70 leading-snug">{line}</span>
          </div>
        ))}
      </div>

    </div>
  )
}
