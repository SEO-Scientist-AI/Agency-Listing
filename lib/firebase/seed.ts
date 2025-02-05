import { db } from "./config";
import { collection, addDoc } from "firebase/firestore";
// import { agencies } from '@/app/agency/agency-data';

export async function seedAgencies() {
    console.log("Starting seed process...");
    const agenciesRef = collection(db, "agencies");

    let successCount = 0;
    // for (const agency of agencies) {
    //   try {
    //     const docRef = await addDoc(agenciesRef, agency);
    //     console.log(`Successfully added ${agency.name} with ID: ${docRef.id}`);
    //     successCount++;
    //   } catch (error) {
    //     if (error instanceof Error) {
    //       console.log(`Skipped ${agency.name}: ${error.message}`);
    //     } else {
    //       console.log(`Skipped ${agency.name}: An unknown error occurred`);
    //     }
    //   }
    // }

    console.log(`Seeding complete! Added ${successCount} agencies`);
    return successCount;
}
