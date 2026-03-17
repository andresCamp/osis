# Digital Twin — Osis

Last updated: 2026-03-16

## Master Diagram

```
================================================================
                        OSIS (osis.dev)
================================================================

  VISITORS
     |
     v
+---------------------------+
|     Landing Site          |
|     (osis-landing-v2)     |
|                           |
|  Scroll-based hero        |
|  4 stacked screens        |    +------------------+
|  with manifesto copy      +--->| Analytics        |
|                           |    | (PostHog)        |
|  "Sign Up for Early       |    +------------------+
|   Access" CTA             |
|     |                     |
|     v                     |
|  Waitlist Modal           |
|  (name, email, company)   |
|     |                     |
+-----+---------------------+
      |
      v
+---------------------------+       +------------------+
|  Waitlist API             +------>| Email Service    |
|  POST /api/waitlist       |       | (Resend)         |
|                           |       |                  |
|  - Validate input         |       | - Thank-you to   |
|  - Add to audience        |       |   signup         |
|  - Send notifications     |       | - Notify to team |
|  - Send confirmation      |       | - Audience sync  |
+---------------------------+       +------------------+

  PROTOCOL LAYER (osis/)
  ─────────────────────
  osis.json      <- config + state
  twin.md        <- this file
  v1/
    vision.md    <- canon (why)
    product-spec.md <- canon (what + when)
    changelog.md

  SKILL LAYER (skill/osis/)
  ─────────────────────────
  SKILL.md       <- agent persona + modes
  references/    <- protocol, templates, drift-scan
  scripts/       <- init scaffolding

================================================================
```

## Systems

### Product-Specific Systems

#### Landing Experience
**Capabilities:** Delivers a full-screen, scroll-driven visual narrative. Four stacked screens with manifesto-style headlines dissolve and blur on scroll. Scroll indicator dots provide navigation. Responsive layout adapts image framing between mobile and desktop.
**Features:** Visitors see a storytelling sequence culminating in a call to action. Nav bar presents brand and "about" link at top, "Sign Up for Early Access" button at bottom.
**Key Flows:**
```
Visitor arrives → Scroll through 4 hero screens → Click "Sign Up for Early Access"
  → Route to /join → Intercepting route opens modal over landing
  → Desktop: Dialog with product pitch + form | Mobile: Sheet modal with form
  → Submit → Success confirmation with referral link
```
**Maturity:** basic — visual polish is high, but the site is a single funnel with no content pages, no blog, no documentation, no pricing.
**Connections:** Waitlist System, Analytics.

#### Waitlist System
**Capabilities:** Collects name, email, company via a validated form. Submits to server API. Adds contacts to an email audience. Sends a confirmation email to the signup. Sends a notification email to the team. Tracks signup events in analytics.
**Features:** Form with real-time validation. Success state with referral link (copy current URL). Responsive modal (dialog on desktop, draggable sheet on mobile).
**Key Flows:**
```
User fills form → POST /api/waitlist
  → Zod validation
  → Add contact to Resend audience (fire-and-forget)
  → Send team notification email
  → Send user thank-you email
  → Return success → Client shows confirmation + referral link
  → PostHog captures waitlist_signup event
```
**Maturity:** solid — validation, dual emails, audience sync, analytics tracking all wired up. No database persistence beyond the email audience.
**Connections:** Landing Experience, Email Service, Analytics.

#### Osis Protocol (Documentation System)
**Capabilities:** A spec hierarchy for product documentation. Scaffolded directory structure with twin, vision, product spec, changelog. JSON config tracks product state. Skill definition enables agent persona.
**Features:** Not user-facing yet. The protocol is defined in the osis-spec (product spec for osis itself) and the skill definition. Templates exist for all spec types. Drift scan prompt exists.
**Maturity:** minimal — the directory is scaffolded, the spec is written, the skill is defined, but no CLI or runtime exists yet. The protocol lives as documentation and an agent skill, not as executable software.
**Connections:** Skill layer reads and writes osis/ files.

### Standard Systems

- **Analytics:** PostHog integration with proxy rewrites to avoid ad blockers. Tracks page views and custom events (join_button_clicked, waitlist_signup). Identified profiles only.
- **Email:** Resend with react-email templates. Two templates: WaitlistThankYou (user-facing) and WaitlistNotify (team-facing). Sends from success@join.osis.dev.
- **UI:** Shared component library in packages/ui (button, card, code). App-level UI components use shadcn patterns with Radix primitives. Custom sheet-modal with touch drag-to-dismiss.

## Routes / Endpoints

| Route | Method | What It Does |
|---|---|---|
| `/` | GET | Landing page with stacked scroll hero |
| `/join` | GET | Full-page product pitch (fallback for direct navigation) |
| `/@waitlist/(.)join` | GET | Intercepting route — opens waitlist modal over landing |
| `/test` | GET | Development-only image calibration page |
| `/api/waitlist` | POST | Accepts waitlist signup, sends emails, syncs audience |
| `/api/resend` | POST | Deprecated — returns 410, redirects to /api/waitlist |

## Architecture

```
Monorepo (pnpm + Turborepo)
├── apps/
│   └── osis-landing-v2      (Next.js 15, App Router, Turbopack)
│       ├── Server Components (pages, layout, metadata)
│       ├── Client Components (stacked-screens, waitlist-form, nav)
│       ├── API Routes (waitlist)
│       └── Email Templates (react-email)
├── packages/
│   ├── ui                    (shared component library)
│   ├── eslint-config
│   └── typescript-config
├── osis/                     (product documentation protocol)
│   ├── osis.json
│   ├── twin.md
│   └── v1/ (vision, product-spec, changelog)
└── skill/osis/               (agent skill definition)
    ├── SKILL.md
    ├── references/
    └── scripts/
```

Deployed on Vercel. PostHog analytics proxied through Next.js rewrites. Resend for transactional email.

## Dependencies

| Service | Purpose |
|---|---|
| Vercel | Hosting and deployment |
| PostHog | Product analytics |
| Resend | Transactional email + audience management |
| osis.dev | Domain |
