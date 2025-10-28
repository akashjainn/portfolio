"use client"

import { useRef, useEffect, useState, Suspense } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { Monitor, Smartphone, Tablet, Play, Pause, RotateCcw, Maximize2, Code, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface Project3DPreviewProps {
  project: {
    title: string
    slug: string
    category: string
    description: string
    techStack: string[]
    screenshots: {
      desktop: string[]
      mobile: string[]
      tablet?: string[]
    }
    liveUrl?: string
    repoUrl?: string
    features: string[]
    metrics?: {
      performanceScore: number
      accessibilityScore: number
      seoScore: number
    }
  }
}

// API endpoint for generating screenshots
const getScreenshotUrl = (url: string, device: 'desktop' | 'mobile' = 'desktop') => {
  const width = device === 'mobile' ? 390 : 1200
  const height = device === 'mobile' ? 844 : 630
  // Using a screenshot service API (multiple fallbacks)
  const services = [
    `https://api.screenshotmachine.com/?key=demo&url=${encodeURIComponent(url)}&dimension=${width}x${height}`,
    `https://htmlcsstoimage.com/demo_images/screenshot.png`, // fallback
    `https://via.placeholder.com/${width}x${height}/667eea/ffffff?text=${encodeURIComponent('Loading...')}`
  ]
  return services[0] // We'll implement fallback logic in the component
}

const MOCK_PROJECTS = [
  {
    title: "PropSage",
    slug: "propsage",
    category: "Sports Tech",
    description: "Real-time sports betting odds aggregation platform with 94% prediction accuracy. Built as a top 3 project using TwelveLabs API with live WebSocket connections and Redis caching for sub-100ms latency.",
    techStack: ["Next.js", "TypeScript", "TwelveLabs API", "Server-Sent Events", "TailwindCSS"],
    screenshots: {
      desktop: [
        "https://propsage-web.vercel.app/",
        "https://propsage-web.vercel.app/demo"
      ],
      mobile: [
        "https://propsage-web.vercel.app/",
        "https://propsage-web.vercel.app/demo"
      ]
    },
    liveUrl: "https://propsage-web.vercel.app/",
    repoUrl: "https://github.com/akashjainn/propsage",
    features: [
      "Real-time odds aggregation from 5+ sportsbooks",
      "Sub-100ms latency with Redis caching",
      "WebSocket live updates without page refresh",
      "Mobile-first responsive design",
      "Advanced statistics and trend analysis"
    ],
    metrics: {
      performanceScore: 94,
      accessibilityScore: 98,
      seoScore: 87
    }
  },
  {
    title: "StockSense",
    slug: "stocksense",
    category: "FinTech",
    description: "Comprehensive portfolio analytics platform with real-time market data integration. Features advanced risk metrics, P/L calculations, and interactive visualizations for retail investors.",
    techStack: ["Next.js", "MongoDB", "Alpha Vantage API", "Chart.js", "Prisma"],
    screenshots: {
      desktop: [
        "https://stocksense-taupe.vercel.app/market",
        "https://stocksense-taupe.vercel.app/dashboard",
        "https://stocksense-taupe.vercel.app/portfolio"
      ],
      mobile: [
        "https://stocksense-taupe.vercel.app/market",
        "https://stocksense-taupe.vercel.app/dashboard"
      ]
    },
    liveUrl: "https://stocksense-taupe.vercel.app/market",
    repoUrl: "https://github.com/akashjainn/stocksense",
    features: [
      "CSV portfolio import with format auto-detection",
      "Real-time price updates for 100+ symbols",
      "Advanced P/L calculations across time periods",
      "Interactive charts with technical indicators",
      "Risk assessment and diversification metrics"
    ],
    metrics: {
      performanceScore: 91,
      accessibilityScore: 95,
      seoScore: 93
    }
  },
  {
    title: "LandSafe",
    slug: "landsafe",
    category: "Safety Tech",
    description: "Progressive Web App for location-based safety with offline capabilities and emergency features. Real-time location tracking and emergency response system.",
    techStack: ["PWA", "Service Workers", "Geolocation API", "WebRTC", "IndexedDB"],
    screenshots: {
      desktop: [
        "https://land-safe.vercel.app/",
        "https://land-safe.vercel.app/safety"
      ],
      mobile: [
        "https://land-safe.vercel.app/",
        "https://land-safe.vercel.app/safety"
      ]
    },
    liveUrl: "https://land-safe.vercel.app/",
    repoUrl: "https://github.com/akashjainn/landsafe",
    features: [
      "Offline-first PWA architecture",
      "Real-time location sharing",
      "Emergency contact system",
      "Geofencing and safety alerts",
      "Cross-platform compatibility"
    ],
    metrics: {
      performanceScore: 98,
      accessibilityScore: 92,
      seoScore: 89
    }
  }
]

function DeviceFrame({ 
  device, 
  children, 
  isActive, 
  onClick 
}: { 
  device: 'desktop' | 'tablet' | 'mobile'
  children: React.ReactNode
  isActive: boolean
  onClick: () => void
}) {
  const frameStyles = {
    desktop: "w-full max-w-4xl aspect-video bg-gray-900 rounded-lg p-2",
    tablet: "w-[720px] max-w-full aspect-[4/3] bg-gray-800 rounded-xl p-3",
    mobile: "w-[390px] max-w-full aspect-[9/19.5] bg-gray-900 rounded-3xl p-4"
  }

  return (
    <motion.div
      className={`${frameStyles[device]} cursor-pointer transition-all duration-300 ${
        isActive ? 'ring-2 ring-primary shadow-xl' : 'opacity-60 hover:opacity-80'
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="w-full h-full bg-white rounded-lg overflow-hidden shadow-inner">
        {children}
      </div>
    </motion.div>
  )
}

function Screenshot3DViewer({ 
  screenshots, 
  title, 
  isPlaying, 
  onTogglePlay,
  liveUrl
}: { 
  screenshots: string[]
  title: string
  isPlaying: boolean
  onTogglePlay: () => void
  liveUrl?: string
}) {
  const [currentView, setCurrentView] = useState<'iframe' | 'screenshot'>('iframe')
  const [iframeError, setIframeError] = useState(false)
  // Only use loading for screenshot mode transitions; default to not loading for iframe
  const [isLoading, setIsLoading] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [perspective, setPerspective] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const [iframeBlocked, setIframeBlocked] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Auto-advance screenshots when playing and in screenshot mode
  useEffect(() => {
    if (!isPlaying || currentView !== 'screenshot') return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % screenshots.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isPlaying, screenshots.length, currentView])

  // 3D perspective effect on mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height
    
    setPerspective({ x: x * 15, y: y * 15 })
  }

  const handleMouseLeave = () => {
    setPerspective({ x: 0, y: 0 })
  }

  // Handle iframe load events
  const handleIframeLoad = () => {
    // Ensure loading overlay never persists for iframe loads
    setIsLoading(false)
    setIframeError(false)
  }

  const handleIframeError = () => {
    setIsLoading(false)
    setIframeError(true)
    setCurrentView('screenshot')
  }

  // Toggle between iframe and screenshot view
  const toggleView = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentView(prev => {
      const next = prev === 'iframe' ? 'screenshot' : 'iframe'
      // Loading indicator is only for screenshot carousel
      setIsLoading(next === 'screenshot')
      if (next === 'iframe') setIframeError(false)
      return next
    })
  }

  // If we are in iframe view for any reason, don't show loading overlay
  useEffect(() => {
    if (currentView === 'iframe') setIsLoading(false)
  }, [currentView])

  // Create a beautiful fallback preview for when iframe fails
  const renderFallbackPreview = (projectTitle: string) => {
    const projectGradients = {
      'PropSage': 'from-blue-600 via-purple-600 to-cyan-500',
      'StockSense': 'from-green-500 via-teal-600 to-blue-600', 
      'LandSafe': 'from-orange-500 via-red-600 to-pink-600'
    }
    
    const gradient = projectGradients[projectTitle as keyof typeof projectGradients] || 'from-gray-600 to-gray-800'
    
    return (
      <div className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col justify-center items-center p-8 text-white relative overflow-hidden`}>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
            <ExternalLink className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-2">{projectTitle}</h3>
          <p className="text-lg opacity-90 mb-6">
            Live website preview unavailable
          </p>
          <Button 
            onClick={() => window.open(liveUrl, '_blank', 'noopener,noreferrer')}
            className="bg-white/20 hover:bg-white/30 border border-white/20"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Visit Live Site
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentView}-${currentIndex}`}
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ 
              opacity: 1, 
              rotateX: perspective.y,
              rotateY: perspective.x
            }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{ 
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
          >
            <div className="w-full h-full overflow-hidden rounded-lg bg-white relative group">
              {/* Live Website Iframe */}
              {currentView === 'iframe' && liveUrl && !iframeError && (
                <>
                  <iframe
                    ref={iframeRef}
                    src={liveUrl}
                    className="w-full h-full border-none"
                    onLoad={handleIframeLoad}
                    onError={handleIframeError}
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    title={`${title} - Live Website`}
                  />
                  
                  {/* Iframe interaction overlay */}
                  <div 
                    className="absolute inset-0 bg-transparent cursor-pointer"
                    onClick={() => window.open(liveUrl, '_blank', 'noopener,noreferrer')}
                  />
                </>
              )}

              {/* Fallback content when iframe fails or screenshot mode */}
              {(currentView === 'screenshot' || iframeError || !liveUrl) && (
                <div 
                  className="w-full h-full cursor-pointer"
                  onClick={() => window.open(liveUrl, '_blank', 'noopener,noreferrer')}
                >
                  {renderFallbackPreview(title)}
                </div>
              )}
              
              {/* Loading State (only for screenshot mode) */}
              {isLoading && currentView === 'screenshot' && (
                <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-10">
                  <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                    <p className="text-sm">Loading preview...</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* 3D Shadow Overlay */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-white/10 pointer-events-none"
              style={{
                transform: `rotateX(${-perspective.y}deg) rotateY(${-perspective.x}deg)`,
                transformOrigin: 'center center'
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls Overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/20 backdrop-blur-sm rounded-lg p-2">
        <div className="flex gap-2">
          {liveUrl && (
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20 text-xs"
              onClick={toggleView}
              title={currentView === 'iframe' ? 'Show fallback preview' : 'Show live website'}
            >
              {currentView === 'iframe' ? <Monitor className="h-3 w-3" /> : <ExternalLink className="h-3 w-3" />}
            </Button>
          )}
          {currentView === 'screenshot' && (
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation()
                onTogglePlay()
              }}
            >
              {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            </Button>
          )}
        </div>

        <div className="text-xs text-white/80 text-center">
          {currentView === 'iframe' ? 'Live Website' : `Preview ${currentIndex + 1}/${screenshots.length}`}
          {iframeError && <div className="text-xs text-red-400">Iframe blocked</div>}
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation()
              window.open(liveUrl, '_blank', 'noopener,noreferrer')
            }}
          >
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function MetricsBar({ metrics }: { metrics?: { performanceScore: number; accessibilityScore: number; seoScore: number } | undefined }) {
  if (!metrics) return null

  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
      {Object.entries(metrics).map(([key, value]) => (
        <div key={key} className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-2">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-muted-foreground/20"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                className={value >= 90 ? 'text-success-500' : value >= 70 ? 'text-warning-500' : 'text-error-500'}
                initial={{ strokeDasharray: '0 251.2' }}
                animate={{ strokeDasharray: `${(value / 100) * 251.2} 251.2` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold">{value}</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground capitalize">
            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          </div>
        </div>
      ))}
    </div>
  )
}

function Project3DPreview({ project }: Project3DPreviewProps) {
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [isPlaying, setIsPlaying] = useState(true)
  const [showFullscreen, setShowFullscreen] = useState(false)

  const currentScreenshots = project.screenshots[activeDevice] || project.screenshots.desktop

  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          {/* Project Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{project.category}</Badge>
                {project.techStack.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {project.description}
              </p>
            </div>
            
            <div className="flex gap-2">
              {project.liveUrl && (
                <Button size="sm" variant="outline" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Live
                  </a>
                </Button>
              )}
              {project.repoUrl && (
                <Button size="sm" variant="outline" asChild>
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    <Code className="h-3 w-3 mr-1" />
                    Code
                  </a>
                </Button>
              )}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowFullscreen(true)}
              >
                <Maximize2 className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Device Selector */}
          <div className="flex justify-center gap-4 mb-6">
            <Button
              variant={activeDevice === 'desktop' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveDevice('desktop')}
              className="flex items-center gap-2"
            >
              <Monitor className="h-4 w-4" />
              Desktop
            </Button>
            {project.screenshots.tablet && (
              <Button
                variant={activeDevice === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveDevice('tablet')}
                className="flex items-center gap-2"
              >
                <Tablet className="h-4 w-4" />
                Tablet
              </Button>
            )}
            <Button
              variant={activeDevice === 'mobile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveDevice('mobile')}
              className="flex items-center gap-2"
            >
              <Smartphone className="h-4 w-4" />
              Mobile
            </Button>
          </div>

          {/* 3D Preview Area */}
          <div className="flex justify-center mb-6 bg-gradient-to-br from-muted/20 to-muted/50 rounded-xl p-8 min-h-[400px] items-center">
            <DeviceFrame
              device={activeDevice}
              isActive={true}
              onClick={() => {}}
            >
              <Screenshot3DViewer
                screenshots={currentScreenshots}
                title={project.title}
                isPlaying={isPlaying}
                onTogglePlay={() => setIsPlaying(!isPlaying)}
                {...(project.liveUrl ? { liveUrl: project.liveUrl } : {})}
              />
            </DeviceFrame>
          </div>

          {/* Metrics */}
          <MetricsBar metrics={project.metrics} />

          {/* Features List */}
          <div className="mt-6">
            <h4 className="font-semibold mb-3">Key Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {project.features.map((feature, idx) => (
                <div key={idx} className="flex items-start text-sm text-muted-foreground">
                  <span className="text-primary mr-2">✓</span>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-6 pt-4 border-t border-border/50">
            <Button asChild className="w-full">
              <a href={`/projects/${project.slug}`}>
                View Full Case Study
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {showFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-6xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <DeviceFrame
                device={activeDevice}
                isActive={true}
                onClick={() => {}}
              >
                <Screenshot3DViewer
                  screenshots={currentScreenshots}
                  title={project.title}
                  isPlaying={isPlaying}
                  onTogglePlay={() => setIsPlaying(!isPlaying)}
                  {...(project.liveUrl ? { liveUrl: project.liveUrl } : {})}
                />
              </DeviceFrame>
              
              <div className="text-center mt-4">
                <Button variant="outline" onClick={() => setShowFullscreen(false)}>
                  Close Fullscreen
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function Project3DShowcase() {
  return (
    <div className="py-24">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4">
            <Monitor className="h-3 w-3 mr-1" />
            Interactive Previews
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Project Experience</h2>
        </div>

        {/* Project Previews */}
        <div className="space-y-12">
          {MOCK_PROJECTS.map((project) => (
            <Project3DPreview key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}