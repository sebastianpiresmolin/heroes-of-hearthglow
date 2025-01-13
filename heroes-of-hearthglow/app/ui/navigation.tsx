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
        id="navbar"
      key={key}
      onMenuOpenChange={setIsMenuOpen}
      className="fixed w-[100vw] bg-black bg-opacity-60 no-bg-effect custom-navbar"
    >
      <NavbarContent className="">
        <NavbarMenuToggle
            id="navbar-menu-toggle-mobile"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden text-amber-400"
        />
        <NavbarItem>
          <Link
              href="/"
              className="hidden sm:block">
            <div className="flex items-center justify-center w-[200px] h-[63px] m-auto rounded-md">
              <Image
                  id="home-link-navbar"
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
                id="discord-link-navbar"
              className="w-[50px] rounded-lg hidden sm:block hover:scale-95"
              width={512}
              height={155}
              src="/discord.png"
              alt="Steam store link"
            />
          </Link>
          <Link href="#">
            <Image
                id="youtube-link-navbar"
                className="w-[80px] rounded-lg hidden sm:block hover:scale-95"
                width={512}
                height={155}
                src="/youtube-logo.svg"
                alt="Steam store link"
            />
          </Link>
          <Link href="#">
            <Image
                id="steam-link-navbar"
                className="w-[128px] rounded-lg hidden sm:block hover:scale-95"
                width={512}
                height={155}
                src="/steam_logo.png"
                alt="Steam store link"
            />
          </Link>
        </NavbarContent>
      <NavbarMenu
          id="navbar-menu-mobile"
          className="custom-navbar bg-black bg-opacity-80 flex items-center outer-shadow ">
        <Link
            href="/"
        >
          <div className="flex items-center justify-center w-[200px] h-[63px] m-auto rounded-md">
            <Image
                id="home-link-navbar-mobile"
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
              id="steam-link-navbar-mobile"
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
              id="discord-link-navbar-mobile"
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
              id="youtube-link-navbar-mobile"
              width={200}
              height={100}
              alt="link to steam store"
              src="/youtube-logo-mobile-menu.webp"
              className="w-[150px] h-[150px]"
          />
        </Link>
        <div className="absolute bottom-0 flex-col justify-center w-full h-fit pt-20 pb-14">
          <Image
              id="studio-logo-navbar-mobile"
              alt="studio logo"
              height={80}
              className="rounded-full m-auto"
              src="/studio-logo.png"
              width={80}
          />
          <h2 id="studio-name-navbar-mobile"
              className="text-2xl font-bold text-slate-400 opacity-80 text-center p-5">
            Ramen Cat Studios
          </h2>
          <p id="studio-copyright-navbar-mobile"
              className="text-center text-slate-400 opacity-80">
            © 2024 Ramen Cat Studios.<br/>All rights reserved.<br/>ramen@cat.email
          </p>
          <p id="website-author-navbar-mobile"
              className="text-center text-slate-400 opacity-80 mt-2">
            Website by <a href="https://github.com/sebastianpiresmolin" className="text-cyan-50 hover:text-cyan-400">Sebastian
            Molin</a>
          </p>
        </div>
      </NavbarMenu>
    </Navbar>
  );
}
