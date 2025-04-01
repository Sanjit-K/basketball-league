"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"

export default function ParallaxBackground() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Transform mouse position to parallax values
  const backgroundX = useTransform(mouseX, [0, windowSize.width || 1], [10, -10])
  const backgroundY = useTransform(mouseY, [0, windowSize.height || 1], [10, -10])

  // Gradient positions
  const gradientX = useTransform(mouseX, [0, windowSize.width || 1], [40, 60])
  const gradientY = useTransform(mouseY, [0, windowSize.height || 1], [40, 60])

  // Pre-calculate dot positions and sizes
  const dotCount = 20
  const dotPositionsX = useRef(Array.from({ length: dotCount }, () => Math.random() * 100)).current
  const dotPositionsY = useRef(Array.from({ length: dotCount }, () => Math.random() * 100)).current
  const dotSizes = useRef(Array.from({ length: dotCount }, () => Math.random() * 200 + 50)).current

  // Pre-calculate dot parallax values
  const dotParallaxX = useRef(
    Array.from({ length: dotCount }, (_, i) =>
      useTransform(mouseX, [0, windowSize.width || 1], [i % 2 === 0 ? -20 : 20, i % 2 === 0 ? 20 : -20]),
    ),
  ).current

  const dotParallaxY = useRef(
    Array.from({ length: dotCount }, (_, i) =>
      useTransform(mouseY, [0, windowSize.height || 1], [i % 2 === 0 ? -20 : 20, i % 2 === 0 ? 20 : -20]),
    ),
  ).current

  useEffect(() => {
    // Set initial window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mouseX, mouseY])

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
        style={{
          x: backgroundX,
          y: backgroundY,
          backgroundSize: "120% 120%",
          backgroundPosition: `${gradientX}% ${gradientY}%`,
        }}
      />

      {/* Animated dots/circles */}
      {Array.from({ length: dotCount }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/10"
          style={{
            width: dotSizes[i],
            height: dotSizes[i],
            left: `${dotPositionsX[i]}%`,
            top: `${dotPositionsY[i]}%`,
            x: dotParallaxX[i],
            y: dotParallaxY[i],
            opacity: 0.1,
            filter: "blur(40px)",
          }}
        />
      ))}
    </div>
  )
}

