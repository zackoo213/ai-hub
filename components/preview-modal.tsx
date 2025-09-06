"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Zap, Brain, Rocket, Shield, Globe, Sparkles } from "lucide-react"
import { useEffect } from "react"

const modules = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "AI Content Generator",
    description: "Create high-quality content in seconds with our advanced AI models.",
    features: ["Blog posts", "Social media", "Marketing copy"],
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Smart Automation",
    description: "Automate repetitive tasks and focus on what matters most.",
    features: ["Workflow automation", "Smart scheduling", "Task management"],
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "Performance Analytics",
    description: "Track your success with detailed insights and recommendations.",
    features: ["Real-time metrics", "Growth tracking", "ROI analysis"],
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Enterprise Security",
    description: "Bank-level security to protect your data and privacy.",
    features: ["End-to-end encryption", "SOC 2 compliance", "Data sovereignty"],
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Global Integration",
    description: "Connect with 100+ tools and platforms seamlessly.",
    features: ["API access", "Webhook support", "Custom integrations"],
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "AI Assistant",
    description: "Your personal AI companion for enhanced productivity.",
    features: ["24/7 availability", "Context awareness", "Learning capabilities"],
  },
]

interface PreviewModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PreviewModal({ isOpen, onClose }: PreviewModalProps) {
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
            className="glass-strong rounded-3xl p-8 max-w-4xl w-full max-h-[80vh] overflow-hidden relative z-10"
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
              className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
              aria-label="Close preview"
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2 font-sans">AI Hub Modules</h2>
              <p className="text-white/70 font-sans">Discover the power of integrated AI tools</p>
            </div>

            {/* Modules Grid */}
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-6 min-w-max">
                {modules.map((module, index) => (
                  <motion.div
                    key={index}
                    className="glass rounded-2xl p-6 min-w-[300px] flex-shrink-0"
                    style={{
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.2)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                  >
                    <div className="text-white mb-4">{module.icon}</div>

                    <h3 className="text-xl font-semibold text-white mb-3 font-sans">{module.title}</h3>

                    <p className="text-white/80 mb-4 leading-relaxed font-sans">{module.description}</p>

                    <ul className="space-y-2">
                      {module.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-white/70 text-sm flex items-center gap-2 font-sans">
                          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="flex justify-center mt-6">
              <div className="flex gap-2">
                {modules.map((_, index) => (
                  <div key={index} className="w-2 h-2 bg-white/40 rounded-full" />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
