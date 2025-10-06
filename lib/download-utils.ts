/**
 * Download utilities for generating and downloading images
 * Following best practices for client-side image generation
 */

interface DownloadOptions {
  symbol: string
  name: string
  category?: string
  price?: number
}

/**
 * Generate a high-quality banner image (1920x1080)
 * Best practice: Use high resolution for social media and presentations
 */
export function generateBanner(options: DownloadOptions): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      reject(new Error('Failed to get canvas context'))
      return
    }

    // HD Resolution (16:9 aspect ratio)
    canvas.width = 1920
    canvas.height = 1080

    // White background with subtle gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, '#ffffff')
    gradient.addColorStop(1, '#fafafa')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add subtle border
    ctx.strokeStyle = '#e5e5e5'
    ctx.lineWidth = 4
    ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4)

    // Draw ticker symbol
    ctx.fillStyle = '#000000'
    ctx.font = 'bold 240px Georgia, serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(`$${options.symbol}`, canvas.width / 2, canvas.height / 2 - 50)

    // Draw project name
    ctx.font = '60px Georgia, serif'
    ctx.fillStyle = '#666666'
    ctx.fillText(options.name, canvas.width / 2, canvas.height / 2 + 150)

    // Add category if provided
    if (options.category) {
      ctx.font = '36px system-ui, -apple-system, sans-serif'
      ctx.fillStyle = '#999999'
      ctx.fillText(options.category.toUpperCase(), canvas.width / 2, canvas.height / 2 + 230)
    }

    // Convert to blob with high quality
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob)
      } else {
        reject(new Error('Failed to generate image'))
      }
    }, 'image/png', 1.0)
  })
}

/**
 * Generate a square logo image (1024x1024)
 * Best practice: Square format for profile pictures and app icons
 */
export function generateLogo(options: DownloadOptions): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      reject(new Error('Failed to get canvas context'))
      return
    }

    // Square dimensions for logo
    canvas.width = 1024
    canvas.height = 1024

    // White background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add border
    ctx.strokeStyle = '#e5e5e5'
    ctx.lineWidth = 8
    ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8)

    // Dynamic font size based on symbol length
    ctx.fillStyle = '#000000'
    const fontSize = options.symbol.length <= 3 ? 320 : options.symbol.length <= 4 ? 260 : 200
    ctx.font = `bold ${fontSize}px Georgia, serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(`$${options.symbol}`, canvas.width / 2, canvas.height / 2)

    // Convert to blob
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob)
      } else {
        reject(new Error('Failed to generate logo'))
      }
    }, 'image/png', 1.0)
  })
}

/**
 * Generate a Twitter/X card image (1200x630)
 * Best practice: Optimized for social media sharing
 */
export function generateSocialCard(options: DownloadOptions): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      reject(new Error('Failed to get canvas context'))
      return
    }

    // Twitter card dimensions
    canvas.width = 1200
    canvas.height = 630

    // White background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add border
    ctx.strokeStyle = '#e5e5e5'
    ctx.lineWidth = 2
    ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2)

    // Draw ticker symbol
    ctx.fillStyle = '#000000'
    ctx.font = 'bold 140px Georgia, serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(`$${options.symbol}`, canvas.width / 2, canvas.height / 2 - 30)

    // Draw project name
    ctx.font = '40px Georgia, serif'
    ctx.fillStyle = '#666666'
    ctx.fillText(options.name, canvas.width / 2, canvas.height / 2 + 80)

    // Add price if provided
    if (options.price !== undefined) {
      ctx.font = '32px system-ui, -apple-system, sans-serif'
      ctx.fillStyle = '#999999'
      ctx.fillText(`$${options.price.toFixed(2)}`, canvas.width / 2, canvas.height / 2 + 140)
    }

    // Convert to blob
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob)
      } else {
        reject(new Error('Failed to generate social card'))
      }
    }, 'image/png', 1.0)
  })
}

/**
 * Download a blob as a file
 * Best practice: Clean up object URLs to prevent memory leaks
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.style.display = 'none'

  document.body.appendChild(a)
  a.click()

  // Clean up
  setTimeout(() => {
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, 100)
}

/**
 * Download with error handling and user feedback
 * Best practice: Always handle errors gracefully
 */
export async function downloadImage(
  generator: () => Promise<Blob>,
  filename: string,
  onError?: (error: Error) => void
): Promise<void> {
  try {
    const blob = await generator()
    downloadBlob(blob, filename)
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Download failed')
    if (onError) {
      onError(err)
    } else {
      console.error('Download failed:', err)
    }
  }
}