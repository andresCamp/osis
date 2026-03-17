import React from "react"
import { Body, Container, Head, Heading, Hr, Html, Img, Preview, Section, Text } from "@react-email/components"

type WaitlistThankYouProps = {
  name: string
  logoUrl: string
}

export default function WaitlistThankYou({ name, logoUrl }: WaitlistThankYouProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Osis - You&apos;re in! 🚀</Preview>
      <Body style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#0b0f1a" }}>
        <Container style={{ maxWidth: "600px", margin: "0 auto", padding: "24px", backgroundColor: "#0b0f1a" }}>
          <Section style={{ textAlign: "center", marginBottom: "16px" }}>
            <Img src={logoUrl} alt="Osis" width="48" height="48" style={{ display: "inline-block" }} />
          </Section>
          <Heading style={{ color: "#f3f4f6", fontSize: "24px", margin: 0, marginBottom: "16px" }}>
            Welcome to Osis - You&apos;re in! 🚀
          </Heading>

          <Section>
            <Text style={{ fontSize: "16px", lineHeight: "24px", color: "#e5e7eb" }}>Dear {name},</Text>
            <Text style={{ fontSize: "16px", lineHeight: "24px", color: "#e5e7eb" }}>
              You&apos;re officially on the early access list for Osis!
            </Text>

            <Text style={{ fontSize: "16px", lineHeight: "24px", color: "#e5e7eb" }}>
              While everyone else is fumbling with ChatGPT and drowning in scattered docs, you&apos;ll be among the first to
              build with true product intelligence.
            </Text>

            <Text style={{ fontSize: "16px", lineHeight: "24px", color: "#f9fafb" }}>Here&apos;s what&apos;s coming:</Text>

            <Text style={{ fontSize: "16px", lineHeight: "24px", color: "#e5e7eb" }}>
              Your ideas will finally have a living, evolving home. Every customer conversation, every insight, every
              pivot - Osis remembers and connects it all. Your PRDs write themselves. Your tools get smarter. You stay
              focused on vision while we handle the product management heavy lifting.
            </Text>

            <Text style={{ fontSize: "16px", lineHeight: "24px", color: "#e5e7eb" }}>
              This is your unfair advantage in the AI gold rush.
            </Text>

            <Text style={{ fontSize: "16px", lineHeight: "24px", color: "#f9fafb" }}>What happens next:</Text>

            <Text style={{ fontSize: "16px", lineHeight: "24px", color: "#e5e7eb" }}>
              We&apos;re onboarding founders in small batches to ensure everyone gets white-glove attention. You&apos;ll receive
              your invitation within the next few weeks.
            </Text>

            <Text style={{ fontSize: "16px", lineHeight: "24px", color: "#e5e7eb" }}>
              In the meantime, reply to this email with your biggest product challenge right now. We&apos;re building Osis for
              builders like you, and your input directly shapes what we ship.
            </Text>
          </Section>

          <Hr style={{ margin: "20px 0", borderColor: "#1f2937" }} />

          <Section>
            <Text style={{ fontSize: "16px", lineHeight: "24px", color: "#e5e7eb" }}>Talk soon,</Text>
            <Text style={{ fontSize: "16px", lineHeight: "24px", color: "#e5e7eb" }}>Andrés Campos</Text>
            <Text style={{ fontSize: "16px", lineHeight: "24px", color: "#e5e7eb" }}>Founder, Osis</Text>
          </Section>

          <Hr style={{ margin: "20px 0", borderColor: "#1f2937" }} />

          <Section>
            <Text style={{ fontSize: "14px", lineHeight: "22px", color: "#cbd5e1" }}>
              P.S. - Curious about the name? Osis comes from &quot;gnosis&quot; - deep, intuitive knowledge. That&apos;s what we&apos;re
              building: a system that truly knows your product as deeply as you do.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}



