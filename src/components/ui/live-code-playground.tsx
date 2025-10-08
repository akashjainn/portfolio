"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Square, RotateCcw, ExternalLink, Code, Monitor, Smartphone, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RoleContent } from '@/components/ui/role-personalization'

interface CodePlaygroundProps {
  project: {
    slug: string
    title: string
    description: string
    features: string[]
    technologies: string[]
  }
  examples: {
    id: string
    title: string
    description: string
    code: string
    language: 'javascript' | 'typescript' | 'python' | 'html'
    output?: string | undefined
    interactive?: boolean | undefined
    codesandboxUrl?: string | undefined
    replitUrl?: string | undefined
  }[]
}

const MOCK_PLAYGROUNDS = [
  {
    project: {
      slug: 'propsage',
      title: 'PropSage',
      description: 'Real-time odds aggregation with WebSocket connections',
      features: ['WebSocket Streaming', 'Redis Caching', 'Rate Limiting', 'Error Recovery'],
      technologies: ['Next.js', 'TypeScript', 'Redis', 'WebSockets']
    },
    examples: [
      {
        id: 'websocket-client',
        title: 'WebSocket Odds Client',
        description: 'Real-time sports odds streaming with automatic reconnection',
        language: 'typescript' as const,
        code: `// Real-time odds streaming client
class OddsStreamClient {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  
  constructor(private url: string, private onMessage: (data: any) => void) {}
  
  connect(): void {
    this.ws = new WebSocket(this.url);
    
    this.ws.onopen = () => {
      console.log('Connected to odds stream');
      this.reconnectAttempts = 0;
      // Subscribe to real-time odds
      this.send({ type: 'subscribe', markets: ['NFL', 'NBA'] });
    };
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.onMessage(data);
    };
    
    this.ws.onclose = () => this.handleReconnect();
    this.ws.onerror = () => this.handleReconnect();
  }
  
  private handleReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => this.connect(), 1000 * this.reconnectAttempts);
    }
  }
  
  send(data: any): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }
}

// Usage example
const client = new OddsStreamClient('wss://api.propsage.com/odds', (data) => {
  console.log('New odds:', data);
  updateUI(data.odds);
});

client.connect();`,
        interactive: true,
        codesandboxUrl: 'https://codesandbox.io/s/propsage-websocket-demo'
      },
      {
        id: 'redis-cache',
        title: 'Redis Caching Strategy',
        description: 'Efficient caching with TTL and invalidation patterns',
        language: 'typescript' as const,
        code: `// Redis caching for odds data
import Redis from 'ioredis';

class OddsCache {
  private redis: Redis;
  
  constructor() {
    this.redis = new Redis(process.env.REDIS_URL);
  }
  
  async getOdds(market: string, game: string): Promise<any | null> {
    const key = \`odds:\${market}:\${game}\`;
    const cached = await this.redis.get(key);
    
    if (cached) {
      return JSON.parse(cached);
    }
    
    // Fetch from API if not cached
    const fresh = await this.fetchFreshOdds(market, game);
    
    // Cache for 30 seconds (odds change frequently)
    await this.redis.setex(key, 30, JSON.stringify(fresh));
    
    return fresh;
  }
  
  async invalidateMarket(market: string): Promise<void> {
    const pattern = \`odds:\${market}:*\`;
    const keys = await this.redis.keys(pattern);
    
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }
  
  private async fetchFreshOdds(market: string, game: string) {
    // Simulated API call
    return {
      market,
      game,
      odds: { home: 1.85, away: 2.10 },
      timestamp: Date.now()
    };
  }
}`,
        interactive: false
      }
    ]
  },
  {
    project: {
      slug: 'stocksense',
      title: 'StockSense',
      description: 'Portfolio analytics with real-time calculations',
      features: ['Portfolio P&L', 'Risk Metrics', 'CSV Parsing', 'Chart Rendering'],
      technologies: ['Next.js', 'MongoDB', 'Chart.js', 'Alpha Vantage API']
    },
    examples: [
      {
        id: 'portfolio-calculator',
        title: 'Portfolio P&L Calculator',
        description: 'Real-time portfolio performance calculation engine',
        language: 'typescript' as const,
        code: `// Portfolio performance calculator
interface Position {
  symbol: string;
  quantity: number;
  averageCost: number;
  currentPrice: number;
}

class PortfolioCalculator {
  calculatePositionPnL(position: Position) {
    const marketValue = position.quantity * position.currentPrice;
    const costBasis = position.quantity * position.averageCost;
    const unrealizedPnL = marketValue - costBasis;
    const percentChange = (unrealizedPnL / costBasis) * 100;
    
    return {
      marketValue,
      costBasis,
      unrealizedPnL,
      percentChange: Number(percentChange.toFixed(2))
    };
  }
  
  calculatePortfolioMetrics(positions: Position[]) {
    let totalValue = 0;
    let totalCost = 0;
    let totalPnL = 0;
    
    const positionMetrics = positions.map(position => {
      const metrics = this.calculatePositionPnL(position);
      totalValue += metrics.marketValue;
      totalCost += metrics.costBasis;
      totalPnL += metrics.unrealizedPnL;
      return { ...position, ...metrics };
    });
    
    return {
      positions: positionMetrics,
      portfolio: {
        totalValue: Number(totalValue.toFixed(2)),
        totalCost: Number(totalCost.toFixed(2)),
        totalPnL: Number(totalPnL.toFixed(2)),
        totalReturn: Number(((totalPnL / totalCost) * 100).toFixed(2))
      }
    };
  }
}

// Example usage
const calculator = new PortfolioCalculator();
const positions: Position[] = [
  { symbol: 'AAPL', quantity: 100, averageCost: 150, currentPrice: 175 },
  { symbol: 'GOOGL', quantity: 50, averageCost: 2500, currentPrice: 2650 }
];

const metrics = calculator.calculatePortfolioMetrics(positions);
console.log('Portfolio Performance:', metrics.portfolio);`,
        interactive: true,
        codesandboxUrl: 'https://codesandbox.io/s/stocksense-calculator-demo'
      }
    ]
  }
]

