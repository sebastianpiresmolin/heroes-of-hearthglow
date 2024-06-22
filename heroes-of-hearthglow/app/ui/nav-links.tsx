'use client';

import {
  HomeIcon,
  DocumentDuplicateIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'News',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Statistics', href: '/dashboard/customers', icon: ChartBarIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] outline outline-1 outline-zinc-700 grow items-center justify-center gap-2 rounded-md  bg-neutral-900 p-3 text-sm font-medium text-trueGray-50 hover:bg-neutral-800 hover:text-trueGray-100 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-trueGray-50 text-neutral-900': pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
