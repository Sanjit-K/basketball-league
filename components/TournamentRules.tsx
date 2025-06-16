"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const rules = [
  {
    title: "Registration & Eligibility",
    points: [
      "Teams must register online and pay the entry fee before their first match.",
      "Each team must have 6–8 players.",
      "A player may only play for one team in the tournament.",
      "Substitutes must be declared before the first match begins.",
    ],
  },
  {
    title: "Format",
    points: [
      "This is a double elimination bracket.",
      "Each team is eliminated after 2 match losses.",
      "The winner of the Loser’s Bracket plays the Winner’s Bracket finalist in the Grand Final.",
    ],
  },
  {
    title: "Match Structure",
    points: [
      "Each match is best-of-3 sets.",
      "Sets are played to 21 points, win by 2, capped at 25.",
      "If tied 1–1, a third set is played to 15, win by 2, capped at 17.",
      "Teams switch sides between sets.",
      "A coin toss or rock-paper-scissors determines initial serve.",
    ],
  },
  {
    title: "Game Day",
    points: [
      "Teams must arrive 10 minutes before their scheduled match time.",
      "A 5-minute grace period is allowed. After that, the match is forfeited.",
      "Teams are responsible for checking their next match time on the bracket.",
    ],
  },
  {
    title: "Conduct",
    points: [
      "No arguing with refs or volunteers. Their decisions are final.",
      "Disrespectful behavior may result in ejection from the tournament.",
      "Physical altercations result in immediate disqualification of the entire team.",
    ],
  },
  {
    title: "Scoring & Bracket Updates",
    points: [
      "Scorekeepers will report results immediately after each match.",
      "Brackets update live on the official website: [Insert site or QR code].",
      "Wins and losses determine next placement per the bracket path.",
    ],
  },
  {
    title: "Prize Pool",
    points: [
      "100% of entry fees go into the prize pool.",
      "The winning team receives the full prize unless otherwise announced.",
    ],
  },
  {
    title: "Additional Notes",
    points: [
      "Games are self-officiated unless a volunteer referee is present.",
      "Substitutions can occur during dead balls, no limit.",
      "If a player is injured and cannot continue, the team may finish with 5 players.",
    ],
  },
];

export default function TournamentRules() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="bg-gradient-to-br py-20 px-6 text-white">
      <h2 className="text-4xl font-bold text-center mb-12">Tournament Rules</h2>
      <div className="max-w-4xl mx-auto space-y-4">
        {rules.map((rule, index) => (
          <div
            key={index}
            className="bg-zinc-800 rounded-xl shadow-md overflow-hidden"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-zinc-700 transition"
            >
              <span className="text-lg font-semibold">{rule.title}</span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-4"
                >
                  <ul className="list-disc list-inside space-y-2 text-sm text-zinc-200">
                    {rule.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
