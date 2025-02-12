import { validateCitySlug } from "@/lib/firebase/agencies";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const isValid = await validateCitySlug(params.slug);
    return NextResponse.json({ isValid });
  } catch (error) {
    console.error('Error validating city:', error);
    return NextResponse.json({ isValid: false });
  }
} 