import Image from 'next/image';
import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
} from '@nextui-org/react';

export default function Team() {
  return (
    <section
      className="flex flex-col items-center justify-center bg-black w-full"
      id="team"
    >
      <h1 className="text-center lg:mb-5 p-5 text-4xl lg:text-6xl text-cyan-50 font-bold ">THE TEAM</h1>
      <div
        className="max-w-[1050px] flex flex-col h-fit min-h-[500px] bg-cover bg-center items-center justify-center w-[90vw] shadow-[inset_0px_0px_10px_10px_black]"
        style={{
          backgroundImage: "url('/Screenshot.png')",
        }}
      >
        <Image
          width={918}
          height={918}
          alt="logo"
          src="/TempuraTabby.png"
          className="rounded-full w-1/3 mt-20"
        />
        <div className="flex justify-start w-full max-w[1050px]">
          <Card className="max-w-[500px] bg-gray-950 m-10 mt-20">
            <CardHeader className="flex gap-3">
              <Image
                alt="nextui logo"
                height={100}
                className="rounded-full p-0.5 bg-cyan-100"
                src="/Alan.png"
                width={80}
              />
              <div className="flex flex-col">
                <p className="text-md text-cyan-50">Alan</p>
                <p className="text-small text-gray-300">
                  Programmer & Composer
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <p className="text-gray-300">Gamer since the age of 3. Passion for music since the age of 6. I lead the development of this game with an iron fist while forcing Lucas to produce art assets at a rapid pace.</p>
            </CardBody>
            <Divider />
          </Card>
        </div>
        <div className="flex justify-end w-full max-w-[1050px]">
          <Card className="max-w-[500px] bg-gray-950 m-10 mt-0">
            <CardHeader className="flex justify-end gap-3">
              <div className="flex flex-col">
                <p className="text-md text-right text-cyan-50">Lucas</p>
                <p className="text-small  text-gray-300 text-right">
                  Art & Narrative design
                </p>
              </div>
              <Image
                alt="nextui logo"
                height={100}
                className="rounded-full p-0.5 bg-cyan-100"
                src="/Lucas.png"
                width={80}
              />
            </CardHeader>
            <Divider />
            <CardBody>
              <p className="text-gray-300">Huge fan of gaming since the age of 5, been drawing all my life, a visual artist with a big nerdy passion for RPGs, dungeoncrawlers and storytelling. I draw the pretty pixels for Alan and eat a lot of snacks while doing so.</p>
            </CardBody>
            <Divider />
          </Card>
        </div>
      </div>
    </section>
  );
}
