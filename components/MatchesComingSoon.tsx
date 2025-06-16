"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MatchesComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white px-4">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold mb-4 text-center"
      >
        Matches Coming Soon
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-lg text-gray-400 text-center max-w-md"
      >
        Once all teams are registered and confirmed, the full double elimination bracket will be released here.
      </motion.p>
    </div>
  );
}
