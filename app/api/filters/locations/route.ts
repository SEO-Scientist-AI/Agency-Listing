import { NextResponse } from 'next/server';
import { getAllLocations } from '@/lib/firebase/agencies';

export async function GET() {
    try {
        const locations = await getAllLocations();
        return NextResponse.json({
            success: true,
            data: locations
        });
    } catch (error) {
        console.error('Error in locations API:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch locations' },
            { status: 500 }
        );
    }
}
