"use client"

import Link from "next/link"
import { FileText, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import TournamentFormatCarousel from "@/components/TournamentFormatPath"
import Hero from "@/components/Hero"
import Leaderboard from "@/components/Leaderboard"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import TournamentRules from "@/components/TournamentRules"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col dark bg-transparent text-gray-100">
      <Navbar />
      <main className="flex-1 z-10 pt-16">
        <Hero />
        <section id="tournament-rules">
          <TournamentRules />
        </section>
      </main>
      <Footer />
    </div>
  )
}
