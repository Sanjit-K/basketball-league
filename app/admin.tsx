"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [stats, setStats] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (username === "admin" && password === "password123") {
      setLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleAddTeam = async () => {
    const { data, error } = await supabase.from("teams").insert([{ name: teamName, stats }]);

    if (error) {
      alert("Error adding team");
    } else {
      alert("Team added successfully!");
      setTeamName("");
      setStats("");
    }
  };

  if (!loggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl mb-4">Admin Login</h2>
        <input className="border p-2 mb-2" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input className="border p-2 mb-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-blue-500 text-white p-2" onClick={handleLogin}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Admin Dashboard</h2>

      {/* Add Team Form */}
      <div className="mb-6">
        <h3 className="text-lg">Add New Team</h3>
        <input className="border p-2 mb-2 w-full" type="text" placeholder="Team Name" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
        <textarea className="border p-2 mb-2 w-full" placeholder="Team Stats" value={stats} onChange={(e) => setStats(e.target.value)} />
        <button className="bg-green-500 text-white p-2 w-full" onClick={handleAddTeam}>
          Add Team
        </button>
      </div>
    </div>
  );
}
