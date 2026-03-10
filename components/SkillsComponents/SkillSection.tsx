'use client';
import React, {  useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ImgSwap from '../normalComponents/ImgSwap';
import skillsData from '@/public/data/skillsData';

gsap.registerPlugin(ScrollTrigger);

type CategoryKey = keyof typeof skillsData;

const categories: { key: CategoryKey; label: string }[] = [
    { key: 'frontend', label: 'Frontend' },
    { key: 'motion', label: 'Motion' },
    { key: 'creative', label: 'Creative' },
    { key: 'engineering', label: 'Engineering' }
];

const SkillSection = () => {
    const [activeCategory, setActiveCategory] = useState<CategoryKey>('frontend');
    const [isSwitching, setIsSwitching] = useState(false);

    const skillContainer = useRef<HTMLDivElement | null>(null);
    const imgSwapRef = useRef<HTMLDivElement | null>(null);
    const imgSwapRef2 = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLDivElement | null>(null);
    const listWrapRef = useRef<HTMLDivElement | null>(null);
    const listRef = useRef<HTMLDivElement | null>(null);
    const lineRef = useRef<HTMLDivElement | null>(null);
    const prevHeightRef = useRef<number>(0);



    
    useGSAP(
        () => {
            gsap.to(imgSwapRef.current, {
                opacity: 1,
                y: 0,
                scale:1,
                duration: 1.5,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: imgSwapRef.current,
                    start: 'clamp(top 90%)'
                }
            });
            gsap.to(imgSwapRef2.current, {
                scale:1,
                duration: 1.5,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: imgSwapRef2.current,
                    start: 'clamp(top 90%)'
                }
            });

            gsap.to(titleRef.current, {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'top 85%'
                }
            });
        },
        { scope: skillContainer }
    );

    
    useGSAP(
        () => {
            const chips = gsap.utils.selector(listRef)('.skill-chip');
            gsap.fromTo(
                chips,
                {
                    y: 30,
                    opacity: 0,
                    scale: 0.98,
                    force3D: true
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: 'expo.out',
                    stagger: { amount: 0.4, from: 'start' },
                    onComplete: () => setIsSwitching(false)
                }
            );
        },
        { scope: listRef, dependencies: [activeCategory] }
    );

    // Smooth wrapper height transition
    useGSAP(
        () => {
            const wrap = listWrapRef.current;
            if (!wrap) return;
            const nextHeight = wrap.scrollHeight;

            gsap.fromTo(
                wrap,
                { height: prevHeightRef.current || nextHeight },
                {
                    height: nextHeight,
                    duration: 0.8,
                    ease: 'expo.inOut',
                    force3D: true,
                    onComplete: () => {
                        gsap.set(wrap, { height: 'auto' });
                    }
                }
            );
        },
        { dependencies: [activeCategory] }
    );

    
    const handleCategoryChange = (key: CategoryKey) => {
        if (key === activeCategory || isSwitching) return;
        setIsSwitching(true);
        prevHeightRef.current = listWrapRef.current?.offsetHeight ?? 0;
        const chips = gsap.utils.selector(listRef.current)('.skill-chip');

        gsap
            .timeline()
            .to(chips, {
                y: -20,
                opacity: 0,
                duration: 0.4,
                ease: 'power2.inOut',
                stagger: { amount: 0.15, from: 'start' }
            })
            .add(() => setActiveCategory(key));
    };

    return (
        <section ref={skillContainer} className="relative px-6 sm:px-12 md:px-20 pb-32 pt-16  text-black selection:bg-black selection:text-white">

            <div
                ref={imgSwapRef}
                className="absolute scale-10 sm:right-[10%] left-[28%] sm:left-auto -top-[20%] opacity-0 translate-y-10"
            >
                <ImgSwap link1="/svg/tech1.svg" link2="/svg/tech2.svg" />
            </div>

            <div className="relative max-w-7xl -mt-10 mx-auto flex flex-col gap-16">

                {/* Header Section */}
                <div
                    ref={titleRef}
                    className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-black/10 pb-8 opacity-0 translate-y-10"
                >
                    <div className="flex flex-col gap-2">
                        <span className="text-xs uppercase tracking-[0.3em] text-black/80 font-medium font-social ">Expertise</span>
                        <h2 className="font-main text-5xl sm:text-7xl font-light tracking-tight">Skills.</h2>
                    </div>

                    {/* Minimalist Navigation */}
                    <div className="flex flex-wrap gap-x-5 sm:gap-10 mt-8 sm:mt-0">
                        {categories.map((cat) => (
                            <div className='w-fit overflow-hidden' key={cat.key}>
                                <button

                                    data-active={activeCategory === cat.key}
                                    onClick={() => handleCategoryChange(cat.key)}
                                    className={`text-xs uppercase tracking-[0.15em] font-social transition-all cursor-pointer duration-500 pb-1 ${activeCategory === cat.key
                                            ? 'text-black '
                                            : 'text-black/60 hover:text-black/70 '
                                        }`}
                                >
                                    {cat.label}
                                </button>

                                <div ref={lineRef} className={`${cat.key === activeCategory ? '' : '-translate-x-full'} h-px w-full bg-black`}></div>

                            </div>
                        ))}
                    </div>
                </div>

                {/* Minimalist Grid List */}
                <div ref={listWrapRef} className="overflow-hidden min-h-[40vh] -mt-12">
                    <div ref={listRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-0 ">
                        {skillsData[activeCategory].map((skill, idx) => (
                            <div
                                key={`${activeCategory}-${skill}`}
                                className="skill-chip group flex items-center gap-6 border-b border-black/5 sm:py-5 py-2.5 hover:border-black/30 transition-colors duration-500"
                            >
                                {/* Monospace numbering adds an editorial/architectural touch */}
                                <span className="text-xs font-mono text-black/50 group-hover:text-black/80 transition-colors duration-500">
                                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                                </span>
                                <span className="text-lg font-medium tracking-wide text-black/90 group-hover:text-black transition-colors duration-500">
                                    {skill}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <div ref={imgSwapRef2} className='overflow-visible w-full flex items-center justify-center scale-10'>
                <ImgSwap link1='/svg/1.svg' link2='/svg/2.svg'/>
            </div>
        </section>
    );
};

export default SkillSection;