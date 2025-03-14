import { NextResponse } from 'next/server';
import Agency from '@/lib/model/Agency'; 
import dbConnect from '@/lib/dbConnect'; 

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await dbConnect(); 

    const { slug } = await params;
    const trimedSlug = slug.trim();
    const agency = await Agency.findOne({ agencySlug:trimedSlug });

    if (!agency) {
      return NextResponse.json(
        { success: false, error: 'Agency not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: agency
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch agency' },
      { status: 500 }
    );
  }
}