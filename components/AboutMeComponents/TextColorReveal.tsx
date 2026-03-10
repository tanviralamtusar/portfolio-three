/* eslint-disable react-hooks/refs */
'use client'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import React, { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, SplitText)

const TextColorReveal = ({ text }: { text: string }) => {
    const textContainer = useRef<HTMLParagraphElement | null>(null)

    useGSAP(() => {
        if (!textContainer.current) return;

        const splitText = new SplitText(textContainer.current, {
            type: 'words',
        })

        // Optimization: Pre-set properties to avoid layout shifts
        gsap.set(splitText.words, { 
            
            willChange: 'color' 
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: textContainer.current,
                start: 'top 80%', // Start a bit earlier for smoother entry
                end: 'top 20%',   // Relative to viewport is usually more consistent
                scrub: 0.5,  
                     // Adding a tiny number (0.5) adds "smoothing" to the scroll
            }
        })

        tl.to(splitText.words, {
            color: '#000',
            stagger: 0.1,         // Smaller stagger feels more like a "flow" than a "step"
            ease: 'none',         // IMPORTANT: Use 'none' for scrubbed animations
        })

        return () => {
            splitText.revert();
        };
    }, { scope: textContainer })

    return (
        <p 
            className='w-full text-black/25' 
            ref={textContainer}
        >
            {text}
        </p>
    );
};

export default TextColorReveal;