'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import Script from 'next/script'
import Logo from '@/components/auth/Logo'
import WelcomeText from '@/components/auth/WelcomeText'
import LoginForm from '@/components/auth/LoginForm'
import LoginImage from '@/components/auth/LoginImage'
import AuthStyles from '@/components/auth/AuthStyles'
import Alert from '@/components/ui/Alert'

export default function AuthRole({ params }: { params: Promise<{ role: string }> }) {
  const router = useRouter()
  const { role } = use(params)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState<'success' | 'error' | 'warning' | 'info'>('info')
  
  const handleRoleChange = (newRole: string) => {
    router.push(`/auth/${newRole}`)
  }

  const handleShowAlert = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    setAlertMessage(message)
    setAlertType(type)
    setShowAlert(true)
  }

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" />
      <Script src="https://navchenta.in/aegis/js/aegis-auth-face.js" />
      <Script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js" />
      
      <div style={{display: 'flex', width: '100vw', minHeight: '100vh', margin: 0, padding: 0}}>
        <div style={{flex: 1, background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 80px', position: 'relative'}}>
          <div style={{maxWidth: '440px', width: '100%'}}>
            <Logo />
            <WelcomeText />
            <LoginForm currentRole={role} onRoleChange={handleRoleChange} onShowAlert={handleShowAlert} />
          </div>
        </div>
        <LoginImage />
      </div>

      <Alert 
        message={alertMessage}
        type={alertType}
        show={showAlert}
        onClose={() => setShowAlert(false)}
      />
      <AuthStyles />
    </>
  )
}