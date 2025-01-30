import { fetchAgencyById } from "@/lib/api";
import { AgencyDetailComponent } from "../_components/agency-detail";
import { notFound } from "next/navigation";

export default async function AgencyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const agency = await fetchAgencyById(resolvedParams.slug);

  if (!agency) {
    notFound();
  }

  return <AgencyDetailComponent agency={agency} />;
}
