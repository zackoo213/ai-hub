"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager",
    quote: "AI Hub has revolutionized how our team approaches content creation. The quality and speed are unmatched.",
    avatar: "👩‍💼",
  },
  {
    name: "Marcus Rodriguez",
    role: "Creative Director",
    quote: "The integration capabilities are incredible. We've streamlined our entire workflow with AI Hub's tools.",
    avatar: "👨‍🎨",
  },
  {
    name: "Emily Watson",
    role: "Marketing Lead",
    quote: "ROI increased by 300% within the first month. AI Hub delivers on every promise.",
    avatar: "👩‍💻",
  },
  {
    name: "David Kim",
    role: "Startup Founder",
    quote: "As a solo entrepreneur, AI Hub gives me the power of an entire creative team. Game-changing.",
    avatar: "👨‍💼",
  },
]

interface TestimonialsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TestimonialsModal({ isOpen, onClose }: TestimonialsModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            className="glass-strong rounded-3xl p-8 max-w-lg w-full relative z-10"
            style={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.3)",
            }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              aria-label="Close testimonials"
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2 font-sans">What Our Users Say</h2>
              <p className="text-white/70 font-sans">Real feedback from AI Hub members</p>
            </div>

            {/* Testimonial Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="text-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  {testimonials[currentIndex].avatar}
                </div>

                <blockquote className="text-white text-lg mb-6 leading-relaxed font-sans">
                  "{testimonials[currentIndex].quote}"
                </blockquote>

                <div className="text-white/90 font-sans">
                  <div className="font-semibold">{testimonials[currentIndex].name}</div>
                  <div className="text-white/70 text-sm">{testimonials[currentIndex].role}</div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? "bg-white" : "bg-white/40"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
