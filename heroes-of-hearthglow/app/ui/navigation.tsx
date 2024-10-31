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

  const menuItems = ['NEWS', 'TEAM', 'DISCORD'];

  const restartComponent = () => {
    setKey((prevKey: number) => prevKey + 1); // Step 2: Update the key
  };

  return (
    <Navbar
      key={key}
      onMenuOpenChange={setIsMenuOpen}
      className="fixed w-[100vw] bg-transparent no-bg-effect custom-navbar"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden text-amber-400"
        />
        <NavbarItem>
          <Link
            color="foreground"
            href="#news"
            className="hidden sm:block font-bold ml-5 text-amber-400"
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
        <NavbarItem>
          <Link
            color="foreground"
            href="#"
            className="hidden sm:block font-bold text-amber-400"
          >
            DISCORD
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <Link href="#" className="flex-row-reverse">
          <Image
            className="w-1/3 m-5 rounded-lg hidden sm:block"
            width={512}
            height={155}
            src="/steam_logo.png"
            alt="Steam store link"
          />
        </Link>
      </NavbarContent>
      <NavbarMenu
        className="custom-navbar bg-black bg-opacity-60 max-h-fit max-w-[40vw] pb-2 rounded-r-lg">
        {menuItems.map((item) => (
          <NavbarMenuItem key={`${item}`}>
            <Link
              color="foreground"
              href={`/#${item.toLowerCase()}`}
              className="sm:hidden font-bold text-amber-400 scroll-smooth"
              onClick={restartComponent} // Restart the component on click
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
