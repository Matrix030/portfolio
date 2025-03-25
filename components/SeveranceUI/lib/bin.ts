export class Bin {
  w: number
  i: number
  x: number
  y: number
  goal: number
  levelGoal: number
  levelsYOffset: number
  lastRefinedTime: number
  levels: { [key: string]: number }
  count: number
  showLevels: boolean
  lidAngle: number
  p: any
  g: any
  buffer: number
  palette: any
  keys: string[] = ["WO", "FC", "DR", "MA"]
  maxLidAngle = 45
  closedLidAngle = 180
  maxShowTime = 1000
  lidOpenCloseTime = 1500
  isHovered = false

  constructor(
    w: number,
    i: number,
    goal: number,
    levels: { [key: string]: number } | undefined,
    p: any,
    g: any,
    buffer: number,
    palette: any,
  ) {
    this.p = p
    this.g = g
    this.buffer = buffer
    this.palette = palette

    this.w = w
    this.i = i
    this.x = i * w + w * 0.5
    this.y = g.height - buffer * 0.75

    this.goal = goal
    this.levelGoal = this.goal / 4

    this.levelsYOffset = buffer * 1.7
    this.lastRefinedTime = p.millis()

    // if levels is undefined, assign empty levels
    this.levels = levels ?? {
      WO: 0,
      FC: 0,
      DR: 0,
      MA: 0,
    }

    // sum the levels to get current count
    this.count = Object.values(this.levels).reduce((prev, curr) => prev + curr, 0)

    this.showLevels = false
    this.lidAngle = this.closedLidAngle
  }

  addNumber() {
    const options: string[] = []
    for (const key of this.keys) {
      if (this.levels[key] < this.levelGoal) {
        options.push(key)
      }
    }

    if (options.length === 0) return // All categories are full

    const key = options[Math.floor(this.p.random(0, options.length))]
    this.levels[key]++

    this.showLevels = true

    // Animate the lid opening
    this.lidAngle = this.maxLidAngle

    // Update the count
    this.count = Object.values(this.levels).reduce((prev, curr) => prev + curr, 0)
  }

  open() {
    this.showLevels = true
    // Gradually open the lid
    this.lidAngle = this.p.lerp(this.lidAngle, this.maxLidAngle, 0.2)
  }

  show() {
    // Update count
    this.count = Object.values(this.levels).reduce((prev, curr) => prev + curr, 0)
    this.count = this.p.constrain(this.count, 0, this.goal)

    // Calculate percentage
    const perc = this.count / this.goal

    // Check if mouse is hovering over this bin
    this.isHovered =
      this.p.mouseX > this.x - this.w * 0.4 &&
      this.p.mouseX < this.x + this.w * 0.4 &&
      this.p.mouseY > this.y - this.buffer * 0.2 &&
      this.p.mouseY < this.y + this.buffer * 0.2

    // Draw bin container
    this.g.rectMode(this.p.CENTER)
    const rw = this.w - this.w * 0.25

    this.g.stroke(this.palette.FG)
    this.g.strokeWeight(1)
    this.g.fill(this.isHovered ? this.palette.SELECT : this.palette.BG)
    this.g.rect(this.x, this.y, rw, this.buffer * 0.25)

    // Draw progress bar
    this.g.noStroke()
    this.g.fill(this.palette.FG)
    this.g.rectMode(this.p.CORNER)
    const h = this.buffer * 0.25
    const progressW = rw * perc
    this.g.rect(this.x - rw * 0.5, this.y - h * 0.5, progressW, h)

    // Draw bin number
    this.g.textAlign(this.p.CENTER, this.p.CENTER)
    this.g.textSize(14)
    this.g.fill(this.palette.BG)
    this.g.text(this.p.nf(this.i, 2, 0), this.x, this.y)

    // Draw percentage
    this.g.textAlign(this.p.CENTER, this.p.BOTTOM)
    this.g.fill(this.palette.FG)
    this.g.noStroke()
    this.g.text(`${Math.floor(perc * 100)}%`, this.x, this.y - h)

    // If the bin is recently active, show the levels
    const timeSinceLastRefined = this.p.millis() - this.lastRefinedTime
    if (timeSinceLastRefined < this.maxShowTime || this.isHovered) {
      this.showLevels = true
    } else {
      this.showLevels = false
    }

    // Draw the levels if showing
    if (this.showLevels) {
      // Draw a lid
      this.g.push()
      this.g.translate(this.x, this.y - h * 0.5)
      this.g.stroke(this.palette.FG)
      this.g.strokeWeight(1)
      this.g.fill(this.palette.BG)
      this.g.rotate(this.p.radians(this.lidAngle))
      this.g.rect(0, -h * 0.25, rw, h * 0.5)
      this.g.pop()

      // Draw the level bars
      const levelY = this.y - this.buffer * 0.5
      const levelH = this.buffer * 0.1
      const levelW = rw * 0.8

      for (let i = 0; i < this.keys.length; i++) {
        const key = this.keys[i]
        const levelPerc = this.levels[key] / this.levelGoal

        // Draw level background
        this.g.rectMode(this.p.CENTER)
        this.g.stroke(this.palette.FG)
        this.g.fill(this.palette.BG)
        this.g.rect(this.x, levelY - i * levelH * 1.5, levelW, levelH)

        // Draw level progress
        this.g.rectMode(this.p.CORNER)
        this.g.noStroke()
        this.g.fill(this.palette.LEVELS[key])
        this.g.rect(this.x - levelW * 0.5, levelY - i * levelH * 1.5 - levelH * 0.5, levelW * levelPerc, levelH)

        // Draw level label
        this.g.textAlign(this.p.LEFT, this.p.CENTER)
        this.g.textSize(10)
        this.g.fill(this.palette.FG)
        this.g.text(key, this.x - levelW * 0.5 + 5, levelY - i * levelH * 1.5)

        // Draw level count
        this.g.textAlign(this.p.RIGHT, this.p.CENTER)
        this.g.text(
          `${this.levels[key]}/${Math.floor(this.levelGoal)}`,
          this.x + levelW * 0.5 - 5,
          levelY - i * levelH * 1.5,
        )
      }
    } else {
      // Gradually close the lid
      this.lidAngle = this.p.lerp(this.lidAngle, this.closedLidAngle, 0.1)
    }
  }

  resize(newWidth: number) {
    this.w = newWidth
    this.x = this.i * this.w + this.w * 0.5
  }
}

