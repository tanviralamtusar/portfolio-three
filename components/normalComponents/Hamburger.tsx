/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useEffect } from 'react'

gsap.registerPlugin(useGSAP)

const Hamburger = ({ open }: { open: boolean }) => {
  const hamburgerRef = useRef<HTMLDivElement | null>(null)
  const tl = useRef<GSAPTimeline | null>(null)

  // Create timeline ONLY once
  useGSAP(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ paused: true })
        .to(".line1", { y: 8, rotation: 45, duration: 0.3, ease: "power2.inOut" })
        .to(".line2", { opacity: 0, x: -10, duration: 0.2, ease: "power2.inOut" }, "<")
        .to(".line3", { y: -8, rotation: -45, duration: 0.3, ease: "power2.inOut" }, "<")
        .to(hamburgerRef.current,{
            backgroundColor: 'white',
            duration:0.2
        }, '+=0.2')
        .to('.line',{
            backgroundColor: 'black',
            duration:0.2
        },'-=0.4')
    }, hamburgerRef)

    return () => ctx.revert()
  }, [])

  
  useEffect(() => {
    if (!tl.current) return
    open ? tl.current.play() : tl.current.reverse()
  }, [open])

  return (
    <div
      ref={hamburgerRef}
      className="cursor-pointer px-2.5 py-4.5 sm:px-4 rounded-full sm:py-6 flex flex-col gap-y-1.5 relative z-9999 bg-background"
    >
      <div className="line1 line rounded-md w-8 h-0.5 bg-foreground"></div>
      <div className="line2 line rounded-md w-8 h-0.5 bg-foreground"></div>
      <div className="line3 line rounded-md w-8 h-0.5 bg-foreground"></div>
    </div>
  )
}

export default Hamburger
