/* eslint-disable @typescript-eslint/no-explicit-any */
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
      return NextResponse.json(
        {
          message: "You must logged in to created a space",
        },
        { status: 401 }
      );
    }
    const data = await req.json();
    if (!data.spaceName) {
      return NextResponse.json(
        { success: false, message: "Space name is required" },
        { status: 400 }
      );
    }
  
    const space = await prisma.space.create({
      data: {
        name: data.spaceName,
        hostId: session.user.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Space Created Successfully",
        space,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: `An unexpected error occurred: ${error.message}`,
      },{ status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const spaceId = await req.nextUrl.searchParams.get("spaceId");
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      return NextResponse.json(
        {
          message: "You must logged in to created a space",
        },
        { status: 401 }
      );
    }
    if (!spaceId) {
      return NextResponse.json(
        { success: false, message: "Space Id is required" },
        { status: 401 }
      );
    }

    const space = await prisma.space.findUnique({
      where: { id: spaceId },
    });

    if (!space) {
      return NextResponse.json(
        { success: false, message: "Space not found" },
        { status: 404 }
      );
    }

    if (space.hostId !== session.user.id) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to delete this space",
        },
        { status: 403 }
      );
    }

    await prisma.space.delete({
      where: { id: spaceId },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Space Deleted Successfully",
        space,
      },
      { status: 210 }
    );
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: `An unexpected error occurred: ${error.message}`,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      return NextResponse.json(
        {
          message: "You must logged in to created a space",
        },
        { status: 401 }
      );
    }

    const spaceId = req.nextUrl.searchParams.get("spaceId");

    if (!spaceId) {
      return NextResponse.json(
        { success: false, message: "Space Id is required" },
        { status: 401 }
      );
    }

    const space = await prisma.space.findUnique({
      where: { id: spaceId },
    });
    if (!space) {
      return NextResponse.json(
        { success: false, message: "Space not found" },
        { status: 404 }
      );
    }

    if (space.hostId !== session.user.id) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to delete this space",
        },
        { status: 403 }
      );
    }

    await prisma.space.delete({
      where: { id: spaceId },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Space Created Successfully",
        space,
      },
      { status: 401 }
    );
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: `An unexpected error occurred: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
