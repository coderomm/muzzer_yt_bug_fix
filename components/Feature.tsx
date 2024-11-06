import { MusicIcon, PlayCircleIcon, UsersIcon } from "lucide-react";
import React from "react";

export default function Feature() {
  return (
    <div className="bg-black text-white py-10">
      <h2 className="text-center font-bold tracking-tighter text-5xl mt-10">
        Features
      </h2>
      <div className="flex gap-6 justify-center items-center mt-10">
        <div className="flex flex-col items-center space-y-4 p-8 w-72 h-72 mx-2 rounded-lg bg-black border border-gray-700 transition duration-200 ease-out hover:bg-gray-800 hover:border-purple-400 hover:scale-105 md:ease-in">
          <PlayCircleIcon className="h-16 w-16 text-purple-400" />
          <h3 className="text-2xl font-bold text-purple-300">Live Music Requests</h3>
          <p className="text-base text-gray-400 text-center">
            Allow viewers to request songs in real-time during your stream.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-4 p-8 w-72 h-72 mx-2 rounded-lg bg-black border border-gray-700 transition duration-200 ease-out hover:bg-gray-800 hover:border-pink-400 hover:scale-105 md:ease-in">
          <UsersIcon className="h-16 w-16 text-pink-400" />
          <h3 className="text-2xl font-bold text-pink-300">Audience Voting</h3>
          <p className="text-base text-gray-400 text-center">
            Let your audience vote on the next song to be played.
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center space-y-4 p-8 w-72 h-72 mx-2 rounded-lg bg-black border border-gray-700 transition duration-200 ease-out hover:bg-gray-800 hover:border-purple-400 hover:scale-105 md:ease-in">
          <MusicIcon className="h-16 w-16 text-purple-400" />
          <h3 className="text-2xl font-bold text-purple-300">Extensive Music Library</h3>
          <p className="text-base text-gray-400 text-center">
            Access millions of songs from various genres and artists.
          </p>
        </div>
      </div>
    </div>
  );
}
