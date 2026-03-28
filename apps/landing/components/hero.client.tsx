'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, Copy } from 'lucide-react'
import { CopyBox } from './copy-box.client'

const benefits = [
  {
    title: 'Repo-native context',
    description: 'Product context that lives in your repo, not a SaaS silo.',
  },
  {
    title: 'Build with clarity',
    description: 'Stop vibe coding. Structured specs tell you and your agents exactly what to build next.',
  },
  {
    title: 'Agent-readable specs',
    description: 'Specs your agents can actually read and build from. No copy-pasting context into prompts.',
  },
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

const INSTALL_COMMAND = 'npx skills add andresCamp/osis'

function InstallButton() {
  const [copied, setCopied] = useState(false)
  const [flash, setFlash] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(INSTALL_COMMAND)
    setCopied(true)
    setFlash(true)
    setTimeout(() => setFlash(false), 600)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex justify-center">
      <div className="group relative">
        <div
          className={`absolute rounded-full blur-md animate-rainbow-spin transition-all duration-500 ${flash ? '-inset-3 opacity-100 blur-xl' : '-inset-1.5 opacity-75 group-hover:opacity-100 blur-lg'}`}
          style={{ background: 'conic-gradient(from var(--rainbow-angle), #ff0000, #ff8000, #ffff00, #00ff00, #0080ff, #8000ff, #ff0080, #ff0000)' }}
        />
        <button
          onClick={handleCopy}
          className="relative inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-white text-black rounded-full text-sm sm:text-base font-medium cursor-pointer min-w-[280px] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 hover:scale-[1.02]"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied to clipboard
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Install skill
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export function HeroContent() {
  return (
    <div className="w-full max-w-4xl space-y-6 sm:space-y-8 text-left sm:text-center px-4 sm:px-6 overflow-hidden">
      <h1 className="text-4xl sm:text-5xl md:text-6xl text-white leading-tight">
        Build products people love, faster
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed">
        World-class product management, open sourced as a skill for your agent.
      </p>

      <InstallButton />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 text-left">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-6 space-y-2 sm:space-y-3">
            <h3 className="text-base sm:text-lg text-white">{benefit.title}</h3>
            <p className="text-xs sm:text-sm text-white/50 leading-relaxed">{benefit.description}</p>
          </div>
        ))}
      </div>

      <p className="text-xs sm:text-sm text-white/40 uppercase tracking-widest">
        Build like the world&apos;s best companies
      </p>
      <div
        className="relative overflow-hidden w-full !mt-3"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}
      >
        <div className="flex animate-scroll w-max will-change-transform">
          {[0, 1].map((set) => (
            <div key={set} className="flex gap-4 shrink-0" style={{ paddingRight: '1rem' }}>
              {logos.map((logo) => (
                <div key={`${logo.alt}-${set}`} className="relative h-6 w-20 sm:h-7 sm:w-24 shrink-0">
                  <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
