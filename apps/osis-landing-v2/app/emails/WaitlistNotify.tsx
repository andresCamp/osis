import React from "react"
import { Body, Container, Head, Heading, Hr, Html, Img, Preview, Section, Text } from "@react-email/components"

type WaitlistNotifyProps = {
  name: string
  email: string
  company: string
  logoUrl: string
}

export default function WaitlistNotify({ name, email, company, logoUrl }: WaitlistNotifyProps) {
  return (
    <Html>
      <Head />
      <Preview>New waitlist signup: {name}</Preview>
      <Body style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#0b0f1a" }}>
        <Container style={{ maxWidth: "600px", margin: "0 auto", padding: "24px", backgroundColor: "#0b0f1a" }}>
          <Section style={{ textAlign: "center", marginBottom: "12px" }}>
            <Img src={logoUrl} alt="Osis" width="40" height="40" style={{ display: "inline-block" }} />
          </Section>
          <Heading style={{ color: "#f3f4f6", fontSize: "20px", margin: 0, marginBottom: "16px" }}>
            New Waitlist Signup
          </Heading>

          <Section>
            <Text style={{ fontSize: "14px", lineHeight: "22px", color: "#e5e7eb" }}>Name: {name}</Text>
            <Text style={{ fontSize: "14px", lineHeight: "22px", color: "#e5e7eb" }}>Email: {email}</Text>
            <Text style={{ fontSize: "14px", lineHeight: "22px", color: "#e5e7eb" }}>Company: {company}</Text>
          </Section>

          <Hr style={{ margin: "20px 0", borderColor: "#1f2937" }} />
          <Text style={{ fontSize: "12px", lineHeight: "20px", color: "#94a3b8" }}>
            This notification was generated from the Osis waitlist form.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}


