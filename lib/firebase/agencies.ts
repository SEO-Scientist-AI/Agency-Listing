import { db } from './config';
import { collection, getDocs, getDoc, doc, query, where } from 'firebase/firestore';
import { Agency } from '@/utils/types';

export async function getAllAgencies(): Promise<Agency[]> {
  const agenciesRef = collection(db, 'agencies');
  const snapshot = await getDocs(agenciesRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Agency));
}

export async function getAgencyById(id: string): Promise<Agency | null> {
  try {
    const agenciesRef = collection(db, 'agencies');
    const q = query(agenciesRef, where('id', '==', id));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) return null;
    
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    } as Agency;
  } catch (error) {
    console.error('Error fetching agency:', error);
    return null;
  }
}
