'use client'

import { useState, useEffect } from 'react'

interface ForgotFormProps {
  onShowAlert: (message: string, type: 'success' | 'error' | 'warning' | 'info') => void
  prefillEmail?: string
}

export default function ForgotForm({ onShowAlert, prefillEmail = '' }: ForgotFormProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (prefillEmail) {
      setEmail(prefillEmail)
    }
  }, [prefillEmail])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onShowAlert('Reset link sent to your email!', 'success')
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="input-group">
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          required
        />
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="btn-continue"
      >
        {isLoading ? 'Sending...' : 'Send Reset Link'}
      </button>

      <a href="/auth/admin" className="back-link">← Back to Login</a>
    </form>
  )
}