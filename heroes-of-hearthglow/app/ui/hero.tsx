'use client'

import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('slide-in');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
        }
    );

    if (h2Ref.current) {
      observer.observe(h2Ref.current);
    }
    if (pRef.current) {
      observer.observe(pRef.current);
    }

    // Clean up
    return () => {
      if (h2Ref.current) {
        observer.unobserve(h2Ref.current);
      }
      if (pRef.current) {
        observer.unobserve(pRef.current);
      }
    };
  }, []);

  return (
      <section className="relative bg-black flex flex-col items-center h-screen outer-shadow">
        <div className="relative w-full max-w-[800px]">
          <Image
              src="/landingGray.png"
              width={2400}
              height={1642}
              alt="Landing page"
              className="w-full h-full object-cover opacity-50 pt-10"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50">
            <div className="absolute inset-0 bg-radial from-black to-transparent"></div>
          </div>
        </div>
        <div className="absolute flex flex-col justify-center z-10">
          <h2
              ref={h2Ref}
              className="text-center mb-10 text-3xl font-bold text-gray-100 drop-shadow-[0_1px_2px_rgba(0,0,0,1)] text-shadow-xl pt-20 hidden-slide-in"
          >
            Welcome to Hearthglow
          </h2>
          <p
              ref={pRef}
              className="max-w-[500px] pb-20 text-center lg:text-justify text-xl w-[80vw] m-auto mt-5 font-semibold text-gray-100 drop-shadow-[0_1px_2px_rgba(0,0,0,1)] text-shadow-xl hidden-slide-in"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            sed arcu nec velit congue ultrices non nec massa. Donec eu cursus leo.
            Phasellus ornare consequat euismod.
          </p>
        </div>
      </section>
  );
};

export default Hero;
