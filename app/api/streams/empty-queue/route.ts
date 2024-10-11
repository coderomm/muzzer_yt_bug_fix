import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  if (!user) {
    return NextResponse.json(
      {
        message: "Unauthenticated Error",
      },
      { status: 403 }
    );
  }

  try {
    const UpdatedStream = await prisma.stream.updateMany({
      where: {
        userId: user.id,
        played: false,
      },
      data: {
        played: true,
        playedTs: new Date(),
      },
    });

    console.log("Updated Data", UpdatedStream);
    return NextResponse.json({
      message: "Queue empty Successfully",
      UpdatedStream,
    });
  } catch (error) {
    console.error("Error emptying queue:", error);
    return NextResponse.json(
      {
        message: "Error while emptying the queue",
      },
      {
        status: 500,
      }
    );
  }
}
