"use client";

import FindAgencies from "./_components/find-agency";
import { useSearchParams } from 'next/navigation';
import { Metadata } from 'next';

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

export const metadata: Metadata = {
  title: 'Find Agencies',
  description: 'Discover and connect with top professional agencies worldwide',
  robots: {
    index: true,
    follow: true
  }
}