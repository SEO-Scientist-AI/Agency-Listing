import { Agency } from '@/types/agency';
import { db } from './config';
import { collection, getDocs, getDoc, doc, query, where, orderBy, limit, startAfter } from 'firebase/firestore';

const AGENCIES_PER_PAGE = 10;

export async function getAllAgencies(lastDocId?: string) {
  try {
    const agenciesRef = collection(db, 'agencies');
    let q = query(agenciesRef, orderBy('name'), limit(AGENCIES_PER_PAGE));

    if (lastDocId) {
      const lastDoc = await getDoc(doc(agenciesRef, lastDocId));
      if (lastDoc.exists()) {
        q = query(
          agenciesRef,
          orderBy('name'),
          startAfter(lastDoc),
          limit(AGENCIES_PER_PAGE)
        );
      }
    }

    const snapshot = await getDocs(q);
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    
    return {
      agencies: snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })),
      lastDocId: lastVisible?.id || null,
      hasMore: snapshot.docs.length === AGENCIES_PER_PAGE
    };
  } catch (error) {
    console.error('Error fetching agencies:', error);
    return {
      agencies: [],
      lastDocId: null,
      hasMore: false
    };
  }
}

export function formatSlug(name: string) {
  return name.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+$/, ''); // Remove trailing hyphens
}

export async function getAgencyById(slug: string) {
  try {
    const agenciesRef = collection(db, 'agencies');
    // Get all agencies and find the one with matching slugified name
    const snapshot = await getDocs(agenciesRef);
    const agency = snapshot.docs.find(doc => {
      const data = doc.data();
      const nameSlug = formatSlug(data.name || '');
      return nameSlug === slug;
    });

    if (!agency) {
      return null;
    }

    return {
      id: agency.id,
      ...agency.data()
    } as Agency;
  } catch (error) {
    console.error('Error fetching agency:', error);
    return null;
  }
}

// Function to get all unique services from agencies
export async function getAllServices() {
    try {
        const agenciesRef = collection(db, 'agencies');
        const snapshot = await getDocs(agenciesRef);
        
        const servicesSet = new Set<string>();
        snapshot.docs.forEach(doc => {
            const services = doc.data().services;
            if (Array.isArray(services)) {
                services.forEach(service => servicesSet.add(service));
            }
        });

        return Array.from(servicesSet).sort();
    } catch (error) {
        console.error('Error getting services:', error);
        return [];
    }
}

// Function to get all unique locations from agencies
export async function getAllLocations() {
    try {
        const agenciesRef = collection(db, 'agencies');
        const snapshot = await getDocs(agenciesRef);
        
        const locationsSet = new Set<string>();
        snapshot.docs.forEach(doc => {
            const data = doc.data();
            if (data.location) {
                locationsSet.add(data.location);
            }
            if (Array.isArray(data.additionalLocations)) {
                data.additionalLocations.forEach(location => locationsSet.add(location));
            }
        });

        return Array.from(locationsSet).sort();
    } catch (error) {
        console.error('Error getting locations:', error);
        return [];
    }
}
