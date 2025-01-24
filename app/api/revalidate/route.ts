// app/api/revalidate/route.ts
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const path = request.nextUrl.searchParams.get("path");
        
        if (!path) {
            return NextResponse.json(
                { message: "Missing path parameter" },
                { status: 400 }
            );
        }

        revalidatePath(path);
        
        return NextResponse.json({ 
            revalidated: true, 
            now: Date.now() 
        });
    } catch (err) {
        return NextResponse.json(
            { message: "Error revalidating" },
            { status: 500 }
        );
    }
}