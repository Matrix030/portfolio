// Utility functions for the Severance UI component

// Detect touch screen device
export const isTouchScreenDevice = (): boolean => {
  if (typeof window === "undefined") return false

  let hasTouchScreen = false
  if ("maxTouchPoints" in navigator) {
    hasTouchScreen = navigator.maxTouchPoints > 0
  } else if ("msMaxTouchPoints" in navigator) {
    hasTouchScreen = (navigator as any).msMaxTouchPoints > 0
  } else {
    const mQ = window.matchMedia && matchMedia("(pointer:coarse)")
    if (mQ && mQ.media === "(pointer:coarse)") {
      hasTouchScreen = !!mQ.matches
    } else if ("orientation" in window) {
      hasTouchScreen = true // deprecated, but good fallback
    } else {
      // Only as a last resort, fall back to user agent sniffing
      const UA = navigator.userAgent
      hasTouchScreen =
        /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) || /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
    }
  }
  return hasTouchScreen
}

// Format time string
export const createTimeString = (seconds: number): string => {
  const baseString = new Date(seconds * 1000).toISOString().substring(11, 23)
  const hhmm = baseString.split(":")
  const ssms = hhmm[2].split(".")
  return `${hhmm[0]}h ${hhmm[1]}m ${ssms[0]}s ${ssms[1]}ms`
}

// Create a Lumon logo
export const createLumonLogo = (p: any): any => {
  const img = p.createImage(50, 50)
  img.loadPixels()

  // Fill with background color
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      // Create a circular logo
      const d = p.dist(i, j, img.width / 2, img.height / 2)
      if (d < img.width / 2 - 2 && d > img.width / 2 - 5) {
        img.set(i, j, p.color(171, 255, 233)) // #ABFFE9
      } else {
        img.set(i, j, p.color(1, 10, 19, 0)) // Transparent
      }
    }
  }

  img.updatePixels()
  return img
}

// Create placeholder image
export const createPlaceholderImage = (p: any, text: string): any => {
  const img = p.createImage(200, 100)
  img.loadPixels()

  // Fill with background color
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      img.set(i, j, p.color(1, 10, 19)) // #010A13
    }
  }

  img.updatePixels()
  return img
}

// Create a ripple effect animation
export const createRippleEffect = (p: any, x: number, y: number, color: string, duration = 30) => {
  const ripples: any[] = []

  // Create multiple ripples
  for (let i = 0; i < 3; i++) {
    ripples.push({
      x,
      y,
      radius: 5,
      maxRadius: 50 + i * 20,
      alpha: 255,
      delay: i * 5,
      color,
    })
  }

  // Return a function that updates and draws the ripples
  return (g: any) => {
    let stillActive = false

    for (const ripple of ripples) {
      if (ripple.delay > 0) {
        ripple.delay--
        stillActive = true
        continue
      }

      if (ripple.radius < ripple.maxRadius) {
        ripple.radius += (ripple.maxRadius - ripple.radius) * 0.1
        ripple.alpha = p.map(ripple.radius, 0, ripple.maxRadius, 255, 0)

        g.noFill()
        const c = p.color(ripple.color)
        c.setAlpha(ripple.alpha)
        g.stroke(c)
        g.strokeWeight(2)
        g.circle(ripple.x, ripple.y, ripple.radius * 2)

        stillActive = true
      }
    }

    return stillActive
  }
}

