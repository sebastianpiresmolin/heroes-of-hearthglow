'use client';

import React, { useState } from 'react';
import '../globals.css';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <>
      <div className="w-full bg-gray-400">
        <div className="navigation-wrapper flex justify-center bg-gray-400 pt-10 relative">
          {' '}
          {/* Add relative positioning here */}
          <div ref={sliderRef} className="keen-slider max-w-[500px] ">
            <div className="keen-slider__slide number-slide1 h-fit">
              <Image
                src="/landing.jpg"
                width={2400}
                height={1642}
                alt="Landing page"
              />
            </div>
            <div className="keen-slider__slide number-slide2">
              <Image
                src="/landing.jpg"
                width={2400}
                height={1642}
                alt="Landing page"
                className="h-fit"
              />
            </div>
            <div className="keen-slider__slide number-slide3">
              <Image
                src="/landing.jpg"
                width={2400}
                height={1642}
                alt="Landing page"
              />
            </div>
            <div className="keen-slider__slide number-slide4">
              <Image
                src="/landing.jpg"
                width={2400}
                height={1642}
                alt="Landing page"
              />
            </div>
            <div className="keen-slider__slide number-slide5">
              <Image
                src="/landing.jpg"
                width={2400}
                height={1642}
                alt="Landing page"
              />
            </div>
            <div className="keen-slider__slide number-slide6">
              <Image
                src="/landing.jpg"
                width={2400}
                height={1642}
                alt="Landing page"
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
          </div>
          {loaded && instanceRef.current && (
            <>
              <Arrow
                left
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                disabled={currentSlide === 0}
              />

              <Arrow
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                disabled={
                  currentSlide ===
                  instanceRef.current.track.details.slides.length - 1
                }
              />
            </>
          )}
        </div>
      </div>
      {loaded && instanceRef.current && (
        <div className="dots bg-gray-400">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={'dot' + (currentSlide === idx ? ' active' : '')}
              ></button>
            );
          })}
        </div>
      )}
    </>
  );
}

function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  const disabled = props.disabled ? ' arrow--disabled' : '';
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? 'arrow--left' : 'arrow--right'
      } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}