'use client'
import React, { useRef } from "react";
// import TextBorderAnimation from "@/components/borderText";
// import { EnvelopeLink } from "@/components/ui/GmailPart";
import gsap from "gsap";
import TextBorderAnimation from "./TextHove";

const ContactPage = () => {
    // Refs for the first arrow ("Social Networks")
    const arrow1ShaftRef = useRef<SVGPathElement>(null);
    const arrow1HeadRef = useRef<SVGPathElement>(null);

    // Refs for the second arrow ("Let's Talk")
    const arrow2ShaftRef = useRef<SVGPathElement>(null);
    const arrow2HeadRef = useRef<SVGPathElement>(null);

    // --- Hover Handlers for "SOCIAL NETWORKS" ---
    const handleEnter1 = () => {
        gsap.killTweensOf([arrow1ShaftRef.current, arrow1HeadRef.current]);

        gsap.to(arrow1ShaftRef.current, {
            scale: 1.5,
            strokeWidth: 3,
            transformOrigin: "0% 0%", // top-left
            duration: 0.5,
            ease: "back.out(1.5)",
            overwrite: "auto",
        });
        gsap.to(arrow1HeadRef.current, {
            x: 8,
            y: 8,
            duration: 0.5,
            ease: "back.out(1.5)",
            overwrite: "auto",
        });
    };

    const handleLeave1 = () => {
        gsap.killTweensOf([arrow1ShaftRef.current, arrow1HeadRef.current]);

        gsap.to([arrow1ShaftRef.current, arrow1HeadRef.current], {
            scale: 1,
            strokeWidth: 1.5, // back to default
            x: 0,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
            onComplete: () => {
                gsap.set([arrow1ShaftRef.current, arrow1HeadRef.current], {
                    clearProps: "transform,strokeWidth",
                });
            },
        });
    };

    // --- Hover Handlers for "LET'S TALK" ---
    const handleEnter2 = () => {
        gsap.killTweensOf([arrow2ShaftRef.current, arrow2HeadRef.current]);

        gsap.to(arrow2ShaftRef.current, {
            scaleY: 1.5,
            transformOrigin: "bottom center",
            duration: 0.5,
            ease: "back.out(1.5)",
            overwrite: "auto",
        });
        gsap.to(arrow2HeadRef.current, {
            y: -10,
            duration: 0.5,
            ease: "back.out(1.5)",
            overwrite: "auto",
        });
    };

    const handleLeave2 = () => {
        gsap.killTweensOf([arrow2ShaftRef.current, arrow2HeadRef.current]);

        gsap.to([arrow2ShaftRef.current, arrow2HeadRef.current], {
            scaleY: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
            onComplete: () => {
                gsap.set([arrow2ShaftRef.current, arrow2HeadRef.current], {
                    clearProps: "transform",
                });
            },
        });
    };

    return (
        <div className="px-3 py-6 h-full justify-between  flex flex-col">

            {/* --- TOP SECTION --- */}
            <div>
                <div
                    onMouseEnter={handleEnter1}
                    onMouseLeave={handleLeave1}
                    className="flex w-fit items-center gap-x-6 cursor-pointer group"
                >
                    <p className="lg:text-6xl font-bold sm:text-4xl text-2xl ">
                        SOCIAL NETWORKS
                    </p>

                    <div className="overflow-visible">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="md:size-16 size-8 overflow-visible"
                            style={{ overflow: "visible" }}
                        >
                            {/* Arrow Shaft: The diagonal line */}
                            <path
                                ref={arrow1ShaftRef}
                                vectorEffect="non-scaling-stroke"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m4.5 4.5 15 15"
                            />

                            {/* Arrow Head: The "L" shape at the end */}
                            <path
                                ref={arrow1HeadRef}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25V19.5H8.25"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* --- MIDDLE SECTION --- */}
            <div className="first">
                <div className="flex font-medium text-2xl flex-col items-end">
                    <a target="_blank" href="https://www.facebook.com/sayeed.shorif.2025" rel="noreferrer">
                        <TextBorderAnimation text="Facebook" />
                    </a>
                    <a target="_blank" href="https://github.com/sayeed-dev-07" rel="noreferrer">
                        <TextBorderAnimation text="Github" />
                    </a>
                    <a target="_blank" href="https://www.linkedin.com/in/sayeed-shorif-68080234b/" rel="noreferrer">
                        <TextBorderAnimation text="LinkedIn" />
                    </a>
                    <a href="mailto:expsayeedshorif@gmail.com?subject=Contact%20from%20Portfolio&body=Hello%20Sayeed,%0A">
                        <TextBorderAnimation text="expsayeedshorif@gmail.com" />
                    </a>

                </div>
            </div>

            {/* --- BOTTOM SECTION --- */}
            <div className="second overflow-visible">
                <div className="overflow-visible">
                    <p className="text-sm -mb-4 uppercase">Get a Project in Mind?</p>

                    <div
                        onMouseEnter={handleEnter2}
                        onMouseLeave={handleLeave2}
                        className="flex overflow-visible items-center justify-between cursor-pointer border-b-2 border-transparent hover:border-background transition-colors duration-500 py-4"
                    >
                        <p className="lg:text-8xl sm:text-6xl text-5xl font-semibold uppercase">Let&apos;s Talk</p>

                        <div className="overflow-visible">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="lg:size-20 sm:size-14 size-10 overflow-visible"
                                style={{ overflow: "visible" }}
                            >
                                {/* Arrow Head (The ^ part) */}
                                <path
                                    ref={arrow2HeadRef}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 10.5 12 3m0 0 7.5 7.5"
                                />

                                {/* Arrow Shaft (The | part) */}
                                <path
                                    ref={arrow2ShaftRef}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 3v18"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
