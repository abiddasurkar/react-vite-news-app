import React, { useState } from 'react'
import THEME from '../config/theme'

// InputField component defined outside to prevent re-creation on each render
const InputField = ({ label, name, type, placeholder, icon, value, onChange, onFocus, onBlur, focusedField }) => (
  <div className="mb-5">
    <label
      htmlFor={name}
      className="block text-sm font-semibold mb-2 transition-colors duration-200"
      style={{ 
        fontFamily: '"DM Sans", system-ui, sans-serif',
        color: focusedField === name ? THEME.colors.teal[600] : THEME.colors.stone[700]
      }}
    >
      {label}
    </label>
    <div className="relative group">
      <div 
        className="absolute left-4 top-1/2 -translate-y-1/2 text-xl transition-all duration-300"
        style={{
          opacity: focusedField === name ? 1 : 0.4,
          transform: focusedField === name 
            ? 'translateY(-50%) scale(1.1)' 
            : 'translateY(-50%) scale(1)'
        }}
      >
        {icon}
      </div>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        className="w-full pl-14 pr-4 py-3.5 text-base transition-all duration-300 rounded-xl border-2 focus:outline-none"
        style={{
          fontFamily: '"DM Sans", system-ui, sans-serif',
          backgroundColor: focusedField === name ? THEME.colors.teal[50] : THEME.colors.stone[50],
          borderColor: focusedField === name ? THEME.colors.teal[600] : THEME.colors.stone[200],
          color: THEME.colors.stone[900],
          boxShadow: focusedField === name 
            ? `0 0 0 4px ${THEME.colors.teal[600]}15, 0 10px 25px -5px ${THEME.colors.teal[600]}30`
            : '0 1px 3px rgba(0,0,0,0.05)'
        }}
      />
    </div>
  </div>
)

export default function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (error) setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Validation
    if (!formData.email || !formData.password || !formData.fullName) {
      setError('All fields are required')
      setLoading(false)
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      const loginData = {
        timestamp: new Date().toISOString(),
        user: {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        },
      }

      localStorage.setItem(
        'loginHistory',
        JSON.stringify([
          ...JSON.parse(localStorage.getItem('loginHistory') || '[]'),
          loginData,
        ])
      )

      setFormData({ email: '', password: '', fullName: '' })
      setLoading(false)
      onLoginSuccess(loginData)
    }, 800)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, ${THEME.colors.teal[400]}15 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, ${THEME.colors.amber[400]}15 0%, transparent 50%),
            linear-gradient(135deg, ${THEME.colors.teal[50]} 0%, ${THEME.colors.stone[100]} 100%)
          `
        }}
      />

      {/* Decorative floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ 
            background: `radial-gradient(circle, ${THEME.colors.teal[400]} 0%, transparent 70%)`,
            animationDuration: '4s'
          }}
        />
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ 
            background: `radial-gradient(circle, ${THEME.colors.amber[400]} 0%, transparent 70%)`,
            animationDuration: '6s',
            animationDelay: '1s'
          }}
        />
      </div>

      {/* Main content */}
      <div className="w-full max-w-md relative z-10">
        {/* Logo and branding */}
        <div className="text-center mb-8">
          <div 
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 transform transition-transform duration-300 hover:scale-110"
            style={{
              background: `linear-gradient(135deg, ${THEME.colors.teal[500]} 0%, ${THEME.colors.teal[700]} 100%)`,
              boxShadow: `0 10px 40px -10px ${THEME.colors.teal[600]}60`
            }}
          >
            <span className="text-4xl">📰</span>
          </div>
          <h1 
            className="text-4xl font-bold mb-2 tracking-tight"
            style={{ 
              fontFamily: '"Playfair Display", Georgia, serif',
              color: THEME.colors.stone[900]
            }}
          >
            NewsHub
          </h1>
          <p 
            className="text-base"
            style={{ 
              fontFamily: '"DM Sans", system-ui, sans-serif',
              color: THEME.colors.stone[600]
            }}
          >
            Your daily dose of curated news
          </p>
        </div>

        {/* Login card */}
        <div 
          className="rounded-2xl p-8 backdrop-blur-xl border transition-all duration-300"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderColor: THEME.colors.stone[200],
            boxShadow: '0 20px 60px -15px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.5)'
          }}
        >
          {/* Error message */}
          {error && (
            <div 
              className="mb-6 p-4 rounded-xl border-l-4 animate-in fade-in slide-in-from-top-2"
              style={{
                backgroundColor: THEME.colors.red[100],
                borderColor: THEME.colors.red[500]
              }}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl">⚠️</span>
                <div>
                  <p 
                    className="text-sm font-semibold"
                    style={{ 
                      fontFamily: '"DM Sans", system-ui, sans-serif',
                      color: THEME.colors.red[900]
                    }}
                  >
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <InputField
              label="Full Name"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              icon="👤"
              value={formData.fullName}
              onChange={handleChange}
              onFocus={() => setFocusedField('fullName')}
              onBlur={() => setFocusedField(null)}
              focusedField={focusedField}
            />

            <InputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              icon="✉️"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              focusedField={focusedField}
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="At least 6 characters"
              icon="🔒"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              focusedField={focusedField}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-semibold text-base transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 mt-2"
              style={{
                fontFamily: '"DM Sans", system-ui, sans-serif',
                background: loading 
                  ? THEME.colors.stone[400]
                  : `linear-gradient(135deg, ${THEME.colors.teal[500]} 0%, ${THEME.colors.teal[700]} 100%)`,
                color: 'white',
                boxShadow: loading 
                  ? 'none'
                  : `0 10px 30px -10px ${THEME.colors.teal[600]}60, 0 0 0 1px ${THEME.colors.teal[700]}20`
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                      fill="none"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing you in...
                </span>
              ) : (
                'Continue to NewsHub'
              )}
            </button>

            <p 
              className="text-center text-xs mt-6"
              style={{ 
                fontFamily: '"DM Sans", system-ui, sans-serif',
                color: THEME.colors.stone[500]
              }}
            >
              Demo Mode • Any credentials work (6+ character password)
            </p>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p 
            className="text-sm flex items-center justify-center gap-2"
            style={{ 
              fontFamily: '"DM Sans", system-ui, sans-serif',
              color: THEME.colors.stone[600]
            }}
          >
            <span className="text-teal-600">🔒</span>
            Your privacy is protected
          </p>
        </div>
      </div>
    </div>
  )
}