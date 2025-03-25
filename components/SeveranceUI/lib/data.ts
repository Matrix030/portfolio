import type { Bin } from "./bin"

export class Data {
  num: number
  homeX: number
  homeY: number
  x: number
  y: number
  color: string
  alpha: number
  sz: number
  refined: boolean
  binIt: boolean
  bin: Bin | undefined
  binPauseTime: number
  binPause: number
  p: any
  velocity: { x: number; y: number }

  constructor(x: number, y: number, p: any) {
    this.p = p
    this.num = Math.floor(p.random(10))
    this.homeX = x
    this.homeY = y
    this.x = x
    this.y = y
    this.color = "#ABFFE9" // Default foreground color
    this.alpha = 255
    this.sz = 10 // Will be updated by the sketch
    this.refined = false
    this.binIt = false
    this.bin = undefined
    this.binPauseTime = 8
    this.binPause = this.binPauseTime
    this.velocity = { x: 0, y: 0 }
  }

  refine(bin: Bin) {
    this.binIt = true
    this.bin = bin
    // Add a small initial velocity for more natural movement
    this.velocity = {
      x: this.p.random(-0.5, 0.5),
      y: this.p.random(-1, -0.5),
    }
  }

  goBin() {
    // This is a band-aid
    if (this.bin) {
      this.bin.open()
      if (this.binPause <= 0) {
        const dx = this.bin.x - this.x
        const dy = this.bin.y - this.y

        // Apply some physics for more natural movement
        const easing = this.p.map(Math.abs(dy), this.bin.y, 0, 0.02, 0.1)

        // Add slight randomness to movement
        this.velocity.x = this.p.lerp(this.velocity.x, dx * easing, 0.1) + this.p.random(-0.3, 0.3)
        this.velocity.y = this.p.lerp(this.velocity.y, Math.max(dy * easing, -20), 0.1) + this.p.random(-0.2, 0.2)

        this.x += this.velocity.x
        this.y += this.velocity.y

        this.alpha = this.p.map(this.y, this.homeY, this.bin.y, 255, 5)
        this.bin.lastRefinedTime = this.p.millis()
      } else {
        this.binPause--
        // Add slight hovering effect while waiting
        this.x += this.p.random(-0.5, 0.5)
        this.y += this.p.random(-0.5, 0.5)
      }

      if (this.p.dist(this.x, this.y, this.bin.x, this.bin.y) < 2) {
        this.bin.addNumber()
        this.num = Math.floor(this.p.random(10))
        this.x = this.homeX
        this.y = this.homeY
        this.refined = false
        this.binIt = false
        this.bin = undefined
        this.color = "#ABFFE9" // Default foreground color
        this.alpha = 255
        this.binPause = this.binPauseTime
        this.velocity = { x: 0, y: 0 }
      }
    }
  }

  goHome() {
    // Add slight inertia for more natural movement
    const dx = this.homeX - this.x
    const dy = this.homeY - this.y

    this.velocity.x = this.p.lerp(this.velocity.x, dx * 0.1, 0.1)
    this.velocity.y = this.p.lerp(this.velocity.y, dy * 0.1, 0.1)

    this.x += this.velocity.x
    this.y += this.velocity.y

    // Dampen velocity over time
    this.velocity.x *= 0.95
    this.velocity.y *= 0.95

    this.sz = this.p.lerp(this.sz, 10, 0.1) // Default size will be updated by sketch
  }

  size(sz: number) {
    this.sz = sz
  }

  turn(newColor: string) {
    this.color = newColor

    // If the number is selected and it's bigger than base size, mark it as refined
    if (newColor === this.p.color("#EEFFFF") && this.sz > 10) {
      this.refined = true
    } else {
      this.refined = false
    }
  }

  inside(x1: number, y1: number, x2: number, y2: number) {
    return (
      this.x > Math.min(x1, x2) && this.x < Math.max(x1, x2) && this.y > Math.min(y1, y2) && this.y < Math.max(y1, y2)
    )
  }

  show(g: any) {
    // Ensure the number is visible
    g.textAlign(this.p.CENTER, this.p.CENTER)
    g.textFont("Courier")
    g.textSize(this.sz)
    g.noStroke()

    // Set color with alpha
    const col = this.p.color(this.color)
    col.setAlpha(this.alpha)
    g.fill(col)

    // Draw the number
    g.text(this.num, this.x, this.y)
  }

  resize(newX: number, newY: number) {
    this.homeX = newX
    this.homeY = newY
  }
}

