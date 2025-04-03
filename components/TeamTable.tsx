'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import Link from 'next/link';
import { Loader2 } from "lucide-react";

const TEAM_NAMES = [
  'dih-demons',
  'curry-elite',
  'dihtastrophe',
  '2029-predators',
  'rotten-banana-fish',
  'spryzen',
  'bic',
  'goonie-goon',
  'the-silk-road-shooters',
  'great-walls',
  'jelqing-jaguars',
  'dumpling-dihnasty',
  'drd',
  'bbl-bandits',
  'the-pindih',
  'black-and-yellows'
];

export default function TeamTable() {
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchAllTeams = async () => {
      try {
        const fetchedTeams = await Promise.all(
          TEAM_NAMES.map(async (teamname) => {
            const res = await fetch(`/api/${encodeURIComponent(teamname)}`);
            if (!res.ok) throw new Error(`Failed to fetch ${teamname}`);
            return await res.json();
          })
        );
        setTeams(fetchedTeams);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllTeams();
  }, []);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedTeams = [...teams].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12 px-4 md:px-12 lg:px-24 backdrop-blur-sm bg-gray-900/30 rounded-lg">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <span className="ml-2 text-gray-300">Loading team stats...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 px-4 md:px-12 lg:px-24 backdrop-blur-sm bg-gray-900/30 rounded-lg">
        <p className="text-gray-300">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-12 lg:px-24">
      <div className="backdrop-blur-sm bg-gray-900/30 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Team Stats</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => handleSort('name')}>Team Name</TableHead>
              <TableHead onClick={() => handleSort('avg_points_scored')}>Avg Points Scored</TableHead>
              <TableHead onClick={() => handleSort('avg_points_against')}>Avg Points Against</TableHead>
              <TableHead onClick={() => handleSort('wins')}>Wins</TableHead>
              <TableHead onClick={() => handleSort('losses')}>Losses</TableHead>
              <TableHead onClick={() => handleSort('win_percent')}>Win %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTeams.map((team) => (
              <TableRow key={team.id}>
                <TableCell>
                  <Link href={`/team/${team.name}`}>
                    <span className="text-blue-400 hover:underline hover:text-blue-300 transition">
                      {team.name.toUpperCase().replace(/-/g, " ")}
                    </span>
                  </Link>
                </TableCell>
                <TableCell>{team.avg_points_scored}</TableCell>
                <TableCell>{team.avg_points_against}</TableCell>
                <TableCell>{team.wins}</TableCell>
                <TableCell>{team.losses}</TableCell>
                <TableCell>{team.win_percent.toFixed(2)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
