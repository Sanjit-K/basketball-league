'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function TeamPage() {
  const params = useParams(); // Correct way to access dynamic params
  const teamname = params.teamname as string;

  const [teamData, setTeamData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      if (!teamname) {
        console.warn('No team name provided in URL params');
        setLoading(false);
        setError('Invalid team name');
        return;
      }

      try {
        console.log(`Fetching team data for: ${teamname}`);

        // Update API request to pass the teamname as a query parameter
        const response = await fetch(`/api/${encodeURIComponent(teamname)}`);
        console.log('Raw response:', response);

        if (!response.ok) {
          throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Parsed JSON data:', data);

        setTeamData(data);
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [teamname]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!teamData) {
    return <p className="text-center text-gray-500">No team data available.</p>;
  }  
  return (
    
    <div className="flex justify-center items-center min-h-screen bg-background p-6">
      <div className="glass shadow-lg rounded-2xl p-8 max-w-md w-full border border-border">
        <h1 className="text-2xl font-bold text-center text-white mb-4">
          {teamData.name} Stats
        </h1>
        <div className="space-y-3 text-white">
          <p className="flex justify-between text-lg">
            <span className="font-semibold">Average Points Scored:</span>
            <span>{teamData.avg_points_scored}</span>
          </p>
          <p className="flex justify-between text-lg">
            <span className="font-semibold">Average Points Against:</span>
            <span>{teamData.avg_points_against}</span>
          </p>
          <p className="flex justify-between text-lg">
            <span className="font-semibold">Wins:</span>
            <span>{teamData.wins}</span>
          </p>
          <p className="flex justify-between text-lg">
            <span className="font-semibold">Losses:</span>
            <span>{teamData.losses}</span>
          </p>
          <p className="flex justify-between text-lg">
            <span className="font-semibold">Win Percentage:</span>
            <span>{Math.floor(teamData.win_percent * 100) / 100}%</span>
          </p>
        </div>
      </div>
    </div>
  );
}
