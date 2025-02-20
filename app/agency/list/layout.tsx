import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find Top Marketing Agencies | Agency Spot',
  description: 'Discover and connect with the best marketing agencies worldwide. Filter by services, location, and more to find your perfect agency partner.',
  openGraph: {
    title: 'Find Top Marketing Agencies | Agency Spot',
    description: 'Discover and connect with the best marketing agencies worldwide. Filter by services, location, and more to find your perfect agency partner.',
    type: 'website',
  }
};

export default function AgencyListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 