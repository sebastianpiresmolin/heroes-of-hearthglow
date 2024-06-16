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
    <Navbar onMenuOpenChange={setIsMenuOpen} className="fixed bg-transparent">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
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
