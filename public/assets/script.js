function addPulseAnimation() {
  const ctaBtn = document.querySelector(".cta-btn")
  ctaBtn.addEventListener("mouseenter", () => {
    ctaBtn.style.animation = "pulse 0.5s ease-in-out"
  })
  ctaBtn.addEventListener("animationend", () => {
    ctaBtn.style.animation = ""
  })
}

function addFloatingEffect() {
  const heroImage = document.querySelector(".hero-image")
  if (heroImage) {
    heroImage.style.animation = "float 6s ease-in-out infinite"
  }
}

function addParallaxEffect() {
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY
    const parallaxElements = document.querySelectorAll(".parallax")
    parallaxElements.forEach((el) => {
      const speed = el.dataset.speed || 0.5
      el.style.transform = `translateY(${scrolled * speed}px)`
    })
  })
}

function setupHamburgerMenu() {
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")
  
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navLinks.classList.toggle("active")
      document.body.classList.toggle("menu-open")
    })
    
    // Close menu when clicking a link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navLinks.classList.remove("active")
        document.body.classList.remove("menu-open")
      })
    })
    
    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains("active")) {
        hamburger.classList.remove("active")
        navLinks.classList.remove("active")
        document.body.classList.remove("menu-open")
      }
    })
  }
}

document.addEventListener("DOMContentLoaded", () => {
  addPulseAnimation()
  addFloatingEffect()
  addParallaxEffect()
  setupHamburgerMenu()

  // Collaborators slider
  const dots = document.querySelectorAll(".slider-dots .dot")
  const logos = document.querySelectorAll(".collaborator-logos > div")
  let currentSlide = 0

  function showSlide(index) {
    logos.forEach((logo, i) => {
      logo.style.opacity = i === index ? "1" : "0.5"
      logo.style.transform = i === index ? "scale(1.1)" : "scale(1)"
    })
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index)
    })
  }

  if (dots.length > 0 && logos.length > 0) {
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentSlide = index
        showSlide(currentSlide)
      })
    })

    // Auto-advance slides every 5 seconds
    setInterval(() => {
      currentSlide = (currentSlide + 1) % logos.length
      showSlide(currentSlide)
    }, 5000)
  }

  // Newsletter form submission
  const newsletterForm = document.querySelector(".newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const email = this.querySelector('input[type="email"]').value
      if (email) {
        alert("Thank you for subscribing!")
        this.reset()
      }
    })
  }

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Intersection Observer for fade-in animations
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  document.querySelectorAll(".mission, .step, .collaborators, .footer-content").forEach((el) => {
    observer.observe(el)
  })

  // Responsive image loading
  function handleResponsiveImages() {
    const images = document.querySelectorAll("img")
    images.forEach((img) => {
      if (!img.complete) {
        img.style.opacity = "0"
        img.addEventListener("load", () => {
          img.style.opacity = "1"
          img.style.transition = "opacity 0.3s ease-in-out"
        })
      }
    })
  }

  handleResponsiveImages()
})