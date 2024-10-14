import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MusicIcon, PlayCircleIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import Appbar from "../components/Appbar";


export default async function LandingPage() {

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100 ">
      <Appbar />
      {/* Main Content */}
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl text-purple-300">
                  Let Your Fans Choose the Music
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  StreamTune allows your audience to pick the soundtrack for
                  your streams. Engage your viewers like never before!
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-300 ease-in-out">
                  <Link href={{
                    pathname: "/auth",
                    query: {authType : "signUp"}
                  }}>
                     Get Started
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-500 text-purple-400 hover:bg-purple-950"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-800"
        >
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-8 text-purple-300">
              Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              {/* Feature 1 */}
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-gray-700">
                <PlayCircleIcon className="h-10 w-10 text-purple-400" />
                <h3 className="text-xl font-bold text-purple-300">
                  Live Music Requests
                </h3>
                <p className="text-sm text-gray-400 text-center">
                  Allow viewers to request songs in real-time during your
                  stream.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-gray-700">
                <UsersIcon className="h-10 w-10 text-pink-400" />
                <h3 className="text-xl font-bold text-pink-300">
                  Audience Voting
                </h3>
                <p className="text-sm text-gray-400 text-center">
                  Let your audience vote on the next song to be played.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-gray-700">
                <MusicIcon className="h-10 w-10 text-purple-400" />
                <h3 className="text-xl font-bold text-purple-300">
                  Extensive Music Library
                </h3>
                <p className="text-sm text-gray-400 text-center">
                  Access millions of songs from various genres and artists.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-800 to-gray-900"
        >
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-8 text-purple-300">
              Pricing Plans
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Basic Plan */}
              <div className="flex flex-col p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                <h3 className="text-2xl font-bold text-center mb-4 text-purple-400">
                  Basic
                </h3>
                <p className="text-4xl font-bold text-center mb-4 text-gray-100">
                  $9.99
                  <span className="text-sm font-normal text-gray-400">
                    /month
                  </span>
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-300">
                    <MusicIcon className="h-5 w-5 mr-2 text-purple-400" />
                    <span>Up to 100 song requests per stream</span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <MusicIcon className="h-5 w-5 mr-2 text-purple-400" />
                    <span>Basic music library access</span>
                  </li>
                </ul>
                <Button className="mt-auto bg-purple-600 hover:bg-purple-700 text-white">
                  Choose Plan
                </Button>
              </div>

              {/* Pro Plan */}
              <div className="flex flex-col p-6 bg-gray-800 rounded-lg shadow-lg border-2 border-pink-500">
                <h3 className="text-2xl font-bold text-center mb-4 text-pink-400">
                  Pro
                </h3>
                <p className="text-4xl font-bold text-center mb-4 text-gray-100">
                  $24.99
                  <span className="text-sm font-normal text-gray-400">
                    /month
                  </span>
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-300">
                    <MusicIcon className="h-5 w-5 mr-2 text-pink-400" />
                    <span>Unlimited song requests</span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <MusicIcon className="h-5 w-5 mr-2 text-pink-400" />
                    <span>Full music library access</span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <MusicIcon className="h-5 w-5 mr-2 text-pink-400" />
                    <span>Custom playlist creation</span>
                  </li>
                </ul>
                <Button className="mt-auto bg-pink-600 hover:bg-pink-700 text-white">
                  Choose Plan
                </Button>
              </div>

              {/* Enterprise Plan */}
              <div className="flex flex-col p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700 md:col-span-2 lg:col-span-1">
                <h3 className="text-2xl font-bold text-center mb-4 text-purple-400">
                  Enterprise
                </h3>
                <p className="text-4xl font-bold text-center mb-4 text-gray-100">
                  Custom
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-300">
                    <MusicIcon className="h-5 w-5 mr-2 text-purple-400" />
                    <span>All Pro features</span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <MusicIcon className="h-5 w-5 mr-2 text-purple-400" />
                    <span>Dedicated support</span>
                  </li>
                  <li className="flex items-center text-gray-300">
                    <MusicIcon className="h-5 w-5 mr-2 text-purple-400" />
                    <span>Custom integrations</span>
                  </li>
                </ul>
                <Button className="mt-auto bg-purple-600 hover:bg-purple-700 text-white">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
        {/* Call to Action Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-purple-300">
                  Ready to Revolutionize Your Streams?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Join StreamTune today and give your audience the power to
                  shape your stream&apos;s soundtrack.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 px-4 py-2 rounded"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Sign Up
                  </Button>
                </form>
                <p className="text-xs text-gray-400">
                  By signing up, you agree to our{" "}
                  <Link
                    className="underline underline-offset-2 hover:text-purple-400 transition-colors"
                    href="#"
                  >
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 w-full shrink-0 px-4 md:px-6 border-t border-gray-700 bg-gray-800">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © 2024 StreamTune. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-purple-400 transition-colors"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-purple-400 transition-colors"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
