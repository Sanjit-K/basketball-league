'use client';

import { useEffect, useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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

export default function MatchCalendar() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch('/api/matches');
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        const data: Match[] = await res.json();
        setMatches(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const matchesForSelectedDate = matches.filter(
    match => match.Date === format(selectedDate ?? new Date(), 'yyyy-MM-dd')
  );

  return (
    <div className="mt-8 bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-md border border-white/20">
      <h2 className="text-2xl font-bold text-white text-center mb-4">Match Calendar</h2>

      <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border border-white/20 bg-white/5 text-white shadow-md"

        />

        <div className="flex-1 text-white">
          <h3 className="text-xl font-semibold mb-2">
            Matches on {selectedDate ? format(selectedDate, 'PPP') : '—'}
          </h3>

          {loading ? (
            <p>Loading matches...</p>
          ) : error ? (
            <p className="text-red-400">Error: {error}</p>
          ) : matchesForSelectedDate.length === 0 ? (
            <p>No matches on this day.</p>
          ) : (
            <ul className="space-y-4">
              {matchesForSelectedDate.map((match, idx) => {
                const score =
                  match["Played?"] === "No"
                    ? "TBD"
                    : `${match["Score 1"]} - ${match["Score 2"]}`;
                const result =
                  match["Played?"] === "No"
                    ? "Upcoming"
                    : match.Winner === "Draw"
                    ? "Draw"
                    : `${match.Winner.toUpperCase().replace(/-/g, " ")} Won`;

                return (
                  <li
                    key={idx}
                    className="bg-white/10 p-4 rounded-lg border border-white/20 shadow-md"
                  >
                    <p className="font-medium text-lg">
                      {match["Team 1"].toUpperCase().replace(/-/g, " ")} vs {match["Team 2"].toUpperCase().replace(/-/g, " ")}
                    </p>
                    <p className="text-sm">Time: {match.Time}</p>
                    <p className="text-sm">Score: {score}</p>
                    <p
                      className={cn(
                        "text-sm font-bold",
                        result.includes("Win") ? "text-green-400" :
                        result === "Draw" ? "text-gray-300" :
                        result === "Upcoming" ? "text-yellow-400" :
                        "text-red-400"
                      )}
                    >
                      {result}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
