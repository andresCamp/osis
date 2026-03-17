'use client'

import { CopyBox } from './copy-box.client'

const benefits = [
  'Every insight, pivot, and decision — connected and never stale',
  'Strategy docs that write themselves from your product context',
  'Your entire tool stack gets smarter with product intelligence',
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
