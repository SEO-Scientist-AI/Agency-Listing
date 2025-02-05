import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const agenciesRef = collection(db, 'agencies');
    const querysent = (await params).slug;
    const q = query(agenciesRef, where('slug', '==', querysent ));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json(
        { success: false, error: 'Agency not found' },
        { status: 404 }
      );
    }

    const agencyData = {
      id: querySnapshot.docs[0].id,
      ...querySnapshot.docs[0].data()
    };

    return NextResponse.json({
      success: true,
      data: agencyData
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch agency' },
      { status: 500 }
    );
  }
}
