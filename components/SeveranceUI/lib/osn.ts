// Simplified OpenSimplexNoise implementation for Next.js
// Based on Josh Forisha's implementation

export class OpenSimplexNoise {
  private perm: Uint8Array
  private perm2D: Uint8Array
  private perm3D: Uint8Array
  private perm4D: Uint8Array

  // Constants
  private readonly NORM_2D = 1.0 / 47.0
  private readonly NORM_3D = 1.0 / 103.0
  private readonly NORM_4D = 1.0 / 30.0
  private readonly SQUISH_2D = (Math.sqrt(2 + 1) - 1) / 2
  private readonly SQUISH_3D = (Math.sqrt(3 + 1) - 1) / 3
  private readonly SQUISH_4D = (Math.sqrt(4 + 1) - 1) / 4
  private readonly STRETCH_2D = (1 / Math.sqrt(2 + 1) - 1) / 2
  private readonly STRETCH_3D = (1 / Math.sqrt(3 + 1) - 1) / 3
  private readonly STRETCH_4D = (1 / Math.sqrt(4 + 1) - 1) / 4

  // Simplified constructor
  constructor(seed?: number) {
    this.perm = new Uint8Array(256)
    this.perm2D = new Uint8Array(256)
    this.perm3D = new Uint8Array(256)
    this.perm4D = new Uint8Array(256)

    // Initialize with a simple algorithm
    for (let i = 0; i < 256; i++) {
      this.perm[i] = i
      this.perm2D[i] = i & 0x0e
      this.perm3D[i] = (i % 24) * 3
      this.perm4D[i] = i & 0xfc
    }
  }

  // Simplified noise2D function
  noise2D(x: number, y: number): number {
    // Simplified implementation that returns a deterministic but noise-like value
    return Math.sin(x * 12.9898 + y * 78.233) * 0.5 + 0.5
  }

  // Simplified noise3D function
  noise3D(x: number, y: number, z: number): number {
    // Simplified implementation that returns a deterministic but noise-like value
    return Math.sin(x * 12.9898 + y * 78.233 + z * 43.2123) * 0.5 + 0.5
  }

  // Simplified noise4D function
  noise4D(x: number, y: number, z: number, w: number): number {
    // Simplified implementation that returns a deterministic but noise-like value
    return Math.sin(x * 12.9898 + y * 78.233 + z * 43.2123 + w * 19.6453) * 0.5 + 0.5
  }
}

export function opensimplexNoise(seed?: number): OpenSimplexNoise {
  return new OpenSimplexNoise()
}

