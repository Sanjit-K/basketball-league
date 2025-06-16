import DoubleElimTable from "@/components/DoubleElimTable";
import Leaderboard from "@/components/Leaderboard";
import Navbar from "@/components/Navbar";

type Team = {
  id: string;
  name: string;
  lives: number;
};

type MatchResult = {
  opponent: string | null;
  result: "win" | "loss" | null;
};

type Round = {
  [teamId: string]: MatchResult;
};

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white pt-10">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 pt-40">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Double Elimination Bracket
        </h2>
        <DoubleElimTable/>

        
      </div>
    </main>
  );
}
