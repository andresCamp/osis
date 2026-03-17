import moadImg from "@/public/screens/MOAD.webp"
import jobsImg from "@/public/screens/JOBS.webp"
import orchImg from "@/public/screens/ORCH.webp"
import wildImg from "@/public/screens/WILD.webp"
import { StackedScreens } from "@/components/stacked-screens.client"
import { HeroContent } from "@/components/hero.client"


export default function Home() {

    const jobs = "object-contain scale-200 -translate-x-10 origin-left translate-y-35 md:scale-100 md:translate-x-0 md:translate-y-0 md:object-cover md:object-left"
    const orch = "object-contain scale-[2.9] origin-right translate-y-30 md:scale-100 md:translate-y-0 md:object-cover md:object-right"
    const moad = "object-cover object-[75%_100%] origin-right md:object-right"
    const wild = "object-cover object-[50%_50%] origin-center"

  const screens = [
    { title: "",
      content: <HeroContent />,
    },
    { title: "Great products begin before \nthe first line of code is written.",
      image: moadImg,
      className: moad,
    },
    { title: "Behind every product people love \n is a process few have mastered.",
      image: jobsImg,
      className: jobs},
    { title: "As we automate code generation, \nproduct direction becomes everything.",
      image: orchImg,
      className: orch},
    { title: "Osis automates everything that happens \nbefore you start building.",
      image: wildImg,
      className: wild}
  ]

  return (
    <div className="w-full bg-black">
      <StackedScreens screens={screens} />
    </div>
  );
}
