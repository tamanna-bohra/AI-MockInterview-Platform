"use client"
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Header() {
    const path=usePathname();
  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
        {/* <Image src="/logo.svg" width={160} height={100} alt='logo' /> */}
        <ul className='hidden md:flex gap-6'>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer1 ${path=='/dashboard'&&'text-primary font-bold'}`}>Dashboard</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer1 ${path=='/dashboard/upgrade'&&'text-primary font-bold'}`}>Upgrade</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer1 ${path=='/dashboard/howitworks'&&'text-primary font-bold'}`}>How it Works?</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer1 ${path=='/dashboard/questions'&&'text-primary font-bold'}`}>Oueries</li>
        </ul>
        <UserButton/>
    </div>
  )
}
