"use client"
import { SignInFlow } from '@/types/auth-types'
import React, { useState } from 'react'
import SignInCard from './auth-signin'
import SignUpCard from './auth-signup'

export default function AuthScreen({authType} : {authType?: SignInFlow}) {
  const [formType , setFormType] = useState<SignInFlow>(authType || "signIn");
  
  return (
    <div className="w-full h-full flex items-center justify-center py-12 bg-gradient-to-b from-purple-900 to-gray-900">
      <div className="w-full md:h-auto md:w-[420px] px-4">
        {formType === "signIn" ? (
          <SignInCard setFormType={setFormType}/>
        ) : (
          <SignUpCard setFormType={setFormType}/>
        )}
      </div>
    </div>
  )
}