import Image from 'next/image';

export default function Hero() {
  return (
    <section>
      <div className="flex justify-center bg-black outer-shadow ">
        <div
          className=" max-w-[1050px] flex-col h-fit bg-cover bg-center justify-center w-[90vw] inset-shadow"
          style={{
            backgroundImage: "url('/landingGray.png')",
          }}
        >
          <h2 className="mb-10 text-4xl font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] text-shadow-xl text-center pt-20">
            Welcome to Hearthglow
          </h2>
          <p className="max-w-[500px] pb-20 text-xl w-[80vw] m-auto font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] text-shadow-xl text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            sed arcu nec velit congue ultrices non nec massa. Donec eu cursus
            leo. Phasellus ornare consequat euismod. Curabitur sed arcu nec
            velit congue ultrices non nec massa. Donec eu cursus leo. Phasellus
            ornare consequat euismod.
          </p>
        </div>
      </div>
    </section>
  );
}
