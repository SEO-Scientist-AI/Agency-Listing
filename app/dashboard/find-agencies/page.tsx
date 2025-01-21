import { AgencyList } from './agency-list'
import { getAgencies } from '@/utils/queries/agencies/getAgencies'

export default async function FindAgencies() {
    const agencies = await getAgencies();

    return (
        <div className="container mx-auto max-w-7xl py-8">
            <div className="space-y-4 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                    TOP Professional APP Store Optimization Services
                </h1>
                <p className="text-base text-muted-foreground">
                    Discover the top APP Store Optimization Companies
                    worldwide. Connect with skilled marketing agencies from
                    our curated community to elevate your marketing
                    strategy.
                </p>
            </div>
            <AgencyList initialAgencies={agencies} />
        </div>
    );
}
