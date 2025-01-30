'use client';

import { useEffect, useState } from 'react';
import { fetchAllAgencies, fetchAgencyById } from '@/lib/api';

export default function ApiTestPage() {
  const [allAgencies, setAllAgencies] = useState<any[]>([]);
  const [singleAgency, setSingleAgency] = useState<any>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Test getAllAgencies
    async function testGetAllAgencies() {
      try {
        const agencies = await fetchAllAgencies();
        setAllAgencies(agencies);
      } catch (err) {
        setError('Error fetching all agencies: ' + (err instanceof Error ? err.message : String(err)));
      }
    }

    testGetAllAgencies();
  }, []);

  // Test getAgencyById
  const testGetSingleAgency = async (id: string) => {
    try {
      const agency = await fetchAgencyById(id);
      setSingleAgency(agency);
    } catch (err) {
      setError('Error fetching single agency: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API Test Page</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">All Agencies</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
          {JSON.stringify(allAgencies, null, 2)}
        </pre>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Test Single Agency</h2>
        <div className="flex gap-2 mb-4">
          {allAgencies.map(agency => (
            <button
              key={agency.id}
              onClick={() => testGetSingleAgency(agency.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Load {agency.name}
            </button>
          ))}
        </div>
        {singleAgency && (
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            {JSON.stringify(singleAgency, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
