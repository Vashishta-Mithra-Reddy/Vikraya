"use client";

import { headerLinks, publicHeaderLinks } from '@/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { auth } from '@/utils/firebase'; 

const NavItems = () => {
  const pathname = usePathname();
  const user = auth.currentUser; 

  const linksToDisplay = user ? headerLinks : publicHeaderLinks;

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-10 md:flex-row">
      {linksToDisplay.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li
            key={link.route}
            className={`${
              isActive && 'text-[#929292]'
            } flex-center p-medium-16 whitespace-nowrap text-black`}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
