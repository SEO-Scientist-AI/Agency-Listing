"use client";

import FindAgencies from "./_components/find-agency";
import { useSearchParams } from 'next/navigation';
export default function Agencies() {
  const searchParams = useSearchParams();
  const services = searchParams.get('services') || "";
  const location = searchParams.get('location') || "";
  return (
    <>
      <FindAgencies servicesSlug={services} locationSlug={location} />
    </>
  );
}