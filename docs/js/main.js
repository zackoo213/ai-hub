// Global state
let currentView = "main"
let currentTestimonialIndex = 0
let currentPreviewIndex = 0
let testimonialInterval

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  initializeCarousels()
  startTestimonialAutoplay()
})

// View management
function showView(viewName) {
  // Hide all views
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.remove("active")
  })

  // Show selected view
  document.getElementById(viewName + "-view").classList.add("active")
  currentView = viewName

  // Start/stop testimonial autoplay
  if (viewName === "testimonials") {
    startTestimonialAutoplay()
  } else {
    stopTestimonialAutoplay()
  }
}

// WhatsApp integration
function acceptInvitation() {
  const message = encodeURIComponent("je souhaite accéder au AI Hub")
  const whatsappUrl = `https://wa.me/213559079070?text=${message}`
  window.open(whatsappUrl, "_blank")
}

// Carousel functionality
function initializeCarousels() {
  createDots("testimonials", 5)
  createDots("preview", 9)
}

function createDots(type, count) {
  const dotsContainer = document.getElementById(type + "-dots")
  dotsContainer.innerHTML = ""

  for (let i = 0; i < count; i++) {
    const dot = document.createElement("div")
    dot.className = "dot" + (i === 0 ? " active" : "")
    dot.onclick = () => goToSlide(type, i)
    dotsContainer.appendChild(dot)
  }
}

function goToSlide(type, index) {
  if (type === "testimonials") {
    currentTestimonialIndex = index
    updateTestimonialCarousel()
  } else {
    currentPreviewIndex = index
    updatePreviewCarousel()
  }
}

function updateTestimonialCarousel() {
  const items = document.querySelectorAll("#testimonials-carousel .carousel-item")
  const dots = document.querySelectorAll("#testimonials-dots .dot")

  items.forEach((item, index) => {
    item.classList.toggle("active", index === currentTestimonialIndex)
  })

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentTestimonialIndex)
  })
}

function updatePreviewCarousel() {
  const items = document.querySelectorAll("#preview-carousel .carousel-item")
  const dots = document.querySelectorAll("#preview-dots .dot")

  items.forEach((item, index) => {
    item.classList.toggle("active", index === currentPreviewIndex)
  })

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentPreviewIndex)
  })
}

function nextTestimonial() {
  currentTestimonialIndex = (currentTestimonialIndex + 1) % 5
  updateTestimonialCarousel()
}

function previousTestimonial() {
  currentTestimonialIndex = (currentTestimonialIndex - 1 + 5) % 5
  updateTestimonialCarousel()
}

function nextPreview() {
  currentPreviewIndex = (currentPreviewIndex + 1) % 9
  updatePreviewCarousel()
}

function previousPreview() {
  currentPreviewIndex = (currentPreviewIndex - 1 + 9) % 9
  updatePreviewCarousel()
}

function startTestimonialAutoplay() {
  stopTestimonialAutoplay()
  testimonialInterval = setInterval(nextTestimonial, 3000)
}

function stopTestimonialAutoplay() {
  if (testimonialInterval) {
    clearInterval(testimonialInterval)
    testimonialInterval = null
  }
}

// Touch/swipe support
let startX = 0
let startY = 0

document.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX
  startY = e.touches[0].clientY
})

document.addEventListener("touchend", (e) => {
  if (!startX || !startY) return

  const endX = e.changedTouches[0].clientX
  const endY = e.changedTouches[0].clientY

  const diffX = startX - endX
  const diffY = startY - endY

  // Only handle horizontal swipes
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
    const target = e.target.closest(".carousel-container")
    if (!target) return

    if (target.querySelector("#testimonials-carousel")) {
      if (diffX > 0) {
        nextTestimonial()
      } else {
        previousTestimonial()
      }
    } else if (target.querySelector("#preview-carousel")) {
      if (diffX > 0) {
        nextPreview()
      } else {
        previousPreview()
      }
    }
  }

  startX = 0
  startY = 0
})
