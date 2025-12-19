import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import THEME from '../config/theme'

export default function Layout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [currentUser, setCurrentUser] = useState(null)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  // Load current user on route change
  useEffect(() => {
    const userSession = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser')
    if (userSession) {
      try {
        const parsedUser = JSON.parse(userSession)
        setCurrentUser(parsedUser)
      } catch (error) {
        console.error('Error parsing user session:', error)
      }
    }
  }, [location.pathname])

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = showLogoutConfirm ? 'hidden' : ''
  }, [showLogoutConfirm])

  const isLoggedIn = !!currentUser || !!localStorage.getItem('loginHistory')

  const handleLogout = () => {
    setIsLoggingOut(true)
    setTimeout(() => {
      localStorage.removeItem('currentUser')
      sessionStorage.removeItem('currentUser')
      setCurrentUser(null)
      setIsLoggingOut(false)
      setShowLogoutConfirm(false)
      navigate('/login', {
        state: { message: 'You have been logged out successfully.', type: 'info' }
      })
    }, 500)
  }

  const getCurrentUserData = () => {
    if (currentUser) return currentUser.user || currentUser
    const loginHistory = JSON.parse(localStorage.getItem('loginHistory') || '[]')
    return loginHistory.length > 0 ? loginHistory[0].user : null
  }

  const userData = getCurrentUserData()
  const shouldShowNav = isLoggedIn && location.pathname !== '/login'

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      {shouldShowNav && (
        <nav 
          className="sticky top-0 z-40 w-full border-b backdrop-blur-lg"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderColor: THEME.colors.stone[200],
            boxShadow: '0 1px 20px rgba(0, 0, 0, 0.05)'
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/news" className="flex items-center gap-3 group">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-active:scale-95"
                  style={{
                    background: `linear-gradient(135deg, ${THEME.colors.teal[500]} 0%, ${THEME.colors.teal[700]} 100%)`,
                    boxShadow: `0 4px 20px -5px ${THEME.colors.teal[600]}40`
                  }}
                >
                  <span className="text-xl">📰</span>
                </div>
                <span 
                  className="text-xl font-bold"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif', color: THEME.colors.stone[900] }}
                >
                  NewsHub
                </span>
              </Link>

              <div className="flex items-center gap-8">
                <Link 
                  to="/news"
                  className={`relative text-sm font-medium transition-all duration-200 py-1 ${
                    location.pathname === '/news' ? 'text-teal-600' : 'text-stone-600 hover:text-stone-900'
                  }`}
                  style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
                >
                  News Feed
                  {location.pathname === '/news' && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 rounded-full" style={{ backgroundColor: THEME.colors.teal[600] }}/>
                  )}
                </Link>
                
                {/* <Link 
                  to="/profile"
                  className={`relative text-sm font-medium transition-all duration-200 py-1 ${
                    location.pathname === '/profile' ? 'text-teal-600' : 'text-stone-600 hover:text-stone-900'
                  }`}
                  style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
                >
                  Profile
                  {location.pathname === '/profile' && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 rounded-full" style={{ backgroundColor: THEME.colors.teal[600] }}/>
                  )}
                </Link> */}

                {userData && (
                  <div className="flex items-center gap-4 pl-4 border-l" style={{ borderColor: THEME.colors.stone[200] }}>
                    <div className="text-right">
                      <p className="text-sm font-semibold truncate max-w-[150px]" style={{ fontFamily: '"DM Sans", system-ui, sans-serif', color: THEME.colors.stone[900] }} title={userData.fullName}>
                        {userData.fullName || 'User'}
                      </p>
                      <p className="text-xs truncate max-w-[150px]" style={{ color: THEME.colors.stone[500] }} title={userData.email}>
                        {userData.email || ''}
                      </p>
                    </div>
                    
                    <div className="relative">
                      <button
                        onClick={() => setShowLogoutConfirm(true)}
                        disabled={isLoggingOut}
                        className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          fontFamily: '"DM Sans", system-ui, sans-serif',
                          backgroundColor: THEME.colors.stone[100],
                          color: THEME.colors.stone[700],
                          border: `1px solid ${THEME.colors.stone[200]}`,
                          minWidth: '80px'
                        }}
                      >
                        {isLoggingOut ? 'Logging out...' : 'Logout'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Main content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center shadow-lg">
            <p className="mb-6 font-semibold text-lg" style={{ color: THEME.colors.stone[900] }}>
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg text-white font-medium"
                style={{ backgroundColor: THEME.colors.teal[600] }}
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 rounded-lg font-medium border"
                style={{ borderColor: THEME.colors.stone[300], color: THEME.colors.stone[700] }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
