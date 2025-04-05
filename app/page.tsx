"use client"

import Link from "next/link"
import { MapPin, Calendar, FileText, ExternalLink, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import FreeAgentsSection from "@/components/free-agents-section"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import TeamTable from "@/components/TeamTable"
import MatchCalendar from "@/components/MatchCalendar"

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
      <header className="border-b border-gray-800/30 backdrop-blur-sm z-10">
        <div className="container mx-auto py-6 px-4">
          <motion.h1
            className="text-2xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            Dallas International Hoopers
          </motion.h1>
        </div>
      </header>

      <main className="flex-1 z-10">
        {/* Hero Section */}
        <section className="py-12 md:py-20 backdrop-blur-sm bg-gray-900/30">
          <div className="container mx-auto px-4 text-center">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-2xl mx-auto">
              <motion.h2 className="text-3xl md:text-5xl font-bold mb-6 text-white" variants={itemVariants}>
                Join Our Basketball Community
              </motion.h2>
              <motion.p className="text-lg text-gray-300 mb-8" variants={itemVariants}>
                Signups for this season are now closed — but stay tuned! Another season is coming soon.
                Follow us on Instagram for all updates and announcements.
              </motion.p>
              <motion.div variants={itemVariants}>
                <Button asChild size="lg" variant="outline" className="font-medium relative overflow-hidden group">
                  <Link
                    href="https://www.instagram.com/dallas.international.hoopers/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="relative z-10">Follow on Instagram</span>
                    <span className="absolute inset-0 bg-primary/20 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300"></span>
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>


        {/* Features Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Game Schedule Card */}
              {/* <motion.div variants={itemVariants}>
                <Card className="bg-gray-800/50 backdrop-blur-md border-gray-700/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                  <CardHeader>
                    <Calendar className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle>Game Schedule</CardTitle>
                    <CardDescription>To be announced</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* <div className="space-y-2">
                      <p className="font-medium">Every Friday</p>
                      <p>5:00 PM - 7:00 PM</p>
                    </div> 
                  </CardContent>
                </Card>
              </motion.div> 
            */}

              {/* Location Card */}
              <motion.div variants={itemVariants}>
                <Card className="bg-gray-800/50 backdrop-blur-md border-gray-700/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                  <CardHeader>
                    <MapPin className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle>Game Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="font-medium">3828 Bonita Dr</p>
                      <p>Plano, TX 75025</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full relative overflow-hidden group">
                      <Link
                        href="https://www.google.com/maps/search/?api=1&query=3828+Bonita+Dr+Plano+TX+75025"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="relative z-10">View on Map</span>
                        <span className="absolute inset-0 bg-primary/20 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300"></span>
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>


              {/* League Rules Card */}
              <motion.div variants={itemVariants}>
                <Card className="bg-gray-800/50 backdrop-blur-md border-gray-700/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                  <CardHeader>
                    <FileText className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle>Rules</CardTitle>
                    <CardDescription>Guidelines for fair play</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Review our rules on Google Docs to ensure fair and enjoyable games for everyone.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full relative overflow-hidden group">
                      <Link
                        href="https://docs.google.com/document/d/1m3TT3-HHceRsqv7wL2kD1vWgkL3lMv98RXvolKercew/edit?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="relative z-10">View Rules</span>
                        <span className="absolute inset-0 bg-primary/20 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300"></span>
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>  
        <MatchCalendar />    
        <TeamTable />        
        <FreeAgentsSection />

      </main>

      <footer className="border-t border-gray-800/30 py-6 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-xl font-bold text-primary mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Dallas International Hoopers
          </motion.h2>
          <motion.div
            className="flex justify-center items-center space-x-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="https://www.instagram.com/dallas.international.hoopers/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-primary transition"
            >
              <Instagram className="h-6 w-6" />
            </Link>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
