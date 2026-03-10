'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const BounceSvg = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useGSAP(
    () => {
      // 1. MOVEMENT ANIMATION
      // We want to go LEFT while bouncing 2 times, then return RIGHT doing the same.
      const moveDuration = 2; // Time to travel to the left
      
      const tl = gsap.timeline({
        repeat: -1, // Infinite loop
        yoyo: true, // Go back to the start (Right) after finishing
        defaults: { ease: 'power1.inOut' },
        force3D:true,
        delay:3.5
      });

      // Move X axis (Left)
      tl.to(svgRef.current, {
        x: -100, // Move 200px to the left
        duration: moveDuration,
        ease: 'sine.inOut', // Smooth wave motion
      });

      // Move Y axis (Bounce) - Inserted at start of timeline '<'
      // 2 bounces means: Up -> Down -> Up -> Down. 
      // That is 4 segments. So each segment is duration / 4.
      tl.to(
        svgRef.current,
        {
          y: -100, // Jump height
          duration: moveDuration / 4,
          ease: 'power2.out', // Decelerate on way up
          yoyo: true, // Go back down
          repeat: 3, // Repeat 3 times + initial play = 4 segments (Up, Down, Up, Down)
        },
        '<' // Start at the same time as X movement
      );

      // 2. BLINK ANIMATION (Randomized)
      const blink = () => {
        if (!containerRef.current) return;

        const blinkTl = gsap.timeline({
          onComplete: () => {
            // Randomly schedule the next blink between 1s and 4s
            gsap.delayedCall(Math.random() * 3 + 1, blink);
          },
        });

        // Instant swap to simulate eyelid shutting fast
        blinkTl
          .set('.eye-open', { opacity: 0 })
          .set('.eye-closed', { opacity: 1 })
          .to({}, { duration: 0.15 }) // Keep eyes closed for 150ms
          .set('.eye-closed', { opacity: 0 })
          .set('.eye-open', { opacity: 1 });
      };

      // Start the blink loop
      blink();
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="flex pointer-events-none justify-center items-center ">
      <svg
        ref={svgRef}
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
        className="sm:w-20 w-14 aspect-square" // Adjusted width for visibility
        style={{ overflow: 'visible' }}
        
      >
        {/* FACE */}
        <circle cx={300} cy={300} r={260} fill="#1669b7" />

        {/* EYES GROUP */}
        <g className="eyes">
          
          {/* LEFT EYE */}
          <g className="eye-left" transform="translate(210 260)">
            {/* Open State */}
            <g className="eye-open">
              <circle className="eyeball" cx={0} cy={0} r={45} fill="#e6e6e6" />
              <circle className="pupil" cx={10} cy={-5} r={18} fill="#222" />
            </g>
            {/* Closed State (Curved Line) */}
            <path 
                className="eye-closed" 
                d="M -35 5 Q 0 25 35 5" 
                fill="none" 
                stroke="#0f4c85" 
                strokeWidth="20" 
                strokeLinecap="round"
                opacity="0"
            />
          </g>

          {/* RIGHT EYE */}
          <g className="eye-right" transform="translate(360 260)">
             {/* Open State */}
             <g className="eye-open">
              <circle className="eyeball" cx={0} cy={0} r={45} fill="#e6e6e6" />
              <circle className="pupil" cx={10} cy={-5} r={18} fill="#222" />
            </g>
            {/* Closed State (Curved Line) */}
            <path 
                className="eye-closed" 
                d="M -35 5 Q 0 25 35 5" 
                fill="none" 
                stroke="#0f4c85" 
                strokeWidth="8" 
                strokeLinecap="round"
                opacity="0"
            />
          </g>

        </g>
      </svg>
    </div>
  );
};

export default BounceSvg;