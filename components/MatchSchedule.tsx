'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';

interface Match {
  Date: string;
  Time: string;
  "Team 1": string;
  "Team 2": string;
  "Score 1": string;
  "Score 2": string;
  Winner: string;
  "Played?": string;
}

export default function MatchSchedule({ teamName }: { teamName: string }) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(`/api/matches?team=${encodeURIComponent(teamName)}`);
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
        
        const data: Match[] = await response.json();
        setMatches(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [teamName]);

  if (loading) return <p>Loading match schedule...</p>;
  if (error) return <p>Error: {error}</p>;
  if (matches.length === 0) return <p>No matches found for {teamName}.</p>;

  return (
    <div className="mt-8 bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-md border border-white/20">
      <h2 className="text-2xl font-bold text-white text-center mb-4">Match Schedule</h2>
      <Table className="text-white">
        <TableHeader>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Opponent</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Result</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches.map((match, index) => {
            const isHomeGame = match["Team 1"] === teamName;
            const opponent = isHomeGame ? match["Team 2"] : match["Team 1"];
            const encodedOpponent = encodeURIComponent(opponent);

            const result = match["Played?"] === "No"
              ? "Upcoming"
              : match.Winner === teamName
              ? "Win"
              : match.Winner === "Draw"
              ? "Draw"
              : "Loss";

            const score =
              match["Played?"] === "No"
                ? "TBD"
                : `${match["Score 1"]} - ${match["Score 2"]}`;

            return (
              <TableRow key={index} className="text-center">
                <TableCell>{match.Date}</TableCell>
                <TableCell>{match.Time}</TableCell>
                <TableCell>
                  <Link href={`/team/${encodedOpponent}`}>
                    <span className="text-blue-400 hover:underline hover:text-blue-300 transition">
                      {opponent.toUpperCase().replace(/-/g, " ")}
                    </span>
                  </Link>
                </TableCell>
                <TableCell>{score}</TableCell>
                <TableCell
                  className={`font-bold ${
                    result === "Win"
                      ? "text-green-400"
                      : result === "Loss"
                      ? "text-red-400"
                      : result === "Draw"
                      ? "text-gray-400"
                      : "text-yellow-400"
                  }`}
                >
                  {result}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
