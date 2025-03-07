import { NextResponse } from 'next/server';
import { getAllServices } from '@/lib/firebase/agencies';

export async function GET() {
    try {
        const services = await getAllServices();
        return NextResponse.json({
            success: true,
            data: services
        });
    } catch (error) {
        console.error('Error in services API:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch services' },
            { status: 500 }
        );
    }
}
