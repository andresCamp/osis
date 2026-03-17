import Image from 'next/image'
import React from 'react'
import image from '@/public/screens/WILD.webp'

const page = () => {

    // const jobs = "object-contain scale-200 -translate-x-10 origin-left translate-y-35 md:scale-100 md:translate-x-0 md:translate-y-0 md:object-cover md:object-left"
    // const orch = "object-contain scale-[2.9] origin-right translate-y-30 md:scale-100 md:translate-y-0 md:object-cover md:object-right"
    // const moad = "object-cover object-[75%_100%] origin-right md:object-right"
    // const wild = "object-cover object-[50%_50%] origin-center"



  return (
    <div className='w-full min-h-screen bg-white flex flex-col items-center justify-center gap-48'>


        <section className='w-dvw bg-blue-200 h-dvh flex relative items-center justify-center'>
            {/* img container 1 */}

                <Image src={image} 
                 alt="img1"
                 fill
                 sizes="100vw"
                 className="object-cover"
                />

        </section>
       
       <section className='w-full h-dvh flex items-center justify-center'>
            {/* img container 2 */}
            <div className='w-48 h-96 relative overflow-hidden bg-red-500'>
                <Image 
                    src={image}
                    alt='img1' 
                    fill
                    className='object-contain scale-200 translate-x-20 origin-center translate-y-20'
                    // className='translate-x-30' 
                />
                {/* make the image or parent half for mobile */}
            </div>
       </section>

        {/* JOBS Mobile Calibration */}
       <section className='w-full h-dvh flex items-start justify-start'>
            {/* img container 3 */}
            <div className='w-full h-full relative overflow-hidden bg-black'>
                <Image 
                    src="/screens/JOBS.webp"
                    alt='img1' 
                    fill
                    className='object-contain scale-200 -translate-x-10 origin-left translate-y-35
                    md:scale-100 md:translate-x-0 md:translate-y-0 md:object-cover md:object-left'
                    // className='translate-x-30' 
                />
                {/* make the image or parent half for mobile */}
            </div>
       </section>
 
        {/* ORCH Mobile Calibration */}
       <section className='w-full h-dvh flex items-start justify-start'>
            {/* img container 3 */}
            <div className='w-full h-full relative overflow-hidden bg-black'>
                <Image 
                    src="/screens/ORCH.webp"
                    alt='img1' 
                    fill
                    className='object-contain scale-[2.9] origin-right translate-y-30
                    md:scale-100 md:translate-y-0 md:object-cover md:object-right'
                    // className='translate-x-30' 
                />
                {/* make the image or parent half for mobile */}
            </div>
       </section>
 
        {/* MOAD Mobile Calibration */}
       <section className='w-full h-dvh flex items-start justify-start'>
            {/* img container 3 */}
            <div className='w-full h-full relative overflow-hidden bg-black'>
                <Image 
                    src="/screens/MOAD.webp"
                    alt='img1' 
                    fill
                    className='
                    object-cover object-[75%_100%] origin-right md:object-right'
                    // className='translate-x-30' 
                />
                {/* make the image or parent half for mobile */}
            </div>
       </section>
       
    {/* WILD Mobile Calibration */}
       <section className='w-full h-dvh flex items-start justify-start'>
            {/* img container 3 */}
            <div className='w-full h-full relative overflow-hidden bg-black'>
                <Image 
                    src="/screens/WILD.webp"
                    alt='img1' 
                    fill
                    className='
                    object-cover object-[50%_40%] origin-center'
                    // className='translate-x-30' 
                />
                {/* make the image or parent half for mobile */}
            </div>
       </section>



    </div>
  )
}

export default page