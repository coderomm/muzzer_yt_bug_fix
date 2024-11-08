/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import Appbar from "@/components/Appbar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ChevronUp,
  ChevronDown,
  Play,
  Trash2,
  X,
  Loader2,
  Share2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import { YT_REGEX } from "@/lib/utils";
import { Bounce, toast } from "react-toastify";
import YouTubePlayer from "youtube-player";

interface Video {
  extractedId: string;
  id: string;
  type: string;
  title: string;
  upvotes: number;
  smallImg: string;
  bigImg: string;
  active: boolean;
  downvotes: number;
  hasUpvoted: boolean;
  url: string;
  creatorId: string;
}
// const REFRESH_INTERVAL_MS = 10 * 1000;

export default function StreamView({
  creatorId,
  playVideo = false,
}: {
  creatorId: string;
  playVideo: boolean;

}) {
  const [isEmptyQueueDialogOpen, setIsEmptyQueueDialogOpen] = useState(false);
  const [queue, setQueue] = useState<Video[]>([]);
  const [inputLink, setInputLink] = useState("");
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [loading, setloading] = useState(false);
  const [playNextLoader, setPlayNextLoader] = useState(false);
  // const [playVideo, setPlayVideo] = useState(false);
  const videoPlayerRef = useRef<HTMLDivElement | null>(null);




  async function refreshStream() {
    try {

      console.log("Fetching streams for creatorId:", creatorId);

      const res = await fetch(`/api/streams/?creatorId=${creatorId}`, {
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setQueue(
        data.streams.sort((a: { upvotes: number }, b: { upvotes: number }) =>
          a.upvotes < b.upvotes ? 1 : -1
        )
      );
      setCurrentVideo((video) => {
        if (video?.id === data.activeStream?.stream?.id) {
          return video;
        } else {
          return data.activeStream.stream;
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => { 
    refreshStream();

    const intervral = setInterval(refreshStream , 10 * 1000)

    clearInterval(intervral)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setloading(true);
    const res = await fetch("/api/streams", {
      method: "POST",
      body: JSON.stringify({
        creatorId,
        url: inputLink,
      }),
    });
    setInputLink("");
    setQueue([...queue, await res.json()]);
    setloading(false);
    toast.success("Added Song", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };
  const handleVote = async (id: string, isUpvote: boolean) => {
    try {
      setQueue(
        queue
          .map((video) =>
            video.id === id
              ? {
                  ...video,
                  upvotes: isUpvote ? video.upvotes + 1 : video.upvotes - 1,
                  hasUpvoted: !video.hasUpvoted,
                }
              : video
          )
          .sort((a, b) => b.upvotes - a.upvotes)
      );

      const res = await fetch(
        `/api/streams/${isUpvote ? "upvote" : "downvote"}`,
        {
          method: "POST",
          body: JSON.stringify({
            streamId: id,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to upvote the stream");
      }
    } catch (error) {
      console.error("Error while voting:", error);
    }
  };
  const playNext = async () => {
    try {
      setPlayNextLoader(true);
      if (queue.length > 0) {
        const nextVideo = queue[1];

        setQueue((prevQueue) => prevQueue.slice(1))
        setCurrentVideo(nextVideo);

        const res = await fetch("/api/streams/next", {
          method: "GET",
        });
        const data = await res.json();
        setCurrentVideo(data.stream);
      }
    } catch (error) {
      console.error(error);
    }
    setPlayNextLoader(false);
  };

  useEffect(() => {
    if (!videoPlayerRef.current || !currentVideo?.extractedId) {
      return;
    }

    const player = YouTubePlayer(videoPlayerRef.current);
    player.loadVideoById(currentVideo.extractedId);

    player.playVideo();

    function eventHanlder(event: any) {
      console.log(event);
      console.log(event.data);

      if (event.data === 0) {
        playNext();
        setPlayNextLoader(false)
      }
    }
    player.on("stateChange", eventHanlder);

    return () => {
      player.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVideo, videoPlayerRef]);
  const handleShare = () => {
    const sharableLink = `${window.location.hostname}:3000/creator/${creatorId}`;
    navigator.clipboard.writeText(sharableLink).then(
      () => {
        toast.success("Link copied to clipboard", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      },
      (error) => {
        console.error("Could not copy text!", error);
        toast.error("Failed to copy link. Please try again", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    );
  };
  const handleRemove = async (streamId: string) => {
    const res = await fetch(`/api/streams/remove?streamId=${streamId}`, {
      method: "DELETE"
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const data = await res.json();
    setQueue(data);
    setloading(false)
  };

  const handleEmptyQueue = async () => {
    try {
      const res = await fetch(`/api/streams/empty-queue` , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      })
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const data = await res.json();
      console.log(data.message); 
      setQueue(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100 ">
        <div className="flex min-h-screen flex-col">
          <Appbar />
          <div className="flex justify-center">
            <div className="grid w-screen max-w-screen-xl grid-cols-1 gap-4 pt-8 md:grid-cols-5">
              <div className="col-span-3 space-y-6">
                  <div className="flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
                    <h2 className="text-3xl font-bold">Upcoming Songs</h2>
                    <div className="flex space-x-2">
                      <Button onClick={handleShare}>
                        <Share2 className="mr-2 h-4 w-4" /> Share
                      </Button>
                      <Button
                        onClick={() => setIsEmptyQueueDialogOpen(true)}
                        variant="secondary"
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Empty Queue
                      </Button>
                    </div>
                  </div>
                  {Array.isArray(queue) && queue.length === 0 && (
                    <Card className="w-full">
                      <CardContent className="p-4">
                        <p className="py-8 text-center text-gray-500">
                          No videos in queue
                        </p>
                      </CardContent>
                    </Card>
                  )}
                  <div className="space-y-4">
                    {Array.isArray(queue) &&
                      queue.map((video) => (
                        <Card
                          key={video.id}
                          className="flex items-center space-x-4 p-4"
                        >
                          <Image
                            height={80}
                            width={128}
                            src={video.smallImg}
                            alt={`Thumbnail for ${video.title}`}
                            className="w-32 h-20 rounded object-cover"
                          />
                          <div className="flex-grow">
                            <h3 className="font-semibold">{video.title}</h3>
                            <div className="mt-2 flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center space-x-1"
                                onClick={() =>
                                  handleVote(
                                    video.id,
                                    video.hasUpvoted ? true : false
                                  )
                                }
                              >
                                {video.hasUpvoted ? (
                                  <ChevronDown className=" h-4 w-4" />
                                ) : (
                                  <ChevronUp className="h-4 w-4" />
                                )}
                                <span>{video.upvotes}</span>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRemove(video.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                  </div>
                
              </div>
              <Dialog
                open={isEmptyQueueDialogOpen}
                onOpenChange={setIsEmptyQueueDialogOpen}
              >
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Empty Queue</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to empty the queue? This will remove
                      all songs from the queue. This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsEmptyQueueDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleEmptyQueue}>Empty Queue</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <div className="col-span-2">
                <div className="mx-auto w-full max-w-4xl space-y-3 p-4">
                  {/* Add Song form start here  */}

                  <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Add a song</h1>
                  </div>

                  <form className="space-y-2">
                    <Input
                      type="text"
                      placeholder="Please paste your link"
                      className="text-black"
                      onChange={(e) => setInputLink(e.target.value)}
                    />
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        "Add to Queue"
                      )}
                    </Button>
                  </form>

                  {inputLink && inputLink.match(YT_REGEX) && !loading && (
                    <Card>
                      <CardContent className="p-4">
                        <LiteYouTubeEmbed
                          title=""
                          id={inputLink.split("?v=")[1]}
                        />
                      </CardContent>
                    </Card>
                  )}
                  {/* Video Playing */}
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Now Playing</h2>
                    <Card>
                      <CardContent className="p-4">
                        {currentVideo ? (
                          <div>
                            {playVideo ? (
                              <>
                                <div
                                  ref={videoPlayerRef}
                                  className="w-full object-contain"
                                />
                              </>
                            ) : (
                              <>
                                <Image
                                  height={288}
                                  width={100}
                                  alt={currentVideo.bigImg}
                                  src={currentVideo.bigImg}
                                  className="h-72 w-full rounded object-cover"
                                />
                                <p className="mt-2 text-center font-semibold">
                                  {currentVideo.title}
                                </p>
                              </>
                            )}
                          </div>
                        ) : (
                          <p className="py-8 text-center">No video playing</p>
                        )}
                      </CardContent>
                    </Card>
                    {playVideo && (
                      <Button
                        disabled={playNextLoader}
                        className="w-full"
                        onClick={playNext}
                      >
                        {playNextLoader ? (
                          <Loader2 className="animate-spin size-4" />
                        ) : (
                          <Play className="mr-2 h-4 w-4" />
                        )}{" "}
                        Play next
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
