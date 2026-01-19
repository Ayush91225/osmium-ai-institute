'use client'

import { useState, useEffect } from 'react'
import RoleSelector from './RoleSelector'

interface LoginFormProps {
  currentRole: string
  onRoleChange: (role: string) => void
  onShowAlert?: (message: string, type: 'success' | 'error' | 'warning' | 'info') => void
}

export default function LoginForm({ currentRole, onRoleChange, onShowAlert }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).lucide) {
      (window as any).lucide.createIcons()
    }
  }, [showPassword])

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate login
    if (email && password) {
      onShowAlert?.('Login successful!', 'success')
    } else {
      onShowAlert?.('Please fill in all fields', 'error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <RoleSelector currentRole={currentRole} onRoleChange={onRoleChange} />

      <div className="input-group">
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          autoComplete="username"
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="6+ strong character"
          autoComplete="current-password"
          required
        />
        <i 
          data-lucide={showPassword ? "eye-off" : "eye"} 
          className="eye-icon" 
          onClick={togglePassword}
        ></i>
      </div>

      <a href="../forgot/" className="forgot-pass">Forgot password?</a>

      <button type="submit" className="btn-continue">Continue</button>

      <div className="powered-by">
        <span>POWERED BY</span>
        <img 
          src="https://navchenta.in/aegis.png" 
          alt="AEGIS" 
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none'
          }}
        />
        <span>AEGIS AUTH</span>
      </div>
    </form>
  )
}