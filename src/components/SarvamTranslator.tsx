'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { translateText } from '@/lib/sarvam'

export function SarvamTranslator() {
  const { language } = useLanguage()
  const [isTranslating, setIsTranslating] = useState(false)

  useEffect(() => {
    if (language === 'en') return

    const translatePage = async () => {
      if (isTranslating) return
      setIsTranslating(true)

      const textNodes = getTextNodes(document.body)
      
      for (const node of textNodes) {
        const originalText = node.textContent?.trim()
        if (originalText && originalText.length > 0 && !isAlreadyTranslated(originalText)) {
          try {
            const translated = await translateText(originalText, language)
            if (translated !== originalText) {
              node.textContent = translated
            }
          } catch (error) {
            console.error('Translation failed for:', originalText)
          }
        }
      }
      
      setIsTranslating(false)
    }

    const timer = setTimeout(translatePage, 500)
    return () => clearTimeout(timer)
  }, [language, isTranslating])

  return null
}

function getTextNodes(element: Element): Text[] {
  const textNodes: Text[] = []
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        const parent = node.parentElement
        if (!parent) return NodeFilter.FILTER_REJECT
        
        // Skip script, style, and input elements
        const tagName = parent.tagName.toLowerCase()
        if (['script', 'style', 'input', 'textarea', 'select'].includes(tagName)) {
          return NodeFilter.FILTER_REJECT
        }
        
        // Skip if text is just whitespace
        if (!node.textContent?.trim()) {
          return NodeFilter.FILTER_REJECT
        }
        
        return NodeFilter.FILTER_ACCEPT
      }
    }
  )

  let node
  while (node = walker.nextNode()) {
    textNodes.push(node as Text)
  }
  
  return textNodes
}

function isAlreadyTranslated(text: string): boolean {
  // Simple check - if text contains non-Latin characters, assume it's translated
  return /[^\x00-\x7F]/.test(text)
}