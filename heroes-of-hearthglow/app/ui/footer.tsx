import Image from 'next/image';

export default function Footer() {
  return (
      <footer className="Flex-col">
        <div className="relative w-full flex flex-col justify-center items-center bg-cover bg-center min-h-[200px]" style={{
          backgroundImage: "url('/landingGray.png')",
          boxShadow: 'inset 0px -25px 5px 0px #000000',
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 1,
          }}></div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h1 className="text-2xl md:text-4xl font-bold text-cyan-50 text-center lg:text-4xl pb-3">
              Join the adventure
            </h1>
            <div className="flex justify-center m-auto items-center gap-8 max-w-[1050px]">
              <a>
                <Image
                    width={68}
                    height={68}
                    alt="link to discord"
                    src="/discord-square.svg"
                    className="w-[40px] md:w-[68px]"
                />
              </a>
              <a>
                <Image
                    width={68}
                    height={68}
                    alt="link to youtube"
                    src="/youtube-square.svg"
                    className="w-[40px] md:w-[68px]"
                />
              </a>
              <a>
                <Image
                    width={68}
                    height={68}
                    alt="link to steam"
                    src="/steam-square.svg"
                    className="w-[40px] md:w-[68px]"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="flex-col justify-center w-full h-fit bg-black pt-20 pb-14">
          <Image
              alt="studio logo"
              height={80}
              className="rounded-full m-auto"
              src="/TempuraTabby.png"
              width={80}
          />
          <h2 className="text-2xl font-bold text-slate-400 opacity-70 text-center p-5">
            Tempura Tabby
          </h2>
          <p className="text-center text-slate-400 opacity-70">
            © 2025 Tempura Tabby.<br />All rights reserved.<br/>tempuratabby@gmail.com
          </p>
          <p className="text-center text-slate-400 opacity-70 mt-2">
            Website by <a href="https://github.com/sebastianpiresmolin" className="text-cyan-50 hover:text-cyan-400">Sebastian Molin</a>
          </p>
        </div>
      </footer>
  );
}
