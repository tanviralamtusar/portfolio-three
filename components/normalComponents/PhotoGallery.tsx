'use client'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import React, { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger)

const PhotoGallery = ({ images }: { images: string[] }) => {
    const scope = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        const imgs = gsap.utils.selector(scope)(".swapImg");
        
        // Safety check: if there's only 1 image or none, don't animate.
        if (imgs.length < 2) return;

        // 1. Initial State: Hide everything except the first image
        gsap.set(imgs, { opacity: 0 });
        gsap.set(imgs[0], { opacity: 1 });

        // 2. Create the looping timeline
        const tl = gsap.timeline({ repeat: -1, scrollTrigger:{
            trigger:scope.current,
            start: 'top bottom',
            end: '+=400%'
        } });

        imgs.forEach((img, i) => {
            const nextIdx = (i + 1) % imgs.length; // Loops back to 0 at the end
            const currentImg = img;
            const nextImg = imgs[nextIdx];

            tl.to(currentImg, { 
                opacity: 0, 
                duration: 1, 
                ease: "power2.inOut",
                delay: 4 // How long the image stays visible
            })
            .to(nextImg, { 
                opacity: 1, 
                duration: 1, 
                ease: "power2.inOut" 
            }, "<"); // "<" starts this animation at the same time as the previous one
        });

    }, { scope, dependencies: [images] }); // Re-run if images array changes

    return (
        <div ref={scope} className='w-full h-screen aspect-auto mx-auto   relative overflow-hidden'>
            {images.map((img, idx) => (
                <Image
                    alt={`gallery-img-${idx}`}
                    fill
                    key={idx}
                    src={img}
                    className='object-cover swapImg'
                    priority={idx === 0} // Load the first image immediately
                />
            ))}
        </div>
    );
};

export default PhotoGallery;