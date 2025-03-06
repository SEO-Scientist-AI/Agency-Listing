import { NextResponse } from 'next/server';
import { getAllServices } from '@/lib/firebase/agencies';

// Cache configuration
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const cache = new Map<string, { data: any; timestamp: number }>();

export async function GET() {
    try {
        const cacheKey = 'filter-services';
        const now = Date.now();
        const cached = cache.get(cacheKey);

        // Return cached data if valid
        if (cached && now - cached.timestamp < CACHE_DURATION) {
            return NextResponse.json({
                success: true,
                data: cached.data
            });
        }

        const services = await getAllServices();

        // Cache the response
        cache.set(cacheKey, {
            data: services,
            timestamp: now
        });

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
