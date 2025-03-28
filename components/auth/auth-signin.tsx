"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FcGoogle } from 'react-icons/fc';
import { SignInFlow } from '@/types/auth-types';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { TriangleAlert } from 'lucide-react';

interface SignupProps {
  setFormType: (state: SignInFlow) => void;
}

export default function SignInCard({ setFormType: setState }: SignupProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const signInWithProvider = async (provider: "google" | "credentials") => {
    try {
      if (provider === "credentials") {
        const res = signIn(provider, {
          email,
          password,
          redirect: false,
          callbackUrl: "/"
        });
        res.then((res) => {
          if (res?.error) {
            setError(res.error);
          } 
          if(!res?.error){
            router.push('/')
          }
          setPending(false);
        });
      }

      if (provider === 'google') {
        const res = signIn(provider, {
          redirect: false,
          callbackUrl: "/dashboard"
        });
        res.then((res) => {
          if (res?.error) {
            setError(res.error);
          }
          if(!res?.error){
            router.push('/');
          }
          setPending(false);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCredentialSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("sign e" , e)
    setError("");
    
    setPending(true);
    signInWithProvider("credentials");
  };

  const handleGoogleSignIn = (provider: "google") => {
    setError("");
    setPending(false);
    signInWithProvider(provider);
  };

  return (
    <Card className='h-full w-full border-purple-600 bg-gray-800 bg-opacity-50 p-8'>
      <CardHeader className='w-full'>
        <CardTitle className="text-center text-3xl font-bold text-white">
          SignIn to Muzzer
        </CardTitle>
      </CardHeader>
      
      {error && (
        <div className="mb-6 flex items-center gap-2 p-4 text-red-500 bg-red-100 rounded-md text-sm">
          <TriangleAlert className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      <CardContent className='space-y-6 px-0 pb-0'>
        <form onSubmit={handleCredentialSignUp} className='space-y-4'>
          <Input
            disabled={pending}
            value={email}
            type='email'
            required
            placeholder='Email'
            className='border-gray-600 bg-gray-800 text-white placeholder:text-gray-400 focus-visible:ring-purple-600'
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            disabled={pending}
            value={password}
            type='password'
            required
            placeholder='Password'
            className='border-gray-600 bg-gray-800 text-white placeholder:text-gray-400 focus-visible:ring-purple-600'
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type='submit'
            disabled={pending}
            className='w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md'
          >
            Continue
          </Button>
        </form>

        <div className='flex flex-col items-center gap-2'>
          <Button
            disabled={pending}
            size='lg'
            className='relative w-full bg-white text-black hover:bg-gray-200 rounded-md py-3'
            onClick={() => handleGoogleSignIn('google')}
          >
            <FcGoogle className='absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6' />
            Continue with Google
          </Button>

          <p className="text-xs text-gray-400">
            Don&apos;t have an account?{" "}
            <span
              className="cursor-pointer text-sky-600 hover:underline"
              onClick={() => setState("signUp")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
