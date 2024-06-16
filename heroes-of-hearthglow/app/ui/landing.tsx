import Image from 'next/image';

export default function Landing() {
  return (
    <section className="relative w-full h-screen">
      <div className="relative w-full h-full">
        <Image
          src="/landing.jpg"
          width={2400}
          height={1642}
          alt="Landing page"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
        <div className="relative flex-col justify-end w-full flex items-center z-10 h-full mb-20">
          <Image
            src="/stardewlogo.webp"
            width={1000}
            height={472}
            alt="Landing page"
            className=" max-w-[350px] md:max-w-[500px] lg:max-w-[660px] "
          />
          <a
            href="https://www.youtube.com"
            className="text-xl md:text-2xl lg:text-4xl font-bold text-gray-500 mt-10 bg-blue-200 p-4 md:p-6 rounded-3xl"
          >
            WATCH TRAILER
          </a>
          <h3 className="mb-10 mt-20 text-xl font-bold text-gray-500">
            ---- Scroll To Explore ----
          </h3>
        </div>
      </div>
    </section>
  );
}
