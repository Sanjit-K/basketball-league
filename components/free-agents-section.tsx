"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { UserPlus, Instagram, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"

type FreeAgent = {
  name: string
  instagram: string
}

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

export default function FreeAgentsSection() {
  const [freeAgents, setFreeAgents] = useState<FreeAgent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFreeAgents = async () => {
      try {
        setLoading(true)

        const response = await fetch("/api/free-agents")

        if (!response.ok) {
          throw new Error("Failed to fetch free agents")
        }

        const data = await response.json() // ✅ Extract the JSON object
        console.log("API Response:", data)

        // Correctly extract the 'agents' array
        const agents = data.agents || [] 

        setFreeAgents(agents)
        setError(null)
      } catch (err) {
        console.error("Error fetching free agents:", err)
        setError("Unable to load free agents at this time")
        setFreeAgents([])
      } finally {
        setLoading(false)
      }
    }

    fetchFreeAgents()
  }, [])

  return (
    <section className="py-12 md:py-16 backdrop-blur-sm bg-gray-900/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl font-bold mb-4 text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Free Agents
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Players available to join teams or play as substitutes
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <Button
              asChild
              size="lg"
              className="font-medium bg-primary hover:bg-primary/90 group relative overflow-hidden"
            >
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLSfMUnAoSJRlhR_qWCsQ1YiYnHmDH7AG2HoI7Vks5clG2tLkQA/viewform?usp=dialog"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="relative z-10 flex items-center">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Sign Up As Free Agent
                </span>
                <span className="absolute inset-0 bg-white/20 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300"></span>
              </Link>
            </Button>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <span className="ml-2 text-gray-300">Loading free agents...</span>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-gray-300">{error}</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {freeAgents.map((agent, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/30 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12 border-2 border-primary/20">
                        <AvatarFallback className="bg-primary/20 text-primary-foreground">
                          {agent.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{agent.name}</p>
                        {agent.instagram && (
                          <Link
                            href={`https://instagram.com/${agent.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-gray-400 hover:text-primary transition-colors text-xs"
                          >
                            <Instagram className="h-3 w-3 mr-1" />@{agent.instagram}
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
