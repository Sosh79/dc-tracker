import { Server } from "@/app/lib/models";
import { dbConnect } from "@/app/lib/dbConnect";
export async function POST(req) {
    const reqBody = await req.json();

    try {
        await dbConnect()
        const chatId = await Server.findById(reqBody.id);
        return new Response(JSON.stringify({ result: chatId }));
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch serverId");
    }
}