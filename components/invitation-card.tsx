"use client"

import type React from "react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import { useState, useRef, useEffect } from "react"

export function InvitationCard() {
  const [currentView, setCurrentView] = useState<"main" | "testimonials" | "preview">("main")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [shouldAnimate, setShouldAnimate] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)

  const previewImages = [
    "/placeholder.svg?height=400&width=300", // First slot remains for YouTube video
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/13-AV3m5IJXJF5NePrHDNn4srZSsGyn4p.png", // Slot 2: 13.png - Image Generation Module 1
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/14.png-oaup8wWU2rR6Mp2PnjYcxy2tU7ZtIe.jpeg", // Slot 3: 14.png - UGC Module 2
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/15.png-BXzyEbop4jxZdJ6usBCPlRK61PeNGU.jpeg", // Slot 4: 15.png - AI Creatives Module 3
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/16-OOyIM9YeNWeAWLwDTtVwag9as43JGT.png", // Slot 5: 16.png - AI Hooks Module 4
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/17.png-oZxIrhfNyIBcbIdyipDZEcgy3cPjhp.jpeg", // Slot 6: 17.png - Clothing Brand Module 5
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/18-hU0ZbzkMM1ujXUyUuKPSfUsvTNDCPk.png", // Slot 7: 18.png - Miniatures AI Module 6
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/19-QvNO2rCR3fFX5ZK1KAXRifnZyqIV4t.png", // Slot 8: 19.png - Tools list
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20-t3b1x2HIHAjxpTr3l5e2A6Kno8DhDT.png", // Slot 9: 20.png - KIA car with Arabic text
  ]

  const testimonialImages = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-M1DYkcfgmOpRrLC3lv2dhizze6vlOw.png", // 1.png - Hanane testimonial
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-TrXmwSUog4gsFzxmq72fA4FhqNVYhc.png", // 2.png - Lyes testimonial
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-cjUcTqmvDT7x8iDba4Hvb0mUhClymf.png", // 3.png - Adel testimonial
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-eP8NP1HFgoQ1eyrUaEbGSpOdB0RXCo.png", // 4.png - Mohammed testimonial
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-t0Rh2EjxgfhXjRodYOdQYT8Tybc70P.png", // 5.png - Stats/membership testimonial
  ]

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setShouldAnimate(!mediaQuery.matches)

    const handleChange = () => setShouldAnimate(!mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!shouldAnimate || !ctaRef.current) return

    const rect = ctaRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = (e.clientX - centerX) * 0.15
    const deltaY = (e.clientY - centerY) * 0.15

    setMousePosition({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  const handleSwipe = (direction: "left" | "right", type: "preview" | "testimonial") => {
    if (type === "preview") {
      if (direction === "left") {
        setCurrentImageIndex((prev) => (prev + 1) % previewImages.length)
      } else {
        setCurrentImageIndex((prev) => (prev - 1 + previewImages.length) % previewImages.length)
      }
    } else {
      if (direction === "left") {
        setCurrentTestimonialIndex((prev) => (prev + 1) % testimonialImages.length)
      } else {
        setCurrentTestimonialIndex((prev) => (prev - 1 + testimonialImages.length) % testimonialImages.length)
      }
    }
  }

  const handleDragEnd = (event: any, info: PanInfo, type: "preview" | "testimonial") => {
    const swipeThreshold = 50
    if (info.offset.x > swipeThreshold) {
      handleSwipe("right", type)
    } else if (info.offset.x < -swipeThreshold) {
      handleSwipe("left", type)
    }
  }

  const handleAcceptInvitation = () => {
    const message = encodeURIComponent("je souhaite accéder au AI Hub")
    const whatsappUrl = `https://wa.me/13605162802?text=Je%20souhaite%20rejoindre%20AI%20Hub`
    window.open(whatsappUrl, "_blank")
  }

  const renderMainView = () => (
    <motion.div
      key="main"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="relative z-10"
    >
      <motion.div
        className="text-center mb-6 mt-0 ml-0"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 text-red-600 text-sm font-medium mt-0 ml-0 mb-0 px-0 py-0">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span>L'Prix yetla3 l'9900 DA dans 5J</span>
        </div>
      </motion.div>

      <motion.div
        className="text-center mb-4 sm:mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <motion.h1
          className="text-3xl sm:text-4xl font-bold text-black mb-2 sm:mb-3 leading-tight font-serif"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          Vous avez été <span className="text-orange-400">invité(e)</span>
        </motion.h1>

        <motion.p
          className="text-gray-700 text-sm sm:text-base mb-1 sm:mb-2 font-poppins"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          à rejoindre <strong className="text-black">AI Hub</strong>
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-3 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-amber-600 text-lg">
                {star <= 4 ? "★" : star === 5 ? "★" : "☆"}
              </span>
            ))}
            <span className="text-black font-semibold ml-1">4.7</span>
          </div>
          <div className="flex -space-x-2">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3kW9wYdjy6YdxHNqicF8MdwLGYJeJH.png"
              alt="User 1"
              className="w-6 h-6 rounded-full border-2 border-white object-cover"
            />
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pU4NJzWY8wjfl1NM0uOmf1kOcU4D3k.png"
              alt="User 2"
              className="w-6 h-6 rounded-full border-2 border-white object-cover"
            />
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aNn3Q1qJM8cMrMU04EdHHbAIiJjIec.png"
              alt="User 3"
              className="w-6 h-6 rounded-full border-2 border-white object-cover"
            />
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LPDCKl3zlBW3KisFWf3uVvBIfhnkjX.png"
              alt="User 4"
              className="w-6 h-6 rounded-full border-2 border-white object-cover"
            />
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HhoFS1rb0DwesRaMPfkKiqdnUywYQz.png"
              alt="User 5"
              className="w-6 h-6 rounded-full border-2 border-white object-cover"
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="bg-gradient-to-br from-orange-300/15 to-orange-200/5 backdrop-blur-sm border border-orange-200/30 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 text-center relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-200/10 to-transparent rounded-bl-full" />

        <div className="relative z-10">
          <div className="text-orange-500 text-sm font-medium mb-2">Accès à Vie</div>
          <div className="flex items-baseline justify-center gap-2 mb-2">
            <span className="text-3xl sm:text-4xl font-bold text-black font-the-seasons">5900</span>
            <span className="text-black/80 text-base sm:text-lg">DZD / à vie</span>
          </div>
          <div className="text-gray-700 text-sm">
            <span className="text-green-600 font-medium">✓ Paiement unique</span>
          </div>
          <div className="text-xs text-gray-600 mt-1">Plus jamais d'abonnement</div>
        </div>
      </motion.div>

      <motion.div
        className="bg-white/50 backdrop-blur-sm border border-orange-200/20 rounded-xl p-4 mb-4 sm:mb-6 font-poppins"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
      >
        <div className="text-center mb-3">
          <h3 className="text-sm font-semibold text-black mb-2">Inclus dans votre accès :</h3>
        </div>
        <div className="space-y-2 text-xs text-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span>Formation AI Hooks</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span>Private Community (lifetime)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span>Formation AI Creatives (lifetime)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span>Formation Image/Video Gen</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span>FREE Gemini 3.0, Veo 3, Perplexity & CanvaPRO</span>
          </div>
        </div>
      </motion.div>

      <motion.button
        ref={ctaRef}
        style={{
          transform: shouldAnimate ? `translate(${mousePosition.x}px, ${mousePosition.y}px)` : "none",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        whileHover={shouldAnimate ? { scale: 1.05 } : {}}
        whileTap={{ scale: 0.98 }}
        aria-label="Accept invitation to join AI Hub"
        className="mb-4 sm:mb-6 invitation-button w-full bg-orange-500"
        onClick={handleAcceptInvitation}
      >
        <span className="button_top px-0 flex items-center justify-center gap-2 text-white font-poppins">
          <img
            src="https://em-content.zobj.net/source/apple/118/white-heavy-check-mark_2705.png"
            alt="checkmark"
            className="w-4 h-4"
          />
          <span>Accepter L'invitation</span>
        </span>
      </motion.button>

      <motion.div
        className="flex gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <button
          onClick={() => setCurrentView("testimonials")}
          className="flex-1 text-black font-medium py-3 px-4 rounded-lg bg-white border border-black/30 hover:bg-gray-50 hover:border-black/50 hover:shadow-md transform hover:scale-105 transition-all duration-200 font-poppins"
          aria-label="View testimonials"
        >
          Avis
        </button>
        <button
          onClick={() => setCurrentView("preview")}
          className="flex-1 text-black font-medium py-3 px-4 rounded-lg bg-white border border-black/30 hover:bg-gray-50 hover:border-black/50 hover:shadow-md transform hover:scale-105 transition-all duration-200 font-poppins"
          aria-label="View preview"
        >
          Contenu
        </button>
      </motion.div>
    </motion.div>
  )

  const renderTestimonialsView = () => (
    <motion.div
      key="testimonials"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="relative z-10"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-black mb-6 font-serif">Témoignages</h2>

        <div className="relative mb-6 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-50 to-white border border-gray-200">
          <div className="aspect-[2/3] relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentTestimonialIndex}
                src={testimonialImages[currentTestimonialIndex]}
                alt={`Testimonial ${currentTestimonialIndex + 1}`}
                className="w-full h-full object-cover cursor-grab active:cursor-grabbing"
                initial={{ x: 300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(event, info) => handleDragEnd(event, info, "testimonial")}
              />
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2">
            {testimonialImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonialIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentTestimonialIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => handleSwipe("right", "testimonial")}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/30 transition-colors"
          >
            ←
          </button>
          <button
            onClick={() => handleSwipe("left", "testimonial")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/30 transition-colors"
          >
            →
          </button>
        </div>

        <motion.button
          className="mb-4 invitation-button w-full bg-orange-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAcceptInvitation}
        >
          <span className="button_top flex items-center justify-center gap-2 text-white font-poppins">
            <img
              src="https://em-content.zobj.net/source/apple/118/white-heavy-check-mark_2705.png"
              alt="checkmark"
              className="w-4 h-4"
            />
            <span>Accepter L'invitation</span>
          </span>
        </motion.button>

        <button
          onClick={() => setCurrentView("main")}
          className="text-black/70 hover:text-black transition-colors text-sm font-medium"
        >
          ← Retour
        </button>
      </div>
    </motion.div>
  )

  const renderPreviewView = () => (
    <motion.div
      key="preview"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="relative z-10"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-black mb-6 font-serif">Aperçu</h2>

        <div className="relative mb-6 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-50 to-white border border-gray-200">
          <div className="aspect-[9/16] relative overflow-hidden">
            <AnimatePresence mode="wait">
              {currentImageIndex === 0 ? (
                <motion.div
                  key="youtube-video"
                  className="w-full h-full"
                  initial={{ x: 300 }}
                  animate={{ x: 0 }}
                  exit={{ x: -300 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <iframe
                    src="https://www.youtube.com/embed/JsjatJL0tfc?autoplay=1&mute=1&controls=0&loop=1&playlist=JsjatJL0tfc&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&iv_load_policy=3&fs=0&disablekb=1&start=0"
                    className="w-full h-full object-cover"
                    allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen={false}
                    loading="eager"
                    title="AI Hub Preview Video"
                  />
                </motion.div>
              ) : (
                <motion.img
                  key={currentImageIndex}
                  src={previewImages[currentImageIndex]}
                  alt={`Preview ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover cursor-grab active:cursor-grabbing"
                  initial={{ x: 300 }}
                  animate={{ x: 0 }}
                  exit={{ x: -300 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(event, info) => handleDragEnd(event, info, "preview")}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2">
            {previewImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentImageIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => handleSwipe("right", "preview")}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/30 transition-colors"
          >
            ←
          </button>
          <button
            onClick={() => handleSwipe("left", "preview")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/30 transition-colors"
          >
            →
          </button>
        </div>

        <motion.button
          className="mb-4 invitation-button w-full bg-orange-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAcceptInvitation}
        >
          <span className="button_top flex items-center justify-center gap-2 text-white font-poppins">
            <img
              src="https://em-content.zobj.net/source/apple/118/white-heavy-check-mark_2705.png"
              alt="checkmark"
              className="w-4 h-4"
            />
            <span>Accepter L'invitation</span>
          </span>
        </motion.button>

        <button
          onClick={() => setCurrentView("main")}
          className="text-black/70 hover:text-black transition-colors text-sm font-medium"
        >
          ← Retour
        </button>
      </div>
    </motion.div>
  )

  return (
    <motion.div
      ref={cardRef}
      className="relative max-w-md w-full overflow-hidden"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={shouldAnimate ? { y: -4, scale: 1.02 } : {}}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative border border-border rounded-2xl shadow-2xl p-4 sm:p-8 min-h-[350px] sm:min-h-[400px] overflow-hidden bg-white/90 backdrop-blur-sm">
        <motion.div
          className="absolute top-6 right-6 w-4 h-4 bg-orange-200/30 rounded-full"
          animate={shouldAnimate ? { y: [0, -8, 0] } : {}}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-16 right-12 w-3 h-3 bg-orange-100/20 rounded-full"
          animate={shouldAnimate ? { y: [0, -6, 0] } : {}}
          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
        />

        <AnimatePresence mode="wait">
          {currentView === "main" && renderMainView()}
          {currentView === "testimonials" && renderTestimonialsView()}
          {currentView === "preview" && renderPreviewView()}
        </AnimatePresence>

        <div className="absolute bottom-8 right-8 w-16 h-0.5 bg-gradient-to-r from-orange-200/40 to-orange-100/20" />
      </div>
    </motion.div>
  )
}
