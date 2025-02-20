import FindAgencies from "../_components/find-agency";
import { getAllServices, getAllLocations } from "@/lib/firebase/agencies";

// Generate static params for the main list page
export async function generateStaticParams() {
  return [{}]; // Generate the base /agency/list page
}

export default function AgencyListPage() {
  return <FindAgencies />;
} 