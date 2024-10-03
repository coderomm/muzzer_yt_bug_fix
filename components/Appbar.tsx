"use client"
import { HeadphonesIcon } from 'lucide-react';
import {  signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link';
import React from 'react'

export default function Appbar() {
    const session = useSession();
    
    return (
        <>
            <header className="px-4 lg:px-6 h-14 flex items-center bg-gray-800/90 backdrop-blur-sm sticky top-0 z-50">
                <Link className="flex items-center justify-center" href="/">
                    <HeadphonesIcon className="h-6 w-6 mr-2 text-purple-400" />
                    <span className="font-bold text-purple-400">Muzzer</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    {session.data?.user ? (
                        <button className='bg-red-500 p-2 m-2 font-semibold rounded-sm' onClick={() => signOut()}> SignUp</button>
                    ) : (
                        <button className='bg-purple-600 m-2 p-2 font-semibold rounded-sm' onClick={() => signIn()}>SignIn</button>
                        
                    )}
                </nav>
            </header>
        </>
    )
}