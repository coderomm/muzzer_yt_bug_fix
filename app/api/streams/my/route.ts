/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from '@/lib/db';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json(
          {
            message: "Unauthenticated",
          },
          {
            status: 403,
          },
        );
      }
    const user = session.user;

    const streams = await prisma.stream.findMany({
        where: {
            userId:user.id
        },
        include: {
            _count: {
                select: {
                    upvotes: true,
                }
            },
            upvotes: {
                where: {
                    userId: user.id,
                }
            }
        }
    })
    return NextResponse.json({
        streams: streams.map(({ _count, ...rest }) => ({
            ...rest,
            upvotes: _count.upvotes,
            haveUpvoted: rest.upvotes.length ? true : false,
        })),
    });
}   