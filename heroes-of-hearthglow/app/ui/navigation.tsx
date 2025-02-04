'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from '@nextui-org/react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [key, setKey] = useState(0);

  return (
    <Navbar
      key={key}
      onMenuOpenChange={setIsMenuOpen}
      className="fixed w-[100vw] bg-black bg-opacity-60 no-bg-effect custom-navbar"
    >
      <NavbarContent className="">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden text-amber-400"
        />
        <NavbarItem>
          <Link
              href="/"
              className="hidden sm:block">
            <div className="flex items-center justify-center w-[200px] h-[63px] m-auto rounded-md">
              <Image
                  width={200}
                  height={63}
                  alt="link to steam store"
                  src="/HearthglowOnly.png"
                  className="rounded-md hover:scale-95"
              />
            </div>
          </Link>
        </NavbarItem>
      </NavbarContent>
        <NavbarContent justify="end">
          <Link href="#" >
            <Image
              className="w-[50px] rounded-lg hidden sm:block hover:scale-95"
              width={512}
              height={155}
              src="/discord.png"
              alt="Steam store link"
            />
          </Link>
          <Link href="#">
            <Image
                className="w-[80px] rounded-lg hidden sm:block hover:scale-95"
                width={512}
                height={155}
                src="/youtube-logo.svg"
                alt="Steam store link"
            />
          </Link>
          <Link href="#">
            <Image
                className="w-[128px] rounded-lg hidden sm:block hover:scale-95"
                width={512}
                height={155}
                src="/steam_logo.png"
                alt="Steam store link"
            />
          </Link>
        </NavbarContent>
      <NavbarMenu
          className="custom-navbar bg-black bg-opacity-80 flex items-center outer-shadow ">
        <Link
            href="/"
        >
          <div className="flex items-center justify-center w-[200px] h-[63px] m-auto rounded-md">
            <Image
                width={200}
                height={63}
                alt="link to steam store"
                src="/HearthglowOnly.png"
                className="rounded-md"
            />
          </div>
        </Link>
        <Link
            className="amber-shadow mt-12">
          <Image
              width={200}
              height={63}
              alt="link to steam store"
              src="/steam_logo.png"
              className="w-[200px] m-auto rounded-md border-2 border-black "
          />
        </Link>
        <Link
            className="amber-shadow mt-3 w-[200px] h-[63px] rounded-md border-2 border-black items-center justify-center bg-blue-700 ">
          <Image
              width={200}
              height={63}
              alt="link to steam store"
              src="/discordMobileMenu.svg"
              className="w-[150px] h-[63px]"
          />
        </Link>
        <Link
            className="amber-shadow mt-3 w-[200px] h-[63px] rounded-md border-2 border-black items-center justify-center bg-trueGray-300 ">
          <Image
              width={200}
              height={100}
              alt="link to steam store"
              src="/youtube-logo-mobile-menu.webp"
              className="w-[150px] h-[150px]"
          />
        </Link>
        <div className="absolute bottom-0 flex-col justify-center w-full h-fit pt-20 pb-14">
          <Image
              alt="studio logo"
              height={80}
              className="rounded-full m-auto"
              src="/TempuraTabby.png"
              width={80}
          />
          <h2 className="text-2xl font-bold text-slate-400 opacity-80 text-center p-5">
            Tempura Tabby
          </h2>
          <p className="text-center text-slate-400 opacity-80">
            © 2025 Tempura Tabby.<br/>All rights reserved.<br/>tempuratabby@gmail.com
          </p>
          <p className="text-center text-slate-400 opacity-80 mt-2">
            Website by <a href="https://github.com/sebastianpiresmolin" className="text-cyan-50 hover:text-cyan-400">Sebastian
            Molin</a>
          </p>
        </div>
      </NavbarMenu>
    </Navbar>
  );
}
