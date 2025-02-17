import { getAgencyById } from "@/lib/firebase/agencies";
import { AgencyDetailComponent } from "../_components/agency-detail";
import { notFound,redirect, RedirectType } from "next/navigation";

export const revalidate = 3600; // Revalidate every hour

export default async function AgencyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  if(resolvedParams.slug.toLowerCase() === 'list'){
    redirect("/agency",RedirectType.push)
  }
  const agency = await getAgencyById(resolvedParams.slug);
  

  if (!agency) {
    notFound();
  }

  return <AgencyDetailComponent  agency={agency} />;
}
