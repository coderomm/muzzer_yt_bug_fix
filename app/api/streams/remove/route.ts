import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest) {

    const session = await getServerSession(authOptions)
    const user = session?.user;

    if(!user) {
        return NextResponse.json(
            {
              message: "Unauthenticated",
            },
            {
              status: 403,
            },
        );
    }
   try {
     const {searchParams} = new URL(req.url)
 
     const streamId = searchParams.get('streamId')
     
 
     if(!streamId) {
         return NextResponse.json({
             message: "Stream Id is required"
         } , {status: 400})
     }
 
     await prisma.stream.delete({
         where: {
            id: streamId,
            userId: user.id
         }
     })
 
     return NextResponse.json({
         message: "Song Removed Successfully!"
     })
   } catch (error) {
    return NextResponse.json({
        message: "Song Removed Successfully!",
        error
    } , {status: 400})
   }
}