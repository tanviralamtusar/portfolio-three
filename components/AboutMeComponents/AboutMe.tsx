'use client'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import TextColorReveal from './TextColorReveal';


gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function AboutMe() {

  const imgContainerRef = useRef<HTMLDivElement | null>(null)
  const aboutMeContainer = useRef<HTMLDivElement | null>(null)
  const threeDotRef = useRef<HTMLDivElement | null>(null)
  const starContainer = useRef<HTMLDivElement | null>(null)
  const [img1, setImg1] = useState(false)

  useEffect(() => {
    setInterval(()=>{
        setImg1(prev => !prev)
    },1000)
    
  }, [])

  useGSAP(() => {

    gsap.to(imgContainerRef.current, {
      scrollTrigger: {
        trigger: imgContainerRef.current,
        start: 'clamp(top 90%)',

      },
      duration: 0.5,
      x: 0,
      opacity: 1,
      ease: 'power2.out'
    })


  }, { scope: aboutMeContainer })

  useGSAP(() => {
    
    gsap.from(starContainer.current, {
     x:-400,
     y:200,
     duration:0.5,
     ease:'power2.out',
     scrollTrigger: {
      trigger: starContainer.current,
      start: 'clamp(top 90%)'
     }
    })
  })

  return (
    <div ref={aboutMeContainer} className='flex overflow-hidden md:flex-row flex-col-reverse pt-[25vh] md:pt-[30vh] items-start font-main justify-around text-4xl text-background px-2 relative pb-[5%]'>
      <div ref={starContainer} className='absolute z-1 right-[5%] md:right-auto'>
        <div >
          {img1 ?
            <Image className='' src={'/img/star.webp'} alt='starImg1' height={160} width={160} />
            : <Image className='rotate-45' src={'/img/star.webp'} alt='starImg1' height={160} width={160} />}

        </div>
        <div >
          {img1 ?
            <Image className='' src={'/img/star.webp'} alt='starImg2' height={80} width={80} />
            : <Image className='rotate-45' src={'/img/star.webp'} alt='starImg2' height={80} width={80} />}
        </div>
      </div>
      <div className='text-start relative z-2 flex md:w-[400px] lg:w-[500px] h-full  flex-col gap-y-5 flex-wrap gap-x-4 text-[#eeeeeec1]'>
        <div className='flex flex-col  -gap-y-2 tracking-wide sm:font-futura text-4xl sm:text-5xl font-main font-semibold'> 
          <div className='font-main  text-2xl'>
            <TextColorReveal text='I&apos;m'/>
          </div>
          <div className='uppercase font-main'>
            <TextColorReveal text='Sayeed Shorif'/>
          </div>
        </div>
        <div className=' sm:text-2xl text-xl'>
          <TextColorReveal text='I’m an enthusiastic front-end developer driven by curiosity, constant learning, and the excitement of solving complex problems. I approach development like visual storytelling — blending motion, structure, and emotion into interfaces that feel alive rather than static. I enjoy breaking challenges into smaller pieces, experimenting beyond the ordinary, and turning ideas into thoughtful, interactive experiences that reflect both creativity and technical precision.' />
        </div>
      </div>

      {/* The Frame Container */}
      <div ref={imgContainerRef}
        className='relative translate-x-full w-[90%] opacity-0  z-2 max-w-[400px] md:max-w-full md:w-[400px] lg:w-[450px] aspect-[4/5] bg-contain bg-no-repeat flex items-center justify-center'
        style={{ backgroundImage: "url('/img/box.webp')" }}
      >

        <div ref={threeDotRef} className='absolute -top-[15%] -right-[15%] '>
          <Image
            src='/img/threeDot.webp'
            alt='Sayeed Shorif'
            width={100}
            height={100}
            className='h-[100px] w-[100px] object-cover'

          />
        </div>
        {/* The Inner Image with Clip Path applied */}
        <div className="w-[85%]  h-[85%] overflow-hidden">
          <Image
            src='/img/me.png'
            alt='Sayeed Shorif'
            width={400}
            height={500}
            className='w-full rounded-xl h-full object-cover'

          />
        </div>



      </div>
    </div>
  );
}