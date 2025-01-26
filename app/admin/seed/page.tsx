'use client';
import { seedAgencies } from '@/lib/firebase/seed';
import { useState } from 'react';

export default function SeedPage() {
  const [status, setStatus] = useState('');

  const handleSeed = async () => {
    setStatus('Seeding...');
    try {
      await seedAgencies();
      setStatus('Success! Check Firebase Console');
    } catch (error) {
      console.error(error);
      setStatus('Error: Check console');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Seed Database</h1>
      <button 
        onClick={handleSeed}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Start Seeding
      </button>
      {status && <p className="mt-4 text-lg">{status}</p>}
    </div>
  );
}
