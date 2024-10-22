import { MusicIcon, PlayCircleIcon, UsersIcon } from "lucide-react";
import React from "react";

export default function Feature() {
  return (
    <div className=" bg-black text-white py-10">
      <h2 className="text-center font-bold tracking-tighter text-5xl mt-10">
        Features
      </h2>

      <div className=" flex gap-3 justify-center items-center mt-10">
        <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-black border">
          <PlayCircleIcon className="h-10 w-10 text-purple-400" />
          <h3 className="text-xl font-bold text-purple-300">
            Live Music Requests
          </h3>
          <p className="text-sm text-gray-400 text-center">
            Allow viewers to request songs in real-time during your stream.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-black border">
          <UsersIcon className="h-10 w-10 text-pink-400" />
          <h3 className="text-xl font-bold text-pink-300">Audience Voting</h3>
          <p className="text-sm text-gray-400 text-center">
            Let your audience vote on the next song to be played.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-black border">
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
  );
}
