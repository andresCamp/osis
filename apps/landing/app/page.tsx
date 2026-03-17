import moadImg from "@/public/screens/MOAD.webp"
import jobsImg from "@/public/screens/JOBS.webp"
import orchImg from "@/public/screens/ORCH.webp"
import mountainImg from "@/public/screens/WILD.webp"
import { StackedScreens } from "@/components/stacked-screens.client"
import { HeroContent } from "@/components/hero.client"
import { HowItWorks } from "@/components/how-it-works"
import { CoreAbilities } from "@/components/core-abilities"


export default function Home() {
    const jobs = "object-contain scale-200 -translate-x-10 origin-left translate-y-35 md:scale-100 md:translate-x-0 md:translate-y-0 md:object-cover md:object-left"
    const orchestra = "object-contain scale-[2.9] origin-right translate-y-30 md:scale-100 md:translate-y-0 md:object-cover md:object-right"
    const moad = "object-cover object-[75%_100%] origin-right md:object-right"
    const mountain = "object-cover object-[50%_50%] origin-center"

  const screens = [
    { id: "moad",
      indicatorLabel: "MOAD",
      title: "Great products begin before \nthe first line of code is written.",
      image: moadImg,
      className: moad,
    },
    { id: "jobs",
      indicatorLabel: "Jobs",
      title: "Behind every product people love \n is a process few have mastered.",
      image: jobsImg,
      className: jobs},
    { id: "orchestra",
      indicatorLabel: "Orchestra",
      title: "As we automate code generation, \nproduct direction becomes everything.",
      image: orchImg,
      className: orchestra},
    { id: "mountain",
      indicatorLabel: "Mountain",
      title: "Osis automates everything that happens \nbefore you start building.",
      image: mountainImg,
      className: mountain}
  ]

  return (
    <div className="w-full bg-black overflow-x-clip">
      <div className="relative z-[60] flex justify-center pt-44 sm:pt-36 md:pt-44 pb-16 sm:pb-24">
        <HeroContent />
      </div>
      <HowItWorks />
      <CoreAbilities />
      <div id="manifesto">
        <StackedScreens screens={screens} />
      </div>
    </div>
  );
}
