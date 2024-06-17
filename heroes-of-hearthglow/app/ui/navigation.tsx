'use client';

import React from 'react';
import Image from 'next/image';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from '@nextui-org/react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ['NEWS', 'MEDIA', 'THE TEAM', 'DISCORD'];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="fixed bg-transparent w-[100vw]"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarItem>
          <Link
            color="foreground"
            href="#"
            className="hidden sm:block font-bold"
          >
            NEWS
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            href="#"
            className="hidden sm:block font-bold"
          >
            MEDIA
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            href="#"
            className="hidden sm:block font-bold"
          >
            THE TEAM
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            href="#"
            className="hidden sm:block font-bold"
          >
            DISCORD
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <Link href="#" className="flex-row-reverse">
          <Image
            className="w-1/4 m-5 rounded-lg hidden sm:block"
            width={512}
            height={155}
            src="/steam_logo.png"
            alt="Steam store link"
          />
        </Link>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarMenuItem key={`${item}`}>
            <Link
              className="w-full text-black "
              href={`${item.toLowerCase()}`}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
        <Link href="#">
          <Image
            width={512}
            height={155}
            src="/steam_logo.png"
            alt="Sign Up"
            style={{
              borderRadius: '10px',
              width: '260px',
              height: '80px',
              margin: 'auto',
              position: 'relative',
              marginTop: '40px',
            }}
          />
        </Link>
      </NavbarMenu>
    </Navbar>
  );
}
