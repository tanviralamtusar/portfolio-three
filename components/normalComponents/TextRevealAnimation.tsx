/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import React, { useEffect, useRef } from 'react'

gsap.registerPlugin(useGSAP, SplitText)

interface PropType {
    delayIndex: number
    text: string
    style?: string
    navOpen: boolean
}

const TextRevealAnimation = ({ delayIndex, text, style, navOpen }: PropType) => {

    const textRef = useRef<HTMLParagraphElement | null>(null)
    const tl = useRef<GSAPTimeline | null>(null)

    useGSAP(() => {

        let splitText: SplitText

        tl.current = gsap.timeline({ paused: true })

        document.fonts.ready.then(() => {

            splitText = new SplitText(textRef.current!, {
                type: 'lines, words',
                mask: 'lines'
            })

            gsap.set(splitText.words, {
                y: 50,
                autoAlpha: 0
            })

            tl.current?.to(splitText.words, {
                y: 0,
                autoAlpha: 1,
                duration: 0.6,
                stagger: 0.03,
                delay: delayIndex * 0.16,
                ease: "power2"
            })
        })

        return () => {
            splitText?.revert()
        }

    }, { scope: textRef })

    useEffect(() => {
        if (!tl.current) return
        navOpen ? tl.current.play() : tl.current.reverse()
    }, [navOpen])

    return (
        <p className={style} ref={textRef}>{text}</p>
    )
}

export default TextRevealAnimation
