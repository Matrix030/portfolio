"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import p5 from "p5"
import { Bin } from "./lib/bin"
import { Data } from "./lib/data"
import { MacrodataFile } from "./lib/macrodata"
import { OpenSimplexNoise } from "./lib/osn"
import { createLumonLogo, createPlaceholderImage } from "./lib/utils"

interface P5WrapperProps {
  onComplete?: (time: number) => void
}

const P5Wrapper: React.FC<P5WrapperProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sketchRef = useRef<p5>()
  const instanceRef = useRef<{
    osn: any
    goal: number
    refined: Bin[]
    numbers: Data[]
    r: number
    baseSize: number
    buffer: number
    cols: number
    rows: number
    refining: boolean
    refineTX: number
    refineTY: number
    refineBX: number
    refineBY: number
    lumon: p5.Image
    startTime: number
    secondsSpentRefining: number
    lastRefiningTimeStored: number
    emojis: string[]
    nope: boolean
    nopeImg: p5.Image
    nopeTime: number
    mdeGIF: p5.Image[]
    mde: boolean
    mdeDone: boolean
    mdeTime: number
    completed: boolean
    completedImg: p5.Image
    completedTime: number
    shared: boolean
    sharedImg: p5.Image
    sharedTime: number
    shareDiv: any
    g: p5.Graphics
    useShader: boolean
    palette: any
    macrodataFile: MacrodataFile
    zoff: number
    smaller: number
    prevPercent: number
    rippleEffect: any
    _refreshClicked: boolean
  }>({
    osn: null,
    goal: 500,
    refined: [],
    numbers: [],
    r: 0,
    baseSize: 0,
    buffer: 100,
    cols: 0,
    rows: 0,
    refining: false,
    refineTX: 0,
    refineTY: 0,
    refineBX: 0,
    refineBY: 0,
    lumon: null as unknown as p5.Image,
    startTime: 0,
    secondsSpentRefining: 0,
    lastRefiningTimeStored: 0,
    emojis: ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"],
    nope: false,
    nopeImg: null as unknown as p5.Image,
    nopeTime: 0,
    mdeGIF: [],
    mde: false,
    mdeDone: false,
    mdeTime: 0,
    completed: false,
    completedImg: null as unknown as p5.Image,
    completedTime: 0,
    shared: false,
    sharedImg: null as unknown as p5.Image,
    sharedTime: 0,
    shareDiv: null,
    g: null as unknown as p5.Graphics,
    useShader: false,
    palette: {
      BG: "#010A13",
      FG: "#ABFFE9",
      SELECT: "#EEFFFF",
      LEVELS: {
        WO: "#05C3A8",
        FC: "#1EEFFF",
        DR: "#DF81D5",
        MA: "#F9ECBB",
      },
    },
    macrodataFile: null as unknown as MacrodataFile,
    zoff: 0,
    smaller: 0,
    prevPercent: 0,
    rippleEffect: null as any,
    _refreshClicked: false,
  })

  useEffect(() => {
    if (!containerRef.current) return

    const sketch = (p: p5) => {
      const instance = instanceRef.current

      p.preload = () => {
        // Create a simple Lumon logo
        instance.lumon = createLumonLogo(p)

        // Create placeholder images for game states
        instance.nopeImg = createPlaceholderImage(p, "NOPE")
        instance.completedImg = createPlaceholderImage(p, "100%")
        instance.sharedImg = createPlaceholderImage(p, "SHARED")
        instance.mdeGIF[0] = createPlaceholderImage(p, "MDE")
      }

      p.setup = () => {
        const canvas = p.createCanvas(containerRef.current!.clientWidth, containerRef.current!.clientHeight)
        canvas.parent(containerRef.current!)
        p.frameRate(30)

        // create a graphics buffer to draw to
        instance.g = p.createGraphics(p.width, p.height)

        // Disable shader entirely (simplify for now)
        instance.useShader = false
        instance.palette = {
          BG: "#010A13",
          FG: "#ABFFE9",
          SELECT: "#EEFFFF",
          LEVELS: {
            WO: "#05C3A8",
            FC: "#1EEFFF",
            DR: "#DF81D5",
            MA: "#F9ECBB",
          },
        }

        // force pixel density to 1 to improve perf on retina screens
        p.pixelDensity(1)

        instance.smaller = Math.min(instance.g.width, instance.g.height)

        // Create a simple OpenSimplexNoise implementation if the real one fails
        try {
          instance.osn = new OpenSimplexNoise(Math.random())
        } catch (error) {
          console.error("Could not initialize OpenSimplexNoise, using fallback", error)
          // Create a fallback noise function
          instance.osn = {
            noise3D: (x: number, y: number, z: number) => {
              return (Math.sin(x * 10 + y * 5 + z * 2) + 1) * 0.5 // Simple noise fallback
            },
          }
        }

        // Setup the file, this handles all storage things
        instance.macrodataFile = new MacrodataFile()
        instance.secondsSpentRefining = p.getItem("secondsSpentRefining") ?? 0

        // Create simple div for sharing
        instance.shareDiv = p.createDiv("")
        instance.shareDiv.hide()
        instance.shareDiv.position(p.windowWidth / 2 - 100, p.windowHeight / 2 - 100)
        instance.shareDiv.style("width", "200px")
        instance.shareDiv.style("height", "200px")
        instance.shareDiv.mousePressed(() => {
          console.log("Share clicked!")
          instance.shared = true
        })

        startOver(p, false)
      }

      p.mousePressed = () => {
        const instance = instanceRef.current
        // This is the worst if statement in the history of if statements
        if (!instance.refining && !instance.mde && !instance.completed && !instance.shared) {
          instance.refineTX = p.mouseX
          instance.refineTY = p.mouseY
          instance.refineBX = p.mouseX
          instance.refineBY = p.mouseY
          instance.refining = true
          instance.nope = false
        }
      }

      p.mouseDragged = () => {
        const instance = instanceRef.current
        instance.refineBX = p.mouseX
        instance.refineBY = p.mouseY
      }

      p.mouseReleased = () => {
        const instance = instanceRef.current
        instance.refining = false
        let countRed = 0
        let total = 0
        let refinery: Data[] = []

        for (const num of instance.numbers) {
          if (num.inside(instance.refineTX, instance.refineTY, instance.refineBX, instance.refineBY)) {
            // Only count numbers that are bigger than baseSize (the refined ones)
            if (num.refined && num.sz > instance.baseSize) {
              refinery.push(num)
              countRed++
            }
            total++
          }
          num.turn(instance.palette.FG)
          num.refined = false
        }

        // Half of numbers must be refinable
        if (countRed > 0 && total > 0) {
          const options = []
          for (const bin of instance.refined) {
            if (bin.count < bin.goal) {
              options.push(bin)
            }
          }

          if (options.length > 0) {
            const bin = options[Math.floor(p.random(0, options.length))]
            for (const num of refinery) {
              num.refine(bin)
            }
          }
        } else {
          refinery = []
          // 2nd worst if statement in the history of time
          if (!instance.completed && !instance.shared) {
            instance.nope = true
          }
          instance.nopeTime = p.millis()
        }
      }

      p.draw = () => {
        const instance = instanceRef.current

        // Clear the background on both canvases
        p.background(instance.palette.BG)
        instance.g.background(instance.palette.BG)

        // Calculate the percentage complete
        let sum = 0
        for (const bin of instance.refined) {
          sum += bin.count
        }
        const percent = sum / instance.goal

        if (percent !== instance.prevPercent) {
          const bins = instance.refined.map((bin) => bin.levels)
          instance.macrodataFile.updateProgress(bins)
          instance.prevPercent = percent
        }

        // Handle completion state
        if (percent >= 1.0 && !instance.completed && !instance.shared) {
          instance.completedTime = p.millis() - instance.startTime
          instance.completed = true
          instance.shareDiv.show()
          console.log("completed!")

          // Call the onComplete callback if provided
          if (onComplete) {
            onComplete(instance.completedTime)
          }
        }

        // Draw main elements
        drawTop(p, percent)
        drawNumbers(p)
        drawBottom(p)
        drawBinned(p)

        // Draw refinement box
        if (instance.refining) {
          instance.g.push()
          instance.g.rectMode(p.CORNERS)
          instance.g.stroke(instance.palette.SELECT)
          instance.g.strokeWeight(2)
          instance.g.noFill()
          instance.g.rect(instance.refineTX, instance.refineTY, instance.refineBX, instance.refineBY)

          for (const num of instance.numbers) {
            if (num.inside(instance.refineTX, instance.refineTY, instance.refineBX, instance.refineBY)) {
              // Only highlight numbers that are bigger than baseSize * 1.2
              if (num.sz > instance.baseSize * 1.2) {
                num.turn(instance.palette.SELECT)
                num.refined = true
              } else {
                num.turn(instance.palette.FG)
                num.refined = false
              }
            } else {
              num.turn(instance.palette.FG)
              num.refined = false
            }
          }
          instance.g.pop()
        }

        // Draw the ripple effect if active
        if (instance.rippleEffect) {
          const stillActive = instance.rippleEffect(instance.g)
          if (!stillActive) {
            instance.rippleEffect = null
          }
        }

        // Draw the custom cursor
        drawCursor(p, p.mouseX, p.mouseY)

        // Copy the graphics buffer to the main canvas
        p.image(instance.g, 0, 0, p.width, p.height)

        // Track time spent
        if (p.focused) {
          instance.secondsSpentRefining += p.deltaTime / 1000
          const roundedTime = Math.round(instance.secondsSpentRefining)
          if (roundedTime % 5 == 0 && roundedTime != instance.lastRefiningTimeStored) {
            p.storeItem("secondsSpentRefining", instance.secondsSpentRefining)
            instance.lastRefiningTimeStored = roundedTime
          }
        }
      }

      p.windowResized = () => {
        if (!containerRef.current) return

        p.resizeCanvas(containerRef.current.clientWidth, containerRef.current.clientHeight)
        instance.g.resizeCanvas(p.width, p.height)

        instance.smaller = Math.min(instance.g.width, instance.g.height)

        // Resize the bins
        instance.refined.forEach((bin) => bin.resize(instance.g.width / instance.refined.length))

        instance.r = (instance.smaller - instance.buffer * 2) / 10
        instance.baseSize = instance.r * 0.33

        instance.cols = Math.floor(instance.g.width / instance.r)
        instance.rows = Math.floor((instance.g.height - instance.buffer * 2) / instance.r)
        const wBuffer = instance.g.width - instance.cols * instance.r

        for (let j = 0; j < instance.rows; j++) {
          for (let i = 0; i < instance.cols; i++) {
            const x = i * instance.r + instance.r * 0.5 + wBuffer * 0.5
            const y = j * instance.r + instance.r * 0.5 + instance.buffer
            const numToUpdate = instance.numbers[i + j * instance.cols]
            if (numToUpdate) numToUpdate.resize(x, y)
          }
        }
      }

      // Helper functions
      function startOver(p: p5, resetFile = false) {
        const instance = instanceRef.current

        // Create a ripple effect at the refresh button location
        if (resetFile) {
          instance.rippleEffect = createRippleEffect(p, instance.g.width - 30, 25, instance.palette.FG)

          // Force reset the macrodata file
          instance.macrodataFile.resetFile()
          p.storeItem("secondsSpentRefining", 0)
          instance.secondsSpentRefining = 0
          instance.lastRefiningTimeStored = 0

          // Reset completion state
          instance.completed = false
          instance.shared = false
          instance.shareDiv.hide()
        }

        // Track the amount of time
        instance.startTime = p.millis()

        // Create the space
        instance.r = (instance.smaller - instance.buffer * 2) / 10
        instance.baseSize = instance.r * 0.33
        instance.osn = new OpenSimplexNoise(Math.floor(Math.random() * 1000))
        instance.cols = Math.floor(instance.g.width / instance.r)
        instance.rows = Math.floor((instance.g.height - instance.buffer * 2) / instance.r)

        // Recreate all numbers
        instance.numbers = []
        const wBuffer = instance.g.width - instance.cols * instance.r
        for (let j = 0; j < instance.rows; j++) {
          for (let i = 0; i < instance.cols; i++) {
            const x = i * instance.r + instance.r * 0.5 + wBuffer * 0.5
            const y = j * instance.r + instance.r * 0.5 + instance.buffer
            // Initialize the number objects
            instance.numbers[i + j * instance.cols] = new Data(x, y, p)
          }
        }

        // Refinement bins - always recreate them
        instance.refined = []
        for (let i = 0; i < 5; i++) {
          const w = instance.g.width / 5
          
          // Always initialize bins at 90% full regardless of stored state
          const levelGoal = instance.goal / 5 / 4; // Each bin has 4 categories
          const percentage = 0.9; // 90%
          const binLevels = {
            WO: Math.floor(levelGoal * percentage),
            FC: Math.floor(levelGoal * percentage),
            DR: Math.floor(levelGoal * percentage),
            MA: Math.floor(levelGoal * percentage)
          };

          instance.refined[i] = new Bin(
            w,
            i,
            instance.goal / 5,
            binLevels,
            p,
            instance.g,
            instance.buffer,
            instance.palette,
          )
        }

        instance.mde = false
        instance.mdeDone = false
        instance.mdeTime = 0
        instance.nopeTime = 0
        instance.nope = false

        // Force update the prevPercent to trigger a redraw
        instance.prevPercent = -1
      }

      function drawTop(p: p5, percent: number) {
        const instance = instanceRef.current

        // Draw the top bar
        instance.g.rectMode(p.CORNER)
        instance.g.stroke(instance.palette.FG)
        instance.g.strokeWeight(2)
        instance.g.fill(instance.palette.BG)
        instance.g.rect(0, 0, instance.g.width, 50)

        // Draw the progress bar
        instance.g.noStroke()
        instance.g.fill(instance.palette.FG)
        const progressWidth = instance.g.width * percent
        instance.g.rect(0, 0, progressWidth, 50)

        // Draw the text
        instance.g.textAlign(p.LEFT, p.CENTER)
        instance.g.textFont("Courier")
        instance.g.textSize(24)
        instance.g.fill(instance.palette.BG)
        instance.g.stroke(instance.palette.FG)
        instance.g.strokeWeight(1)

        // Draw file name
        if (instance.macrodataFile) {
          instance.g.text(instance.macrodataFile.fileName, 20, 25)
        }

        // Draw completion percentage
        instance.g.textAlign(p.RIGHT, p.CENTER)
        instance.g.text(`${Math.floor(percent * 100)}% Complete`, instance.g.width - 80, 25)

        // Draw refresh button
        const refreshBtnX = instance.g.width - 30
        const refreshBtnY = 25
        const refreshBtnWidth = 40
        const refreshBtnHeight = 30

        // Check if mouse is over the refresh button
        const isOverRefreshBtn =
          p.mouseX > refreshBtnX - refreshBtnWidth / 2 &&
          p.mouseX < refreshBtnX + refreshBtnWidth / 2 &&
          p.mouseY > refreshBtnY - refreshBtnHeight / 2 &&
          p.mouseY < refreshBtnY + refreshBtnHeight / 2

        // Highlight button if hovered
        instance.g.rectMode(p.CENTER)
        instance.g.stroke(instance.palette.FG)
        instance.g.fill(isOverRefreshBtn ? instance.palette.SELECT : instance.palette.BG)
        instance.g.rect(refreshBtnX, refreshBtnY, refreshBtnWidth, refreshBtnHeight)

        instance.g.noStroke()
        instance.g.fill(isOverRefreshBtn ? instance.palette.BG : instance.palette.FG)
        instance.g.textSize(16)
        instance.g.text("↻", refreshBtnX, refreshBtnY)

        // Handle refresh button click
        if (p.mouseIsPressed && isOverRefreshBtn && !instance._refreshClicked) {
          instance._refreshClicked = true
          startOver(p, true)
        } else if (!p.mouseIsPressed) {
          instance._refreshClicked = false
        }
      }

      function drawNumbers(p: p5) {
        const instance = instanceRef.current

        // Draw horizontal lines
        instance.g.rectMode(p.CENTER)
        instance.g.stroke(instance.palette.FG)
        instance.g.strokeWeight(1)
        instance.g.line(0, instance.buffer, instance.g.width, instance.buffer)
        instance.g.line(0, instance.g.height - instance.buffer, instance.g.width, instance.g.height - instance.buffer)

        // Set text properties
        instance.g.textAlign(p.CENTER, p.CENTER)
        instance.g.textSize(instance.baseSize)
        instance.g.textFont("Courier")
        instance.g.fill(instance.palette.FG)
        instance.g.noStroke()

        // Draw all numbers
        for (let i = 0; i < instance.cols; i++) {
          for (let j = 0; j < instance.rows; j++) {
            const num = instance.numbers[i + j * instance.cols]
            if (!num) continue

            if (num.binIt) {
              num.goBin()
              num.show(instance.g)
              continue
            }

            // Add slight movement
            if (p.frameCount % 5 === 0) {
              num.x += p.random(-1, 1)
              num.y += p.random(-1, 1)
            } else {
              num.goHome()
            }

            // Slightly vary sizes for visual interest
            let sizeVariation
            try {
              // Use noise to determine which numbers are bigger (refinable)
              sizeVariation = instance.osn.noise3D(i * 0.1, j * 0.1, p.frameCount * 0.01)

              // Make about 30% of numbers bigger (refinable)
              if (sizeVariation > 0.7) {
                sizeVariation = 0.7 + (sizeVariation - 0.7) * 2 // Amplify the difference
              } else {
                sizeVariation = 0.3 + sizeVariation * 0.4 // Keep smaller
              }
            } catch (e) {
              sizeVariation = p.random(-0.5, 0.5)
            }

            const sz = instance.baseSize + sizeVariation * instance.baseSize * 0.5
            num.size(sz)
            num.show(instance.g)
          }
        }
      }

      function drawBottom(p: p5) {
        const instance = instanceRef.current

        // Draw all bins
        for (let i = 0; i < instance.refined.length; i++) {
          instance.refined[i].show()
        }

        // Draw coordinates at the bottom
        instance.g.rectMode(p.CORNER)
        instance.g.fill(instance.palette.FG)
        instance.g.rect(0, instance.g.height - 20, instance.g.width, 20)

        instance.g.fill(instance.palette.BG)
        instance.g.textFont("Courier")
        instance.g.textAlign(p.CENTER, p.CENTER)
        instance.g.textSize(14)
        if (instance.macrodataFile) {
          instance.g.text(instance.macrodataFile.coordinates, instance.g.width * 0.5, instance.g.height - 10)
        }
      }

      function drawBinned(p: p5) {
        const instance = instanceRef.current
        for (const num of instance.numbers) {
          if (num.binIt) num.show(instance.g)
        }
      }

      function drawCursor(p: p5, xPos: number, yPos: number) {
        const instance = instanceRef.current

        // Prevent drawing cursor at 0,0 on page load
        if (xPos === 0 && yPos === 0) return

        // Draw cursor
        instance.g.push()
        instance.g.fill(instance.palette.FG)
        instance.g.noStroke()
        instance.g.translate(xPos, yPos)

        // Draw a simple triangle cursor
        instance.g.beginShape()
        instance.g.vertex(0, 0)
        instance.g.vertex(15, 5)
        instance.g.vertex(0, 10)
        instance.g.endShape(p.CLOSE)

        instance.g.pop()
      }

      function createRippleEffect(p: p5, x: number, y: number, color: string) {
        let radius = 0
        const maxRadius = 40
        const expandSpeed = 2
        const fadeSpeed = 5
        let alpha = 255

        return (g: p5.Graphics) => {
          g.push()
          g.noFill()
          g.stroke(color)
          g.strokeWeight(2)
          g.ellipse(x, y, radius * 2)
          g.pop()

          radius += expandSpeed
          alpha -= fadeSpeed

          if (alpha <= 0 || radius > maxRadius) {
            return false // Ripple effect is complete
          }
          return true // Ripple effect is still active
        }
      }
    }

    sketchRef.current = new p5(sketch, containerRef.current)

    return () => {
      if (sketchRef.current) {
        sketchRef.current.remove()
      }
    }
  }, [onComplete])

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
}

export default P5Wrapper

