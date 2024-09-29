import { NextRequest } from "next/server";
import { z } from "zod";

export const YT_REGEX =
  /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com\/(?:watch\?(?!.*\blist=)(?:.*&)?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[?&]\S+)?$/;


const CreateStreamSchema = z.object({
    creatorId : z.string(),
    url: z.string(),
    spaceId:z.string()
})

export async function POST(req: NextRequest) {

    try {
        // const session = await getServerSession()

        CreateStreamSchema.parse(await req.json())
        
        // PrismaClient.stream.create({
        //     userId: data.creatorId,
        // })

        // const isYT = data.url.match(YT_REGEX);
        // const videoId = data.url.match(YT_REGEX)?.[1];

        // if(!isYT || !videoId) {
        //     return NextResponse.json(
        //         {message: "Invalid Youtube Url format"},{status:400}
        //     )
        // }

    } catch (error) {
        console.log(error)
    }

   
}