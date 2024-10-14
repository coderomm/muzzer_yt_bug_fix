"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import  {FcGoogle} from 'react-icons/fc'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { SignInFlow } from '@/types/auth-types'
import { TriangleAlert } from 'lucide-react'

interface SignInProps{
  setFormType: (state : SignInFlow) => void;
}

export default function SignUpCard({setFormType: setState} : SignInProps) {
  const [email , setEmail ] = useState("");
  const [password , setPassword ] = useState("");
  const [confirmpassword , setConfirmPassword ] = useState("");
  const [error , setError] = useState("")
  const [pending , setPending] = useState(false)
  const router = useRouter();


  const signUpWithProvider = async(provider: "google" | "credentials") => {
    try {
      if(provider === 'credentials'){
        const res = signIn(provider , {
          email,
          password,
          redirect: false,
          callbackUrl: "/home"
        })
        res.then((res) => {
          if(res?.error) {
            setError(res.error)
          }
          router.push('/')
          setPending(false)
        })
      }
  
      if(provider === 'google'){
        const res = signIn(provider , {
          redirect: false,
          callbackUrl: "/dashboard"
        })
        res.then((res) => {
          if(res?.error){
            setError(res.error)
          }
          router.push('/')
          setPending(false)
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleCredentialSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("")
    setPending(true)
    if(password !== confirmpassword) {
      setError("Password do not match")
      setPending(false)
      return
    }
    signUpWithProvider("credentials")
  }

  const handleGoogleSignUp = (provider: "google") => {
    setError("");
    setPending(false)
    signUpWithProvider(provider)
  }
  
  
  
  return (
    <Card className=' h-full w-full border-purple-600 bg-gray-800 bg-opacity-50 p-8'>
      <CardHeader className=' w-full'>
        <CardTitle className="text-center text-3xl font-bold text-white">
          Signup to muzzer
        </CardTitle>
      </CardHeader>
      {error && (
        <div className="mb-6 flex w-full items-center gap-x-2 rounded-md bg-destructive p-3 text-sm text-white">
          <TriangleAlert className="size-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <CardContent className=' space-y-6 px-0 pb-0'>
        <form onSubmit={handleCredentialSignUp} className=' space-y-4' action="">
          <Input 
            disabled={pending}
            value={email}
            type='email'
            required
            placeholder='Email'
            className='border-gray-400 bg-transparent text-white placeholder:text-gray-400 focus-visible:ring-purple-600 focus-visible:ring-offset-0'
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            disabled={pending}
            value={password}
            type='password'
            required
           placeholder='Password'
           className='border-gray-400 bg-transparent text-white placeholder:text-gray-400 focus-visible:ring-purple-600 focus-visible:ring-offset-0' 
           onChange={(e) => setPassword(e.target.value)}
          
          />
          <Input
            disabled={pending}
            value={confirmpassword}
            type='password'
            required
           placeholder='Confirm Password'
           className='border-gray-400 bg-transparent text-white placeholder:text-gray-400 focus-visible:ring-purple-600 focus-visible:ring-offset-0' 
           onChange={(e) => setConfirmPassword(e.target.value)}

          />
          <Button
            type='submit'
            className='w-full bg-purple-600 hover:bg-purple-700'
            size='lg'
            disabled={pending}
          >
            Continue
          </Button>
        </form>
        <div className=' flex flex-col gap-y-2.5 items-center'>
          <Button 
            size={'lg'}
            className=' bg-white relative w-full text-black hover:bg-white/90'
            onClick={() => handleGoogleSignUp("google")}
          >
            <FcGoogle className=' absolute left-2.5 top-3 size-5'/>
            Continue with Google
          </Button>

          <p className="text-xs text-muted-foreground">
            Already have an account?{" "}
            <span
              className="cursor-pointer text-sky-700 hover:underline"
              onClick={() => setState("signIn")}
            >
              Sign In
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}