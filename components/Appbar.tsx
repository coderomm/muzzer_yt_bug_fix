"use client";
import { HeadphonesIcon, LogIn, LogOut , } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

export default function Appbar() {
  const session = useSession();
  const router = useRouter();

  return (
    <>
      <header className="px-4 lg:px-6 h-14 flex items-center bg-gray-700/50 backdrop-blur-sm sticky top-3 z-50 rounded-full">
        <Link className="flex items-center justify-center" href="/">
          <HeadphonesIcon
            onClick={() => {
              router.push("/home");
            }}
            className="h-6 w-6 mr-2 text-purple-400"
          />
          <span className="font-bold text-purple-400">Muzzer</span>
        </Link>
        <div className="ml-auto flex gap-4 sm:gap-6">
          {!session.data?.user ? (
            <Link
              href={{
                pathname: "/auth",
                query: {
                  authType: "SignIn",
                },
              }}
            >
              <Button className="bg-purple-600 m-2 p-2 font-semibold rounded-sm">
                {" "}
                SignIn <LogIn />
              </Button>
            </Link>
          ) : (
            <Button
              className="bg-red-500 p-2 m-2 font-semibold rounded-sm"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              {" "}
              SignUp <LogOut/>
            </Button>
          )}
        </div>
      </header>
    </>
  );
}