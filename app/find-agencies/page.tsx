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
        <AgenciesClient initialAgencies={agencies} />
      </div>
      <Footer />
    </>
  )
}