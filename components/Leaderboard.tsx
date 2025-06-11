"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Team {
  id: number;
  name: string;
  wins: number;
  losses: number;
  verified: boolean;
}

export default function Leaderboard() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchTeams() {
      setLoading(true);
      try {
        const res = await fetch("/api/teams");
        if (!res.ok) throw new Error("Failed to fetch teams");

        const data: Team[] = await res.json();

        // Filter only verified teams
        const verifiedTeams = data.filter((team) => team.verified === true);

        setTeams(verifiedTeams);
      } catch (error) {
        console.error("Error fetching teams:", error);
        setTeams([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTeams();
  }, []);

  const sortedTeams = useMemo(() => {
    // Just in case, filter again here too
    return [...teams]
      .filter((team) => team.verified === true)
      .sort((a, b) => b.wins - a.wins);
  }, [teams]);

  return (
    <section className="max-w-4xl mx-auto p-4 sm:p-8 pt-4 bg-gray-900/70 rounded-xl shadow-lg text-white">
      <h2 className="text-3xl sm:text-4xl font-semibold mb-6 text-center tracking-wide pt-20">
        Team Leaderboard
      </h2>

      {loading ? (
        <p className="text-center text-gray-400 py-10 italic">Loading teams...</p>
      ) : sortedTeams.length === 0 ? (
        <p className="text-center text-gray-500 py-10 italic">
          No verified teams registered yet
        </p>
      ) : (
        <div className="overflow-x-auto pt-4">
          <Table className="min-w-[320px] sm:min-w-full rounded-lg overflow-hidden">
            <TableCaption className="text-gray-400 text-sm italic mt-2">
              Ranked by wins (losses shown for info only)
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-800 uppercase text-gray-400 text-xs sm:text-sm tracking-wider">
                <TableHead className="w-10 text-center">#</TableHead>
                <TableHead className="text-left pl-4">Team Name</TableHead>
                <TableHead className="w-16 text-center">Wins</TableHead>
                <TableHead className="w-16 text-center">Losses</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTeams.map((team, index) => (
                <TableRow
                  key={team.id}
                  className={
                    index % 2 === 0
                      ? "bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
                      : "bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
                  }
                >
                  <TableCell className="text-center font-semibold text-primary-400 text-sm sm:text-base">
                    {index + 1}
                  </TableCell>
                  <TableCell className="pl-4 font-medium text-white text-sm sm:text-base truncate max-w-[150px] sm:max-w-none">
                    {team.name}
                  </TableCell>
                  <TableCell className="text-center font-semibold text-green-400 text-sm sm:text-base">
                    {team.wins}
                  </TableCell>
                  <TableCell className="text-center font-semibold text-red-400 text-sm sm:text-base">
                    {team.losses}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </section>
  );
}
