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

  const menuItems = ['NEWS', 'TEAM'];

  const restartComponent = () => {
    setKey((prevKey: number) => prevKey + 1);
  };

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
            color="foreground"
            href="#news"
            className="hidden sm:block font-bold text-amber-400"
          >
            NEWS
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            href="#team"
            className="hidden sm:block font-bold text-amber-400"
          >
            TEAM
          </Link>
        </NavbarItem>
      </NavbarContent>
        <NavbarContent justify="end">
          <Link href="#" >
            <Image
              className="w-[50px] rounded-lg hidden sm:block"
              width={512}
              height={155}
              src="/discord.png"
              alt="Steam store link"
            />
          </Link>
          <Link href="#">
            <Image
                className="w-[80px] rounded-lg hidden sm:block"
                width={512}
                height={155}
                src="/youtube-logo.svg"
                alt="Steam store link"
            />
          </Link>
          <Link href="#">
            <Image
                className="w-[128px] rounded-lg hidden sm:block"
                width={512}
                height={155}
                src="/steam_logo.png"
                alt="Steam store link"
            />
          </Link>
        </NavbarContent>
      <NavbarMenu
        className="custom-navbar bg-black bg-opacity-80 flex items-center outer-shadow ">
        {menuItems.map((item) => (
          <NavbarMenuItem key={`${item}`}
          className="flex items-center justify-center mt-3">
            <Link
              color="foreground"
              href={`/#${item.toLowerCase()}`}
              className="sm:hidden font-bold justify-center text-amber-400 scroll-smooth w-[200px] h-[60px] bg-stone-900 border-2 border-black amber-shadow rounded-md"
              onClick={restartComponent} // Restart the component on click
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
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
      </NavbarMenu>
    </Navbar>
  );
}
