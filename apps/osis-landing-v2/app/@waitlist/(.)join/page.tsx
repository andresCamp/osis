"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SheetModal } from "@/components/ui/sheet-modal"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useMediaQuery } from "@/hooks/use-media-query"
import logo from "@/public/logos/osis-logo.svg"
import { WaitlistForm } from "@/components/waitlist-form.client"
import { CheckIcon } from "lucide-react"
import { ReferralLink } from "@/components/ReferralLink"

const MODAL_CONTENT = {
  title: "Sign Up for Early Access",
  description: "Join the waitlist. We'll reach out with next steps.",
  successTitle: "You're on the list!",
  successDescription: "Thanks for your interest. We'll reach out with next steps shortly.",
} as const

const SuccessMessage = ({ variant = "default" }: { variant?: "default" | "dialog" }) => (
  <div className=" space-y-3 my-6 xl:my-12  bg-green-500/10 border-2 border-green-500/20 rounded-lg p-4 text-center">
    {variant === "dialog" && (
      <DialogHeader className="sr-only">
        <DialogTitle>Success</DialogTitle>
      </DialogHeader>
    )}
    <CheckIcon className="w-10 h-10 mx-auto text-green-500" />
    <h3 className="text-xl font-semibold">{MODAL_CONTENT.successTitle}</h3>
    <p className="text-gray-300">{MODAL_CONTENT.successDescription}</p>
  </div>
)

export default function JoinModalPage() {
  const isDesktop = useMediaQuery("(min-width: 1200px)")
  const [submitted, setSubmitted] = React.useState(false)
  const router = useRouter()

  const onOpenChange = (open: boolean) => {
    if (!open) router.back()
  }

  if (isDesktop) {
    return (
      <Dialog open onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-6xl p-8 flex flex-col items-center justify-start bg-black text-white border-white/10">
          <Image src={logo} alt="Osis" width={25} height={25} />
          <div className="flex flex-row justify-start items-start gap-8 p-6">
            <div className="text-left flex-1">
              <ProductPitch />
            </div>
            <div className="w-0.5 h-96 bg-white/20 mx-8" />
            <div className="flex-1">
              {submitted ? (
                <div className="space-y-3">
                  <SuccessMessage variant="dialog" />
                  <div className="pt-2">
                    <Button variant="outline" className="cursor-pointer text-black" onClick={() => router.back()}>Close</Button>
                  </div>
                </div>
              ) : (
                <>
                  <DialogHeader>
                    <DialogTitle className="!text-xl">{MODAL_CONTENT.title}</DialogTitle>
                    <DialogDescription className="text-md text-gray-300">
                      {MODAL_CONTENT.description}
                    </DialogDescription>
                  </DialogHeader>
                  <WaitlistForm onSuccess={() => setSubmitted(true)} />
                </>
              )}
            </div>
          </div>
          <ReferralLink />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <SheetModal open onOpenChange={onOpenChange} initialHeight="75vh">
      <div className="px-4 text-center flex flex-col items-center justify-center">
        <Image src={logo} alt="Osis" width={25} height={25} />
        {!submitted && (
          <>
            <h2 className="text-3xl mt-4 font-semibold">{MODAL_CONTENT.title}</h2>
            <p className="text-gray-300 text-lg mt-1">{MODAL_CONTENT.description}</p>
          </>
        )}
      </div>
      <div className="px-4 max-w-xl mx-auto">
        {submitted ? (
          <div className="space-y-6">
            <SuccessMessage />
            <ProductPitch />
          </div>
        ) : (
          <div className="space-y-6">
            <WaitlistForm onSuccess={() => setSubmitted(true)} />
            <ProductPitch />
          </div>
        )}
        <ReferralLink />
      </div>
    </SheetModal>
  )
}

const ProductPitch = () => {
  return (
    <div className="space-y-4 text-3xl xl:text-2xl p-2 text-white">
      <p>Build products people love faster</p>
      <p>
        Osis automates product strategy and documentation using frameworks from the world&apos;s best companies
      </p>
      <p>
        Integrations transform your tool stack with product context that is never stale
      </p>
      <div className="w-fit grid grid-cols-7 items-start gap-2 my-8 opacity-100">
        <LogoCell src="/logos/apple.svg" alt="Apple" />
        <LogoCell src="/logos/amazon.svg" alt="Amazon" />
        <LogoCell src="/logos/ycombinator.svg" alt="Y Combinator" />
        <LogoCell src="/logos/meta.svg" alt="Meta" />
        <LogoCell src="/logos/google.svg" alt="Google" />
        <LogoCell src="/logos/claude.svg" alt="Claude" />
        <LogoCell src="/logos/chatgpt.svg" alt="ChatGPT" />
      </div>
    </div>
  )
}

const LogoCell = ({ src, alt }: { src: string; alt: string }) => (
  <div className="flex justify-center items-center bg-white/10 rounded-2xl size-14 p-3">
    <div className="relative h-12 w-28 ">
      <Image src={src} alt={alt} fill className="object-contain" />
    </div>
  </div>
)


