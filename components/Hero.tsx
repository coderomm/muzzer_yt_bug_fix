import React from "react";
import { MoveRight } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import music from "../app/music.png";

export default function Hero() {
  return (
    <>
      <div className=" bg-black text-white bg-[linear-gradient(to_bottom,#000,#200D42_35%,#4F21A1_65%,#A46ED8_82%)] py-[80px] relative overflow-clip">
        <div className="absolute h-[375px] w-[750px] sm:h-[782px] sm:w-[1536px] lg:h-[900px] lg:w-[1850px] sm:py-40 rounded-[100%]  left-1/2 -translate-x-1/2 border-[#B48CDE] bg-[radial-gradient(closest-side,#000_82%,#9560EB)] bottom-24 top-[calc(100%-96px)] "></div>
        <div className="relative">
          <div className=" flex justify-center items-center">
            <a
              href="#"
              className=" inline-flex gap-2 border py-2 px-2 rounded-lg border-white/30"
            >
              <span className="bg-[linear-gradient(to_right,#F87AFF,#FB39D0,#FFDD99,#C3F0B2,#2FDBFE)] text-transparent bg-clip-text">
                Version 2.0 is here
              </span>
              <span className="inline-flex gap-3">
                Read More <MoveRight />
              </span>
            </a>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <div className=" flex flex-col justify-center">
                <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl lg:text-8xl text-purple-100 mt-10">
                  Let Your Fans <br /> Choose the Music
                </h1>
                <Image 
                  src={music}
                  height="400" 
                  width="400" 
                  alt="music_img"
                  className="absolute top-[4px] -rotate-6 hover:animate-vibrate left-[8px]"
                />
                <Image 
                  src={music}
                  height="400" 
                  width="400" 
                  alt="music_img2"
                  className="absolute top-[4px] rotate-6 hover:animate-vibrate right-[8px]"
                />

                <p className="mx-auto max-w-[800px] text-gray-300 md:text-xl lg:text-2xl mt-10 ">
                  StreamTune allows your audience to pick the soundtrack for
                  your streams. Engage your viewers like never before!
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="w-1 h-16 bg-white animate-pulseVibrate delay-100"></div>
              <div className="w-1 h-20 bg-white animate-pulseVibrate delay-200"></div>
              <div className="w-1 h-24 bg-white animate-pulseVibrate delay-300"></div>
              <div className="w-1 h-20 bg-white animate-pulseVibrate delay-400"></div>
              <div className="w-1 h-16 bg-white animate-pulseVibrate delay-500"></div>
            </div>
            <div className="space-x-4">
              <Button className="bg-white text-black mt-8 h-[50px] text-xl hover:text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
