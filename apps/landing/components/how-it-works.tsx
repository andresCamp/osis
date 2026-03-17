'use client'

import { CopyBox } from './copy-box.client'

const steps = [
  {
    number: '1',
    title: 'Install the skill',
    description: 'One command. No accounts, no config, no SaaS.',
    content: 'install',
  },
  {
    number: '2',
    title: 'Say "osis"',
    description: 'In Claude Code, Codex, or any agent CLI that supports skills.',
    content: 'talk',
  },
  {
    number: '3',
    title: 'Bootstrap & build',
    description:
      'Osis scans your codebase, creates a digital twin, seeds your specs, and starts a conversation about what to build next.',
    content: 'build',
  },
]

export function HowItWorks() {
  return (
    <section className="relative bg-black py-24 md:py-32 px-6">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl md:text-4xl text-white text-left sm:text-center mb-4">
          Get started in 30 seconds
        </h2>
        <p className="text-white/50 text-left sm:text-center text-lg mb-16">
          No setup. No dashboard. Just you, your codebase, and a conversation.
        </p>

        <div className="space-y-12">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                <span className="text-white/70 font-mono text-sm">
                  {step.number}
                </span>
              </div>
              <div className="space-y-3 pt-1.5">
                <h3 className="text-xl text-white">{step.title}</h3>
                <p className="text-white/50 leading-relaxed">
                  {step.description}
                </p>
                {step.content === 'install' && (
                  <CopyBox value="npx skills add andresCamp/osis" />
                )}
                {step.content === 'talk' && (
                  <div className="inline-flex items-center rounded-lg border border-white/20 bg-white/5 px-4 py-3">
                    <span className="font-mono text-sm md:text-base text-white/90">
                      <span className="text-white/40">{'> '}</span>osis
                    </span>
                  </div>
                )}
                {step.content === 'build' && (
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4 font-mono text-sm text-white/60 space-y-1">
                    <p>
                      <span className="text-white/30">osis/</span>
                    </p>
                    <p>
                      {'  '}
                      <span className="text-white/70">twin.md</span>
                      <span className="text-white/30">
                        {'           ← what your product IS'}
                      </span>
                    </p>
                    <p>
                      {'  '}
                      <span className="text-white/70">v1/vision.md</span>
                      <span className="text-white/30">
                        {'      ← why it exists'}
                      </span>
                    </p>
                    <p>
                      {'  '}
                      <span className="text-white/70">v1/product-spec.md</span>
                      <span className="text-white/30">{' ← what to build next'}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
