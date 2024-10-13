import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth'
import React from 'react'


export default async function Home() {
  
  const session = await getServerSession(authOptions);

  if(!session?.user.id) {
    return <div> Please Login first </div>
  }

}