"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CreateTeamPage() {
  const [teamName, setTeamName] = useState("");
  const [players, setPlayers] = useState([{ name: "", instagram: "" }]);
  const [agreed, setAgreed] = useState(false);
  const [stepThreeDone, setStepThreeDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlayerChange = (index: number, field: string, value: string) => {
    const newPlayers = [...players];
    newPlayers[index][field as keyof typeof newPlayers[number]] = value;
    setPlayers(newPlayers);
  };

  const addPlayer = () => {
    if (players.length >= 8) {
      alert("You cannot add more than 8 players.");
      return;
    }
    setPlayers([...players, { name: "", instagram: "" }]);
  };

  const totalCost = players.length * 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) return alert("You must agree to the terms.");
    if (!stepThreeDone) return alert("You must confirm that Step 3 is done.");
    if (players.length < 6 || players.length > 8) {
      return alert("You must add between 6 and 8 players.");
    }

    setIsLoading(true);

    const memberNames = players.map((p) => p.name);
    const instagramHandles = players.map((p) => p.instagram);

    const { error } = await supabase.from("teams").insert({
      name: teamName,
      members: memberNames,
      instagram: instagramHandles,
    });

    setIsLoading(false);

    if (error) {
      return( alert("Failed to create team. Try again."));
    }

    window.location.href = `/payment?amount=${totalCost}`;
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto p-6 text-white pt-40">
        <h1 className="text-3xl font-bold mb-6 text-center">
          DIH Volleyball Team Creation
        </h1>
        <p className="text-center text-gray-300 mb-6">
          Only 1 person per team needs to complete this form. Entry is{" "}
          <span className="font-semibold text-green-400">$3 per person</span>.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-lg font-medium">
              Step 1. Team Name
            </label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              disabled={isLoading}
              required
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
            />
          </div>

          <div>
            <label className="block mb-2 text-lg font-medium">
              Step 2. List of Team Members; 6–8 players.
            </label>
            {players.map((player, index) => (
              <div key={index} className="space-y-2 mb-4">
                <label className="block text-md font-medium">
                  Player {index + 1}
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  value={player.name}
                  onChange={(e) =>
                    handlePlayerChange(index, "name", e.target.value)
                  }
                  disabled={isLoading}
                  required
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                />
                <input
                  type="text"
                  placeholder="Instagram handle"
                  value={player.instagram}
                  onChange={(e) =>
                    handlePlayerChange(index, "instagram", e.target.value)
                  }
                  disabled={isLoading}
                  required
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                />
              </div>
            ))}
            <Button
              type="button"
              onClick={addPlayer}
              disabled={isLoading}
              className="w-full"
            >
              Add Player
            </Button>
          </div>

          <div>
            <label className="block mb-2 text-lg font-medium">
              Step 3. Add the DIH Instagram account to a group chat with you and your team. Name the groupchat the name of your team.
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={stepThreeDone}
                onChange={(e) => setStepThreeDone(e.target.checked)}
                disabled={isLoading}
                required
              />
              <span>Done</span>
            </label>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-400">
              By participating in any match or activity under Dallas
              International Hoopers (DIH), I acknowledge that I do so
              voluntarily and at my own risk. I understand that all games are
              self-organized and unsupervised, and I accept full responsibility
              for any injury, accident, property damage, or personal loss that
              may occur before, during, or after a match. I release DIH, its
              organizers, volunteers, and affiliates from all liability related
              to my participation. I agree to follow all league rules, including
              accurate win reporting, payment requirements, and conduct
              standards. I understand that falsifying results or breaking rules
              may result in removal from the league without refund. I accept
              that all payments are final and that DIH is not responsible for
              resolving in-game disputes or conflicts between players. My
              participation confirms my acceptance of these terms.
            </p>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                disabled={isLoading}
                required
              />
              <span>I Agree</span>
            </label>
          </div>

          <div className="text-center">
            <p className="mb-4 text-lg">Total: ${totalCost}</p>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Proceed to Payment"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
