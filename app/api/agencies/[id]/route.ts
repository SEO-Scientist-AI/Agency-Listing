import { NextRequest, NextResponse } from "next/server";
import { getAgencyById } from "@/lib/firebase/agencies";
import { Agency } from "@/utils/types";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
      const { id } = await context.params;
      const agency: Agency | null = await getAgencyById(id);

      if (!agency) {
          return NextResponse.json(
              { error: "Agency not found", details: `No agency found with ID: ${id}` },
              { status: 404 }
          );
      }

      return NextResponse.json({ data: agency, success: true });
  } catch (error) {
      console.error("Error fetching agency:", error);
      return NextResponse.json(
          { 
              error: "Failed to fetch agency", 
              details: error instanceof Error ? error.message : 'Unknown error',
              success: false 
          },
          { status: 500 }
      );
  }
}
