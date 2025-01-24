import { agencies } from '../agency-data'
import { notFound } from 'next/navigation'
import { AgencyDetailComponent } from '../_components/agency-detail'

export function generateStaticParams() {
  return agencies.map((agency) => ({
    slug: agency.id,
  }))
}

export default async function AgencyDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> | { slug: string } 
}) {
  const resolvedParams = await params
  const agency = agencies.find((a) => a.id === resolvedParams.slug)

  if (!agency) {
    notFound()
  }

  return <AgencyDetailComponent agency={agency} />
}
