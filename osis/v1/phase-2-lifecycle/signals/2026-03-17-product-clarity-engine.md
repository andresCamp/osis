---
type: note
date: 2026-03-17
source: founder conversation
affected: product-spec.md, vision.md
summary: Core concepts for Phase 2+ — modules, stages, product clarity engine, the five pain points, lifecycle framework.
---

## Raw Notes (founder)

shadcn for product management

installs directly into your repo, interact through your favorite cli agent

turn claude code into a product expert
- lives directly in your codebase
- enables spec driven development, organizes your building into a protocol
- documentation maintenance is automatic
- product clarity

**product clarity engine**

### The core problem Osis solves:

**AI has made building technically trivial, but knowing WHAT to build remains impossibly hard.**

Everyone can now code with Cursor/Claude. But they're building products nobody wants because they skip the critical pre-coding work: customer discovery, market analysis, value proposition design, competitive positioning.

The specific pain points:
1. **Context resets constantly** - Every ChatGPT conversation starts from zero. Founders re-explain their business 50 times a day to different AI tools.
2. **Product knowledge is scattered** - Customer insights in Notion, competitors in spreadsheets, roadmap in Linear, strategy in Google Docs. Nothing connects.
3. **Elite frameworks are gatekept** - Amazon's Working Backwards, Apple's product process, YC's advice - this knowledge exists but isn't operationalized for normal builders.
4. **Documentation dies immediately** - PRDs written once, never updated. Customer interviews recorded, never synthesized. Everything becomes stale.
5. **Multiple ideas fragment attention** - Builders juggle 3-5 ideas simultaneously with no system to manage context switching.

The result: Builders ship features nobody wants, pivot endlessly, and burn out because they're coding solutions to problems that don't exist.

Osis makes product strategy as automated as code generation. Your venture has persistent memory, elite frameworks guide decisions, and documentation maintains itself. You build with the confidence of a second-time founder even if it's your first product.

The transformation: From "I can build anything" to "I know exactly what to build and why it will win."

## Key Concepts Surfaced

### Modules
The document payload concept evolved. A module is a unit of conversation with document output that moves the product forward in terms of product clarity or specs. Modules are applied based on what is needed. Examples: vision module, product spec module, GTM module, competitive analysis module. This replaces "spec types" and "plugins" as the vocabulary.

### Stages (needs more research)
Inspired by the idea state machine (idea → mockup → prototype → program → product → business → profits). The insight: the stage lives in osis.json as context for the agent, not as a gate for the user. Multiple versions can exist within one stage. The stages themselves need rethinking for the AI era — the 15-year-old framework is dated. With specs and agents, idea → prototype can happen in a day.

Founder's own stage thinking: idea is fragile thought, concept has research behind it, prototype is something you can show people, MVP is MVP, product is production code someone can buy. But the system must not create overhead — it should be opinionated but get out of the way.

### Product Clarity Engine
The framing that ties everything together. Osis is not a doc generator or a process tool. It's a clarity engine. The five pain points above define the problem space. The modules define the solution space. The stages define the journey.

### Adaptive Payload (confirmed)
The product spec generates the protocol structure. No tier selection, no configuration. The conversation reveals what modules are needed, and the agent scaffolds exactly those. The protocol is always right-sized because it's derived from the product spec itself.

### Lifecycle Vision (Phase 2+)
At some point Osis becomes helping you think through signal vs noise as you user test and iterate the product to PMF. The long-term goal: a system that guides you from idea to PMF. 0 → 1,000,000.

### Landing Page Copy Direction
- "Stop vibe coding" — the hook
- "From 'I can build anything' to 'I know exactly what to build and why it will win'" — the before/after
- "Product clarity engine" — the descriptor
- "Spec-driven development" — the methodology
