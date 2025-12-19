import React, { useState } from 'react'
import THEME from '../config/theme'

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

      console.log('Login Data (JSON):', JSON.stringify(loginData, null, 2))

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
    }, 500)
  }

  const InputField = ({ label, name, type, placeholder, icon }) => (
    <div className="mb-6">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 mb-2"
        style={{ fontFamily: THEME.typography.display.family }}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          onFocus={() => setFocusedField(name)}
          onBlur={() => setFocusedField(null)}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 text-gray-900 placeholder-gray-400
            border-2 transition-all duration-300
            rounded-lg focus:outline-none
            ${
              focusedField === name
                ? 'border-blue-500 shadow-lg shadow-blue-500/20 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }
          `}
          style={{ fontSize: THEME.typography.body.sizes.base }}
        />
      </div>
    </div>
  )

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: THEME.gradients.primary,
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ backgroundColor: THEME.colors.primary.main }}
        ></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{
            backgroundColor: THEME.colors.secondary.main,
            animationDelay: '1s',
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div
          className="bg-white rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl"
          style={{
            boxShadow: THEME.shadows.elevation,
          }}
        >
          {/* Header */}
          <div
            className="px-8 py-10 text-white relative overflow-hidden"
            style={{
              background: THEME.gradients.primary,
            }}
          >
            {/* Decorative element */}
            <div
              className="absolute top-0 right-0 w-40 h-40 opacity-10 rounded-full"
              style={{ backgroundColor: 'white' }}
            ></div>

            <div className="relative z-10">
              <div className="mb-4 text-5xl animate-bounce" style={{ animationDuration: '2s' }}>
                📰
              </div>
              <h1
                className="text-4xl font-bold mb-2"
                style={{ fontFamily: THEME.typography.display.family }}
              >
                NewsHub
              </h1>
              <p className="text-blue-100 text-sm">
                Stay informed, stay connected
              </p>
            </div>
          </div>

          {/* Form Container */}
          <form onSubmit={handleSubmit} className="px-8 py-8">
            {/* Error Alert */}
            {error && (
              <div
                className="mb-6 p-4 rounded-lg border-l-4 bg-red-50 border-red-500 animate-in fade-in slide-in-from-top-2"
                style={{
                  animation: `slideDown ${THEME.transitions.base}`,
                }}
              >
                <div className="flex gap-3">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <p className="font-semibold text-red-800 text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Form Fields */}
            <InputField
              label="Full Name"
              name="fullName"
              type="text"
              placeholder="John Doe"
              icon="👤"
            />

            <InputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@example.com"
              icon="✉️"
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              icon="🔐"
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`
                w-full font-semibold py-3 rounded-lg text-white
                transition-all duration-300 transform
                ${
                  loading
                    ? 'opacity-75 cursor-not-allowed'
                    : 'hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 active:scale-95'
                }
              `}
              style={{
                background: THEME.gradients.primary,
                fontFamily: THEME.typography.display.family,
                fontSize: THEME.typography.body.sizes.base,
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span
                    className="inline-block h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"
                  ></span>
                  Logging in...
                </span>
              ) : (
                'Login'
              )}
            </button>

            {/* Footer Text */}
            <p
              className="text-center text-gray-500 text-xs mt-6"
              style={{
                fontFamily: THEME.typography.body.family,
              }}
            >
              Demo Mode: Use any email/password (min 6 chars)
            </p>
          </form>
        </div>

        {/* Trust Indicators */}
        <div className="mt-6 text-center text-white text-xs">
          <p>🔒 Your data is secure</p>
        </div>
      </div>
    </div>
  )
}