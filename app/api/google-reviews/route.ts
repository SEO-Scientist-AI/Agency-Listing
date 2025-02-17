import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const placeId = searchParams.get("placeId");

  if (!placeId) {
    return NextResponse.json({ error: "Place ID is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?` + 
      new URLSearchParams({
        place_id: placeId,
        fields: 'name,rating,user_ratings_total,formatted_address,website,formatted_phone_number',
        key: process.env.GOOGLE_PLACES_API_KEY || ''
      }),
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }
    );

    const data = await response.json();

    if (!response.ok || data.status === 'ERROR' || data.error_message) {
      console.error('Google API Error:', data);
      throw new Error(data.error_message || 'Failed to fetch from Google API');
    }

    if (!data.result) {
      throw new Error('No results found');
    }

    return NextResponse.json({
      name: data.result.name || '',
      rating: data.result.rating || 0,
      reviewCount: data.result.user_ratings_total || 0,
      address: data.result.formatted_address || '',
      website: data.result.website || '',
      phone: data.result.formatted_phone_number || '',
    });
  } catch (error) {
    console.error("Error fetching Google details:", error);
    return NextResponse.json(
      { error: "Failed to fetch Google details" },
      { status: 500 }
    );
  }
} 