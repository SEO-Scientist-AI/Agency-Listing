import { db } from './config';
import { collection, getDocs, getDoc, doc, query, where } from 'firebase/firestore';

export async function getAllAgencies() {
  const snapshot = await getDocs(collection(db, 'agencies'));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function getAgencyById(slug: string) {
  const agenciesRef = collection(db, 'agencies');
  const q = query(agenciesRef, where("id", "==", slug));
  const snapshot = await getDocs(q);
  
  if (snapshot.empty) return null;
  
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
}