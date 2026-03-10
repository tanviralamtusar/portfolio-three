/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client'
import AboutMe from "@/components/AboutMeComponents/AboutMe";
import ContactSection from "@/components/contactSection.tsx/ContactSection";
import Sticker from "@/components/contactSection.tsx/Sticker";
import ContactPage from "@/components/contactSection.tsx/test";
import Navbar from "@/components/heroComponents/navbar";
import ProjectButton from "@/components/heroComponents/ProjectButton";
import BounceSvg from "@/components/normalComponents/BounceSvg";
import ImgSwap from "@/components/normalComponents/ImgSwap";
import RollingSvg from "@/components/normalComponents/NormalSvg";
import PhotoGallery from "@/components/normalComponents/PhotoGallery";
import EducationSection from "@/components/normalComponents/Trainining";

import ProjectsWrapper from "@/components/ProjectComponents/ProjectsWrapper";
import { useLenis } from "@/components/providers/LenisProvider";
import SkillSection from "@/components/SkillsComponents/SkillSection";
import { galleryData } from "@/public/data/imgData";


import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import { useRef, useState } from "react";


gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger)

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const paralaxRef = useRef<HTMLDivElement | null>(null)
  const projectButtonnRef = useRef<HTMLDivElement | null>(null)
  const text1 = useRef<HTMLDivElement | null>(null)
  const text2 = useRef<HTMLDivElement | null>(null)
  const text3 = useRef<HTMLDivElement | null>(null)
  const [heroDone, setHeroDone] = useState(false)
  const bounceRef = useRef<HTMLDivElement | null>(null)
  const rollingSvgRef = useRef<HTMLDivElement | null>(null)
  const pcImgRef = useRef<HTMLDivElement | null>(null)
  const aboutMeSvgRef = useRef<HTMLDivElement | null>(null)
  const dividerRef = useRef<HTMLDivElement | null>(null)
  const lenis = useLenis()
  const [aboutLogo, setAboutLogo] = useState(false)
  const [sticky, setSticky] = useState(true)


  useGSAP(() => {
    ScrollTrigger.create({
      trigger: dividerRef.current,
      start: 'bottom bottom',
      onEnter: () => setSticky(false),      // Fires when scrolling down past the start point
      onLeaveBack: () => setSticky(true)  // Fires when scrolling back up past the start point
    });
  });


  useGSAP(() => {
    if (heroDone) {
      const secondaryTl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.5 } });

      secondaryTl.to(bounceRef.current, { right: 0 }, 0)
        .to(rollingSvgRef.current, { left: '5%' }, 0.1)
        .to(pcImgRef.current, { bottom: '10%' }, 0.2);
    }
  }, [heroDone])


  // about me svg animation 

  useGSAP(() => {

    const letters = gsap.utils.toArray('[class*="About-path"]');

    if (letters.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutMeSvgRef.current,
        start: "top 70%",

      },
      force3D: true,
      onComplete: () => {
        setInterval(() => {
          setAboutLogo(prev => !prev)
        }, 850);
      }
    });

    // 2. Initial state
    gsap.set(letters, { opacity: 0, transformOrigin: "50% 50%" });

    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    letters.forEach((letter: any, i) => {
      const randomX = (Math.random() - 0.5) * 600;
      const randomY = (Math.random() - 0.5) * 600;
      const randomRotate = (Math.random() - 0.5) * 360;

      tl.fromTo(letter,
        {
          x: randomX,
          y: randomY,
          rotation: randomRotate,
          scale: 0,
          opacity: 0
        },
        {
          x: randomX * 0.15,
          y: randomY * 0.15,
          rotation: randomRotate * 0.1,
          scale: 1.2,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out"
        },
        i * 0.08
      )
        .to(letter, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 0.5,
          ease: "back.out(2)"
        }, "-=0.4");
    });


  })


  useGSAP(() => {
    document.fonts.ready.then(() => {
      const split1 = new SplitText(text1.current, { type: 'chars, lines', mask: 'lines' });
      const split3 = new SplitText(text3.current, { type: 'words, chars, lines', mask: 'lines' });
      const split2 = new SplitText(text2.current, { type: 'words, lines', mask: 'lines' });



      const tl = gsap.timeline({
        defaults: { ease: 'expo.out', duration: 1.2 },
        onComplete: () => {
          setHeroDone(true)
          document.body.style.overflow = '';
          lenis?.start()
        },
        onStart: () => {
          lenis?.stop(); // Stops scroll when intro starts
          document.body.style.overflow = 'show';
        }
      });

      tl.set([text1.current, text2.current, text3.current], { opacity: 1 });

      // ANIMATION SEQUENCE
      tl.from(split1.chars, {
        yPercent: 100,
        autoAlpha: 0,
        stagger: 0.03,
      }, "+=0.2")

        .from(split3.chars, {
          yPercent: 130,
          rotateX: -30, // Adds a 3D "leaning" feel
          transformOrigin: "0% 50% -50",
          stagger: 0.02,
          duration: 1.5,
        }, "-=0.8") // Overlap with text1

        .from(split2.words, {
          yPercent: 100,
          autoAlpha: 0,
          stagger: 0.02,
          duration: 1,
        }, "-=0.8")

        .to(projectButtonnRef.current, {
          y: 0,
          autoAlpha: 1,
        },
          "-=0.5");

      return () => {
        split1.revert();
        split2.revert();
        split3.revert();
      };
    })
  }, { scope: containerRef, dependencies: [lenis] });

  return (
    <div ref={containerRef} className="w-full z-0 bg-foreground  relative">
      {/* Decorative SVGs */}
      <div ref={bounceRef} className="fixed z-4  -right-[70%] bottom-[5%] sm:bottom-[20%] ">
        <BounceSvg />
      </div>
      <div ref={rollingSvgRef} className="fixed z-4 -left-[45%] top-[25%] ">
        <RollingSvg />
      </div>

      <Navbar navOpen={heroDone} />

      <div id="hero" className="h-screen overflow-hidden text-background font-futura uppercase flex items-center justify-center relative flex-col sm:px-4 px-2">
        <div className="sm:w-fit w-full flex gap-y-1.5 sm:gap-y-0 flex-col items-start ">



          <p ref={text1} className="opacity-0 font-semibold font-outfit text-2xl sm:text-3xl md:text-4xl">
            Hi i am
          </p>



          <p ref={text3} className="opacity-0 sm:text-5xl text-4xl md:text-7xl font-extrabold">
            sayeed shorif
          </p>



          <p ref={text2} className="opacity-0 font-outfit text-sm text-start font-semibold lowercase ">
            A Front End Focused Web developer and Designer
          </p>


          <div ref={projectButtonnRef} className="mt-6 opacity-0 translate-y-full relative z-50 " >
            <ProjectButton text="Projects" onClick={() => {
              const el = document.getElementById('ProjectSection')
              el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }} />
          </div>
        </div>

        <div ref={pcImgRef} className="absolute -bottom-[70%]">
          <ImgSwap link1="/img/pcimg1.webp" link2="/img/pcimg2.webp" />
        </div>
      </div>

      <div>
        <div id="ProjectSection" className="flex -mb-[100vh] min-h-screen relative z-20 flex-col">
          <div className="w-full h-[20vh]">
            <svg
              viewBox="0 0 1440 160"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <path
                d="
      M0,80
      C180,40 260,20 360,40
      C460,60 520,120 640,110
      C780,100 900,70 1040,60
      C1180,50 1280,60 1440,40
      L1440,160
      L0,160
      Z
    "
                fill="#84a98c"
              />
            </svg>

          </div>

          <ProjectsWrapper />
          <div className="-mt-12 w-full h-[40vh] md:h-[20vh]">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 160"
              preserveAspectRatio="none"
            >
              <path
                d="M0,80 C180,140 360,20 720,60 C1080,100 1260,40 1440,60 L1440,0 L0,0 Z"
                fill="#85a98d"
              />
            </svg>
          </div>


        </div>
      </div>
      <div ref={paralaxRef} className={`${sticky ? ' sticky top-0 left-0' : 'relative'} gallery  z-2 w-full`}>
        <PhotoGallery images={galleryData} />
      </div>

      {/* devider div  */}
      <div ref={dividerRef} className="min-h-screen mt-[100vh]">
        <div className="relative z-6">
          <svg
            viewBox="0 0 1440 160"
            preserveAspectRatio="none"
            className="w-full h-[20vh]"
          >
            <path
              d="
      M0,80
      L80,60 L140,90 L200,40 L260,100
      L320,30 L380,70 L440,20 L500,90
      L560,40 L620,70 L680,30 L740,80
      L800,40 L860,70 L920,50 L980,60
      L1040,40 L1100,70 L1160,30 L1220,80
      L1280,50 L1340,60 L1440,40
      L1440,160
      L0,160
      Z
    "
              fill="#e2d7a8"
            />
          </svg>

        </div>

        {/* rest of the page  */}
        <div id="AboutSection" className="bg-transparent z-6 relative">
          <div className="absolute -rotate-25  top-[1%]">

            <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="3600 6300 5200 2600"
              className="w-fit h-auto border block"
              preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,600.000000) scale(0.050000,-0.050000)" fill="#000000" stroke="none"> <path d="M3866 8983 c3 -18 11 -43 19 -55 8 -12 7 -29 -1 -37 -26 -26 -24 -473 2 -457 18 10 18 7 1 -15 -20 -25 -22 -524 -6 -1311 l2 -62 488 -2 489 -3 0 61 c0 43 -7 56 -25 45 -20 -11 -20 -8 -1 15 29 36 25 358 -4 358 -11 0 -9 8 4 16 29 18 25 147 -4 169 -13 9 -13 15 0 15 19 0 37 103 34 190 -5 121 -19 180 -42 175 -14 -4 -19 3 -12 15 7 11 20 16 28 11 9 -5 16 87 17 205 0 118 6 239 12 269 5 30 1 55 -10 55 -10 0 -12 11 -4 25 21 34 24 153 5 220 -8 30 -7 59 3 65 9 6 13 24 7 39 -18 45 -1009 39 -1002 -6z m662 -159 c43 -13 87 -17 98 -10 11 7 14 2 7 -9 -8 -12 5 -28 27 -35 22 -7 40 -19 40 -28 0 -8 14 -32 31 -53 18 -22 25 -25 17 -9 -8 17 -7 24 1 16 8 -7 17 -75 19 -151 5 -168 -65 -288 -204 -356 l-83 -40 57 -22 c50 -19 65 -15 113 26 71 60 89 61 32 1 -54 -59 -54 -73 5 -136 53 -57 71 -102 81 -208 4 -40 12 -78 19 -84 6 -7 2 -24 -11 -39 -12 -15 -14 -27 -4 -27 9 0 8 -7 -3 -15 -11 -8 -35 -48 -54 -88 -77 -167 -210 -213 -574 -197 l-229 10 -2 80 c-1 44 4 109 11 145 9 43 6 65 -9 65 -16 1 -16 5 -1 15 11 8 22 74 24 145 2 72 8 256 13 410 6 154 10 357 11 450 l0 170 245 -2 c135 -1 280 -12 323 -24z m133 -1473 c-62 -64 -199 -136 -171 -90 7 10 24 19 38 19 14 0 61 31 104 69 101 89 114 90 29 2z" /> <path d="M4259 8719 c-50 -30 -49 -513 1 -529 30 -9 52 -2 73 23 16 20 24 26 17 12 -22 -44 14 -27 71 33 162 170 20 574 -162 461z" /> <path d="M4215 8067 c-5 -9 -11 -145 -12 -302 l-3 -285 55 -2 c90 -4 112 3 159 54 88 96 92 392 5 478 -50 48 -187 87 -204 57z" /> <path d="M7600 8763 c-41 -40 -54 -70 -47 -100 16 -60 -10 -53 -75 19 -63 71 -174 88 -296 46 -54 -18 -76 -19 -87 -1 -8 13 -14 1 -12 -27 2 -47 -14 -230 -33 -378 -9 -66 -30 -112 -30 -65 0 13 -9 23 -20 23 -25 0 -27 -473 -2 -489 10 -6 23 0 28 14 5 14 16 -2 24 -35 20 -82 92 -235 105 -222 6 6 66 -20 133 -58 305 -170 585 -59 644 257 79 422 65 1003 -25 1025 -26 7 -47 19 -47 27 0 48 -204 20 -260 -36z m266 -58 c51 -262 -106 -1042 -223 -1103 -370 -195 -627 29 -564 492 12 86 24 241 27 344 8 227 38 268 192 258 l92 -6 -2 -140 c-1 -77 -9 -262 -18 -410 -14 -235 -12 -274 16 -297 41 -34 110 1 123 63 11 51 62 465 81 653 19 186 31 201 158 201 101 0 108 -3 118 -55z" /> <path d="M8369 8753 c-20 -107 -21 -1023 -2 -1358 l17 -295 123 0 c68 0 197 6 288 13 l166 13 -13 832 c-7 458 -17 836 -22 842 -4 5 -129 12 -276 17 l-267 7 -14 -71z m271 -163 l0 -130 60 0 c78 0 82 -55 5 -64 l-55 -6 1 -210 c2 -507 51 -935 73 -636 7 103 103 135 109 36 7 -120 -43 -180 -147 -180 -162 1 -155 -21 -166 514 -10 475 -10 476 -55 482 -61 9 -57 36 10 68 51 25 55 35 53 141 -2 113 -1 115 55 115 57 0 57 0 57 -130z" /> <path d="M5673 8605 l-337 -6 12 -94 c6 -52 17 -305 24 -563 l13 -467 253 13 c568 29 598 33 609 79 6 24 13 268 16 543 l6 500 -129 1 c-72 0 -282 -2 -467 -6z m364 -259 c245 -140 201 -520 -71 -617 -271 -97 -526 59 -525 321 2 293 322 452 596 296z" /> <path d="M5664 8339 c-173 -105 -159 -485 20 -581 132 -71 315 -8 377 129 138 304 -133 613 -397 452z" /> <path d="M2804 8541 c-36 -9 -106 -32 -155 -50 l-89 -34 0 -119 0 -118 136 0 136 0 19 65 c33 113 189 86 189 -33 0 -37 -22 -52 -135 -91 -319 -110 -396 -186 -381 -374 19 -223 218 -307 443 -186 l76 41 11 -42 c10 -38 23 -41 164 -36 l152 6 6 92 c4 64 -3 99 -25 117 -25 21 -31 76 -31 288 0 422 -157 566 -516 474z m236 -620 c0 -111 -156 -198 -208 -116 -30 47 1 93 99 149 90 51 109 45 109 -33z" /> <path d="M4725 6468 c-128 -61 -177 -72 -436 -96 -349 -34 -326 -16 -283 -221 19 -91 34 -251 34 -354 0 -149 10 -213 46 -307 l46 -118 119 5 c65 2 223 12 349 22 127 11 307 24 401 31 l171 13 104 472 c121 543 134 491 -149 567 -259 69 -224 70 -402 -14z m-288 -245 c-5 -40 9 -42 56 -4 94 73 256 49 294 -44 7 -18 15 -19 26 -3 31 42 145 88 216 88 162 0 181 -104 95 -500 l-38 -170 -75 -2 c-99 -3 -101 8 -44 268 54 253 45 301 -55 276 -76 -19 -123 -109 -163 -315 -38 -198 -63 -237 -150 -237 -72 0 -72 3 -16 284 23 117 37 228 30 245 -34 88 -196 -17 -221 -144 -6 -30 -21 -113 -34 -185 -32 -177 -47 -200 -125 -200 -37 0 -71 5 -77 10 -12 12 107 610 128 641 14 22 156 15 153 -8z" /> <path d="M6034 6379 c-610 -153 -458 -938 182 -939 306 0 540 226 371 359 -29 22 -42 41 -29 41 37 0 84 133 70 195 -58 262 -319 413 -594 344z m206 -249 c38 -45 9 -90 -58 -90 -72 0 -91 25 -62 80 25 47 85 52 120 10z m190 -350 c-66 -43 -207 -54 -271 -19 -79 42 -36 59 146 59 l185 0 -60 -40z" /> </g> </svg>
          </div>
          <div className="bg-[#e2d6a9] relative z-6  min-h-screen">
            <div ref={aboutMeSvgRef} className={`xl:w-[20%] md:w-[30%] w-[45%] absolute  -top-6 left-0  z-5 ${aboutLogo ? 'rotate-10' : 'rotate-0'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 300" className="" >


                <g className="About-path1 About-path " transform="rotate(-5 102.5 152)">
                  <rect x="65" y="112" width="75" height="80" fill="#A8D8EE" stroke="none" />
                  <g transform="translate(7 -11)">
                    <path d="M69.4 148.2c-1.1-16.1 10.2-28.5 28.2-28.5 18.3 0 26.5 13.2 26.5 28.5v28.8c0 4.2 1.8 7.5 6.5 7.5v11c-8.5 0-15.5-4.5-17.5-12-4.8 8.2-14.2 13.5-24.8 13.5-16.5 0-27.2-10.8-27.2-25.5 0-16.5 13.5-24.5 32.1-30.3 8.5 0 16.5 3.2 21.5 8.5v-8.2c0-9.8-5.8-14.9-15.7-13.4-8.8 0-14.5 4.8-19.6 10.9L72 145.9zM116.2 165.2v-10.2c-4.5-5.5-11.2-8.5-18.5-8.5-9.5 0-16.5 5.2-16.5 14.5 0 8.8 6.8 14.2 15.5 14.2C105.5 175.2 112.5 171.2 116.2 165.2z" fill="#111111" transform="rotate(-3 100 150)" />
                  </g>
                </g>


                <g className="About-path2 " transform="rotate(-3 182.5 120)">
                  <rect x="150" y="65" width="65" height="110" fill="#8F3B3B" stroke="none" />
                  <g transform="translate(0 1)">
                    <path d="M155,75 h25.5 c16.5,0 28.5,7.2 28.5,21.5 c0,10.5 -6.5,16.8 -15.5,19.5 c11.5,2.5 19.5,10.5 19.5,22.5 c0,16.5 -13.5,24.5 -31.5,24.5 H155 V75z M175,110 h5.5 c8.5,0 13.5,-4.2 13.5,-11.5 c0,-7.5 -5.2,-11.2 -13.5,-11.2 h-5.5 V110z M175,148 h7.5 c10.2,0 16.2,-4.5 16.2,-12.8 c0,-8.5 -6,-12.8 -16.2,-12.8 h-7.5 V148z" fill="#FFFFFF" transform="rotate(-2 175 110)" />
                  </g>
                </g>


                <g className="About-path3" transform="rotate(4 267.5 133)">
                  <rect x="235" y="98" width="65" height="70" fill="#4B362F" stroke="none" />
                  <g transform="translate(2.5 -4)">
                    <path d="M265,105 c-16.5,0 -28.5,13.5 -28.5,31.5 c0,18.5 12.2,32.5 28.5,32.5 c16.8,0 28.8,-14 28.8,-32.5 C293.8,118.5 281.8,105 265,105z M265,155 c-8.5,0 -14.5,-8.5 -14.5,-18.5 c0,-10.2 6,-18.2 14.5,-18.2 c8.8,0 14.8,8 14.8,18.2 C279.8,146.5 273.8,155 265,155z" fill="#FFFFFF" transform="rotate(4 265 135)" />
                  </g>
                </g>


                <g className="About-path4" transform="rotate(-5 353 142.5)">
                  <rect x="318" y="100" width="70" height="85" fill="#D9B54A" stroke="none" />
                  <g transform="translate(17 -7)">
                    <path d="M320,115 v38.5 c0,10.5 5.5,15.8 14.5,15.8 c8.5,0 14.5,-5.5 14.5,-14.8 v-39.5 h18 v39.5 c0,18.5 -11.5,29.5 -29.5,29.5 c-19.5,0 -32.5,-11.5 -32.5,-31.5 V115 H320z" fill="#FFFFFF" transform="rotate(-3 340 145)" />
                  </g>
                </g>


                <g className="About-path5" transform="rotate(-3 412.5 112.5)">
                  <rect x="390" y="60" width="45" height="105" fill="#333333" stroke="none" />
                  <g transform="translate(-3 -8)">
                    <path d="M420,70 v30 h15 v14 h-15 v32 c0,6.5 2.5,9.5 8.5,9.5 c2.5,0 5.2,-0.5 7.5,-1.5 v14 c-3.5,1.5 -8.5,2.5 -14.5,2.5 c-13.5,0 -19.5,-8.5 -19.5,-22.5 v-34 h-12 v-14 h12 v-24 H420z" fill="#FFFFFF" transform="rotate(-4 415 125)" />
                  </g>
                </g>


                <g className="About-path6" transform="rotate(-7 227.5 237.5)">
                  <rect x="180" y="205" width="95" height="65" fill="#D32F2F" stroke="none" />
                  <g transform="translate(-10.5 -2.5)">
                    <path d="M190,210 h15 v8 c4.5,-6.5 11.5,-9.5 19.5,-9.5 c8.5,0 15.5,3.8 18.5,10.5 c4.8,-6.8 12.5,-10.5 21.5,-10.5 c13.5,0 21.5,8.5 21.5,23.5 v38 h-17 v-34 c0,-7.5 -3.5,-11.5 -9.5,-11.5 c-6.5,0 -11.5,4.5 -11.5,12.5 v33 h-17 v-34 c0,-7.5 -3.5,-11.5 -9.5,-11.5 c-6.5,0 -11.5,4.5 -11.5,12.5 v33 h-17 V210z" fill="#FFFFFF" transform="rotate(-2 240 240)" />
                  </g>
                </g>


                <g className="About-path7" transform="rotate(8 342.5 255)">
                  <rect x="305" y="215" width="75" height="80" fill="#E0E0E0" stroke="none" />
                  <g transform="translate(8 28)">
                    <path d="M335,195 c-18.5,0 -32.5,13.5 -32.5,31.5 c0,18.5 13.5,32.5 31.5,32.5 c12.5,0 22.5,-6.5 28.5,-16.5 l-13.5,-8.5 c-3.5,5.5 -8.5,9.5 -14.5,9.5 c-8.5,0 -14.5,-5.5 -15.5,-13.5 h46.5 c0.5,-2.5 0.8,-5.5 0.8,-8.5 C366.5,208.5 354.5,195 335,195 z M335,210 c8.5,0 14.2,6 15.2,13.5 h-30.5 C321.2,216 326.8,210 335,210 z" fill="#111111" transform="rotate(8 335 225)" />
                  </g>
                </g>

              </svg>
            </div>
            <AboutMe />
            <EducationSection/>
          </div>

        </div>

      </div>

      {/* skills section  */}

      

      <div className="min-h-screen bg-foreground">
        <div id="SkillsSection" className="h-[30vh] -mt-3  relative z-5 w-full">
          <svg
            viewBox="0 0 1440 160"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path
              d="
      M0,0
      L80,20 L140,-10 L200,40 L260,-20
      L320,50 L380,10 L440,60 L500,-10
      L560,40 L620,10 L680,50 L740,0
      L800,40 L860,10 L920,30 L980,20
      L1040,40 L1100,10 L1160,50 L1220,0
      L1280,30 L1340,20 L1440,40
      L1440,0
      L0,0
      Z
    "
              fill="#e2d7a8"
            />
          </svg>
        </div>
        <SkillSection />
      </div>
      <div id="ContactSection">
        <ContactSection />
      </div>
      <div className="h-screen text-background -mt-[1%] overflow-hidden bg-[#e3d7a9] sm:px-6 px-2  relative z-30">
          {/* stickers  */}
          <div>
            <div className={`absolute top-[20%] right-[2%] ${aboutLogo ? 'rotate-10' : 'rotate-0'}`}>
            <Sticker link="/img/naruto.webp"/>
          </div>
          <div className={`absolute top-[40%] left-[25%] ${aboutLogo ? 'rotate-10' : 'rotate-0'}`}>
            <Sticker link="/img/speaker.webp"/>
          </div>
          
          <div className={`absolute right-[10%] bottom-[20%] ${aboutLogo ? 'rotate-10' : 'rotate-0'}`}>
            <Sticker link="/img/mail.webp"/>
          </div>
          </div>
          {/* main page  */}
          <ContactPage/>
      </div>
    </div>
  );
}
