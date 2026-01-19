'use client'

import { useState } from 'react'
import Script from 'next/script'
import Logo from '@/components/auth/Logo'
import ProgressBar from '@/components/onboard/ProgressBar'
import StepIndicator from '@/components/onboard/StepIndicator'
import OnboardForm from '@/components/onboard/OnboardForm'
import OnboardStyles from '@/components/onboard/OnboardStyles'
import Alert from '@/components/ui/Alert'

export default function OnboardInstitute() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState<'success' | 'error' | 'warning' | 'info'>('info')

  const totalSteps = 4

  const stepTitles = {
    1: "Institute Type",
    2: "Institute Information", 
    3: "Signatory Details",
    4: "Location & Setup"
  }

  const stepSubtitles = {
    1: "What type of educational institute are you?",
    2: "Let's set up your institute profile",
    3: "Add details of the authorized signatory", 
    4: "Complete your setup with location and admin access"
  }

  const handleShowAlert = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    setAlertMessage(message)
    setAlertType(type)
    setShowAlert(true)
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (data: any) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      handleShowAlert('Institute created successfully! Redirecting to login...', 'success')
      setTimeout(() => {
        window.location.href = '/auth/admin'
      }, 2000)
    } catch (error) {
      handleShowAlert('Something went wrong. Please try again.', 'error')
    }
  }

  return (
    <>
      <Script src="https://navchenta.in/aegis/js/aegis-auth-face.js" />
      <Script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js" />
      
      <div style={{display: 'flex', width: '100vw', minHeight: '100vh', margin: 0, padding: 0}}>
        <div style={{flex: 1, background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, position: 'sticky', top: 0, height: '100vh', overflow: 'hidden'}} className="left-section">
          <img 
            src="/assets/auth/login.png" 
            alt="Onboarding" 
            style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center'}}
          />
        </div>

        <div style={{flex: 2, background: '#fafbfc', minHeight: '100vh', overflowY: 'auto', overflowX: 'hidden', padding: '40px 60px', WebkitOverflowScrolling: 'touch', overscrollBehavior: 'none'}}>
          <div style={{maxWidth: '480px', width: '100%', margin: '0 auto'}}>
            <div style={{marginBottom: '32px'}}>
              <Logo />
            </div>

            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

            <div className="welcome-text">
              <h1>{stepTitles[currentStep as keyof typeof stepTitles]}</h1>
              <p className="subtitle">{stepSubtitles[currentStep as keyof typeof stepSubtitles]}</p>
            </div>

            <OnboardForm
              currentStep={currentStep}
              onNext={handleNext}
              onPrev={handlePrev}
              onSubmit={handleSubmit}
              onShowAlert={handleShowAlert}
            />
          </div>
        </div>
      </div>

      <Alert 
        message={alertMessage}
        type={alertType}
        show={showAlert}
        onClose={() => setShowAlert(false)}
      />
      <OnboardStyles />
    </>
  )
}