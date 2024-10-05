/* eslint-disable @typescript-eslint/no-unused-vars */
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest) {
    const session = await getServerSession(authOptions)

    if (!session?.user.id) {
        return NextResponse.json(
          {
            message: "Unauthenticated",
          },
          {
            status: 403,
          },
        );
      }

    const user = session?.user;


    const mostUpvotedStream = await prisma.stream.findFirst({
        where:{
            userId: user.id,
            played: false
        },
        orderBy: {
            upvotes: {
                _count: "desc"
            }
        }
    })

    await Promise.all([
        prisma.currentStream.upsert({
            where: {
                userId: user.id,  
                streamId:mostUpvotedStream?.id
            },
            update: {
                streamId:mostUpvotedStream?.id,
                userId:user.id
            },
            create: {
                userId: user.id,
                streamId:mostUpvotedStream?.id
            }
        }),
        prisma.stream.update({
            where: {
                id: mostUpvotedStream?.id ?? "",
            },
            data: {
                played : true,
                playedTs: new Date()
            }

        })
    ])
    return NextResponse.json({
        stream: mostUpvotedStream
    })
}