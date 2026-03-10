'use client'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import React, { useRef } from 'react';

const ImgSwap = ({link1, link2}:{link1: string, link2: string}) => {
  const scope = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const imgs = gsap.utils.selector(scope)(".swapImg");

    
    gsap.set(imgs[1], { opacity: 0 });

    
    gsap.timeline({ repeat: -1, repeatDelay: 1 })
      .to(imgs[0], { opacity: 0, duration: 0.6, ease: "power2.inOut" })
      .to(imgs[1], { opacity: 1, duration: 0.6, ease: "power2.inOut" }, "<")
      .to(imgs[1], { opacity: 0, duration: 0.6, ease: "power2.inOut", delay: 1 })
      .to(imgs[0], { opacity: 1, duration: 0.6, ease: "power2.inOut" }, "<");

  }, { scope });

  return (
    <div ref={scope} className={`w-37.5 sm:w-41.25 md:w-[180px] lg:w-50 aspect-square relative`}>
      <Image
        alt='img'
        fill
        src={link1}
        className='object-contain swapImg'
      />
      <Image
        alt='img'
        fill
        src={link2}
        unoptimized
        className='object-contain swapImg'
      />
    </div>
  );
};

export default ImgSwap;
