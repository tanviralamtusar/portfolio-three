/* eslint-disable react-hooks/refs */
'use client'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';

type Props = {
  text: string
  onClick?: () => void
}

const ProjectButton = ({ text, onClick }: Props) => {
  const container = useRef<HTMLDivElement | null>(null);
  const buttonBg = useRef<HTMLDivElement | null>(null);
  const primaryText = useRef<HTMLDivElement | null>(null);
  const secondaryText = useRef<HTMLDivElement | null>(null);
  
  const tl = useRef<GSAPTimeline | null>(null);

  const { contextSafe } = useGSAP(() => {
    // 1. Set initial states
    // Background starts scaled down (invisible) at the bottom
    gsap.set(buttonBg.current, { scaleY: 0, transformOrigin: "bottom" });
    
    // Secondary text sits below the visible area, waiting to come up
    gsap.set(secondaryText.current, { yPercent: 100 });

    tl.current = gsap.timeline({ paused: true, defaults: { duration: 0.5, ease: "expo.out" } });

    tl.current
      // Animate Background
      .to(buttonBg.current, {
        scaleY: 1,
      })
      // Roll the Text (Staggered slightly)
      .to(primaryText.current, {
        yPercent: -100,
      }, "<")
      .to(secondaryText.current, {
        yPercent: 0,
      }, "<");

  }, { scope: container });

  const hoverIn = contextSafe(() => {
    // Play the fill/roll animation
    tl.current?.play();
    
    // The "Squash" pressure effect
    
  });

  const hoverOut = contextSafe(() => {
    // Reverse the fill/roll animation
    tl.current?.timeScale(1.2).reverse();
    
    // The "Elastic Bounce" release
   
  });

  return (
    <div
      ref={container}
      onClick={onClick}
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
      className="group relative inline-block cursor-pointer overflow-hidden rounded-lg border border-neutral-800 bg-transparent px-6 py-2.5 font-social font-semibold text-neutral-800"
    >
      {/* Text Wrapper: 
        We use a wrapper to hold two copies of the text.
        1. primaryText: The one you see initially.
        2. secondaryText: The one waiting below.
      */}
      <div className="relative z-10 overflow-hidden">
        <div ref={primaryText} className="relative block transition-colors  duration-300 group-hover:text-white">
          {text}
        </div>
        <div ref={secondaryText} className="absolute inset-0 block text-white">
          {text}
        </div>
      </div>

      {/* Sliding Background */}
      <div
        ref={buttonBg}
        className="absolute inset-0 -z-0 bg-neutral-900" 
      />
    </div>
  );
};

export default ProjectButton;
