"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import MatchesComingSoon from "./MatchesComingSoon"


type Match = {
  id: string
  team1: { name: string; score: number }
  team2: { name: string; score: number }
  matchType: "Winner's Bracket" | "Loser's Bracket" | "Grand Final"
  nextMatchForWinner?: string
  nextMatchForLoser?: string
}

export default function DoubleElimTable() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch(
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vStNdst5RQoUDyFibwsGxNLcnD0GEX9GTxuJtdaokWA3JgJgTCYbs0s5IXN77VN3ectbGiJFcpSj_Fa/pub?output=csv"
        )
        const text = await res.text()
        const rows = text.trim().split("\n").slice(1) // Skip header
        const parsed: Match[] = rows.map((row) => {
          const [
            id,
            team1_name,
            team1_score,
            team2_name,
            team2_score,
            match_type,
            next_winner,
            next_loser
          ] = row.split(",")

          return {
            id,
            team1: { name: team1_name, score: Number(team1_score) },
            team2: { name: team2_name, score: Number(team2_score) },
            matchType: match_type as Match["matchType"],
            nextMatchForWinner: next_winner || undefined,
            nextMatchForLoser: next_loser || undefined
          }
        })
        setMatches(parsed)
      } catch (err) {
        console.error("Failed to load match data", err)
        setMatches([])
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-12 text-gray-300">
        <Loader2 className="animate-spin mr-2" />
        Loading matches...
      </div>
    )
  }

  if (matches.length === 0) {
    return <MatchesComingSoon />
  }

  return (
    <table className="min-w-full border-collapse border border-gray-700 text-white">
      <thead>
        <tr className="bg-gray-800">
          <th className="border border-gray-600 p-2">Match ID</th>
          <th className="border border-gray-600 p-2">Team 1</th>
          <th className="border border-gray-600 p-2">Score</th>
          <th className="border border-gray-600 p-2">Team 2</th>
          <th className="border border-gray-600 p-2">Score</th>
          <th className="border border-gray-600 p-2">Match Type</th>
          <th className="border border-gray-600 p-2">Winner Advances To</th>
          <th className="border border-gray-600 p-2">Loser Drops To</th>
        </tr>
      </thead>
      <tbody>
        {matches.map(({ id, team1, team2, matchType, nextMatchForWinner, nextMatchForLoser }) => {
          const team1IsWinner = team1.score > team2.score
          const team2IsWinner = team2.score > team1.score

          return (
            <tr key={id} className="even:bg-gray-900 odd:bg-gray-800">
              <td className="border border-gray-600 p-2 text-center">{id}</td>
              <td className={`border border-gray-600 p-2 ${team1IsWinner ? "font-bold text-green-400" : ""}`}>
                {team1.name}
              </td>
              <td className={`border border-gray-600 p-2 text-center ${team1IsWinner ? "font-bold text-green-400" : ""}`}>
                {team1.score}
              </td>
              <td className={`border border-gray-600 p-2 ${team2IsWinner ? "font-bold text-green-400" : ""}`}>
                {team2.name}
              </td>
              <td className={`border border-gray-600 p-2 text-center ${team2IsWinner ? "font-bold text-green-400" : ""}`}>
                {team2.score}
              </td>
              <td className="border border-gray-600 p-2 text-center">{matchType}</td>
              <td className="border border-gray-600 p-2 text-center">{nextMatchForWinner || "-"}</td>
              <td className="border border-gray-600 p-2 text-center">{nextMatchForLoser || "-"}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
