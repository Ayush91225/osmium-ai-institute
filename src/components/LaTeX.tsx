'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    katex: any
  }
}

interface LaTeXProps {
  children: string
  inline?: boolean
  isDarkMode?: boolean
}

export default function LaTeX({ children, inline = true, isDarkMode = false }: LaTeXProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (ref.current && typeof window !== 'undefined') {
      if (!window.katex) {
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js'
        script.onload = () => {
          const mhchemScript = document.createElement('script')
          mhchemScript.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/mhchem.min.js'
          mhchemScript.onload = () => renderMath()
          document.head.appendChild(mhchemScript)
        }
        document.head.appendChild(script)

        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css'
        document.head.appendChild(link)
      } else {
        renderMath()
      }
    }
  }, [children, isDarkMode])

  const parseChemfig = (formula: string, isDark: boolean) => {
    const filterStyle = isDark ? 'filter: invert(1);' : ''
    
    // Benzene with Br substituent
    if (formula.includes('*6(-=-(-Br)=-=)')) {
      return `<svg width="60" height="60" viewBox="0 0 60 60" style="display:inline-block;vertical-align:middle;${filterStyle}">
        <polygon points="30,8 48,18 48,38 30,48 12,38 12,18" fill="none" stroke="#000000" stroke-width="1"/>
        <text x="30" y="52" text-anchor="middle" font-size="10" font-family="serif" fill="#000000">Br</text>
      </svg>`
    }
    
    // Benzene with I substituent  
    if (formula.includes('*6(=-=(-I)=-=)')) {
      return `<svg width="60" height="60" viewBox="0 0 60 60" style="display:inline-block;vertical-align:middle;${filterStyle}">
        <polygon points="30,8 48,18 48,38 30,48 12,38 12,18" fill="none" stroke="#000000" stroke-width="1"/>
        <text x="30" y="52" text-anchor="middle" font-size="10" font-family="serif" fill="#000000">I</text>
      </svg>`
    }
    
    // Regular benzene ring
    if (formula.includes('*6(=-=-=-)') || formula.includes('*6(-=-=-=)')) {
      return `<svg width="50" height="50" viewBox="0 0 50 50" style="display:inline-block;vertical-align:middle;${filterStyle}">
        <polygon points="25,5 43,15 43,35 25,45 7,35 7,15" fill="none" stroke="#000000" stroke-width="1"/>
      </svg>`
    }
    
    // Linear alkene chain
    if (formula.includes('CH_3-CH=CH-CH_3')) {
      return `<svg width="100" height="25" viewBox="0 0 100 25" style="display:inline-block;vertical-align:middle;${filterStyle}">
        <text x="2" y="18" font-size="10" font-family="serif" fill="#000000">CH₃</text>
        <line x1="18" y1="12" x2="28" y2="12" stroke="#000000" stroke-width="1"/>
        <text x="30" y="18" font-size="10" font-family="serif" fill="#000000">CH</text>
        <line x1="42" y1="10" x2="52" y2="10" stroke="#000000" stroke-width="1"/>
        <line x1="42" y1="14" x2="52" y2="14" stroke="#000000" stroke-width="1"/>
        <text x="54" y="18" font-size="10" font-family="serif" fill="#000000">CH</text>
        <line x1="66" y1="12" x2="76" y2="12" stroke="#000000" stroke-width="1"/>
        <text x="78" y="18" font-size="10" font-family="serif" fill="#000000">CH₃</text>
      </svg>`
    }
    
    return formula
  }

  const renderMath = () => {
    if (ref.current && window.katex) {
      try {
        if (children.includes('\\chemfig')) {
          const chemfigMatch = children.match(/\\chemfig\{([^}]+)\}/)
          if (chemfigMatch) {
            ref.current.innerHTML = parseChemfig(chemfigMatch[1], isDarkMode)
            return
          }
        }
        
        window.katex.render(children, ref.current, {
          displayMode: !inline,
          throwOnError: false,
          trust: true
        })
      } catch (error) {
        if (ref.current) {
          ref.current.textContent = children
        }
      }
    }
  }

  return <span ref={ref}>{children}</span>
}