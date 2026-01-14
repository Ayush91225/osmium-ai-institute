import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { DarkModeProvider } from "@/contexts/DarkModeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SarvamTranslator } from "@/components/SarvamTranslator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Osmium AI | Institute",
  description: "Osmium AI - AI-Powered Education & Career Guidance Platform",
  icons: {
    icon: "https://osmium.co.in/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning style={{margin: 0, padding: 0, width: '100%', height: '100%'}}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                  },
                  colors: {
                    bg: '#F9F8F6',
                    surface: '#FFFFFF',
                    primary: '#1A1A1A',
                    secondary: '#888888',
                    sidebar: '#F9F8F6',
                    active: '#EAE5DE',
                    'accent': '#EAE6DF',
                    'accent-dark': '#D8D4CD',
                    'tag-bg': '#F2EDE4',
                    'tag-text': '#8C7B65',
                    'chart-blue': '#6EA8FE'
                  },
                  animation: {
                    'fade-in': 'fadeIn 0.3s ease-in-out',
                    'slide-in': 'slideIn 0.3s ease-out'
                  },
                  keyframes: {
                    fadeIn: {
                      '0%': { opacity: '0', transform: 'translateY(10px)' },
                      '100%': { opacity: '1', transform: 'translateY(0)' }
                    },
                    slideIn: {
                      '0%': { opacity: '0', transform: 'translateX(-10px)' },
                      '100%': { opacity: '1', transform: 'translateX(0)' }
                    }
                  }
                }
              }
            }
          `
        }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const saved = localStorage.getItem('darkMode')
                  const isDark = saved ? JSON.parse(saved) : false
                  const html = document.documentElement
                  const body = document.body
                  
                  if (isDark) {
                    html.classList.add('dark')
                    html.setAttribute('data-theme', 'dark')
                    html.style.colorScheme = 'dark'
                    html.style.backgroundColor = 'rgb(9 9 11 / 0.95)'
                    body.style.backgroundColor = 'rgb(9 9 11 / 0.95)'
                  } else {
                    html.classList.remove('dark')
                    html.setAttribute('data-theme', 'light')
                    html.style.colorScheme = 'light'
                    html.style.backgroundColor = '#F9F8F6'
                    body.style.backgroundColor = '#F9F8F6'
                  }
                } catch (e) {
                  document.documentElement.style.backgroundColor = '#F9F8F6'
                  document.body.style.backgroundColor = '#F9F8F6'
                }
              })()
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{margin: 0, padding: 0, width: '100%', height: '100%', overscrollBehavior: 'none', fontFamily: 'Inter, sans-serif'}}
      >
        <DarkModeProvider>
          <LanguageProvider>
            <SarvamTranslator />
            {children}
          </LanguageProvider>
        </DarkModeProvider>
        
        <Script 
          src="https://unpkg.com/@phosphor-icons/web" 
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}