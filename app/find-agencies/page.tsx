import { getAllAgencies } from '@/lib/firebase/agencies'
import { AgenciesClient } from './_components/agencies-client'
import Navbar from "@/components/wrapper/navbar"
import Footer from "@/components/wrapper/footer"

export default async function FindAgencies() {
  const agencies = await getAllAgencies()
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-6xl px-4 py-8 pt-24">
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
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <AgenciesClient initialAgencies={agencies} />
        </div>
      </div>
      <Footer />
    </>
  )
}