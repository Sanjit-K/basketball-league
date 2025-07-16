"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RainbowButton } from "@/components/magicui/rainbow-button";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
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
            Stay tapped in for more DIH
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-8"
            variants={itemVariants}
          >
            DIH Volleyball Summer '25 has ended. Thank you to every player and team that
            signed up.
          </motion.p>

          <motion.div variants={itemVariants} className="mb-10">
            <Link href="/hall-of-fame" passHref>
              <RainbowButton className="text-white hover:bg-gray-900" variant="outline">
                View Hall of Fame
              </RainbowButton>
            </Link>
          </motion.div>


        </motion.div>
      </div>
    </section>
  );
}
