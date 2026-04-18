'use client'

import { useEffect, useRef } from 'react'
import type { JournalArtifact } from '@/lib/journal'

interface Node {
  id: string
  label: string
  type: 'subject' | 'comparable' | 'factor'
  x?: number
  y?: number
  fx?: number | null
  fy?: number | null
}

interface Link {
  source: string | Node
  target: string | Node
  strength: number
}

const NODES: Node[] = [
  { id: 'subject',   label: '123 Elm St',      type: 'subject' },
  { id: 'comp1',     label: '117 Oak Ave',      type: 'comparable' },
  { id: 'comp2',     label: '130 Maple Dr',     type: 'comparable' },
  { id: 'comp3',     label: '119 Pine Rd',      type: 'comparable' },
  { id: 'sqft',      label: 'Sq Footage',       type: 'factor' },
  { id: 'beds',      label: 'Bedrooms',         type: 'factor' },
  { id: 'dist',      label: 'Distance',         type: 'factor' },
  { id: 'school',    label: 'School Rating',    type: 'factor' },
]

const LINKS: Link[] = [
  { source: 'subject', target: 'comp1',  strength: 0.9 },
  { source: 'subject', target: 'comp2',  strength: 0.7 },
  { source: 'subject', target: 'comp3',  strength: 0.5 },
  { source: 'comp1',   target: 'sqft',   strength: 0.8 },
  { source: 'comp1',   target: 'beds',   strength: 0.6 },
  { source: 'comp2',   target: 'sqft',   strength: 0.7 },
  { source: 'comp3',   target: 'dist',   strength: 0.9 },
  { source: 'comp3',   target: 'school', strength: 0.4 },
]

interface EvidenceGraphProps {
  artifact: JournalArtifact
}

export function EvidenceGraph({ artifact: _ }: EvidenceGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    let destroyed = false

    async function render() {
      const d3 = await import('d3')
      if (destroyed || !svgRef.current) return

      const svg = d3.select(svgRef.current)
      const width = svgRef.current.clientWidth || 560
      const height = svgRef.current.clientHeight || 340

      svg.selectAll('*').remove()

      const simulation = d3
        .forceSimulation<Node>(NODES)
        .force('link', d3.forceLink<Node, Link>(LINKS).id((d) => d.id).distance(100))
        .force('charge', d3.forceManyBody().strength(-200))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide(32))

      const link = svg
        .append('g')
        .selectAll('line')
        .data(LINKS)
        .enter()
        .append('line')
        .attr('stroke', 'var(--rule)')
        .attr('stroke-width', (d) => d.strength * 2)
        .attr('stroke-opacity', 0.6)

      const nodeGroup = svg
        .append('g')
        .selectAll<SVGGElement, Node>('g')
        .data(NODES)
        .enter()
        .append('g')
        .attr('cursor', 'pointer')

      nodeGroup
        .append('circle')
        .attr('r', (d) => (d.type === 'subject' ? 14 : d.type === 'comparable' ? 10 : 7))
        .attr('fill', (d) =>
          d.type === 'subject'
            ? 'var(--terra)'
            : d.type === 'comparable'
            ? 'var(--ink-2)'
            : 'var(--cream-2)'
        )
        .attr('stroke', 'var(--rule)')
        .attr('stroke-width', 1)

      nodeGroup
        .append('text')
        .text((d) => d.label)
        .attr('dy', (d) => (d.type === 'subject' ? 28 : 22))
        .attr('text-anchor', 'middle')
        .attr('font-family', 'var(--font-mono), monospace')
        .attr('font-size', 10)
        .attr('fill', 'var(--ink-3)')

      simulation.on('tick', () => {
        link
          .attr('x1', (d) => (d.source as Node).x ?? 0)
          .attr('y1', (d) => (d.source as Node).y ?? 0)
          .attr('x2', (d) => (d.target as Node).x ?? 0)
          .attr('y2', (d) => (d.target as Node).y ?? 0)

        nodeGroup.attr('transform', (d) => `translate(${d.x ?? 0},${d.y ?? 0})`)
      })

      setTimeout(() => simulation.stop(), 3000)
    }

    render()
    return () => { destroyed = true }
  }, [])

  return (
    <div style={{ height: '100%', background: 'var(--cream)', padding: 'var(--s-3)' }}>
      <svg
        ref={svgRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
        aria-label="PropSage evidence graph showing comparable property relationships"
        role="img"
      />
    </div>
  )
}