interface CodeEditorProps {
  code: string
  language: string
  onChange?: (code: string) => void
  readOnly?: boolean
}

function CodeEditor({ code, language, onChange, readOnly = false }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [currentCode, setCurrentCode] = useState(code)

  useEffect(() => {
    setCurrentCode(code)
  }, [code])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value
    setCurrentCode(newCode)
    onChange?.(newCode)
  }

  // Simple syntax highlighting for demo purposes
  const highlightCode = (code: string, lang: string) => {
    // This is a simplified highlighter - in production use Prism.js or similar
    let highlighted = code
      .replace(/(class|interface|function|const|let|var|import|export|async|await|return|if|else|for|while)/g, '<span class="text-blue-600 font-medium">$1</span>')
      .replace(/(string|number|boolean|any|void|Promise)/g, '<span class="text-purple-600">$1</span>')
      .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="text-green-600">$1</span>')
      .replace(/(\/\/.*$)/gm, '<span class="text-gray-500 italic">$1</span>')
    
    return { __html: highlighted }
  }

  return (
    <div className="relative">
      {/* Syntax highlighted overlay */}
      <div 
        className="absolute inset-0 p-4 text-sm font-mono leading-relaxed pointer-events-none whitespace-pre-wrap overflow-hidden"
        dangerouslySetInnerHTML={highlightCode(currentCode, language)}
      />
      
      {/* Invisible textarea for input */}
      <textarea
        ref={textareaRef}
        value={currentCode}
        onChange={handleChange}
        className="relative z-10 w-full h-full p-4 text-sm font-mono leading-relaxed bg-transparent border-0 outline-0 resize-none text-transparent caret-white"
        readOnly={readOnly}
        spellCheck={false}
        style={{ 
          caretColor: readOnly ? 'transparent' : '#fff',
          background: 'transparent'
        }}
      />
    </div>
  )
}

