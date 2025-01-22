import { AgencyList } from './agency-list'
import { getAgencies } from '@/utils/queries/agencies/getAgencies'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Find Agencies - SEO Scientist',
    description: 'Discover the top APP Store Optimization Companies worldwide. Connect with skilled marketing agencies from our curated community.',
}

export default async function FindAgencies() {
    const agencies = await getAgencies();

    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto max-w-7xl py-16">
                <div className="space-y-4 mb-8">
                    <h1 className="text-4xl font-bold tracking-tight">
                        TOP Professional APP Store Optimization Services
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Discover the top APP Store Optimization Companies
                        worldwide. Connect with skilled marketing agencies from
                        our curated community to elevate your marketing
                        strategy.
                    </p>
                </div>
                <AgencyList initialAgencies={agencies} />
            </div>
        </main>
    )
}
