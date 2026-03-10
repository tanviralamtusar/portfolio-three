'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const RollingSvg = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useGSAP(
    () => {
      // Create a timeline that repeats infinitely
      const tl = gsap.timeline({ 
        repeat: -1, 
        defaults: { ease: 'power2.inOut' } ,
        repeatDelay:0.5,
        delay:3.5,
        force3D: true,
      });

      // --- STEP 1: ROLL RIGHT ---
      tl.to(svgRef.current, {
        x: 220,        // Move 300px to the right
        rotation: 360, // Full circle rotation (Roll)
        duration: 1.7,
      });

      // --- STEP 2: BLINK ONCE (While stopped) ---
      // Close eyes (Instant swap)
      tl.set('.eye-open', { opacity: 0 }, "+=0.1") // Small delay after stopping
        .set('.eye-closed', { opacity: 1 }, "<");  // Sync with previous line
      
      // Wait with eyes closed, then Open eyes
      tl.set('.eye-closed', { opacity: 0 }, "+=0.2") // Keep closed for 0.2s
        .set('.eye-open', { opacity: 1 }, "<");

      // --- STEP 3: ROLL BACK LEFT ---
      tl.to(svgRef.current, {
        x: 0,          // Back to start
        rotation: 0,   // Rotate back (Unroll)
        duration: 2,
        delay: 0.2     // Small pause after blinking before moving
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="pointer-events-none">
      <svg
        ref={svgRef}
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
        className="md:w-32 w-20 aspect-square"
        style={{ overflow: 'visible' }}
      >
        {/* FACE */}
        <circle cx={300} cy={300} r={260} fill="#a8c256" />

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
                strokeWidth="12" 
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
                strokeWidth="12" 
                strokeLinecap="round"
                opacity="0"
            />
          </g>

        </g>
      </svg>
    </div>
  );
};

export default RollingSvg;