import { NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"
import WaitlistThankYou from "../../emails/WaitlistThankYou"
import WaitlistNotify from "../../emails/WaitlistNotify"

const bodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().min(1),
})

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Missing RESEND_API_KEY" }, { status: 500 })
    }

    const resend = new Resend(apiKey)
    const fromAddress = process.env.RESEND_FROM_EMAIL || "Osis <success@join.osis.dev>"
    const audienceId = process.env.RESEND_AUDIENCE_ID
    const teamRecipients = (process.env.TEAM_NOTIFICATION_EMAILS || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
    const adminRecipient = "andrescampos220@gmail.com"
    const notificationRecipients = Array.from(new Set([...teamRecipients, adminRecipient]))

    const json = await request.json()
    const { name, email, company } = bodySchema.parse(json)

    const logoPathEnv = process.env.RESEND_LOGO_URL
    const fallbackLogo = "https://www.osis.dev/logos/osis-logo.png"
    const logoUrl = logoPathEnv || fallbackLogo

    if (audienceId) {
      resend.contacts
        .create({
          email,
          firstName: name.split(" ")[0],
          lastName: name.split(" ")[1] || "",
          unsubscribed: false,
          audienceId,
        })
        .catch(() => {
          /* ignore duplicate or other audience errors */
        })
    }

    if (notificationRecipients.length > 0) {
      await resend.emails.send({
        from: fromAddress,
        to: notificationRecipients,
        subject: `New Waitlist Signup: ${name}`,
        react: WaitlistNotify({ name, email, company, logoUrl }),
        replyTo: email,
      })
    }

    await resend.emails.send({
      from: fromAddress,
      to: [email],
      subject: "Welcome to Osis - You're in! 🚀",
      react: WaitlistThankYou({ name, logoUrl }),
    })

    return NextResponse.json({ status: "ok" })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form data", details: err.issues }, { status: 400 })
    }
    console.error("/api/waitlist error:", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}


