'use client'

import { useEffect, useRef, useState } from 'react'
import { useDarkMode } from '@/contexts/DarkModeContext'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import { useSearchParams } from 'next/navigation'
import Script from 'next/script'

const careerData = {
  'software-developer': {
    name: "Frontend Developer",
    description: "The visual web",
    tags: ["Career Path"],
    children: [
      {
        name: "Internet",
        description: "How it works",
        tags: ["Essential"],
        children: [
          { name: "HTTP/HTTPS", description: "Protocols" },
          { name: "DNS", description: "Domain Names" },
          { name: "Browsers", description: "Engines & Rendering" },
          { name: "Hosting", description: "Vercel, Netlify" }
        ]
      },
      {
        name: "HTML",
        description: "Structure",
        video: "qz0aGYrrlhU",
        tags: ["Essential"],
        children: [
          { name: "Semantic HTML", description: "Accessibility", tags: ["Important"] },
          { name: "Forms", description: "Validation" },
          { name: "SEO", description: "Meta tags, JSON-LD" },
          { name: "Accessibility", description: "ARIA, WCAG", tags: ["Hard"] }
        ]
      },
      {
        name: "CSS",
        description: "Styling",
        video: "1Rs2ND1ryYc",
        tags: ["Essential"],
        children: [
          { name: "Layouts", description: "Flexbox, Grid", video: "fYq5PXgSsbE", tags: ["Core"] },
          { name: "Responsive", description: "Media Queries" },
          { 
            name: "Modern CSS", 
            description: "Variables, Nesting",
            tags: ["New"],
            children: [
              { name: "Tailwind", description: "Utility-first", tags: ["Popular"] },
              { name: "SASS/SCSS", description: "Preprocessor" },
              { name: "CSS Modules", description: "Scoped Styles" }
            ]
          }
        ]
      },
      {
        name: "JavaScript",
        description: "Interactivity",
        video: "hdI2bqOjy3c",
        tags: ["Essential", "Hard"],
        children: [
          { name: "ES6+", description: "Arrow fns, Destructuring" },
          { name: "Async", description: "Promises, Async/Await", video: "cuEtnrL9-KE", tags: ["Tricky"] },
          { name: "DOM", description: "Manipulation" },
          { 
            name: "TypeScript", 
            description: "Type Safety",
            tags: ["Industry Std"],
            children: [
              { name: "Interfaces", description: "Contracts" },
              { name: "Generics", description: "Reusable types" }
            ]
          }
        ]
      },
      {
        name: "Frameworks",
        description: "App Architecture",
        video: "N3AkSS5hXMA",
        tags: ["Popular"],
        children: [
          { 
            name: "React", 
            description: "Library of choice",
            tags: ["Dominant"],
            children: [
              { name: "Hooks", description: "useState, useEffect" },
              { name: "Context", description: "State Management" },
              { name: "Redux/Zustand", description: "Global State" }
            ]
          },
          { 
            name: "Next.js", 
            description: "React Framework",
            tags: ["Trending"],
            children: [
              { name: "SSR/SSG", description: "Rendering" },
              { name: "App Router", description: "Routing" },
              { name: "API Routes", description: "Backend" }
            ]
          },
          { name: "Vue", description: "Alternative" }
        ]
      },
      {
        name: "Testing",
        description: "Quality Assurance",
        children: [
          { name: "Jest", description: "Unit Testing" },
          { name: "React Testing Lib", description: "Component Tests" },
          { name: "Cypress/Playwright", description: "E2E Testing", tags: ["Cool"] }
        ]
      },
      {
        name: "Tools",
        description: "Workflow",
        children: [
          { name: "Git", description: "Version Control", video: "USjZcfj8yxE", tags: ["Essential"] },
          { name: "Package Managers", description: "npm, pnpm, yarn" },
          { name: "Build Tools", description: "Vite, Webpack" }
        ]
      }
    ]
  }
}

