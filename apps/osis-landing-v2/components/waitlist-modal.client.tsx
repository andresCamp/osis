"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
// Custom sheet replaces Drawer on mobile
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { SheetModal } from "@/components/ui/sheet-modal"
import logo from "@/public/logos/osis-logo.svg"
// import CustomInput from "@/components/ui/custom-input"
// import { z } from "zod"
import { WaitlistForm } from "./waitlist-form.client"
import { CheckIcon } from "lucide-react"

export function DrawerDialogDemo() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return null
  }
  return null
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-6", className)}>
      <div className="grid gap-3">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" defaultValue="shadcn@example.com" />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="@shadcn" />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  )
}


export const EarlyAccessButton = () => {
    const [open, setOpen] = React.useState(false)
    const [submitted, setSubmitted] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 1200px)")

    const trigger = (
     <Button variant='link' className='text-white text-2xl my-6 duration-500 cursor-pointer transition-all w-fit'>
      Sign Up for Early Access →
     </Button>
    )

    if (isDesktop) {
      return (
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setSubmitted(false) }}>
          <DialogTrigger asChild>
            {trigger}
          </DialogTrigger>
          {/* 50/50 split */}
          <DialogContent className="sm:max-w-6xl p-8 flex flex-col items-center justify-start bg-black text-white border-white/10">
            <Image src={logo} alt="Osis" width={25} height={25} />
            <div className="flex flex-row justify-start items-start gap-8 p-6">
              {/* product pitch */}
              <div className="text-left flex-1">
                <ProductPitch />
              </div>

                <div className="w-0.5 h-96 bg-white/20 mx-8" />

                {/* <Separator orientation="vertical"/> */}
              {/* sign up form or success */}
              <div className="flex-1">
                {submitted ? (
                  <div className="space-y-3">
                    <DialogHeader className="sr-only">
                      <DialogTitle>Success</DialogTitle>
                    </DialogHeader>
                    {/* TODO: add a checkmark icon */}
                    <CheckIcon className="w-10 h-10" />
                    <h3 className="text-xl font-semibold">You’re on the list!</h3>
                    <p className="text-gray-300">Thanks for your interest. We’ll reach out with next steps shortly.</p>
                    <div className="pt-2">
                      <Button variant="outline" className="cursor-pointer text-black" onClick={() => setOpen(false)}>Close</Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <DialogHeader>
                      <DialogTitle className="!text-xl">Sign Up for Early Access</DialogTitle>
                      <DialogDescription className="text-md text-gray-300">
                        Get on the list and we&apos;ll reach out with next steps.
                      </DialogDescription>
                    </DialogHeader>
                    <WaitlistForm onSuccess={() => setSubmitted(true)} />
                  </>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )
    }

    return (
      <>
        <Button variant='link' className='text-white text-2xl my-6 duration-500 cursor-pointer transition-all w-fit' onClick={() => setOpen(true)}>
          Sign Up for Early Access →
        </Button>
        <SheetModal
          open={open}
          onOpenChange={(v) => { setOpen(v); if (!v) setSubmitted(false) }}
          title="Sign Up for Early Access"
          description="Join the waitlist. We'll reach out with next steps."
          initialHeight="75vh"
        >
          <div className="!text-2xl max-w-xl mx-auto">
            {submitted ? (
              <div className="space-y-6">
                <ProductPitch />
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">You&apos;re on the list!</h3>
                  <p className="text-gray-300">Thanks for your interest. We&apos;ll reach out with next steps shortly.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <WaitlistForm onSuccess={() => setSubmitted(true)} />
                <ProductPitch />
              </div>
            )}
          </div>
        </SheetModal>
      </>
    )
  }


  const ProductPitch = () => {
    return (
      <div className="space-y-4 text-2xl p-2 text-white">
        {/* <div className="relative w-full h-20 rounded-3xl overflow-hidden">
          <Image src="/screens/WATER.png" alt="Water" fill className="object-cover"   />
        </div> */}
        <p>Build products people love faster with Osis.</p>

        {/* <p> */}
          {/* Osis is your product&apos;s living intelligence layer. */}
        {/* </p> */}

        <p>
          Our platform automates product documentation with frameworks from the world&apos;s best companies:
          {/* Our platform maintains your product wiki, generates PRDs, and handles documentation overhead using product management frameworks from the world&apos;s best companies: */}
        </p>
        <div className="w-fit grid grid-cols-5 items-start gap-2 opacity-100">
          <LogoCell src="/logos/apple.svg" alt="Apple" />
          <LogoCell src="/logos/amazon.svg" alt="Amazon" />
          <LogoCell src="/logos/ycombinator.svg" alt="Y Combinator" />
          <LogoCell src="/logos/meta.svg" alt="Meta" />
          <LogoCell src="/logos/google.svg" alt="Google" />
        </div>
        
        <p>
          Rich integrations augment your entire tool stack with deep, real-time product context.
        </p>
       
        {/* <p>Build products people love faster with Osis.</p> */}
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
