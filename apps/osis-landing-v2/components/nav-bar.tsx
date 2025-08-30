import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { dmMono } from '@/app/fonts'
import { cx } from 'class-variance-authority'
// import { Button } from './ui/button'


const NavBar = () => {
  return (
    <div className='w-full h-dvh flex flex-col fixed z-50 py-6 px-6   justify-between items-center'>
        <NavBarHeader />
        <Link href="/join" className='text-white text-2xl my-6 duration-500 cursor-pointer transition-all w-fit'>
          Sign Up for Early Access →
        </Link>
    </div>
  )
}

export default NavBar

const NavBarHeader = () => {

    const linkClass = "text-2xl opacity-90 hover:opacity-100 duration-300 transition-all "

    return (
        <nav className="w-full px-8  grid grid-cols-3 items-center text-white">
        <div className="justify-self-start">
            <Link href="/" className={cx(linkClass, `${dmMono.className}`)}>
            osis
            </Link>
        </div>
        <div className="justify-self-center">
            <Link href="/" aria-label="Home">
            <Image src="/logos/osis-logo.svg" alt="Osis logo" width={48} height={48} priority />
            </Link>
        </div>
        <div className="justify-self-end">
            <Link href="/join" className={linkClass}>
            about
            </Link>
        </div>
        </nav>
    )
}




// const EarlyAccessButton = () => {
//     return (
//      <div className='text-white text-2xl py-6 hover:underline cursor-pointer  duration-300 transition-all w-fit'>
//       Sign Up for Early Access →
//      </div>
//     )
//   }

  