export default function CareerPage() {
  const { isDarkMode } = useDarkMode()
  const searchParams = useSearchParams()
  const career = searchParams.get('career') || 'software-developer'
  const containerRef = useRef<HTMLDivElement>(null)
  const [d3Loaded, setD3Loaded] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!d3Loaded || !containerRef.current || !mounted) return

    const data = careerData[career as keyof typeof careerData] || careerData['software-developer']
    
    containerRef.current.innerHTML = ''

    // @ts-expect-error - D3 is loaded via CDN
    const d3 = window.d3
    
    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight
    
    const cardWidth = width < 480 ? 160 : width < 768 ? 180 : 200
    const cardHeight = width < 480 ? 48 : width < 768 ? 52 : 56
    const duration = 400

    const svg = d3.select(containerRef.current).append("svg")
      .attr("width", width)
      .attr("height", height)
      .call(d3.zoom().on("zoom", (event: {transform: string}) => {
        g.attr("transform", event.transform)
      }))
      .on("dblclick.zoom", null)

    const g = svg.append("g")
      .attr("transform", `translate(${width < 768 ? 50 : width / 6},${height / 2})`)

    let i = 0
    const root = d3.hierarchy(data, (d: {children?: unknown[]}) => d.children)
    root.x0 = height / 2
    root.y0 = 0

    const tree = d3.tree().nodeSize([cardHeight + 24, cardWidth + 80])

    function collapse(d: {children?: unknown[], _children?: unknown[]}) {
      if (d.children) {
        d._children = d.children
        d._children.forEach(collapse)
        d.children = null
      }
    }

    if (root.children) {
      root.children.forEach(collapse)
    }

    function update(source: {x: number, y: number, x0: number, y0: number}) {
      const treeData = tree(root)
      const nodes = treeData.descendants()
      const links = treeData.links()

      const node = g.selectAll('g.node')
        .data(nodes, (d: {id?: number}) => d.id || (d.id = ++i))

      const nodeEnter = node.enter().append('g')
        .attr('class', (d: {depth: number}) => `node depth-${Math.min(d.depth, 4)}`)
        .attr("transform", () => `translate(${source.y0},${source.x0})`)
        .on('click', click)

      nodeEnter.append('rect')
        .attr('class', 'card-bg')
        .attr('width', cardWidth)
        .attr('height', cardHeight)
        .attr('x', 0)
        .attr('y', -cardHeight / 2)
        .attr('rx', 12)
        .attr('ry', 12)
        .style("opacity", 0)
        .style("fill", (d: {depth: number}) => {
          if (isDarkMode) {
            const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444']
            return colors[Math.min(d.depth, 4)]
          } else {
            const colors = ['#c7d2fe', '#bae6fd', '#bbf7d0', '#fde68a', '#fed7aa']
            return colors[Math.min(d.depth, 4)]
          }
        })
        .style("stroke", isDarkMode ? '#27272a' : '#e5e7eb')
        .style("stroke-width", "1px")

      nodeEnter.append('text')
        .attr("x", 16)
        .attr("y", -4)
        .style("font-size", "13px")
        .style("font-weight", "600")
        .style("fill", isDarkMode ? '#ffffff' : '#1f2937')
        .text((d: {data: {name: string}}) => d.data.name)
        .style("opacity", 0)

      nodeEnter.append('text')
        .attr("x", 16)
        .attr("y", 12)
        .style("font-size", "10px")
        .style("font-weight", "400")
        .style("fill", isDarkMode ? '#a1a1aa' : '#6b7280')
        .text((d: {data: {description?: string}}) => d.data.description || "")
        .style("opacity", 0)

      const indicator = nodeEnter.append('g')
        .attr('class', 'indicator')
        .attr('transform', `translate(${cardWidth}, 0)`)
        .style("opacity", (d: {_children?: unknown, children?: unknown}) => d._children || d.children ? 1 : 0)
        .style("cursor", "pointer")
        .on("click", (e: Event, d: {_children?: unknown, children?: unknown}) => {
          e.stopPropagation()
          click(e, d)
        })

      indicator.append('circle')
        .attr('r', 10)
        .attr('cx', 0)
        .attr('cy', 0)
        .style("fill", isDarkMode ? '#27272a' : '#ffffff')
        .style("stroke", isDarkMode ? '#3f3f46' : '#e5e7eb')
        .style("stroke-width", "1.5px")

      indicator.append('text')
        .attr('x', 0)
        .attr('y', 4)
        .attr('text-anchor', 'middle')
        .style("font-size", "12px")
        .style("fill", isDarkMode ? '#a1a1aa' : '#6b7280')
        .style("font-weight", "700")
        .text((d: {_children?: unknown}) => d._children ? "+" : "-")

      const nodeUpdate = nodeEnter.merge(node as never)

      nodeUpdate.transition()
        .duration(duration)
        .attr("transform", (d: {x: number, y: number}) => `translate(${d.y},${d.x})`)

      nodeUpdate.select('rect.card-bg')
        .style("opacity", 1)

      nodeUpdate.select('text').style("opacity", 1)

      nodeUpdate.select('.indicator')
        .style("opacity", (d: {_children?: unknown, children?: unknown}) => (d._children || d.children) ? 1 : 0)
        .select('text')
        .text((d: {_children?: unknown}) => d._children ? "+" : "-")

      const nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", () => `translate(${source.y},${source.x})`)
        .remove()

      nodeExit.select('rect').style('opacity', 0)
      nodeExit.select('text').style('opacity', 0)

      const link = g.selectAll('path.link')
        .data(links, (d: {target: {id: number}}) => d.target.id)

      const linkEnter = link.enter().insert('path', "g")
        .attr("class", "link")
        .style("fill", "none")
        .style("stroke", isDarkMode ? '#3f3f46' : '#cbd5e1')
        .style("stroke-width", "1.5px")
        .attr('d', () => {
          const o = { x: source.x0, y: source.y0 }
          return diagonal(o, o)
        })

      const linkUpdate = linkEnter.merge(link as never)

      linkUpdate.transition()
        .duration(duration)
        .attr('d', (d: {source: {x: number, y: number}, target: {x: number, y: number}}) => diagonal(d.source, d.target))

      link.exit().transition()
        .duration(duration)
        .attr('d', () => {
          const o = { x: source.x, y: source.y }
          return diagonal(o, o)
        })
        .remove()

      nodes.forEach((d: {x: number, y: number, x0: number, y0: number}) => {
        d.x0 = d.x
        d.y0 = d.y
      })
    }

    function diagonal(s: {x: number, y: number}, d: {x: number, y: number}) {
      return `M ${s.y + cardWidth} ${s.x}
              C ${(s.y + cardWidth + d.y) / 2} ${s.x},
                ${(s.y + cardWidth + d.y) / 2} ${d.x},
                ${d.y} ${d.x}`
    }

    function click(event: Event, d: {children?: unknown, _children?: unknown}) {
      if (d.children) {
        d._children = d.children
        d.children = null
      } else {
        d.children = d._children
        d._children = null
      }
      update(d as {x: number, y: number, x0: number, y0: number})
    }

    const zoomHandler = d3.zoom().on("zoom", (event: {transform: string}) => {
      g.attr("transform", event.transform)
    })
    
    svg.call(zoomHandler)
    svg.call(zoomHandler.transform, d3.zoomIdentity.translate(width < 768 ? 50 : 100, height / 2).scale(0.9))

    update(root)

  }, [d3Loaded, career, isDarkMode, mounted])

  if (!mounted) return null

  return (
    <>
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"
        onLoad={() => setD3Loaded(true)}
      />
      <DashboardLayout role="student">
        <div className="h-[calc(100vh-8rem)] flex flex-col">
          <div className={`p-6 rounded-xl border mb-4 ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800/50' : 'bg-white border-gray-200'}`}>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {careerData[career as keyof typeof careerData]?.name || 'Career Roadmap'}
            </h1>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
              Comprehensive Career Roadmap - Click nodes to expand/collapse
            </p>
          </div>
          
          <div 
            ref={containerRef}
            className={`flex-1 rounded-xl border overflow-hidden ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800/50' : 'bg-white border-gray-200'}`}
            style={{ cursor: 'grab', minHeight: '500px' }}
          />
        </div>
      </DashboardLayout>
    </>
  )
}
