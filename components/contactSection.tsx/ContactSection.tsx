'use client'
import React, { useRef } from 'react';
import Cloud from './Cloud';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';


const ContactSection = () => {

    const cloud1Ref = useRef<HTMLDivElement | null>(null)
    const cloud2Ref = useRef<HTMLDivElement | null>(null)
    const shipRef = useRef<HTMLDivElement | null>(null)
    const contactSectionRef = useRef<HTMLDivElement | null>(null)

    useGSAP(() => {

        

        gsap.to(cloud1Ref.current, {
            x: '20%',
            duration: 1.2,
            repeat: -1,
            ease: 'none',
            yoyo: true,
            force3D: true
        })
        gsap.to(cloud2Ref.current, {
            x: '-20%',
            duration: 1.2,
            repeat: -1,
            ease: 'none',
            yoyo: true,
            force3D: true
        })
        gsap.to(shipRef.current, {
            y: '-25%',
            duration: 1.6,
            repeat: -1,
            ease: 'none',
            yoyo: true,
            force3D: true
        })

    }, { scope: contactSectionRef })

    return (
        <div ref={contactSectionRef} className=' relative z-10'>

            <div>
                {/* cloud section  */}
                <div className='sm:h-[60vh] h-[50vh] w-full relative overflow-hidden flex items-center justify-center'>
                    <div ref={cloud1Ref} className='absolute sm:-left-[10%] will-change-transform -left-[15%] top-0'>
                        <Cloud src='/svg/cloud.svg' />
                    </div>
                    <div className='flex items-center justify-center '>
                        <p className="
                            uppercase
                            font-bold
                            text-[12vw] md:text-[10vw] w-fit  cursor-pointer hover:text-[#e4fe9e] duration-150 ease-in transition-all tracking-wider
                            text-foreground
                            [-webkit-text-stroke:2px_#0e0e0e]
                            font-futura">
                            contact
                        </p>
                    </div>
                    <div ref={cloud2Ref} className='absolute sm:-right-[10%] will-change-transform -right-[15%] bottom-0'>
                        <Cloud src='/svg/cloud.svg' />
                    </div>
                </div>
                {/* layer section  */}
                <div id='bgImgLayer' className='h-[20vh] sm:h-[30vh]  xl:h-[40vh]  w-full relative  '>

                    {/* Layer 3: Background (Clouds/Back Hills) */}
                    <div className='absolute inset-0 z-10'>
                        <Image
                            src={'/img/layer3.webp'}
                            alt='layer3'
                            fill
                            unoptimized
                            className='object-contain object-bottom'
                        />
                    </div>

                    {/* Layer 2: Midground (Green Hills) */}
                    <div className='absolute inset-0 z-20'>
                        <Image
                            src={'/img/layer2.webp'}
                            alt='layer2'
                            fill
                            unoptimized
                            className='object-contain object-bottom'
                        />
                    </div>
                    <div ref={shipRef} className='absolute  xl:translate-y-[0%] -translate-y-[15%]  w-[200px] sm:w-[250px] aspect-square inset-0 z-25'>
                        <Image
                            src={'/img/merry.webp'}
                            alt='layer2'
                            fill
                            unoptimized
                            className='object-contain object-bottom'
                        />
                    </div>

                    {/* Layer 1: Foreground (Blue Water/Hills) */}
                    <div className='absolute inset-0 z-30'>
                        <Image
                            src={'/img/layer1.webp'}
                            alt='layer1'
                            fill
                            unoptimized
                            className='object-contain object-bottom'
                        />
                    </div>

                    {/* Centered Text - matching your target image */}

                </div>
            </div>
        </div>
    );
};

export default ContactSection;