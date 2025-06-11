import Leaderboard from "@/components/Leaderboard";
import Navbar from "@/components/Navbar";

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white pt-10">
        <Navbar />
        <Leaderboard />
    </main>
  );
}
