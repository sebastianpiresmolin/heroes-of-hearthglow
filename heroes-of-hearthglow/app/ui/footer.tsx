import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="Flex-col ">
      <div
        className="relative w-full flex-col justify-center bg-cover bg-center min-h-[200px]"
        style={{
          backgroundImage: "url('/landing.jpg')",
          boxShadow: 'inset 0px -25px 5px 0px #black',
        }}
      >
        <h1 className="text-2xl font-bold text-black text-center py-8 lg:text-4xl">
          Join the adventure
        </h1>
        <div className="flex justify-center m-auto items-center p-10 gap-8 max-w-[1050px]">
          <a>
            <Image
              width={68}
              height={68}
              alt="link to x, formerly twitter"
              src="/x.png"
              className="w-[40px] lg:w-[68px] "
            />
          </a>
          <a>
            <Image
              width={68}
              height={68}
              alt="link to x, formerly twitter"
              src="/facebook.png"
              className="w-[40px] lg:w-[68px] "
            />
          </a>
          <a>
            <Image
              width={68}
              height={68}
              alt="link to x, formerly twitter"
              src="/discord.png"
              className="w-[40px] lg:w-[68px] "
            />
          </a>
        </div>
      </div>
      <div className="flex-col justify-center w-full h-fit bg-black pt-14 pb-14">
        <Image
          alt="studio logo"
          height={80}
          className="rounded-full m-auto"
          src="/studio-logo.png"
          width={80}
        />
        <h2 className="text-2xl font-bold text-slate-400 opacity-70 text-center p-5">
          Ramen Cat Studios
        </h2>
        <p className="text-center text-slate-400 opacity-70">
          © 2024 Ramen Cat Studios.<br></br>All rights reserved.
        </p>
      </div>
    </footer>
  );
}
