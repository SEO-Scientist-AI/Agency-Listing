import { NextResponse } from 'next/server';
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export async function GET() {
    try {
        const [servicesSnapshot, locationsSnapshot, agenciesSnapshot] = await Promise.all([
            getDocs(query(collection(db, "services"))),
            getDocs(query(collection(db, "locations"))),
            getDocs(query(collection(db, "agencies")))
        ]);

        const services = servicesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        const locations = locationsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        const totalAgencies = agenciesSnapshot.size;

        return NextResponse.json({
            success: true,
            data: {
                services,
                locations,
                totalAgencies
            }
        });
    } catch (error) {
        return NextResponse.json({ 
            success: false, 
            error: 'Failed to fetch initial data' 
        }, { status: 500 });
    }
}
