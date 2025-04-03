'use client';

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import MatchSchedule from '@/components/MatchSchedule';

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
    
    <div className="relative min-h-screen bg-gradient-to-r from-navy-800 to-black p-6 flex justify-center items-start">
  <div className="absolute inset-0 bg-white opacity-20 blur-xl"></div>
  <div className="relative glass shadow-2xl rounded-b-3xl p-6 sm:p-8 md:p-10 w-full max-w-screen-xl backdrop-blur-sm bg-white/10 border border-white/20">
    {/* Header with team logo and name */}
    <div className="flex items-center mb-6 flex-col sm:flex-row">
      
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white text-center sm:text-left">
        {teamData.name.toUpperCase().replace(/-/g, " ")}
      </h1>
    </div>

    {/* Stats display */}
    <div className="space-y-4 text-white">
      <div className="overflow-x-auto">
        <table className="min-w-full text-lg sm:text-xl">
          <tbody>
            <tr className="animate-fadeIn">
              <td className="font-semibold">Average Points Scored:</td>
              <td>{teamData.avg_points_scored}</td>
            </tr>
            <tr className="animate-fadeIn delay-100">
              <td className="font-semibold">Average Points Against:</td>
              <td>{teamData.avg_points_against}</td>
            </tr>
            <tr className="animate-fadeIn delay-200">
              <td className="font-semibold">Wins:</td>
              <td>{teamData.wins}</td>
            </tr>
            <tr className="animate-fadeIn delay-300">
              <td className="font-semibold">Losses:</td>
              <td>{teamData.losses}</td>
            </tr>
            <tr className="animate-fadeIn delay-400">
              <td className="font-semibold">Win Percentage:</td>
              <td>{Math.floor(teamData.win_percent * 100) / 100}%</td>
            </tr>
            <tr className="animate-fadeIn delay-500">
              <td className="font-semibold">Members:</td>
              <td>
                {teamData.members.map((member: string | number | ReactNode, index: Key) => (
                  <p key={index}>{member}</p>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <MatchSchedule teamName={teamData.name} />
  </div>
</div>



  );
}
