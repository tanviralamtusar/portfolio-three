'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { projectData } from '@/public/data/projectData'
import ProjectCard from './ProjectCard'
import Image from 'next/image'
import ImgSwap from '../normalComponents/ImgSwap'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function ScrollSection() {
    const container = useRef<HTMLDivElement>(null)
    const pillNamesRef = useRef<(HTMLSpanElement | null)[]>([])
    const pillContainersRef = useRef<(HTMLDivElement | null)[]>([])
    const leftRef = useRef<HTMLDivElement | null>(null)
    const clipPathRef = useRef(null)

    const [activeIndex, setActiveIndex] = useState(0)

    const indexChange = (index: number) => {
        setActiveIndex(index)
    }

    // 1. Handle the Pinning
    useGSAP(() => {
        ScrollTrigger.create({
            trigger: container.current,
            start: 'top top',
            end: 'bottom bottom',
            pin: leftRef.current,
            pinSpacing: false,
            anticipatePin: 0,

        })

        gsap.to(
            clipPathRef.current,
            {
                x: 0,
                duration: 0.5,
                delay: 0.3,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: clipPathRef.current,
                    start: 'clamp(top 40%)',
                }
            }
        )


    }, { scope: container })

    // 2. Animate Pills based on activeIndex change
    useGSAP(() => {
        projectData.forEach((_, i) => {
            const pill = pillContainersRef.current[i]
            const name = pillNamesRef.current[i]
            const isActive = i === activeIndex

            if (!pill || !name) return

            // Create a timeline for each pill for smooth transition
            const tl = gsap.timeline({ defaults: { duration: 0.4, ease: 'none' } })

            if (isActive) {
                tl.to(pill, {
                    backgroundColor: '#FFFFFF', // Matches your photo (white bg)
                    color: '#000000',           // Dark text
                }, 0)
                    .to(name, {
                        width: 'auto',
                        opacity: 1,
                        marginLeft: 8,
                        paddingRight: 4
                    }, 0)
            } else {
                tl.to(pill, {
                    backgroundColor: 'transparent', // Outline look
                    color: '#FFFFFF',
                }, 0)
                    .to(name, {
                        width: 0,
                        opacity: 0,
                        marginLeft: 0,
                        paddingRight: 0
                    }, 0)
            }
        })
    }, [activeIndex]) // 👈 This triggers the animation whenever activeIndex updates

    return (
        <section ref={container} className="flex projectSection -mt-3 bg-[#85a98d] md:flex-row flex-col min-h-screen w-full relative z-5 overflow-y-visible">
            <div className='absolute z-100 left-[25%] sm:left-[35%] md:left-5 md:-bottom-7 -bottom-[1%]'>
                    <ImgSwap link1='/svg/gojo1.svg' link2='/svg/gojo2.svg'/>
            </div>
            {/* LEFT SIDE: Pinned Navigation */}
            <div ref={leftRef} className="bg-[#84a98c] md:w-1/3 w-full md:h-screen h-fit py-4 md:py-0 flex flex-col justify-start md:justify-center lg:px-10 px-3 relative z-50  gap-y-6">
                <div className='w-fit'>
                    <p className='uppercase font-futura text-5xl'>Projects</p>
                    <div className='w-full overflow-hidden'>
                        <svg ref={clipPathRef} xmlns="http://www.w3.org/2000/svg" className='-translate-x-full' viewBox="1144.38 1591.96 3161 190.1">
                            <path d="M1163 1774 c-23 -10 -15 -53 10 -58 12 -3 252 -8 532 -11 281 -3 607 -10 725 -15 118 -5 400 -12 625 -15 537 -7 774 -21 1085 -66 115 -17 141 -16 154 3 22 35 -10 45 -194 63 -96 8 -215 20 -265 25 -49 5 -218 11 -375 14 -157 4 -325 8 -375 10 -49 3 -166 5 -260 7 -93 1 -323 8 -510 15 -642 26 -1130 37 -1152 28z" fill="#ededed" />
                        </svg>

                    </div>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-3">
                    {projectData.map((item, index) => (
                        <div
                            key={item.id}
                            ref={(el) => { pillContainersRef.current[index] = el }}
                            className="flex px-4 py-2 rounded-full border border-white items-center justify-start overflow-hidden whitespace-nowrap"
                        >
                            <span className="font-medium">0{index + 1}</span>
                            <span
                                ref={(el) => { pillNamesRef.current[index] = el }}
                                className="overflow-hidden whitespace-nowrap opacity-0 w-0 block pointer-events-none"
                            >
                                {item.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT SIDE: Scrollable Cards */}
            <div className="md:w-2/3 w-full z-40 flex flex-col overflow-hidden">
                {projectData.map((item) => (
                    <div key={item.id} className="h-screen flex items-center justify-center">
                        <ProjectCard
                            data={item}
                            func={indexChange}
                        />
                    </div>
                ))}
            </div>

        </section>
    )
}