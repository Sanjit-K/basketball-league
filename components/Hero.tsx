"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { Button } from "./ui/button";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Hero() {
  const [playerCount, setPlayerCount] = useState(0);
  const [prizePool, setPrizePool] = useState(0);

  useEffect(() => {
    async function fetchPlayerCount() {
      const { data, error } = await supabase
        .from("teams")
        .select("members, verified");

      if (error) {
        console.error("Failed to fetch player data:", error);
        return;
      }

      let totalPlayers = 0;
      if (data) {
        data.forEach((team) => {
          if (team.verified && Array.isArray(team.members)) {
            totalPlayers += team.members.length;
          }
        });
      }

      setPlayerCount(totalPlayers);
    }

    fetchPlayerCount();
  }, []);

  useEffect(() => {
    const targetPrizePool = Math.max(100, playerCount * 3);
    let start = 0;
    const duration = 2000;
    const stepTime = 30;
    const increments = Math.ceil(duration / stepTime);
    const incrementValue = targetPrizePool / increments;

    if (targetPrizePool === 0) {
      setPrizePool(0);
      return;
    }

    const counter = setInterval(() => {
      start += incrementValue;
      if (start >= targetPrizePool) {
        setPrizePool(targetPrizePool);
        clearInterval(counter);
      } else {
        setPrizePool(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(counter);
  }, [playerCount]);

  return (
    <section className="py-16 md:py-24 backdrop-blur-sm bg-gray-900/30">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-6 text-white"
            variants={itemVariants}
          >
            DIH Volleyball Tournament
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-4"
            variants={itemVariants}
          >
            Sign up, create a team, and get ready to play.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="relative inline-block text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text"
          >
            Prize Pool: ${prizePool.toLocaleString()}
            <span className="absolute -inset-1 blur-md bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-30 rounded-lg"></span>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="text-md text-white font-medium mb-6"
          >
            Tournament Date: <span className="text-orange-400">TBA</span>
          </motion.p>


          <motion.p
            variants={itemVariants}
            className="text-sm text-gray-400 mb-10"
          >
            We keep 0 profit. All registration fees go straight to the prize pool. Pool will start to increase after 6 teams are registered and verified.
          </motion.p>

          <div className="flex justify-center gap-6 flex-wrap">
            <motion.div variants={itemVariants}>
              <Link href="/create" passHref>
                <RainbowButton className=" text-white hover:bg-gray-900" variant="outline">
                  Create Team
                </RainbowButton>
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <button
                onClick={() => {
                  const section = document.getElementById("tournament-rules");
                  section?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Button className="text-white hover:bg-gray-900" variant="outline">
                  Tournament Rules
                </Button>
              </button>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLSe3K276rcXuq1qc6hhARtBvsXvp1VXp1beqkb87rdLazU4EYQ/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
              >
               
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
