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
      className="flex flex-col items-center justify-center bg-gray-400 w-full"
      id="team"
    >
      <h1 className="text-center lg:mb-5 p-5 text-4xl font-bold ">THE TEAM</h1>
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
          className="rounded-full w-1/3 mt-20"
        />
        <div className="flex justify-start w-full max-w[1050px]">
          <Card className="max-w-[500px] bg-slate-300 m-10 mt-20">
            <CardHeader className="flex gap-3">
              <Image
                alt="nextui logo"
                height={80}
                className="rounded-full"
                src="/studio-logo.png"
                width={80}
              />
              <div className="flex flex-col">
                <p className="text-md">Alan Ballan</p>
                <p className="text-small text-default-500">
                  Programmer & Master procrastinator
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Some text about yourself and the work you do at ramen cat.</p>
            </CardBody>
            <Divider />
          </Card>
        </div>
        <div className="flex justify-end w-full max-w-[1050px]">
          <Card className="max-w-[500px] bg-slate-300 m-10 mt-0">
            <CardHeader className="flex justify-end gap-3">
              <div className="flex flex-col">
                <p className="text-md text-right">Alan Ballan</p>
                <p className="text-small  text-default-500 text-right">
                  Programmer & Master procrastinator
                </p>
              </div>
              <Image
                alt="nextui logo"
                height={80}
                className="rounded-full"
                src="/studio-logo.png"
                width={80}
              />
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Some text about yourself and the work you do at ramen cat.</p>
            </CardBody>
            <Divider />
          </Card>
        </div>
      </div>
      <p className="text-justify whitespace-pre-wrap bg-slate-300 bg-opacity-35 rounded-md p-14 rounded-b-lg max-w-[1050px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed
        arcu nec velit congue ultrices non nec massa. Donec eu cursus leo.
        Phasellus ornare consequat euismod. Vestibulum elementum venenatis purus
        a venenatis. Nunc non vestibulum lectus. Etiam hendrerit dapibus tellus,
        eget condimentum arcu scelerisque non. Pellentesque mollis ipsum
        lobortis tempus ultrices. Vestibulum varius quis augue ac tincidunt.
        Aenean suscipit tincidunt ex, non ultrices dui sollicitudin non.
        <br></br>
        <br></br> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Integer nec mollis libero, et molestie elit. Nam imperdiet aliquam nulla
        ac vestibulum. In elementum enim non libero tempus, vel laoreet ipsum
        dapibus. Nunc mi diam, viverra sed nibh ullamcorper, sodales
        sollicitudin lacus. Sed nibh dolor, condimentum in sodales at, placerat
        tempus justo. Nam sed accumsan est, in condimentum mi. Vivamus
        pellentesque ante in blandit lacinia. Donec tincidunt mattis vestibulum.
      </p>
    </section>
  );
}
