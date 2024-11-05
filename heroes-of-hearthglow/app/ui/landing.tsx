import Image from 'next/image';
import { SlArrowDownCircle } from 'react-icons/sl';

export default function Landing() {
  return (
    <section className="relative w-full h-screen">
      <div
        className="relative w-full h-full inset-shadow"
      >
        <Image
          src="/landing.jpg"
          width={2400}
          height={1642}
          alt="Landing page"
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ zIndex: -1 }}
        />
        <div className="relative flex-col justify-end w-full flex items-center z-10 h-full mb-20">
          <Image
            src="/stardewlogo.webp"
            width={1000}
            height={472}
            alt="Landing page logo"
            className="max-w-[350px] md:max-w-[500px] lg:max-w-[660px] opacity-0"
            style={{ zIndex: 0 }}
          />
          <a
            href="https://www.youtube.com"
            className="text-xl md:text-2xl lg:text-4xl font-bold text-amber-400 mt-10 bg-stone-900 p-4 md:p-6 rounded-3xl"
          >
            WATCH TRAILER
          </a>
          <div className="w-10 h-10 mt-32 mb-14 ">
            <SlArrowDownCircle className="w-full h-full text-amber-400 bg-black bg-opacity-50 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
