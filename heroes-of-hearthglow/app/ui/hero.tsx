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
              if (entry.target === h2Ref.current && pRef.current) {
                pRef.current.classList.add('slide-in');
                observer.unobserve(pRef.current);
              }
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
      <section className="relative bg-black flex flex-col items-center h-fit outer-shadow">
        <div className=" flex-col relative w-full max-w-[800px]">
          <Image
              src="/Logo.png"
              width={2400}
              height={1642}
              alt="Landing page"
              className="w-full h-full object-cover opacity-50 pt-10"
          />
          <div className="absolute inset-0 bg-black bg-opacity-80">
            <div className="absolute inset-0 bg-radial from-black to-transparent"></div>
          </div>
        </div>

        <div className="absolute flex flex-col justify-center items-center z-1">
          <h2
              ref={h2Ref}
              className="text-center mb-10 mr-5 ml-5 text-4xl font-semibold text-slate-100 drop-shadow-[0_1px_2px_rgba(0,0,0,1)] text-shadow-xl pt-20 hidden-slide-in"
          >
            Let Your Spirit Burn Brighter Than Any Evil
          </h2>
          <p
              ref={pRef}
              className="max-w-[500px] text-justify lg:text-justify md:text-md w-[80vw] leading-9 tracking-wide font-normal text-slate-300 drop-shadow-[0_1px_2px_rgba(0,0,0,1)] text-shadow-xl hidden-slide-in"
          >
            Heroes of Hearthglow is a 2D action RPG roguelike where your fate is forged by fire and tempered through
            endless rebirth. Each time you fall, you rise again—stronger, more determined, and ever closer to banishing
            the undead forces of Necropolis.
            <br/><br/>
            Embrace your unbreakable will as you battle through a myriad of environments—from crumbling catacombs to
            scorching deserts—wielding a vast array of weapons and abilities that adapt to every run. With each rebirth,
            discover fresh strategies, assemble powerful gear, and prove that not even death can extinguish the light
            within.
          </p>
        </div>
        <div className="flex-col max-w-[1000px] w-full h-fit z-1 md:mt-40">
          <div className="flex flex-col justify-start items-center mt-[600px] md:flex-row md:mt-0 md:items-start">
            <Image
              src="/BlacksmithScene.png"
              width={2400}
              height={1642}
                alt="Landing page"
                className="w-2/3 mb-4 md:mb-0 md:w-1/3 md:ml-5 md:mr-5  border-1 md:border-2 border-amber-400 rounded-md border-opacity-50 "
            />
            <p className="ml-5 mt-2 w-7/8 text-justify md:leading-9 font-normal text-slate-300 drop-shadow-[0_1px_2px_rgba(0,0,0,1)] text-shadow-xl md: mr-5">
              Fight bad dudes at badass places, like the place shown above probably. Fight bad dudes at badass places, like the place shown above probably. Fight bad dudes at badass places, like the place shown above probably. Fight bad dudes at badass places, like the place shown above probably. Fight bad dudes at badass places, like the place shown above probably.
            </p>
          </div>
          <div className="flex flex-col justify-end items-center mt-16 md:flex-row-reverse md:items-start md:mt-16">
            <Image
                src="/BlacksmithScene.png"
                width={2400}
                height={1642}
                alt="Landing page"
                className="w-2/3 mb-4 md:mb-0 md:w-1/3 md:mr-5 md:ml-5 border-1 md:border-2 border-amber-400 rounded-md border-opacity-50 "
            />
            <p className="ml-5 mt-2 w-7/8 text-justify md:leading-9 font-normal text-slate-300 drop-shadow-[0_1px_2px_rgba(0,0,0,1)] text-shadow-xl md: mr-5">
              Fight bad dudes at badass places, like the place shown above probably. Fight bad dudes at badass places, like the place shown above probably. Fight bad dudes at badass places, like the place shown above probably. Fight bad dudes at badass places, like the place shown above probably. Fight bad dudes at badass places, like the place shown above probably.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center mt-16 md:flex-row md:items-start md:mt-16 ">
            <Image
                src="/BlacksmithScene.png"
                width={2400}
                height={1642}
                alt="Landing page"
                className="w-2/3 mb-4 md:mb-0 md:w-1/3 md:ml-5 md:mr-5 border-1 md:border-2 border-amber-400 rounded-md border-opacity-50 "
            />
            <p className="ml-5 mt-2 w-7/8 text-justify md:leading-9 font-normal text-slate-300 drop-shadow-[0_1px_2px_rgba(0,0,0,1)] text-shadow-xl md: mr-5">
              Fight bad dudes at badass places, like the place shown above probably. Fight bad dudes at badass places, like the place shown above probably. Fight bad dudes at badass places, like the place shown above probably. Fight bad dudes at badass places, like the place shown above probably. Fight bad dudes at badass places, like the place shown above probably.
            </p>
          </div>
        </div>
      </section>
  );
};

export default Hero;
