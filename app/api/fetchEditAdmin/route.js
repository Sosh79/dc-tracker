import { Admin } from "@/app/lib/models";
import { dbConnect } from "@/app/lib/dbConnect";
export async function POST(req) {
    const reqBody = await req.json();

    try {
        await dbConnect()
        const admin = await Admin.findById(reqBody.id);
        return new Response(JSON.stringify({ result: admin }));
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch Edit Admin");
    }
}