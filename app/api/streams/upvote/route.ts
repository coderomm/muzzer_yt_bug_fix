import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from '@/lib/db'
import { authOptions } from "@/lib/authOptions";


const UpvoteSchema = z.object({
    streamId : z.string(),
})
export async function POST(req: NextRequest) {
    
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return NextResponse.json({
            message: "Unauthenticated",
        },{
            status: 403,
        });
    }

    const user = session.user;
    
    try {
        const data = UpvoteSchema.parse(await req.json())

        console.log("Upvoting stream with ID:", data.streamId);
        
        const stream = await prisma.stream.findUnique({
            where: { id: data.streamId },
        });

        if (!stream) {
            return NextResponse.json({
                message: "Stream not found",
            }, { status: 404 });
        }

        // Check if the user has already upvoted this stream
        const existingUpvote = await prisma.upvote.findUnique({
            where: {
                userId_streamId: {
                    userId: user.id,
                    streamId: data.streamId,
                },
            },
        });

        if (existingUpvote) {
            return NextResponse.json({
                message: "You have already upvoted this stream",
            }, { status: 400 });
        }

        await prisma.upvote.create({
            data: {
                userId : user.id,
                streamId: data.streamId,
            }
        })
        return NextResponse.json({
            message: "Done!"
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Error while upvoting"} , {status:500})
    }

}