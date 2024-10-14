"use client"
import AuthScreen from '@/components/auth/auth-screen';
import { SignInFlow } from '@/types/auth-types'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function AuthPage({searchParams}: {searchParams: {authType: SignInFlow}}) {
  
  const formType = searchParams.authType;
  const session = useSession();
  const router = useRouter();

  if(session.status === 'authenticated'){
    return router.push("/")
  }
  
  return <AuthScreen authType={formType}/>
}