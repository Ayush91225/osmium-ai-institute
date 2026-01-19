'use client'

import { useEffect, useRef } from 'react'

interface BlurredImageProps {
  className?: string
}

export default function BlurredImage({ className }: BlurredImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      
      ctx.filter = 'blur(20px)'
      ctx.drawImage(img, 0, 0)
      
      // Add text overlay
      ctx.filter = 'blur(0.5px)'
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
      ctx.font = '20px system-ui, -apple-system, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('Osmium AI', canvas.width / 2, canvas.height / 2)
    }
    
    img.src = '/assets/image.png'
  }, [])

  return <canvas ref={canvasRef} className={className} />
}