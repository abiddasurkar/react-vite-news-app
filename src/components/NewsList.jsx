import React, { useState, useEffect, useRef, useCallback } from 'react'
import { getNewsByCountry, searchNews } from "../services/api"
import NewsCard from './NewsCard'
import { THEME } from '../config/theme'

export default function NewsList() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [nextPageToken, setNextPageToken] = useState(null) // Store token, not page number!
  const [hasMore, setHasMore] = useState(true)
  const [selectedCountry, setSelectedCountry] = useState('us')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const observerTarget = useRef(null)

  const countries = [
    { code: 'us', name: 'United States', icon: '🇺🇸' },
    { code: 'gb', name: 'United Kingdom', icon: '🇬🇧' },
    { code: 'in', name: 'India', icon: '🇮🇳' },
    { code: 'au', name: 'Australia', icon: '🇦🇺' },
    { code: 'ca', name: 'Canada', icon: '🇨🇦' },
  ]

  const fetchNews = useCallback(
    async (isLoadingMore = false) => {
      try {
        setLoading(true)
        setError('')

        let response

        // For pagination: use nextPageToken from previous response
        // For new search/filter: don't send page token
        const pageToken = isLoadingMore ? nextPageToken : null

        if (searchQuery.trim()) {
          response = await searchNews(searchQuery, selectedCountry, pageToken)
        } else {
          response = await getNewsByCountry(selectedCountry, pageToken)
        }

        if (response.results && Array.isArray(response.results)) {
          if (isLoadingMore) {
            // Append to existing articles
            setArticles((prev) => [...prev, ...response.results])
          } else {
            // Replace with new articles
            setArticles(response.results)
          }

          // Store the next page token for pagination
          if (response.nextPage) {
            setNextPageToken(response.nextPage)
            setHasMore(true)
            console.log('📄 Next page token:', response.nextPage)
          } else {
            setNextPageToken(null)
            setHasMore(false)
            console.log('📄 No more pages available')
          }
        } else {
          if (!isLoadingMore) {
            setArticles([])
          }
          setNextPageToken(null)
          setHasMore(false)
        }
      } catch (err) {
        const errorMessage =
          err.message || 'Failed to fetch news. Please check your API key.'
        setError(errorMessage)
        console.error('Fetch error:', err)
      } finally {
        setLoading(false)
      }
    },
    [selectedCountry, searchQuery, nextPageToken]
  )

  // Initial load and when filters change
  useEffect(() => {
    setNextPageToken(null) // Reset pagination token
    setArticles([])
    setHasMore(true)
    fetchNews(false) // Load fresh articles
  }, [selectedCountry, searchQuery])

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && nextPageToken) {
          console.log('📜 Infinite scroll triggered, loading next page...')
          fetchNews(true) // Load more articles
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

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchQuery(searchInput)
    // Reset pagination when searching
    setNextPageToken(null)
    setArticles([])
  }

  const handleLogout = () => {
    localStorage.removeItem('loginHistory')
    window.location.reload()
  }

  const handleCountryChange = (code) => {
    setSelectedCountry(code)
    // Reset pagination when changing country
    setNextPageToken(null)
    setArticles([])
  }

  const articlesCount = articles.length

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: THEME.colors.neutral[50],
      }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-40 border-b transition-all duration-300"
        style={{
          background: THEME.gradients.primary,
          borderColor: THEME.colors.primary.dark,
          boxShadow: THEME.shadows.lg,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          {/* Top Section - Logo & Logout */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="text-5xl animate-bounce" style={{ animationDuration: '2s' }}>
                📰
              </div>
              <div>
                <h1
                  className="text-4xl font-bold text-white"
                  style={{ fontFamily: THEME.typography.display.family }}
                >
                  NewsHub
                </h1>
                <p className="text-blue-100 text-sm">
                  {articlesCount > 0
                    ? `${articlesCount} articles loaded`
                    : 'Stay informed, stay connected'}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="
                px-6 py-2.5 rounded-lg font-semibold text-blue-600 bg-white
                transition-all duration-300 transform
                hover:shadow-lg hover:shadow-white/50 hover:scale-105
                active:scale-95
              "
              style={{
                fontFamily: THEME.typography.display.family,
              }}
            >
              🚪 Logout
            </button>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-5">
            <div className="flex gap-2 flex-col sm:flex-row">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search news articles..."
                className="
                  flex-1 px-5 py-3 rounded-lg text-gray-900
                  border-2 border-white/30 bg-white/95 backdrop-blur-sm
                  placeholder-gray-500 font-medium
                  focus:outline-none focus:border-white focus:ring-2 focus:ring-blue-300
                  transition-all duration-300
                "
                style={{
                  fontFamily: THEME.typography.body.family,
                }}
              />
              <button
                type="submit"
                disabled={loading}
                className="
                  px-8 py-3 rounded-lg font-semibold text-blue-600 bg-white
                  transition-all duration-300 transform
                  hover:shadow-lg hover:scale-105 active:scale-95
                  disabled:opacity-75 disabled:cursor-not-allowed
                  whitespace-nowrap
                "
                style={{
                  fontFamily: THEME.typography.display.family,
                }}
              >
                {loading ? '🔍 Searching...' : '🔍 Search'}
              </button>
            </div>
          </form>

          {/* Country Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6">
            {countries.map((country) => (
              <button
                key={country.code}
                onClick={() => handleCountryChange(country.code)}
                className={`
                  px-4 py-2.5 rounded-full whitespace-nowrap font-semibold
                  transition-all duration-300 transform flex items-center gap-2
                  ${
                    selectedCountry === country.code
                      ? 'bg-white text-blue-600 shadow-lg scale-105'
                      : 'bg-blue-500 text-white hover:bg-blue-400 hover:scale-105'
                  }
                `}
                style={{
                  fontFamily: THEME.typography.display.family,
                }}
              >
                <span>{country.icon}</span>
                {country.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Error Message */}
        {error && (
          <div
            className="mb-8 p-5 rounded-xl border-l-4 bg-red-50 backdrop-blur-sm animate-in fade-in slide-in-from-top-2"
            style={{
              borderColor: THEME.colors.sentiment.negative,
            }}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">⚠️</span>
              <div className="flex-1">
                <h3
                  className="font-bold text-red-900 mb-1"
                  style={{ fontFamily: THEME.typography.display.family }}
                >
                  Error Loading News
                </h3>
                <p
                  className="text-red-800 text-sm"
                  style={{ fontFamily: THEME.typography.body.family }}
                >
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* News Grid */}
        {articles.length > 0 ? (
          <>
            <div
              className="grid gap-6 mb-10"
              style={{
                gridTemplateColumns:
                  'repeat(auto-fill, minmax(320px, 1fr))',
              }}
            >
              {articles.map((article, index) => (
                <div
                  key={`${article.article_id}-${index}`}
                  className="animate-in fade-in slide-in-from-bottom-4"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationDuration: '500ms',
                  }}
                >
                  <NewsCard article={article} />
                </div>
              ))}
            </div>

            {/* Infinite scroll trigger */}
            <div ref={observerTarget} className="text-center py-10">
              {hasMore && loading && (
                <div className="flex flex-col items-center gap-3">
                  <div className="flex gap-2">
                    <div
                      className="w-3 h-3 rounded-full animate-bounce"
                      style={{
                        backgroundColor: THEME.colors.primary.main,
                      }}
                    ></div>
                    <div
                      className="w-3 h-3 rounded-full animate-bounce"
                      style={{
                        backgroundColor: THEME.colors.primary.main,
                        animationDelay: '100ms',
                      }}
                    ></div>
                    <div
                      className="w-3 h-3 rounded-full animate-bounce"
                      style={{
                        backgroundColor: THEME.colors.primary.main,
                        animationDelay: '200ms',
                      }}
                    ></div>
                  </div>
                  <span className="text-gray-600 text-sm font-medium">
                    Loading more articles...
                  </span>
                </div>
              )}
              {!hasMore && articles.length > 0 && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">✅</div>
                  <p
                    className="text-gray-600 font-semibold"
                    style={{ fontFamily: THEME.typography.display.family }}
                  >
                    You've reached the end
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {articles.length} articles total
                  </p>
                </div>
              )}
            </div>
          </>
        ) : !loading ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 animate-pulse">🔍</div>
            <h3
              className="text-2xl font-bold text-gray-900 mb-2"
              style={{ fontFamily: THEME.typography.display.family }}
            >
              No articles found
            </h3>
            <p
              className="text-gray-600 text-lg mb-6"
              style={{ fontFamily: THEME.typography.body.family }}
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
              className="
                px-6 py-3 rounded-lg font-semibold text-white
                transition-all duration-300 transform
                hover:shadow-lg hover:scale-105 active:scale-95
              "
              style={{
                background: THEME.gradients.primary,
                fontFamily: THEME.typography.display.family,
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="flex justify-center py-20">
            <div className="text-center">
              <div className="flex gap-3 justify-center mb-4">
                <div
                  className="w-4 h-4 rounded-full animate-bounce"
                  style={{
                    backgroundColor: THEME.colors.primary.main,
                  }}
                ></div>
                <div
                  className="w-4 h-4 rounded-full animate-bounce"
                  style={{
                    backgroundColor: THEME.colors.primary.main,
                    animationDelay: '100ms',
                  }}
                ></div>
                <div
                  className="w-4 h-4 rounded-full animate-bounce"
                  style={{
                    backgroundColor: THEME.colors.primary.main,
                    animationDelay: '200ms',
                  }}
                ></div>
              </div>
              <p className="text-gray-600 font-medium">Loading articles...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}