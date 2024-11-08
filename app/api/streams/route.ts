import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
//@ts-expect-error // because no module type
import youtubesearchapi from "youtube-search-api";
import { YT_REGEX } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const CreateStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});

const MAX_QUEUE_LEN = 10;

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  if (!user?.id) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 403 });
  }

  try {
    const data = await CreateStreamSchema.parse(await req.json());

    console.log("user id", data.creatorId);

    const isYT = data.url.match(YT_REGEX);
    const videoId = data.url.match(YT_REGEX)?.[1];

    if (!isYT || !videoId) {
      return NextResponse.json(
        { message: "Invalid Youtube Url format" },
        { status: 400 }
      );
    }

    const extractedId = data.url.split("?v=")[1];
    // console.log('extractedId' , extractedId);

    const res = await youtubesearchapi.GetVideoDetails(videoId);
    console.log(res.title);
    console.log(res.thumbnail.thumbnails);


    const duplicateSong = await prisma.stream.findFirst({
      where: {
        userId: data.creatorId,
        extractedId: videoId,
      },
    });
    if (duplicateSong) {
      return NextResponse.json(
        {
          message: "This song was already added in the last 10 minutes",
        },
        {
          status: 429,
        }
      );
    }

    const thumbnails = res.thumbnail.thumbnails;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thumbnails.sort((a: any, b: any) => (a.upvotes < b.upvotes ? -1 : 1));

    const userExists = await prisma.user.findUnique({
      where: { id: data.creatorId },
    });

    if (!userExists) {
      console.log("user id", data.creatorId);

      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 }
      );
    }

    const existingActiveStreams = await prisma.stream.count({
      where: {
        userId: data.creatorId,
      },
    });

    if (existingActiveStreams >= MAX_QUEUE_LEN) {
      return NextResponse.json(
        {
          message: "Queue is full",
        },
        {
          status: 429,
        }
      );
    }
    const stream = await prisma.stream.create({
      data: {
        userId: data.creatorId,
        addedBy: user.id,
        url: data.url,
        extractedId,
        type: "Youtube",
        title: res.title ?? "Can not find Video",
        smallImg:
          (thumbnails.length > 1
            ? thumbnails[thumbnails.length - 2].url
            : thumbnails[thumbnails.length - 1].url) ??
          "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg",
        bigImg:
          thumbnails[thumbnails.length - 1].url ??
          "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg",
      },
    });
    console.log("Created Stream", stream);


    return NextResponse.json({
      ...stream,
      hasUpvoted: false,
      upvotes: 0,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error while adding a stream" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const creatorId = url.searchParams.get("creatorId");

  console.log("getting creatorId", creatorId);

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      {
        message: "Unauthenticated",
      },
      {
        status: 403,
      }
    );
  }

  const user = session.user;

  if (!creatorId) {
    return NextResponse.json({ message: "Creator Not Exist" }, { status: 411 });
  }
  const [streams, activeStream] = await Promise.all([
    await prisma.stream.findMany({
      where: {
        userId: creatorId,
        played: false,
        addedBy: user.id,
      },
      include: {
        _count: {
          select: {
            upvotes: true,
          },
        },
        upvotes: {
          where: {
            userId: user.id,
          },
        },
      },
    }),
    prisma.currentStream.findFirst({
      where: {
        userId: creatorId,
      },
      include: {
        stream: true,
      },
    }),
  ]);

  return NextResponse.json({
    streams: streams.map(({ _count, ...rest }) => ({
      ...rest,
      upvotes: _count.upvotes,
      hasUpvoted: rest.upvotes.length ? true : false,
    })),
    activeStream,
  });
}
