import { NextRequest, NextResponse } from "next/server";
import { getAgencyById } from "@/lib/firebase/agencies";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const agency = await getAgencyById(id);

    if (!agency) {
      return NextResponse.json(
        { error: "Agency not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(agency);
  } catch (error) {
    console.error("Error fetching agency:", error);
    return NextResponse.json(
      { error: "Failed to fetch agency" },
      { status: 500 }
    );
  }
}
