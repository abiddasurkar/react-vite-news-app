import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import NewsList from './components/NewsList'
import THEME from './config/theme'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    // Check if user is already logged in
    const loginHistory = localStorage.getItem('loginHistory')
    if (loginHistory && JSON.parse(loginHistory).length > 0) {
      setIsLoggedIn(true)
      const lastLogin = JSON.parse(loginHistory)[JSON.parse(loginHistory).length - 1]
      setUser(lastLogin.user)
    }
  }, [])

  const handleLoginSuccess = (loginData) => {
    setIsTransitioning(true)
    // Simulate transition delay for smooth effect
    setTimeout(() => {
      setIsLoggedIn(true)
      setUser(loginData.user)
      setIsTransitioning(false)
    }, 300)
  }

  return (
    <div
      className="w-full min-h-screen transition-all duration-500"
      style={{
        backgroundColor: isLoggedIn ? THEME.colors.neutral[50] : THEME.colors.primary.dark,
      }}
    >
      {/* Smooth fade transition */}
      <div
        className="transition-opacity duration-300"
        style={{
          opacity: isTransitioning ? 0 : 1,
        }}
      >
        {!isLoggedIn ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          <NewsList />
        )}
      </div>

      {/* Loading overlay during transition */}
      {isTransitioning && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(4px)',
            zIndex: 9999,
          }}
        >
          <div className="text-center">
            <div className="text-5xl mb-4 animate-bounce" style={{ animationDuration: '1.5s' }}>
              📰
            </div>
            <p
              className="text-gray-600 font-semibold"
              style={{ fontFamily: THEME.typography.display.family }}
            >
              Loading your news feed...
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App