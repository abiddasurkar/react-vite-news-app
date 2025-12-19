import React, { useState, useEffect, useRef, useCallback } from 'react'
import { getNewsByCountry, searchNews } from "../services/api"
import NewsCard from './NewsCard'
import THEME from '../config/theme'

export default function NewsList() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [nextPageToken, setNextPageToken] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const [selectedCountry, setSelectedCountry] = useState('us')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [articlesCount, setArticlesCount] = useState(0)
  const observerTarget = useRef(null)

  const countries = [
    { code: 'us', name: 'United States', icon: '🇺🇸' },
    { code: 'gb', name: 'United Kingdom', icon: '🇬🇧' },
    { code: 'in', name: 'India', icon: '🇮🇳' },
    { code: 'au', name: 'Australia', icon: '🇦🇺' },
    { code: 'ca', name: 'Canada', icon: '🇨🇦' },
  ]

  const fetchNews = useCallback(async (isLoadingMore = false) => {
    try {
      setLoading(true)
      setError('')

      const pageToken = isLoadingMore ? nextPageToken : null
      const response = searchQuery.trim() 
        ? await searchNews(searchQuery, selectedCountry, pageToken)
        : await getNewsByCountry(selectedCountry, pageToken)

      if (response.results && Array.isArray(response.results)) {
        setArticles(prev => isLoadingMore ? [...prev, ...response.results] : response.results)
        setArticlesCount(prev => isLoadingMore ? prev + response.results.length : response.results.length)
        setNextPageToken(response.nextPage || null)
        setHasMore(!!response.nextPage)
      } else {
        if (!isLoadingMore) {
          setArticles([])
          setArticlesCount(0)
        }
        setNextPageToken(null)
        setHasMore(false)
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch news. Please try again.')
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [selectedCountry, searchQuery, nextPageToken])

  useEffect(() => {
    setNextPageToken(null)
    setArticles([])
    setArticlesCount(0)
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

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchQuery(searchInput)
  }

  const handleArticleClick = (article) => {
    if (article.link) {
      window.open(article.link, '_blank', 'noopener,noreferrer')
    }
  }

  const LoadingDots = () => (
    <div className="flex gap-2">
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
  )

  return (
    <div className="min-h-screen" style={{ backgroundColor: THEME.colors.stone[50] }}>
      <header 
        className="sticky top-0 z-50 bg-white border-b"
        style={{ borderColor: THEME.colors.stone[200] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSearch} className="pb-5">
            <div className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for news articles, topics, or keywords..."
                className="w-full pl-14 pr-32 py-4 rounded-xl text-base border-2 focus:outline-none"
                style={{
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  backgroundColor: THEME.colors.stone[50],
                  borderColor: THEME.colors.stone[200],
                  color: THEME.colors.stone[900]
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = THEME.colors.teal[600]
                  e.target.style.backgroundColor = THEME.colors.teal[50]
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = THEME.colors.stone[200]
                  e.target.style.backgroundColor = THEME.colors.stone[50]
                }}
              />
              <span 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-xl"
                style={{ color: THEME.colors.stone[500] }}
              >
                🔍
              </span>
              <button
                type="submit"
                disabled={loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
                style={{
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  background: `linear-gradient(135deg, ${THEME.colors.teal[500]} 0%, ${THEME.colors.teal[700]} 100%)`,
                  color: 'white'
                }}
              >
                Search
              </button>
            </div>
          </form>

          <div className="flex gap-2 overflow-x-auto pb-5 scrollbar-hide">
            {countries.map((country) => (
              <button
                key={country.code}
                onClick={() => setSelectedCountry(country.code)}
                className="px-5 py-2.5 rounded-xl whitespace-nowrap font-semibold text-sm flex items-center gap-2 transition-all duration-300"
                style={{
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  backgroundColor: selectedCountry === country.code 
                    ? THEME.colors.teal[600]
                    : THEME.colors.stone[100],
                  color: selectedCountry === country.code 
                    ? 'white'
                    : THEME.colors.stone[700],
                  border: `1px solid ${
                    selectedCountry === country.code 
                      ? THEME.colors.teal[600]
                      : THEME.colors.stone[200]
                  }`
                }}
              >
                <span>{country.icon}</span>
                <span>{country.name}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div 
            className="mb-10 p-6 rounded-2xl border-l-4"
            style={{
              backgroundColor: THEME.colors.red[50],
              borderColor: THEME.colors.red[500]
            }}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">⚠️</span>
              <div>
                <h3 
                  className="font-bold text-lg mb-1"
                  style={{ 
                    fontFamily: '"Playfair Display", Georgia, serif',
                    color: THEME.colors.red[900]
                  }}
                >
                  Unable to Load News
                </h3>
                <p 
                  className="text-sm"
                  style={{ 
                    fontFamily: '"DM Sans", system-ui, sans-serif',
                    color: THEME.colors.red[700]
                  }}
                >
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {articles.map((article, index) => (
                <NewsCard 
                  key={`${article.article_id}-${index}`}
                  article={article} 
                  onArticleClick={handleArticleClick}
                />
              ))}
            </div>

            <div ref={observerTarget} className="text-center py-12">
              {hasMore && loading ? (
                <div className="flex flex-col items-center gap-4">
                  <LoadingDots />
                  <p 
                    className="text-sm font-medium"
                    style={{ 
                      fontFamily: '"DM Sans", system-ui, sans-serif',
                      color: THEME.colors.stone[600]
                    }}
                  >
                    Loading more articles...
                  </p>
                </div>
              ) : !hasMore && (
                <div className="py-10">
                  <div className="text-5xl mb-3">✨</div>
                  <p 
                    className="text-xl font-bold mb-2"
                    style={{ 
                      fontFamily: '"Playfair Display", Georgia, serif',
                      color: THEME.colors.stone[900]
                    }}
                  >
                    That's all for now
                  </p>
                  <p 
                    className="text-sm"
                    style={{ 
                      fontFamily: '"DM Sans", system-ui, sans-serif',
                      color: THEME.colors.stone[600]
                    }}
                  >
                    You've viewed {articlesCount} articles
                  </p>
                </div>
              )}
            </div>
          </>
        ) : loading ? (
          <div className="flex justify-center py-20">
            <div className="text-center">
              <div className="flex gap-3 justify-center mb-6">
                <LoadingDots />
              </div>
              <p 
                className="text-base font-medium"
                style={{ 
                  fontFamily: '"DM Sans", system-ui, sans-serif',
                  color: THEME.colors.stone[600]
                }}
              >
                Loading your personalized news feed...
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-7xl mb-6">🔍</div>
            <h3 
              className="text-3xl font-bold mb-3"
              style={{ 
                fontFamily: '"Playfair Display", Georgia, serif',
                color: THEME.colors.stone[900]
              }}
            >
              No articles found
            </h3>
            <p 
              className="text-lg mb-8 max-w-md mx-auto"
              style={{ 
                fontFamily: '"DM Sans", system-ui, sans-serif',
                color: THEME.colors.stone[600]
              }}
            >
              Try adjusting your search or selecting a different country
            </p>
            <button
              onClick={() => {
                setSearchInput('')
                setSearchQuery('')
                setSelectedCountry('us')
              }}
              className="px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                fontFamily: '"DM Sans", system-ui, sans-serif',
                background: `linear-gradient(135deg, ${THEME.colors.teal[500]} 0%, ${THEME.colors.teal[700]} 100%)`,
                color: 'white'
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>
    </div>
  )
}