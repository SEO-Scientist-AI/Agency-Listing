import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find Top **Best Marketing Agencies Worldwide** | Agency Spot',
  description: 'Discover and connect with the **Best Marketing Agencies Worldwide**. Filter by services, location, and more to find your perfect agency partner.',
  openGraph: {
    title: 'Find Top **Best Marketing Agencies Worldwide** | Agency Spot',
    description: 'Discover and connect with the **Best Marketing Agencies Worldwide**. Filter by services, location, and more to find your perfect agency partner.',
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