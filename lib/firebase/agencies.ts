import { db } from './config';
import { collection, getDocs, getDoc, doc, query, where } from 'firebase/firestore';

export async function getAllAgencies() {
  const agenciesRef = collection(db, 'agencies');
  const snapshot = await getDocs(agenciesRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function getAgencyById(slug: string) {
  try {
    const agenciesRef = collection(db, 'agencies');
    const q = query(agenciesRef, where('id', '==', slug));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) return null;
    
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    };
  } catch (error) {
    console.error('Error fetching agency:', error);
    return null;
  }
}
