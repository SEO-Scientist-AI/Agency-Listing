import { NextRequest, NextResponse } from "next/server";
import { getAgencyById } from "@/lib/firebase/agencies";

export async function GET(
  request: NextRequest,
<<<<<<< HEAD
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
      const { id } = await context.params;
      const agency: Agency | null = await getAgencyById(id);
=======
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const agency = await getAgencyById(id);
>>>>>>> parent of 4078465 (update)

      if (!agency) {
          return NextResponse.json(
              { error: "Agency not found", details: `No agency found with ID: ${id}` },
              { status: 404 }
          );
      }

      return NextResponse.json({ data: agency, success: true });
  } catch (error) {
<<<<<<< HEAD
      console.error("Error fetching agency:", error);
      return NextResponse.json(
          { 
              error: "Failed to fetch agency", 
              details: error instanceof Error ? error.message : 'Unknown error',
              success: false 
          },
          { status: 500 }
      );
=======
    console.error("Error fetching agency:", error);
    return NextResponse.json(
      { error: "Failed to fetch agency" },
      { status: 500 }
    );
>>>>>>> parent of 4078465 (update)
  }
}
