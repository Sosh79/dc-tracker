import { Words } from "@/app/lib/models";
import { dbConnect } from "@/app/lib/dbConnect";
export async function POST(req) {
    const reqBody = await req.json();
    try {
        await dbConnect()
        const word = await Words.findById(reqBody.id);
        return new Response(JSON.stringify({ result: word }));
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch Edit Word");
    }
}