import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find & Compare the Best Digital Agencies | Top Agency Marketplace',
  description: 'Find and compare the best digital agencies for SEO, marketing, design, and more. Read reviews, check ratings, and hire top agencies on our marketplace!',
  openGraph: {
    title: 'Find & Compare the Best Digital Agencies | Top Agency Marketplace',
    description: 'Find and compare the best digital agencies for SEO, marketing, design, and more. Read reviews, check ratings, and hire top agencies on our marketplace!',
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