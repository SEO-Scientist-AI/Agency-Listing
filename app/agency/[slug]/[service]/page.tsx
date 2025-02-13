
import { notFound,redirect, RedirectType } from "next/navigation";
import FindAgencies from "../../_components/find-agency";


export default async function AgencyCityArchive({ params }: { params: Promise<{ 
  slug:string;
  service: string }> }) {
  const resolvedParams = await params;
  if(resolvedParams.slug.toLowerCase() !== 'list'){
    redirect("/agency",RedirectType.push)
  }
  const services = resolvedParams.service;
  

  if (!resolvedParams) {
    notFound();
  }
  return (
    <>
    <FindAgencies servicesSlug={services}  />
    </>
  )
  
}