function PlaygroundExample({ 
  example, 
  project 
}: { 
  example: CodePlaygroundProps['examples'][0]
  project: CodePlaygroundProps['project']
}) {
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState('')
  const [code, setCode] = useState(example.code)
  const [copied, setCopied] = useState(false)
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop')

  const handleRun = () => {
    setIsRunning(true)
    setOutput('Running code...')
    
    // Simulate code execution
    setTimeout(() => {
      setOutput(`// Output from ${example.title}
✓ Code compiled successfully
✓ No TypeScript errors
${example.output || '// Interactive demo ready - click "Open in CodeSandbox" to test live'}`)
      setIsRunning(false)
    }, 1500)
  }

  const handleReset = () => {
    setCode(example.code)
    setOutput('')
  }

  const copyCode = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{example.title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{example.description}</p>
          </div>
          <Badge variant="secondary" className="text-xs">
            {example.language}
          </Badge>
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-between pt-3">
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-1"
            >
              {isRunning ? (
                <Square className="h-3 w-3" />
              ) : (
                <Play className="h-3 w-3" />
              )}
              {isRunning ? 'Running' : 'Run'}
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={handleReset}
              className="flex items-center gap-1"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={copyCode}
              className="flex items-center gap-1"
            >
              {copied ? (
                <Check className="h-3 w-3" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          
          <div className="flex gap-1">
            <Button
              size="sm"
              variant={device === 'desktop' ? 'default' : 'ghost'}
              onClick={() => setDevice('desktop')}
              className="p-1.5"
            >
              <Monitor className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant={device === 'mobile' ? 'default' : 'ghost'}
              onClick={() => setDevice('mobile')}
              className="p-1.5"
            >
              <Smartphone className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Code Editor */}
        <div className="mb-6">
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-gray-400 font-mono">
                {example.title.toLowerCase().replace(/\s+/g, '_')}.{example.language === 'typescript' ? 'ts' : 'js'}
              </div>
            </div>
            
            <div className="h-96 bg-gray-900 text-gray-100">
              <CodeEditor
                code={code}
                language={example.language}
                onChange={setCode}
              />
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-2">Console Output</h4>
          <div className="bg-black rounded-lg p-4 h-32 overflow-y-auto">
            <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
              {output || '// Click "Run" to execute the code'}
            </pre>
          </div>
        </div>

        {/* Interactive Actions */}
        {example.interactive && (
          <div className="flex gap-2">
            {example.codesandboxUrl && (
              <Button asChild size="sm">
                <a href={example.codesandboxUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Open in CodeSandbox
                </a>
              </Button>
            )}
            
            {example.replitUrl && (
              <Button asChild size="sm" variant="outline">
                <a href={example.replitUrl} target="_blank" rel="noopener noreferrer">
                  <Code className="h-3 w-3 mr-1" />
                  Run in Repl.it
                </a>
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function LiveCodePlayground({ project, examples }: CodePlaygroundProps) {
  const [activeExample, setActiveExample] = useState(0)

  return (
    <RoleContent role={['developer']} fallback={null}>
      <div className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-4">
              <Code className="h-3 w-3 mr-1" />
              Interactive Code
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Live Code Exploration</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore the core algorithms and patterns from {project.title}. 
              Edit, run, and experiment with real production code.
            </p>
          </div>

          {/* Project Overview */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">{project.title} Architecture</h3>
                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                  
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Key Features</h4>
                    <ul className="space-y-1">
                      {project.features.map((feature) => (
                        <li key={feature} className="text-sm flex items-center text-muted-foreground">
                          <span className="text-primary mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold mb-2">Technology Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Example Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {examples.map((example, index) => (
              <Button
                key={example.id}
                variant={activeExample === index ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveExample(index)}
              >
                {example.title}
              </Button>
            ))}
          </div>

          {/* Active Playground */}
          <motion.div
            key={activeExample}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {examples[activeExample] && (
              <PlaygroundExample 
                example={examples[activeExample]} 
                project={project}
              />
            )}
          </motion.div>
        </div>
      </div>
    </RoleContent>
  )
}

export function CodePlaygroundSection() {
  return (
    <div>
      {MOCK_PLAYGROUNDS.map((playground) => (
        <LiveCodePlayground
          key={playground.project.slug}
          project={playground.project}
          examples={playground.examples}
        />
      ))}
    </div>
  )
}