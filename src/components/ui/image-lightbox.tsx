"use client"

import { useState, useEffect, useCallback, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { Button } from './button'
import { cn } from '@/lib/utils'

interface ImageLightboxProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  children?: ReactNode
  caption?: string
}

interface LightboxState {
  isOpen: boolean
  src: string
  alt: string
  caption?: string | undefined
}

let lightboxState: LightboxState = {
  isOpen: false,
  src: '',
  alt: ''
}

let setLightboxState: ((state: LightboxState) => void) | null = null

export function ImageLightbox({ 
  src, 
  alt, 
  width = 800, 
  height = 600, 
  className, 
  children,
  caption 
}: ImageLightboxProps) {
  const openLightbox = () => {
    if (setLightboxState) {
      setLightboxState({
        isOpen: true,
        src,
        alt,
        ...(caption && { caption })
      })
    }
  }

  return (
    <>
      <div 
        className={cn("cursor-zoom-in", className)}
        onClick={openLightbox}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            openLightbox()
          }
        }}
        aria-label={`Open ${alt} in lightbox`}
      >
        {children || (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="rounded-lg transition-all duration-200 hover:opacity-90"
          />
        )}
      </div>
      <LightboxRenderer />
    </>
  )
}

function LightboxRenderer() {
  const [state, setState] = useState(lightboxState)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setLightboxState = setState
    
    return () => {
      setLightboxState = null
    }
  }, [])

  const closeLightbox = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: false }))
  }, [])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeLightbox()
    }
  }, [closeLightbox])

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeLightbox()
    }
  }, [closeLightbox])

  useEffect(() => {
    if (state.isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
      
      // Focus the lightbox container
      const lightboxElement = document.getElementById('image-lightbox')
      if (lightboxElement) {
        lightboxElement.focus()
      }
    } else {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [state.isOpen, handleKeyDown])

  if (!mounted || !state.isOpen) {
    return null
  }

  return createPortal(
    <div
      id="image-lightbox"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-image"
      aria-describedby={state.caption ? "lightbox-caption" : undefined}
    >
      <div className="relative max-w-7xl max-h-full w-full">
        {/* Close button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute -top-12 right-0 text-white hover:bg-white/20 z-10"
          onClick={closeLightbox}
          aria-label="Close lightbox"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Button>

        {/* Image */}
        <div className="relative bg-white rounded-lg overflow-hidden shadow-2xl">
          <Image
            id="lightbox-image"
            src={state.src}
            alt={state.alt}
            width={1200}
            height={800}
            className="w-full h-auto max-h-[80vh] object-contain"
            priority
          />
          
          {/* Caption */}
          {state.caption && (
            <div 
              id="lightbox-caption"
              className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 backdrop-blur-sm"
            >
              <p className="text-sm">{state.caption}</p>
            </div>
          )}
        </div>

        {/* Keyboard hints */}
        <div className="absolute -bottom-8 left-0 right-0 text-center">
          <p className="text-white/60 text-xs">
            Press <kbd className="bg-white/20 px-1 rounded">ESC</kbd> to close
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}

// Utility component for galleries
export function ImageGallery({ 
  images, 
  className,
  columns = 3
}: { 
  images: Array<{
    src: string
    alt: string
    caption?: string
    width?: number
    height?: number
  }>
  className?: string
  columns?: number
}) {
  return (
    <div 
      className={cn(
        "grid gap-4",
        {
          "grid-cols-1": columns === 1,
          "grid-cols-2": columns === 2,
          "grid-cols-1 md:grid-cols-3": columns === 3,
          "grid-cols-2 md:grid-cols-4": columns === 4,
        },
        className
      )}
    >
      {images.map((image, index) => (
        <ImageLightbox
          key={index}
          src={image.src}
          alt={image.alt}
          {...(image.caption && { caption: image.caption })}
          {...(image.width && { width: image.width })}
          {...(image.height && { height: image.height })}
          className="aspect-square object-cover"
        />
      ))}
    </div>
  )
}