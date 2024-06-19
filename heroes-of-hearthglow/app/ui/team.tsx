import Image from 'next/image';

export default function Team() {
  return (
    <section className="flex justify-center bg-gray-400 ">
      <div
        className="max-w-[1050px] flex flex-col h-fit min-h-[500px] bg-cover bg-center items-center justify-center w-[90vw] shadow-[inset_0px_0px_10px_10px_#9ca3af]"
        style={{
          backgroundImage: "url('/office.jpg')",
        }}
      >
        <Image
          width={918}
          height={918}
          alt="logo"
          src="/studio-logo.png"
          className="rounded-full w-1/4"
        />
      </div>
    </section>
  );
}
