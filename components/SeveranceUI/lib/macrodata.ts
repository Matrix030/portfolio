// File names for macrodata
const files = [
  "Siena",
  "Nanning",
  "Narva",
  "Ocula",
  "Kingsport",
  "Labrador",
  "Le Mars",
  "Longbranch",
  "Moonbeam",
  "Minsk",
  "Dranesville",
]

// Empty bin templates
const emptyBins = [
  { WO: 0, FC: 0, DR: 0, MA: 0 },
  { WO: 0, FC: 0, DR: 0, MA: 0 },
  { WO: 0, FC: 0, DR: 0, MA: 0 },
  { WO: 0, FC: 0, DR: 0, MA: 0 },
  { WO: 0, FC: 0, DR: 0, MA: 0 },
]

export class MacrodataFile {
  localStorageKey: string
  fileName: string
  storedBins: any[]
  coordinates: string

  constructor() {
    this.localStorageKey = "macrodata"

    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      // Clear localStorage on each page load to ensure we start fresh
      localStorage.removeItem(this.localStorageKey)
      
      // Get new file data
      const file = this.assignFile()
      this.fileName = file.fileName
      this.storedBins = file.storedBins
      this.coordinates = file.coordinates
    } else {
      // Default values for SSR
      this.fileName = files[0]
      this.storedBins = emptyBins
      this.coordinates = this.#generateCoordinates()
    }
  }

  assignFile() {
    // Quick fix to ensure you don't get the same filename twice in a row
    const allFilesButPrevious = files.filter((file) => file !== this.fileName)
    const fileName = allFilesButPrevious[Math.floor(Math.random() * allFilesButPrevious.length)]
    const coordinates = this.#generateCoordinates()
    console.log("assigning", fileName)
    const macrodata = {
      fileName,
      storedBins: emptyBins,
      coordinates,
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(this.localStorageKey, JSON.stringify(macrodata))
    }

    return macrodata
  }

  updateProgress(bins: any[]) {
    const updatedFile = {
      fileName: this.fileName,
      storedBins: bins,
      coordinates: this.coordinates,
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(this.localStorageKey, JSON.stringify(updatedFile))
    }
  }

  resetFile() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.localStorageKey)
    }

    // Create completely new empty bins
    const freshEmptyBins = [
      { WO: 0, FC: 0, DR: 0, MA: 0 },
      { WO: 0, FC: 0, DR: 0, MA: 0 },
      { WO: 0, FC: 0, DR: 0, MA: 0 },
      { WO: 0, FC: 0, DR: 0, MA: 0 },
      { WO: 0, FC: 0, DR: 0, MA: 0 },
    ]

    const file = {
      fileName: files[Math.floor(Math.random() * files.length)],
      storedBins: freshEmptyBins,
      coordinates: this.#generateCoordinates(),
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(this.localStorageKey, JSON.stringify(file))
    }

    this.fileName = file.fileName
    this.storedBins = file.storedBins
    this.coordinates = file.coordinates

    console.log("File reset to:", this.fileName)
    return file
  }

  // Private member fn to pick coordinates
  #generateCoordinates() {
    function randHex() {
      return Math.floor(Math.random() * 256)
        .toString(16)
        .toUpperCase()
    }
    const x = randHex() + randHex() + randHex()
    const y = randHex() + randHex() + randHex()

    return `0x${x} : 0x${y}`
  }
}

