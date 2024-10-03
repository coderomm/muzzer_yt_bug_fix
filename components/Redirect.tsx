"use client"


import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'



export default function Redirect() {
  
    const router = useRouter();
    const session = useSession();

    useEffect(() => {
        if(session.data?.user) {
            router.push('/dashboard')
        }else {
            router.push('/')
        }
    })
    return (
    <div>Redirect</div>
  )
}