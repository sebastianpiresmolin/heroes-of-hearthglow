import Image from 'next/image';
import { SlArrowDownCircle } from 'react-icons/sl';

export default function Landing() {
  return (
    <section className="relative w-full bg-black h-screen">
      <div className="relative flex-end flex-col justify-center items-center w-full h-full">
        <Image
          src="/landing.png"
          width={2400}
          height={1642}
          alt="Landing page"
          className="absolute top-[35vh] lg:top-[25vh] left-1/2 transform -translate-x-1/2 xl:-translate-x-[52%] w-fit max-w-[450px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[800px] object-cover p-5 opacity-0 animate-fadeIn"
        />
        <div className="relative flex-col w-full flex items-center z-10 h-full mb-20">
          <Image
            src="/TitleAndLogo.png"
            width={1000}
            height={472}
            alt="Landing page logo"
            className="max-w-[350px] md:max-w-[400px] lg:max-w-[400px] xl:max-w-[500px] mt-32 lg:mt-24 opacity-0 animate-slideInTop custom1500"
            style={{ zIndex: 0, animationDelay: '1s' }}
          />
          <div className="relative flex-col justify-end w-full h-full flex items-center">
            <a
              href="https://www.youtube.com"
              className="text-xl md:text-xl lg:text-2xl font-bold text-amber-400  bg-stone-900 p-4 rounded-3xl"
            >
              WATCH TRAILER
            </a>
            <div className="w-10 h-10 mb-5 mt-5">
              <SlArrowDownCircle className="w-full h-full text-amber-400 bg-black bg-opacity-50 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
