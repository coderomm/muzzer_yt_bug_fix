import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async() => {
    const session = await getServerSession(authOptions)

    if(!session?.user.id) {
        return NextResponse.json({
            msg:"User Unauthorized"
        })
    }

    return NextResponse.json({
        session: session.user
    })
}
