"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function AnimatedBackground() {
  const [shouldAnimate, setShouldAnimate] = useState(true)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setShouldAnimate(!mediaQuery.matches)

    const handleChange = () => setShouldAnimate(!mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-800 to-gray-600" />

      {/* Animated gradient blobs */}
      {shouldAnimate && (
        <>
          <motion.div
            className="absolute w-96 h-96 rounded-full opacity-30"
            style={{
              /* Updated blob colors to grayscale */
              background: "radial-gradient(circle, #ffffff 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            initial={{ x: "10%", y: "20%" }}
          />

          <motion.div
            className="absolute w-80 h-80 rounded-full opacity-25"
            style={{
              /* Updated blob colors to grayscale */
              background: "radial-gradient(circle, #cccccc 0%, transparent 70%)",
              filter: "blur(35px)",
            }}
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            initial={{ x: "70%", y: "60%" }}
          />

          <motion.div
            className="absolute w-72 h-72 rounded-full opacity-20"
            style={{
              /* Updated blob colors to grayscale */
              background: "radial-gradient(circle, #999999 0%, transparent 70%)",
              filter: "blur(30px)",
            }}
            animate={{
              x: [0, 60, 0],
              y: [0, -40, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 18,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            initial={{ x: "40%", y: "10%" }}
          />
        </>
      )}

      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
