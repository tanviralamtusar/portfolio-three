import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const educationData = [
    {
        id: 1,
        title: "Diploma in Computer Science Technology",
        organization: "Rangpur Polytechnic Institute",
        duration: "2022 — 2025",
        description: "Built strong fundamentals in software engineering, data structures, algorithms and problem solving",
        status: "Completed",
    },
    {
        id: 2,
        title: "Frontend Developer Intern",
        organization: "Bd Calling It.",
        duration: "Aug 2025 — Nov 2025",
        description: "Developed and maintained responsive user interfaces using React and TailwindCSS.",
        status: "Internship",
    },
    {
        id: 3,
        title: "Full-Stack Course",
        organization: "The Odin Project",
        duration: "Ongoing",
        description: "Currently following a full-stack open-source curriculum 'THE ODIN PROJECT' while strengthening problem-solving skills, clean code practices, and modern web development fundamentals.",
        status: "Ongoing",
    },
];

const getStatusBadge = (status: string) => {
    switch (status) {
        case "Completed":
            return "bg-emerald-100 text-emerald-700 border-emerald-200";
        case "Internship":
            return "bg-blue-100 text-blue-700 border-blue-200";
        case "Ongoing":
            return "bg-indigo-100 text-indigo-700 border-indigo-200";
        default:
            return "bg-gray-100 text-gray-700 border-gray-200";
    }
};

export default function EducationSection() {
    const sectionRef = useRef(null);
    const lineRef = useRef(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        // 1. Draw the vertical line (Lightweight, applies to all devices)
        gsap.fromTo(
            lineRef.current,
            { scaleY: 0 },
            {
                scaleY: 1,
                ease: "none",
                force3D: true, // Forces GPU acceleration
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "clamp(top 90%)",
                    end: "clamp(bottom 90%)",
                    scrub: true,
                },
            }
        );

        // 2. Responsive Animations using matchMedia
        const mm = gsap.matchMedia();

        mm.add(
            {
                // Define our breakpoints
                isMobile: "(max-width: 767px)",
                isDesktop: "(min-width: 768px)",
            },
            (context) => {
                const { isMobile } = context.conditions as { isMobile: boolean, isDesktop: boolean };

                cardsRef.current.forEach((card, index) => {
                    const dot = dotsRef.current[index];

                    // Dot Animation: Bounces in (same for both)
                    gsap.fromTo(
                        dot,
                        { scale: 0 },
                        {
                            scale: 1,
                            duration: 0.4,
                            ease: "back.out(2)",
                            force3D: true,
                            scrollTrigger: {
                                trigger: card,
                                start: isMobile ? "top 85%" : "clamp(top 90%)",
                                toggleActions: "play none none reverse",
                            },
                        }
                    );

                    // Card Animation: Slide up for Mobile, Scale for Desktop
                    gsap.fromTo(
                        card,
                        isMobile 
                            ? { y: 40, opacity: 0 } // Mobile: smoother slide up
                            : { scale: 0.85, opacity: 0 }, // Desktop: scale up (optimized from 0 to 0.85 to reduce layout thrashing)
                        {
                            y: 0,
                            scale: 1,
                            opacity: 1,
                            duration: 0.5,
                            ease: "power2.out",
                            force3D: true, // Forces hardware acceleration
                            scrollTrigger: {
                                trigger: card,
                                start: isMobile ? "top 85%" : "clamp(top 90%)",
                                toggleActions: "play none none reverse",
                            },
                        }
                    );
                });
            }
        );
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="py-24 bg-[#e3d7a9] text-gray-900 overflow-hidden relative"
        >
            {/* SVG Filter: Try to hide this on mobile if performance is still lagging */}
            

            <div className="max-w-5xl mx-auto px-6">
                <header className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-futura mb-3 text-black">
                        Education & Training
                    </h2>
                    <p className="max-w-xl mx-auto text-gray-800 font-medium">
                        My academic background, professional experience, and continuous journey of learning.
                    </p>
                </header>

                <div className="relative">
                    {/* Vertical Timeline Line */}
                    <div
                        ref={lineRef}
                        className="absolute will-change-transform top-0 bottom-0 left-5.75 md:left-1/2 w-0.5 bg-black md:-translate-x-1/2 origin-top"
                    />

                    {educationData.map((item, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <div
                                key={item.id}
                                ref={(el) => { cardsRef.current[index] = el; }}
                                className={`relative flex items-start md:justify-between w-full mb-12 last:mb-0 ${
                                    isEven ? "md:flex-row-reverse" : "md:flex-row"
                                }`}
                                style={{ willChange: "transform, opacity" }} // Helps browser optimize rendering
                            >
                                {/* Timeline Dot */}
                                <div
                                    ref={(el) => { dotsRef.current[index] = el; }}
                                    className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-black top-7 -translate-x-1/2 z-10 ring-4 ring-[#e3d7a9]"
                                />

                                <div className="hidden md:block w-[45%]" />

                                {/* Card Container */}
                                <div className="w-full md:w-[45%] pl-14 md:pl-0 mt-2 md:mt-0">
                                    <div className="group relative p-6 rounded-xl bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out z-10">
                                        
                                        {/* Hand-Drawn Border Layer overlay */}
                                        <div
                                            className="absolute inset-0 border-[3px] border-black rounded-xl pointer-events-none"
                                            // The style below applies the filter on desktop but ignores it on mobile to save performance
                                            style={{ filter: "var(--sketchy, none)" }} 
                                        />
                                        {/* CSS rule to add in your stylesheet for the var: 
                                            @media (min-width: 768px) { .group .absolute { --sketchy: url(#sketchy-border); } } 
                                        */}

                                        {/* Card Content */}
                                        <div className="relative z-10">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full border ${getStatusBadge(
                                                        item.status
                                                    )}`}
                                                >
                                                    {item.status}
                                                </span>
                                                <span className="text-sm font-medium text-gray-500">
                                                    {item.duration}
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold mb-1 tracking-tight text-black">
                                                {item.title}
                                            </h3>
                                            <h4 className="text-sm font-bold text-indigo-600 mb-4">
                                                {item.organization}
                                            </h4>

                                            <p className="text-sm leading-relaxed text-gray-600 font-medium">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}