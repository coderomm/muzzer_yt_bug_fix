"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

export default function Appbar() {
    
    const session = useSession();

    return (
        <div className=' flex justify-between border-b shadow-sm'>
            <div className=' text-4xl font-bold'>Muzzi</div>
            <div>
                {session.data?.user ? (
                    <button className='bg-red-500 p-2 m-2 font-semibold' onClick={() => signOut()}> Logout</button>
                ) : (
                    <button className='bg-blue-400 m-2 p-2 font-semibold' onClick={() => signIn()}>LogIn</button>
                )}
            </div>
        </div>
    )
}