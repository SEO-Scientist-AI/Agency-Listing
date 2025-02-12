

import FindAgencies from "@/app/agency/_components/find-agency";
import { notFound,redirect, RedirectType } from "next/navigation";

export default async function AgencyServiceArchive({ params }: { params: Promise<{
  slug:string;
  service: string 
  city: string }> }) {
  const resolvedParams = await params;

   if(resolvedParams.slug.toLowerCase() !== 'list' && resolvedParams.service !== "" ){
      redirect("/agency",RedirectType.push)
    }
  const services = resolvedParams.service;
  const location = resolvedParams.city

  if (!resolvedParams) {
    notFound();
  }
  return (<>
    <FindAgencies servicesSlug={services} locationSlug={location}  />
    </>)
  
}
