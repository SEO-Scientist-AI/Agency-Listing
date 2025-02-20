import { redirect } from 'next/navigation';

export default async function AgencyPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string }> 
}) {
  // Await the searchParams
  const resolvedParams = await searchParams;
  
  // If there are search params, redirect to list with those params
  if (Object.keys(resolvedParams).length > 0) {
    const params = new URLSearchParams(resolvedParams);
    return redirect(`/agency/list?${params.toString()}`);
  }
  
  // Otherwise redirect to main list page
  return redirect('/agency/list');
}