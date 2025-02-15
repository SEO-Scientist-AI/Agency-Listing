// import { db } from './firebase-config'
// import { collection, doc, setDoc } from 'firebase/firestore'

// // Import JSON data
// import agenciesData from './data/agencies.json'
// import servicesData from './data/services.json' 
// import locationsData from './data/locations.json'
// import industriesData from './data/industries.json'

// export async function seedFirestore() {
//   try {
//     // Seed agencies
//     const agenciesRef = collection(db, 'agencies')
//     for (const agency of agenciesData.agencies) {
//       await setDoc(doc(agenciesRef), agency)
//     }
//     console.log('Agencies seeded successfully')

//     // Seed services
//     const servicesRef = collection(db, 'services')
//     for (const service of servicesData.services) {
//       await setDoc(doc(servicesRef), service)
//     }
//     console.log('Services seeded successfully')

//     // Seed locations
//     const locationsRef = collection(db, 'locations')
//     for (const location of locationsData.locations) {
//       await setDoc(doc(locationsRef), location)
//     }
//     console.log('Locations seeded successfully')

//     // Seed industries
//     const industriesRef = collection(db, 'industries')
//     for (const industry of industriesData.industries) {
//       await setDoc(doc(industriesRef), industry)
//     }
//     console.log('Industries seeded successfully')

//     console.log('All data seeded successfully!')
//   } catch (error) {
//     console.error('Error seeding data:', error)
//     throw error
//   }
// }
