import React, { ReactNode } from 'react';
import Navbar from '../../components/wrapper/navbar';
import Footer from '../../components/wrapper/footer';

interface LayoutProps {
  children: ReactNode; 
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
        <Navbar />
        <main className="container mx-auto max-w-6xl px-4 py-8 pt-24">
            {children}
        </main>
        <Footer />
    </div>
  );
};

export default Layout;
