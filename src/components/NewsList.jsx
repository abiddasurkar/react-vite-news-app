import React, { useState, useEffect, useRef, useCallback } from 'react'
import { getNewsByCountry, searchNews } from "../services/api"
import NewsCard from './NewsCard'

export default function NewsList() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [nextPageToken, setNextPageToken] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const [selectedCountry, setSelectedCountry] = useState('us')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [userName, setUserName] = useState('')
  const observerTarget = useRef(null)
  const userMenuRef = useRef(null)

  const countries = [
    { code: 'us', name: 'United States', icon: '🇺🇸' },
    { code: 'gb', name: 'United Kingdom', icon: '🇬🇧' },
    { code: 'in', name: 'India', icon: '🇮🇳' },
    { code: 'au', name: 'Australia', icon: '🇦🇺' },
    { code: 'ca', name: 'Canada', icon: '🇨🇦' },
  ]

  // Scroll detection for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Get user name from localStorage
  useEffect(() => {
    const loginHistory = localStorage.getItem('loginHistory')
    if (loginHistory) {
      const history = JSON.parse(loginHistory)
      if (history.length > 0) {
        const lastLogin = history[history.length - 1]
        setUserName(lastLogin.user?.fullName || 'User')
      }
    }
  }, [])

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
    }
    
    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showUserMenu])

  const fetchNews = useCallback(
    async (isLoadingMore = false) => {
      try {
        setLoading(true)
        setError('')

        let response
        const pageToken = isLoadingMore ? nextPageToken : null

        if (searchQuery.trim()) {
          response = await searchNews(searchQuery, selectedCountry, pageToken)
        } else {
          response = await getNewsByCountry(selectedCountry, pageToken)
        }

        if (response.results && Array.isArray(response.results)) {
          if (isLoadingMore) {
            setArticles((prev) => [...prev, ...response.results])
          } else {
            setArticles(response.results)
          }

          if (response.nextPage) {
            setNextPageToken(response.nextPage)
            setHasMore(true)
          } else {
            setNextPageToken(null)
            setHasMore(false)
          }
        } else {
          if (!isLoadingMore) {
            setArticles([])
          }
          setNextPageToken(null)
          setHasMore(false)
        }
      } catch (err) {
        const errorMessage = err.message || 'Failed to fetch news. Please try again.'
        setError(errorMessage)
        console.error('Fetch error:', err)
      } finally {
        setLoading(false)
      }
    },
    [selectedCountry, searchQuery, nextPageToken]
  )

  useEffect(() => {
    setNextPageToken(null)
    setArticles([])
    setHasMore(true)
    fetchNews(false)
  }, [selectedCountry, searchQuery])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && nextPageToken) {
          fetchNews(true)
        }
      },
      { threshold: 0.1 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [hasMore, loading, nextPageToken, fetchNews])

  const handleSearch = () => {
    setSearchQuery(searchInput)
    setNextPageToken(null)
    setArticles([])
  }

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleLogoutClick = () => {
    setShowUserMenu(false)
    setShowLogoutDialog(true)
  }

  const handleLogoutConfirm = () => {
    localStorage.removeItem('loginHistory')
    window.location.reload()
  }

  const handleLogoutCancel = () => {
    setShowLogoutDialog(false)
  }

  const handleCountryChange = (code) => {
    setSelectedCountry(code)
    setNextPageToken(null)
    setArticles([])
  }

  const articlesCount = articles.length

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAF9' }}>
      {/* Header - Sticky with glass morphism */}
      <header 
        className="sticky top-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.85)' : 'white',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: `1px solid ${isScrolled ? '#E7E5E4' : 'transparent'}`,
          boxShadow: isScrolled 
            ? `0 4px 20px -4px rgba(13, 148, 136, 0.15)`
            : 'none'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top bar */}
          <div className="flex items-center justify-between py-5">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div 
                className="flex items-center justify-center w-14 h-14 rounded-xl transition-transform duration-300 hover:scale-110 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)`,
                  boxShadow: `0 8px 20px -6px rgba(13, 148, 136, 0.5)`
                }}
              >
                <span className="text-2xl">📰</span>
              </div>
              <div>
                <h1 
                  className="text-3xl font-bold tracking-tight"
                  style={{ 
                    fontFamily: '"Playfair Display", Georgia, serif',
                    color: '#292524'
                  }}
                >
                  NewsHub
                </h1>
                <p 
                  className="text-sm"
                  style={{ 
                    fontFamily: '"DM Sans", system-ui, sans-serif',
                    color: '#57534E'
                  }}
                >
                  {articlesCount > 0 ? `${articlesCount} articles` : 'Curated news'}
                </p>
              </div>
            </div>

            {/* User Profile Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  backgroundColor: '#F5F5F4',
                  color: '#44403C',
                  border: `1px solid #E7E5E4`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F0FDFA'
                  e.currentTarget.style.borderColor = '#99F6E4'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#F5F5F4'
                  e.currentTarget.style.borderColor = '#E7E5E4'
                }}
              >
                <div 
                  className="flex items-center justify-center w-8 h-8 rounded-full text-sm"
                  style={{
                    background: `linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)`,
                    color: 'white',
                    fontWeight: '600'
                  }}
                >
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span>{userName}</span>
                <svg 
                  className="w-4 h-4 transition-transform duration-200" 
                  style={{ transform: showUserMenu ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div 
                  className="absolute right-0 mt-2 w-56 rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-2"
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #E7E5E4',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15)',
                    zIndex: 50
                  }}
                >
                  {/* User Info */}
                  <div 
                    className="px-4 py-3 border-b"
                    style={{ borderColor: '#E7E5E4' }}
                  >
                    <p 
                      className="font-semibold text-sm"
                      style={{ 
                        fontFamily: '"DM Sans", system-ui, sans-serif',
                        color: '#292524'
                      }}
                    >
                      {userName}
                    </p>
                    <p 
                      className="text-xs mt-1"
                      style={{ 
                        fontFamily: '"DM Sans", system-ui, sans-serif',
                        color: '#78716C'
                      }}
                    >
                      Signed in
                    </p>
                  </div>

                  {/* Logout Option */}
                  <button
                    onClick={handleLogoutClick}
                    className="w-full px-4 py-3 text-left flex items-center gap-3 transition-colors duration-200"
                    style={{
                      fontFamily: '"DM Sans", system-ui, sans-serif',
                      color: '#DC2626',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#FEE2E2'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Search bar */}
          <div className="pb-5">
            <div className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                placeholder="Search for news articles, topics, or keywords..."
                className="w-full pl-12 pr-32 py-4 rounded-xl text-base transition-all duration-300 border-2 focus:outline-none"
                style={{
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  backgroundColor: '#FAFAF9',
                  borderColor: '#E7E5E4',
                  color: '#292524'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#0D9488'
                  e.target.style.backgroundColor = '#F0FDFA'
                  e.target.style.boxShadow = `0 0 0 4px rgba(13, 148, 136, 0.15)`
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E7E5E4'
                  e.target.style.backgroundColor = '#FAFAF9'
                  e.target.style.boxShadow = 'none'
                }}
              />
              <span 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-xl"
                style={{ color: '#A8A29E' }}
              >
                🔍
              </span>
              <button
                onClick={handleSearch}
                disabled={loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300 disabled:opacity-50"
                style={{
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  background: `linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)`,
                  color: 'white'
                }}
              >
                Search
              </button>
            </div>
          </div>

          {/* Country filters */}
          <div className="flex gap-2 overflow-x-auto pb-5 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 scrollbar-hide">
            {countries.map((country) => (
              <button
                key={country.code}
                onClick={() => handleCountryChange(country.code)}
                className="px-5 py-2.5 rounded-xl whitespace-nowrap font-semibold text-sm flex items-center gap-2 transition-all duration-300"
                style={{
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  backgroundColor: selectedCountry === country.code 
                    ? '#0D9488'
                    : '#F5F5F4',
                  color: selectedCountry === country.code 
                    ? 'white'
                    : '#44403C',
                  border: `1px solid ${
                    selectedCountry === country.code 
                      ? '#0D9488'
                      : '#E7E5E4'
                  }`,
                  boxShadow: selectedCountry === country.code 
                    ? `0 4px 12px -4px rgba(13, 148, 136, 0.6)`
                    : 'none'
                }}
              >
                <span>{country.icon}</span>
                <span>{country.name}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Error message */}
        {error && (
          <div 
            className="mb-10 p-6 rounded-2xl border-l-4"
            style={{
              backgroundColor: '#FEE2E2',
              borderColor: '#EF4444'
            }}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">⚠️</span>
              <div className="flex-1">
                <h3 
                  className="font-bold text-lg mb-1"
                  style={{ 
                    fontFamily: '"Playfair Display", Georgia, serif',
                    color: '#7F1D1D'
                  }}
                >
                  Unable to Load News
                </h3>
                <p 
                  className="text-sm"
                  style={{ 
                    fontFamily: '"DM Sans", system-ui, sans-serif',
                    color: '#B91C1C'
                  }}
                >
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* News grid */}
        {articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {articles.map((article, index) => (
                <div
                  key={`${article.article_id}-${index}`}
                  className="opacity-0 animate-in fade-in slide-in-from-bottom-4"
                  style={{
                    animationDelay: `${Math.min(index * 50, 500)}ms`,
                    animationDuration: '600ms',
                    animationFillMode: 'forwards'
                  }}
                >
                  <NewsCard article={article} />
                </div>
              ))}
            </div>

            {/* Infinite scroll trigger */}
            <div ref={observerTarget} className="text-center py-12">
              {hasMore && loading && (
                <div className="flex flex-col items-center gap-4">
                  <div className="flex gap-2">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded-full animate-bounce"
                        style={{
                          backgroundColor: '#0D9488',
                          animationDelay: `${i * 150}ms`
                        }}
                      />
                    ))}
                  </div>
                  <p 
                    className="text-sm font-medium"
                    style={{ 
                      fontFamily: '"DM Sans", system-ui, sans-serif',
                      color: '#57534E'
                    }}
                  >
                    Loading more articles...
                  </p>
                </div>
              )}
              {!hasMore && articles.length > 0 && (
                <div className="text-center py-10">
                  <div className="text-5xl mb-3">✨</div>
                  <p 
                    className="text-xl font-bold mb-2"
                    style={{ 
                      fontFamily: '"Playfair Display", Georgia, serif',
                      color: '#292524'
                    }}
                  >
                    That's all for now
                  </p>
                  <p 
                    className="text-sm"
                    style={{ 
                      fontFamily: '"DM Sans", system-ui, sans-serif',
                      color: '#57534E'
                    }}
                  >
                    You've viewed {articles.length} articles
                  </p>
                </div>
              )}
            </div>
          </>
        ) : !loading ? (
          <div className="text-center py-20">
            <div className="text-7xl mb-6 animate-pulse" style={{ animationDuration: '2s' }}>
              🔍
            </div>
            <h3 
              className="text-3xl font-bold mb-3"
              style={{ 
                fontFamily: '"Playfair Display", Georgia, serif',
                color: '#292524'
              }}
            >
              No articles found
            </h3>
            <p 
              className="text-lg mb-8"
              style={{ 
                fontFamily: '"DM Sans", system-ui, sans-serif',
                color: '#57534E'
              }}
            >
              Try adjusting your search or selecting a different country
            </p>
            <button
              onClick={() => {
                setSearchInput('')
                setSearchQuery('')
                setSelectedCountry('us')
                setNextPageToken(null)
              }}
              className="px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                fontFamily: '"DM Sans", system-ui, sans-serif',
                background: `linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)`,
                color: 'white',
                boxShadow: `0 10px 30px -10px rgba(13, 148, 136, 0.6)`
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="flex justify-center py-20">
            <div className="text-center">
              <div className="flex gap-3 justify-center mb-6">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full animate-bounce"
                    style={{
                      backgroundColor: '#0D9488',
                      animationDelay: `${i * 150}ms`
                    }}
                  />
                ))}
              </div>
              <p 
                className="text-base font-medium"
                style={{ 
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  color: '#57534E'
                }}
              >
                Loading your personalized news feed...
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            zIndex: 9999
          }}
          onClick={handleLogoutCancel}
        >
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              padding: '1.5rem',
              maxWidth: '24rem',
              width: '100%',
              boxShadow: '0 20px 60px -15px rgba(0,0,0,0.3)',
              position: 'relative',
              zIndex: 10000
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <div 
              style={{
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                backgroundColor: '#FEE2E2'
              }}
            >
              <svg 
                style={{ 
                  width: '1.75rem', 
                  height: '1.75rem',
                  color: '#DC2626' 
                }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            {/* Title */}
            <h3 
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '0.5rem',
                color: '#292524'
              }}
            >
              Logout Confirmation
            </h3>

            {/* Message */}
            <p 
              style={{
                fontFamily: '"DM Sans", system-ui, sans-serif',
                textAlign: 'center',
                marginBottom: '1.5rem',
                color: '#57534E',
                fontSize: '0.9375rem'
              }}
            >
              Are you sure you want to logout? You will need to sign in again to access your news feed.
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={handleLogoutCancel}
                style={{
                  flex: 1,
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  backgroundColor: '#F5F5F4',
                  color: '#44403C',
                  border: '1px solid #E7E5E4',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E7E5E4'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#F5F5F4'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                style={{
                  flex: 1,
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  backgroundColor: '#DC2626',
                  color: 'white',
                  border: '1px solid #DC2626',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#B91C1C'
                  e.currentTarget.style.borderColor = '#B91C1C'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#DC2626'
                  e.currentTarget.style.borderColor = '#DC2626'
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}