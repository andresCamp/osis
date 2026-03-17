const abilities = [
  {
    title: 'Digital Twin',
    description:
      'A mechanical, product-level description of your entire codebase. What systems exist, what they do, how they connect. The first thing any agent reads before touching code.',
  },
  {
    title: 'Structured Specs',
    description:
      'Vision flows to product spec, product spec to phases, phases to system specs. Each level constrains the one below it. Discoveries flow back up.',
  },
  {
    title: 'Conversational Strategy',
    description:
      'The agent pushes back. It asks hard questions, surfaces contradictions, and drives toward first principles. The friction is the feature.',
  },
  {
    title: 'Signal Processing',
    description:
      'User interviews, shower thoughts, broken tests, competitor launches — any input becomes a signal. The agent extracts insight and routes it to the right spec.',
  },
  {
    title: 'Drift Detection',
    description:
      'Code gets ahead of specs, or specs describe features never built. Osis detects when your codebase and your plan diverge, and starts the conversation to reconcile them.',
  },
  {
    title: 'Files, Not SaaS',
    description:
      'Everything lives in your repo as markdown. Versioned by git. Works offline. No vendor lock-in. If Osis disappears tomorrow, your specs survive.',
  },
]

export function CoreAbilities() {
  return (
    <section className="relative bg-black py-24 md:py-32 px-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl text-white text-left sm:text-center mb-4">
          What Osis does
        </h2>
        <p className="text-white/50 text-left sm:text-center text-lg mb-16 max-w-2xl sm:mx-auto">
          Product management as a protocol. Installed like a dependency, maintained through conversation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {abilities.map((ability) => (
            <div
              key={ability.title}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-6 space-y-3"
            >
              <h3 className="text-lg text-white">{ability.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                {ability.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
