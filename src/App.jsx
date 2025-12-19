import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import NewsList from './components/NewsList'
import THEME from './config/theme'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    // Check if user is already logged in with animation
    setTimeout(() => {
      const loginHistory = localStorage.getItem('loginHistory')
      if (loginHistory && JSON.parse(loginHistory).length > 0) {
        setIsLoggedIn(true)
        const lastLogin = JSON.parse(loginHistory)[JSON.parse(loginHistory).length - 1]
        setUser(lastLogin.user)
      }
      setIsInitializing(false)
    }, 500)
  }, [])

  const handleLoginSuccess = (loginData) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setIsLoggedIn(true)
      setUser(loginData.user)
      setIsTransitioning(false)
    }, 600)
  }

  // Initial loading screen
  if (isInitializing) {
    return (
      <div 
        className="w-full min-h-screen flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${THEME.colors.teal[50]} 0%, ${THEME.colors.stone[100]} 100%)`
        }}
      >
        <div className="text-center">
          <div 
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 animate-pulse"
            style={{
              background: `linear-gradient(135deg, ${THEME.colors.teal[500]} 0%, ${THEME.colors.teal[700]} 100%)`,
              boxShadow: `0 20px 50px -15px ${THEME.colors.teal[600]}60`,
              animationDuration: '2s'
            }}
          >
            <span className="text-4xl">📰</span>
          </div>
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ 
              fontFamily: '"Playfair Display", Georgia, serif',
              color: THEME.colors.stone[900]
            }}
          >
            NewsHub
          </h1>
          <div className="flex gap-2 justify-center mt-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-full animate-bounce"
                style={{
                  backgroundColor: THEME.colors.teal[600],
                  animationDelay: `${i * 150}ms`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen">
      {/* Main content with smooth transitions */}
      <div
        className="transition-all duration-700"
        style={{
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? 'scale(0.98)' : 'scale(1)'
        }}
      >
        {!isLoggedIn ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          <NewsList />
        )}
      </div>

      {/* Transition overlay */}
      {isTransitioning && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 transition-all duration-500"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="text-center">
            <div 
              className="inline-flex items-center justify-center w-24 h-24 rounded-2xl mb-6"
              style={{
                background: `linear-gradient(135deg, ${THEME.colors.teal[500]} 0%, ${THEME.colors.teal[700]} 100%)`,
                boxShadow: `0 20px 60px -15px ${THEME.colors.teal[600]}80`,
                animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}
            >
              <span className="text-5xl animate-bounce" style={{ animationDuration: '1.5s' }}>
                📰
              </span>
            </div>
            <h2 
              className="text-2xl font-bold mb-2"
              style={{ 
                fontFamily: '"Playfair Display", Georgia, serif',
                color: THEME.colors.stone[900]
              }}
            >
              Welcome back, {user?.fullName?.split(' ')[0]}!
            </h2>
            <p 
              className="text-base mb-6"
              style={{ 
                fontFamily: '"DM Sans", system-ui, sans-serif',
                color: THEME.colors.stone[600]
              }}
            >
              Loading your personalized news feed...
            </p>
            <div className="flex gap-2 justify-center">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full animate-bounce"
                  style={{
                    backgroundColor: THEME.colors.teal[600],
                    animationDelay: `${i * 150}ms`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App