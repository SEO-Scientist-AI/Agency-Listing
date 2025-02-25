import FindAgencies from "../_components/find-agency";
import { getAllServices, getAllLocations } from "@/lib/firebase/agencies";
import { DynamicFAQ } from "@/app/agency/_components/dynamic-faq";

// Generate static params for the main list page
export async function generateStaticParams() {
  return [{}]; // Generate the base /agency/list page
}

export default function AgencyListPage() {
  return (
    <>
      <FindAgencies />
      <DynamicFAQ location="worldwide" />
    </>
  );
} 