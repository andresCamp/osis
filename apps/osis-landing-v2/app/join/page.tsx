"use client"

import Image from "next/image"
import { WaitlistForm } from "@/components/waitlist-form.client"
import logo from "@/public/logos/osis-logo.svg"
import { CheckIcon } from "lucide-react"
import * as React from "react"

const MODAL_CONTENT = {
  title: "Sign Up for Early Access",
  description: "Join the waitlist. We'll reach out with next steps.",
  successTitle: "You're on the list!",
  successDescription: "Thanks for your interest. We'll reach out with next steps shortly.",
} as const

export default function JoinPage() {
  const [submitted, setSubmitted] = React.useState(false)
  return (
    <div className="w-full min-h-dvh bg-black text-white flex flex-col items-center">
      <div className="px-4 text-center flex flex-col items-center justify-center pt-24">
        <Image src={logo} alt="Osis" width={25} height={25} />
        {!submitted && (
          <>
            <h1 className="text-4xl mt-6 font-semibold">{MODAL_CONTENT.title}</h1>
            <p className="text-gray-300 text-lg mt-2 max-w-xl">{MODAL_CONTENT.description}</p>
          </>
        )}
      </div>
      <div className="px-4 max-w-xl w-full mx-auto mt-8">
        {submitted ? (
          <div className="space-y-6 text-center bg-green-500/10 border-2 border-green-500/20 rounded-lg p-6">
            <CheckIcon className="w-10 h-10 mx-auto text-green-500" />
            <h3 className="text-xl font-semibold">{MODAL_CONTENT.successTitle}</h3>
            <p className="text-gray-300">{MODAL_CONTENT.successDescription}</p>
          </div>
        ) : (
          <div className="space-y-6">
            <WaitlistForm onSuccess={() => setSubmitted(true)} />
          </div>
        )}
      </div>
    </div>
  )
}


