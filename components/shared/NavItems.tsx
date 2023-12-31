'use client'

import { headerLinks } from '@/constant'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavItems = () => {
    const pathname = usePathname();
    return (
        <ul className='md:flex-between flex w-full items-start gap-5 md:flex-row flex-col'>
            {
                headerLinks.map(headerLink => {
                    const isActive = headerLink?.route === pathname;
                    return (
                        <li className={`${isActive && "text-primary-500"} flex-center p-medium-16 whitespace-nowrap hover:text-primary-500`} key={headerLink?.label}>
                            <Link href={headerLink?.route}>
                                {headerLink?.label}
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default NavItems