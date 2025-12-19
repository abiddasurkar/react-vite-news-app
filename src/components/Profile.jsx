import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import THEME from '../config/theme'

export default function Profile() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [loginHistory, setLoginHistory] = useState([])

  useEffect(() => {
    const history = localStorage.getItem('loginHistory')
    if (history) {
      const parsedHistory = JSON.parse(history)
      setLoginHistory(parsedHistory)
      if (parsedHistory.length > 0) {
        setUserData(parsedHistory[parsedHistory.length - 1].user)
      }
    }
  }, [])

  const handleClearHistory = () => {
    localStorage.removeItem('loginHistory')
    navigate('/login')
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p>No user data found</p>
      </div>
    )
  }

  return (
    <div className="py-8">
      <h1 
        className="text-3xl font-bold mb-8"
        style={{ 
          fontFamily: '"Playfair Display", Georgia, serif',
          color: THEME.colors.stone[900]
        }}
      >
        Profile
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* User Info Card */}
        <div 
          className="rounded-2xl p-6 border backdrop-blur-sm"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderColor: THEME.colors.stone[200],
            boxShadow: '0 10px 40px -15px rgba(0,0,0,0.1)'
          }}
        >
          <div className="flex items-start gap-4 mb-6">
            <div 
              className="w-20 h-20 rounded-xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${THEME.colors.teal[500]} 0%, ${THEME.colors.teal[700]} 100%)`,
                boxShadow: `0 8px 32px -10px ${THEME.colors.teal[600]}40`
              }}
            >
              <span className="text-3xl">👤</span>
            </div>
            <div>
              <h2 
                className="text-xl font-bold mb-1"
                style={{ color: THEME.colors.stone[900] }}
              >
                {userData.fullName}
              </h2>
              <p 
                className="text-sm"
                style={{ color: THEME.colors.stone[600] }}
              >
                {userData.email}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label 
                className="block text-xs font-semibold uppercase mb-1"
                style={{ color: THEME.colors.stone[500] }}
              >
                Member Since
              </label>
              <p style={{ color: THEME.colors.stone[700] }}>
                {new Date(loginHistory[0]?.timestamp).toLocaleDateString()}
              </p>
            </div>
            <div>
              <label 
                className="block text-xs font-semibold uppercase mb-1"
                style={{ color: THEME.colors.stone[500] }}
              >
                Total Logins
              </label>
              <p style={{ color: THEME.colors.stone[700] }}>
                {loginHistory.length}
              </p>
            </div>
          </div>
        </div>

        {/* Login History Card */}
        <div 
          className="rounded-2xl p-6 border backdrop-blur-sm"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderColor: THEME.colors.stone[200],
            boxShadow: '0 10px 40px -15px rgba(0,0,0,0.1)'
          }}
        >
          <h3 
            className="text-xl font-bold mb-4"
            style={{ color: THEME.colors.stone[900] }}
          >
            Login History
          </h3>
          
          <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
            {loginHistory.map((login, index) => (
              <div 
                key={index}
                className="p-3 rounded-lg border transition-all duration-200 hover:border-teal-200"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  borderColor: THEME.colors.stone[200]
                }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p 
                      className="font-medium text-sm"
                      style={{ color: THEME.colors.stone[800] }}
                    >
                      {new Date(login.timestamp).toLocaleDateString()}
                    </p>
                    <p 
                      className="text-xs"
                      style={{ color: THEME.colors.stone[500] }}
                    >
                      {new Date(login.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                  <span 
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: index === 0 
                        ? THEME.colors.teal[100] 
                        : THEME.colors.stone[100],
                      color: index === 0 
                        ? THEME.colors.teal[700] 
                        : THEME.colors.stone[700]
                    }}
                  >
                    {index === 0 ? 'Latest' : `#${loginHistory.length - index}`}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {loginHistory.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="mt-6 w-full py-2.5 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: THEME.colors.stone[100],
                color: THEME.colors.stone[700],
                border: `1px solid ${THEME.colors.stone[200]}`
              }}
            >
              Clear History & Logout
            </button>
          )}
        </div>
      </div>
    </div>
  )
}