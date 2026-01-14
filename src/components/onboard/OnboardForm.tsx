'use client'

import { useState } from 'react'
import InstituteTypeStep from './InstituteTypeStep'

interface OnboardFormProps {
  currentStep: number
  onNext: () => void
  onPrev: () => void
  onSubmit: (data: any) => void
  onShowAlert: (message: string, type: 'success' | 'error' | 'warning' | 'info') => void
}

export default function OnboardForm({ currentStep, onNext, onPrev, onSubmit, onShowAlert }: OnboardFormProps) {
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    email: '',
    phone: '',
    website: '',
    signatory_name: '',
    signatory_email: '',
    signatory_phone: '',
    signatory_aadhar: '',
    address: '',
    maps_url: '',
    admin_password: ''
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateStep = (step: number) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^\+[1-9]\d{1,14}$/
    const urlRegex = /^https?:\/\/.+\..+/
    const aadharRegex = /^\d{12}$/
    
    switch (step) {
      case 1:
        if (!formData.type) {
          onShowAlert('Please select your institute type', 'error')
          return false
        }
        break
      case 2:
        if (!formData.name || !formData.email || !formData.phone || !formData.website) {
          onShowAlert('Please fill in all required fields', 'error')
          return false
        }
        if (formData.name.length < 2) {
          onShowAlert('Institute name must be at least 2 characters', 'error')
          return false
        }
        if (!emailRegex.test(formData.email)) {
          onShowAlert('Please enter a valid email address', 'error')
          return false
        }
        if (!phoneRegex.test(formData.phone)) {
          onShowAlert('Please enter a valid phone number with country code (e.g., +91xxxxxxxxxx)', 'error')
          return false
        }
        if (!urlRegex.test(formData.website)) {
          onShowAlert('Please enter a valid website URL', 'error')
          return false
        }
        break
      case 3:
        if (!formData.signatory_name || !formData.signatory_email || !formData.signatory_phone || !formData.signatory_aadhar) {
          onShowAlert('Please fill in all required signatory details', 'error')
          return false
        }
        if (formData.signatory_name.length < 2) {
          onShowAlert('Signatory name must be at least 2 characters', 'error')
          return false
        }
        if (!emailRegex.test(formData.signatory_email)) {
          onShowAlert('Please enter a valid signatory email address', 'error')
          return false
        }
        if (!phoneRegex.test(formData.signatory_phone)) {
          onShowAlert('Please enter a valid signatory phone number with country code', 'error')
          return false
        }
        if (!aadharRegex.test(formData.signatory_aadhar.replace(/\s/g, ''))) {
          onShowAlert('Please enter a valid 12-digit Aadhar number', 'error')
          return false
        }
        break
      case 4:
        if (!formData.address || !formData.admin_password || !formData.maps_url) {
          onShowAlert('Please fill in all required fields', 'error')
          return false
        }
        if (formData.address.length < 10) {
          onShowAlert('Please enter a complete address', 'error')
          return false
        }
        if (formData.admin_password.length < 8) {
          onShowAlert('Password must be at least 8 characters', 'error')
          return false
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.admin_password)) {
          onShowAlert('Password must contain at least one uppercase letter, one lowercase letter, and one number', 'error')
          return false
        }
        if (!urlRegex.test(formData.maps_url)) {
          onShowAlert('Please enter a valid Google Maps URL', 'error')
          return false
        }
        break
    }
    return true
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      onNext()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(currentStep)) return

    setIsLoading(true)
    try {
      await onSubmit(formData)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Step 1: Institute Type */}
      {currentStep === 1 && (
        <InstituteTypeStep
          selectedType={formData.type}
          onTypeSelect={(type) => handleInputChange('type', type)}
        />
      )}

      {/* Step 2: Institute Information */}
      {currentStep === 2 && (
        <div className="form-step active">
          <div className="input-group">
            <label htmlFor="instituteName">Institute Name *</label>
            <input
              type="text"
              id="instituteName"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your institute name"
              minLength={2}
              title="Institute name must be at least 2 characters"
              required
            />
          </div>
          
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="instituteEmail">Institute Email *</label>
              <input
                type="email"
                id="instituteEmail"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="contact@institute.edu"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="institutePhone">Institute Phone *</label>
              <input
                type="tel"
                id="institutePhone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+91 98765 43210"
                pattern="\+[1-9]\d{1,14}"
                title="Please enter phone number with country code (e.g., +91xxxxxxxxxx)"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="instituteWebsite">Website *</label>
            <input
              type="url"
              id="instituteWebsite"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              placeholder="https://www.institute.edu"
              required
            />
          </div>
        </div>
      )}

      {/* Step 3: Signatory Details */}
      {currentStep === 3 && (
        <div className="form-step active">
          <div className="input-group">
            <label htmlFor="signatoryName">Signatory Name *</label>
            <input
              type="text"
              id="signatoryName"
              value={formData.signatory_name}
              onChange={(e) => handleInputChange('signatory_name', e.target.value)}
              placeholder="Full name of authorized person"
              minLength={2}
              title="Signatory name must be at least 2 characters"
              required
            />
          </div>
          
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="signatoryEmail">Signatory Email *</label>
              <input
                type="email"
                id="signatoryEmail"
                value={formData.signatory_email}
                onChange={(e) => handleInputChange('signatory_email', e.target.value)}
                placeholder="signatory@institute.edu"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="signatoryPhone">Signatory Phone *</label>
              <input
                type="tel"
                id="signatoryPhone"
                value={formData.signatory_phone}
                onChange={(e) => handleInputChange('signatory_phone', e.target.value)}
                placeholder="+91 98765 43210"
                pattern="\+[1-9]\d{1,14}"
                title="Please enter phone number with country code (e.g., +91xxxxxxxxxx)"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="signatoryAadhar">Aadhar Number *</label>
            <input
              type="text"
              id="signatoryAadhar"
              value={formData.signatory_aadhar}
              onChange={(e) => handleInputChange('signatory_aadhar', e.target.value.replace(/\D/g, ''))}
              placeholder="123456789012"
              maxLength={12}
              pattern="\d{12}"
              title="Please enter a valid 12-digit Aadhar number"
              required
            />
          </div>
        </div>
      )}

      {/* Step 4: Location & Setup */}
      {currentStep === 4 && (
        <div className="form-step active">
          <div className="input-group">
            <label htmlFor="address">Institute Address *</label>
            <textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Enter complete address with city, state, and pincode"
              minLength={10}
              title="Please enter a complete address"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="mapsUrl">Google Maps URL *</label>
            <input
              type="url"
              id="mapsUrl"
              value={formData.maps_url}
              onChange={(e) => handleInputChange('maps_url', e.target.value)}
              placeholder="https://maps.google.com/..."
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="adminPassword">Admin Password *</label>
            <input
              type="password"
              id="adminPassword"
              value={formData.admin_password}
              onChange={(e) => handleInputChange('admin_password', e.target.value)}
              placeholder="Create a strong password (8+ characters)"
              pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}"
              title="Password must be at least 8 characters with uppercase, lowercase, and number"
              required
              minLength={8}
            />
          </div>
        </div>
      )}

      <div className="btn-group">
        {currentStep > 1 && (
          <button type="button" className="btn btn-secondary" onClick={onPrev}>
            Previous
          </button>
        )}
        {currentStep < 4 ? (
          <button type="button" className="btn btn-primary" onClick={handleNext}>
            Next
          </button>
        ) : (
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Creating Institute...' : 'Create Institute'}
          </button>
        )}
      </div>
    </form>
  )
}