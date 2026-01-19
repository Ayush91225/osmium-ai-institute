'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Script from 'next/script'
import Logo from '@/components/auth/Logo'
import ForgotWelcomeText from '@/components/forgot/ForgotWelcomeText'
import ForgotForm from '@/components/forgot/ForgotForm'
import ForgotStyles from '@/components/forgot/ForgotStyles'
import Alert from '@/components/ui/Alert'

function ForgotPasswordContent() {
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState<'success' | 'error' | 'warning' | 'info'>('info')
  const [prefillEmail, setPrefillEmail] = useState('')
  const searchParams = useSearchParams()

  useEffect(() => {
    const email = searchParams.get('email')
    if (email) {
      setPrefillEmail(decodeURIComponent(email))
    }
  }, [searchParams])

  const handleShowAlert = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    setAlertMessage(message)
    setAlertType(type)
    setShowAlert(true)
  }

  return (
    <>
      <div style={{display: 'flex', width: '100vw', minHeight: '100vh', margin: 0, padding: 0, justifyContent: 'center'}}>
        <div style={{flex: 1, background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 80px', position: 'relative', maxWidth: '100%'}}>
          <div style={{maxWidth: '440px', width: '100%'}}>
            <Logo />
            <ForgotWelcomeText />
            <ForgotForm onShowAlert={handleShowAlert} prefillEmail={prefillEmail} />
          </div>
        </div>
      </div>

      <Alert 
        message={alertMessage}
        type={alertType}
        show={showAlert}
        onClose={() => setShowAlert(false)}
      />
    </>
  )
}

export default function ForgotPassword() {
  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" />
      <Script src="https://navchenta.in/aegis/js/aegis-auth-face.js" />
      
      <Suspense fallback={
        <div style={{display: 'flex', width: '100vw', minHeight: '100vh', margin: 0, padding: 0, justifyContent: 'center', alignItems: 'center'}}>
          <div>Loading...</div>
        </div>
      }>
        <ForgotPasswordContent />
      </Suspense>
      
      <ForgotStyles />
    </>
  )
}