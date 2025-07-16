"use client"

import Link from "next/link"
import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import Hero from "@/components/Hero"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col dark bg-transparent text-gray-100">
      <Navbar />
      <main className="flex-1 z-10 pt-16">
        <Hero />

      </main>
      <Footer />
    </div>
  )
}
