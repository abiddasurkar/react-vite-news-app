import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import THEME from './config/theme'

// Lazy load components
const Login = lazy(() => import('./components/Login'))
const NewsList = lazy(() => import('./components/NewsList'))

// Loading screen
const LoadingScreen = () => (
  <div 
    className="min-h-screen flex items-center justify-center"
    style={{
      background: `linear-gradient(135deg, ${THEME.colors.teal[50]} 0%, ${THEME.colors.stone[100]} 100%)`
    }}
  >
    <div className="text-center text-xl font-semibold text-teal-600">Loading...</div>
  </div>
)

// Custom hook to check authentication
const useAuth = () => {
  const currentUser = localStorage.getItem('currentUser')
  console.log('Checking authentication:', !!currentUser)
  return { isAuthenticated: !!currentUser }
}

// Component to handle route-based redirects
const AuthRedirect = ({ children, requireAuth = false }) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  console.log('AuthRedirect:', { path: location.pathname, requireAuth, isAuthenticated })

  if (requireAuth && !isAuthenticated) {
    console.log('Redirecting to /login because user is not authenticated')
    return <Navigate to="/login" replace />
  }

  if (!requireAuth && isAuthenticated) {
    console.log('Redirecting to /news because user is already authenticated')
    return <Navigate to="/news" replace />
  }

  console.log('Rendering route:', location.pathname)
  return children
}

function App() {
  console.log('App rendered')

  return (
    <Router basename="/react-vite-news-app">
      <Suspense fallback={<LoadingScreen />}>
        <Layout>
          <Routes>
            {/* Default route redirects based on auth */}
            <Route 
              path="/" 
              element={
                <AuthRedirect>
                  <Navigate to="/news" replace />
                </AuthRedirect>
              } 
            />

            {/* Login page */}
            <Route 
              path="/login" 
              element={
                <AuthRedirect requireAuth={false}>
                  <Login />
                </AuthRedirect>
              } 
            />

            {/* News page (protected) */}
            <Route 
              path="/news" 
              element={
                <AuthRedirect requireAuth={true}>
                  <NewsList />
                </AuthRedirect>
              } 
            />

            {/* Catch-all route redirects to login or news based on auth */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Suspense>
    </Router>
  )
}

export default App
