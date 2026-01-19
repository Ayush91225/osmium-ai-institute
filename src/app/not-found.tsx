'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useDarkMode } from '@/contexts/DarkModeContext'

export default function NotFound() {
  const { isDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-8"></div>
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div style={{display: 'flex', width: '100vw', minHeight: '100vh', margin: 0, padding: 0, justifyContent: 'center', alignItems: 'center', background: '#ffffff'}}>
        {/* Centered Content */}
        <div style={{maxWidth: '440px', width: '100%', textAlign: 'center', padding: '60px 40px'}}>
          {/* Logo */}
          <div style={{marginBottom: '32px'}}>
            <Link href="/" style={{display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none'}}>
              <img src="https://osmium.co.in/cdnLogo" alt="Osmium AI" style={{width: '24px', height: '24px', objectFit: 'contain'}} />
              <span style={{fontSize: '18px', fontWeight: 300, color: '#0a0a0a'}}>Osmium AI</span>
            </Link>
          </div>

          {/* Error Video */}
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              style={{
                width: '300px',
                height: 'auto',
                objectFit: 'contain'
              }}
            >
              <source src="/assets/404.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Main Message */}
          <h1 style={{
            fontSize: '38px',
            fontWeight: 300,
            color: '#0a0a0a',
            marginBottom: '12px',
            lineHeight: 1.2,
            letterSpacing: '-0.02em'
          }}>
            Page Not Found
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '15px',
            fontWeight: 200,
            color: '#6b7280',
            lineHeight: 1.5,
            marginBottom: '48px'
          }}>
            The page you are looking for does not exist or has been moved to a different location.
          </p>

          {/* Action Buttons */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            <Link 
              href="/"
              style={{
                background: '#0a0a0a',
                color: '#ffffff',
                border: 'none',
                padding: '14px 20px',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: 300,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1f2937'
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#0a0a0a'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <i className="ph ph-house" style={{fontSize: '16px'}} />
              Return to Home
            </Link>
            
            <Link 
              href="/dashboard"
              style={{
                background: '#f9fafb',
                color: '#374151',
                border: '1.5px solid #e5e7eb',
                padding: '14px 20px',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: 300,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#d1d5db'
                e.currentTarget.style.background = '#f3f4f6'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb'
                e.currentTarget.style.background = '#f9fafb'
              }}
            >
              <i className="ph ph-squares-four" style={{fontSize: '16px'}} />
              Go to Dashboard
            </Link>
          </div>

          {/* Footer */}
          <div style={{
            marginTop: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontFamily: 'Courier New, Courier, monospace',
            fontSize: '11px',
            color: '#9ca3af',
            letterSpacing: '0.05em'
          }}>
            <span>Advanced Learning Management System</span>
          </div>
        </div>
      </div>

      {/* Auth Styles */}
      <style jsx global>{`
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
        }

        body {
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
            font-weight: 300;
            background: #ffffff;
            min-height: 100vh;
            overflow-x: hidden;
        }

        @media (max-width: 768px) {
            div[style*="padding: 60px 40px"] {
                padding: 40px 32px !important;
            }
        }

        @media (max-width: 480px) {
            div[style*="padding: 60px 40px"] {
                padding: 32px 24px !important;
            }
        }
      `}</style>
    </>
  )
}