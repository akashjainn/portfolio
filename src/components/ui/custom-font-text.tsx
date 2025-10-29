"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface CustomFontTextProps {
  text: string
  className?: string
  letterClassName?: string
  alt?: string
}

/**
 * Renders text using custom font PNG images from the /font directory
 * Supports uppercase letters, lowercase letters, and common punctuation
 */
export function CustomFontText({ 
  text, 
  className, 
  letterClassName,
  alt 
}: CustomFontTextProps) {
  const getImagePath = (char: string): string | null => {
    const charCode = char.charCodeAt(0)
    
    // Uppercase A-Z
    if (charCode >= 65 && charCode <= 90) {
      return `/font/capital ${char}.png`
    }
    
    // Lowercase a-z
    if (charCode >= 97 && charCode <= 122) {
      return `/font/lowercase ${char}.png`
    }
    
    // Special characters
    const specialChars: Record<string, string> = {
      ':': 'colon',
      ',': 'comma',
      '"': 'double quotation',
      '!': 'exclamation',
      '.': 'period',
      '?': 'question mark',
      ';': 'semicolon',
      "'": 'single quotation',
    }
    
    if (specialChars[char]) {
      return `/font/${specialChars[char]}.png`
    }
    
    // Space
    if (char === ' ') {
      return null
    }
    
    return null
  }

  return (
    <div className={cn("inline-flex items-center -space-x-1", className)} aria-label={alt || text}>
      {text.split('').map((char, index) => {
        const imagePath = getImagePath(char)
        
        // Render space
        if (char === ' ') {
          return <span key={index} className="inline-block w-2 md:w-3" aria-hidden="true" />
        }
        
        // Skip unknown characters
        if (!imagePath) {
          return <span key={index} className="text-muted-foreground">{char}</span>
        }
        
        return (
          <span key={index} className={cn("inline-block relative", letterClassName)}>
            <Image
              src={imagePath}
              alt=""
              width={80}
              height={80}
              className="w-auto h-full object-contain"
              draggable={false}
            />
          </span>
        )
      })}
    </div>
  )
}
