'use client'

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';

gsap.registerPlugin(useGSAP)


const Pikachu = () => {

    const containerRef = useRef<HTMLDivElement | null>(null)
    
    useGSAP(()=>{
        gsap.timeline({repeat: -1, repeatDelay:3})
        .to('.mouth', {
            scaleY: 0.2,
            transformOrigin: 'center',
            duration: 0.4,
            repeatDelay: 2
        })
        .to('.mouth', {
            scaleY: 1,
            transformOrigin: 'center',
            duration: 0.4,
            
            repeatDelay: 3
        });

        function blink() {
            gsap.timeline({
                onComplete: () => {
                    gsap.delayedCall(gsap.utils.random(2, 4), blink);
                }
            })
                .to('.eye', {
                    scaleY: 0.05,
                    transformOrigin: 'center',
                    duration: 0.08,
                    yoyo: true,
                    repeat: 1
                })
                .to('.eye', {
                    scaleY: 0.05,
                    transformOrigin: 'center',
                    duration: 0.08,
                    yoyo: true,
                    repeat: 1,
                    delay: 0.4,
                })

        }

        blink();
    })

    return (
        
             <div className='' ref={containerRef}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        
                        viewBox="0 0 600.000000 600.000000"
                        preserveAspectRatio="xMidYMid meet"
                        className='w-100  aspect-video'
                    >
                        <g
                            transform="translate(0.000000,600.000000) scale(0.100000,-0.100000)"
                            fill="#000000"
                            stroke="none"
                            
                        >
                            <path d="M4964 4429 c-397 -202 -647 -379 -976 -690 -271 -258 -321 -276 -703 -261 -222 10 -479 2 -584 -18 -137 -25 -209 -10 -505 109 -476 191 -810 307 -1189 410 -171 47 -189 49 -218 20 -31 -31 -21 -60 83 -243 253 -445 501 -731 822 -949 80 -55 81 -57 41 -173 -134 -388 -278 -1137 -224 -1170 31 -19 48 35 89 271 118 681 195 930 341 1090 65 72 71 98 26 103 -23 3 -38 -7 -83 -52 -63 -66 -64 -66 -131 -23 -359 225 -558 517 -629 922 -21 122 -32 122 267 16 262 -92 500 -179 579 -211 25 -10 131 -52 235 -94 105 -41 210 -84 235 -95 57 -26 111 -26 258 -1 101 16 182 20 579 24 254 2 469 8 477 13 8 4 77 67 153 140 182 172 337 304 503 429 168 126 464 324 485 324 43 0 44 -329 1 -460 -48 -146 -218 -430 -428 -715 -79 -107 -87 -110 -147 -52 -101 98 -173 86 -81 -15 127 -138 221 -330 365 -743 77 -223 89 -288 82 -441 -5 -129 -32 -239 -88 -366 -32 -73 -29 -108 10 -108 27 0 40 20 73 113 131 365 83 687 -188 1281 -78 170 -78 164 -6 245 283 322 704 1096 738 1358 6 47 4 54 -19 77 -37 37 -45 35 -243 -65z" />

                            <path className='rightEye eye' d="M3851 2750 c-147 -36 -175 -284 -40 -360 130 -72 263 -1 276 148 13 142 -102 246 -236 212z m140 -106 c20 -55 -45 -99 -86 -58 -18 18 -13 63 8 76 28 18 67 8 78 -18z" />


                            <path className='leftEye eye' d="M2449 2667 c-119 -78 -113 -293 11 -358 163 -87 322 98 241 278 -43 94 -170 135 -252 80z m145 -73 c48 -18 38 -84 -12 -84 -49 0 -69 42 -36 74 17 18 24 19 48 10z" />
                            <path d="M3245 2255 c-31 -30 -32 -58 -4 -86 28 -28 178 -22 210 7 23 21 25 67 3 88 -28 29 -179 22 -209 -9z" />
                            <path d="M4320 2211 c-173 -53 -220 -263 -81 -363 195 -139 493 37 402 237 -46 103 -200 163 -321 126z" />
                            <path d="M2103 2100 c-268 -55 -287 -406 -25 -461 225 -46 419 115 358 298 -39 117 -191 191 -333 163z" />
                            <path className='mouth' d="M3130 1921 c-114 -23 -135 -61 -135 -243 0 -204 29 -233 230 -233 137 0 201 22 277 95 127 124 91 329 -66 375 -52 16 -239 19 -306 6z m289 -94 c89 -59 106 -160 39 -227 -121 -121 -330 -132 -389 -20 -36 67 -21 199 29 243 53 48 251 50 321 4z" />


                        </g>
                    </svg>

                </div>
        
    );
};

export default Pikachu;