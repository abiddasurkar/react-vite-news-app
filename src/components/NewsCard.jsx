import React from 'react'
import THEME from '../config/theme'

export default function NewsCard({ article, onArticleClick }) {
  const imageUrl = article.image_url || 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?q=80&w=600&auto=format&fit=crop'
  
  const pubDate = new Date(article.pubDate || article.publishedAt || new Date()).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  // Handle category - could be string or array
  let primaryCategory = article.category || 'general'
  if (Array.isArray(primaryCategory)) {
    primaryCategory = primaryCategory[0] || 'general'
  }

  // Map categories to theme colors
  const categoryMap = {
    business: { bg: THEME.colors.blue[100], text: THEME.colors.blue[800], icon: '💼' },
    politics: { bg: THEME.colors.red[100], text: THEME.colors.red[800], icon: '🏛️' },
    top: { bg: THEME.colors.teal[100], text: THEME.colors.teal[800], icon: '⭐' },
    technology: { bg: THEME.colors.indigo[100], text: THEME.colors.indigo[800], icon: '🚀' },
    tech: { bg: THEME.colors.indigo[100], text: THEME.colors.indigo[800], icon: '🚀' },
    health: { bg: THEME.colors.emerald[100], text: THEME.colors.emerald[800], icon: '🏥' },
    sports: { bg: THEME.colors.amber[100], text: THEME.colors.amber[800], icon: '⚽' },
    entertainment: { bg: THEME.colors.pink[100], text: THEME.colors.pink[800], icon: '🎬' },
    world: { bg: THEME.colors.cyan[100], text: THEME.colors.cyan[800], icon: '🌍' },
    science: { bg: THEME.colors.violet[100], text: THEME.colors.violet[800], icon: '🔬' },
    finance: { bg: THEME.colors.green[100], text: THEME.colors.green[800], icon: '💰' },
    general: { bg: THEME.colors.stone[100], text: THEME.colors.stone[800], icon: '📰' },
  }

  const categoryConfig = categoryMap[primaryCategory.toLowerCase()] || categoryMap.general

  const sentimentMap = {
    positive: {
      bg: THEME.colors.emerald[100],
      text: THEME.colors.emerald[700],
      icon: '📈',
      label: 'Positive'
    },
    negative: {
      bg: THEME.colors.red[100],
      text: THEME.colors.red[700],
      icon: '📉',
      label: 'Negative'
    },
    neutral: {
      bg: THEME.colors.stone[100],
      text: THEME.colors.stone[600],
      icon: '➡️',
      label: 'Neutral'
    },
  }

  const sentiment = article.sentiment || 'neutral'
  const sentimentStyle = sentimentMap[sentiment] || sentimentMap.neutral

  // Handle click on entire card
  const handleCardClick = () => {
    if (onArticleClick) {
      onArticleClick(article)
    } else if (article.link) {
      window.open(article.link, '_blank', 'noopener,noreferrer')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleCardClick()
    }
  }

  return (
    <article 
      role="article"
      tabIndex={0}
      className="group h-full flex flex-col rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{
        backgroundColor: 'white',
        border: `1px solid ${THEME.colors.stone[200]}`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.02)'
      }}
      onClick={handleCardClick}
      onKeyDown={handleKeyPress}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 20px 40px -15px ${THEME.colors.teal[600]}25, 0 0 0 1px ${THEME.colors.teal[200]}`
        e.currentTarget.style.borderColor = THEME.colors.teal[300]
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.02)'
        e.currentTarget.style.borderColor = THEME.colors.stone[200]
      }}
    >
      {/* Image container */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?q=80&w=600&auto=format&fit=crop'
          }}
        />
        
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(180deg, transparent 0%, rgba(41, 37, 36, 0.8) 100%)`
          }}
        />

        {/* Category badge */}
        <div 
          className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 backdrop-blur-sm transition-all duration-300 group-hover:scale-105"
          style={{
            backgroundColor: `${categoryConfig.bg}E6`,
            color: categoryConfig.text,
            fontFamily: '"DM Sans", system-ui, sans-serif',
            border: `1px solid ${categoryConfig.bg}`
          }}
        >
          <span>{categoryConfig.icon}</span>
          <span className="capitalize">{primaryCategory}</span>
        </div>

        {/* Source badge */}
        {article.source_name && (
          <div 
            className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm transition-transform duration-300 group-hover:scale-105"
            style={{
              backgroundColor: `${THEME.colors.teal[600]}E6`,
              color: 'white',
              fontFamily: '"DM Sans", system-ui, sans-serif',
              border: `1px solid ${THEME.colors.teal[500]}`
            }}
          >
            {article.source_name.length > 15 
              ? `${article.source_name.substring(0, 12)}...` 
              : article.source_name}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col">
        {/* Meta info */}
        <div className="flex items-center justify-between mb-3">
          <time 
            className="flex items-center gap-1.5 text-xs"
            style={{ 
              fontFamily: '"DM Sans", system-ui, sans-serif',
              color: THEME.colors.stone[500]
            }}
          >
            <span className="text-sm">📅</span>
            {pubDate}
          </time>
          
          {article.source_priority && article.source_priority < 1000 && (
            <span 
              className="px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1"
              style={{
                backgroundColor: THEME.colors.amber[100],
                color: THEME.colors.amber[800],
                fontFamily: '"DM Sans", system-ui, sans-serif'
              }}
            >
              <span>⚡</span>
              <span>Featured</span>
            </span>
          )}
        </div>

        {/* Title */}
        <h3 
          className="text-lg font-bold mb-3 line-clamp-2 transition-colors duration-300"
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            color: THEME.colors.stone[900],
            lineHeight: '1.3'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = THEME.colors.teal[700]
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = THEME.colors.stone[900]
          }}
        >
          {article.title}
        </h3>

        {/* Description */}
        <p 
          className="text-sm mb-4 line-clamp-3 flex-1"
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            color: THEME.colors.stone[600],
            lineHeight: '1.6'
          }}
        >
          {article.description || article.content?.substring(0, 180) || 'Click to read the full story...'}
        </p>

        {/* Sentiment indicator */}
        {sentiment && sentiment !== 'neutral' && (
          <div className="mb-4">
            <div 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: sentimentStyle.bg,
                color: sentimentStyle.text,
                fontFamily: '"DM Sans", system-ui, sans-serif'
              }}
            >
              <span>{sentimentStyle.icon}</span>
              <span>{sentimentStyle.label}</span>
            </div>
          </div>
        )}

        {/* Divider */}
        <div 
          className="border-t pt-4 mt-auto"
          style={{ borderColor: THEME.colors.stone[200] }}
        />

        {/* Footer */}
        <div className="flex items-center justify-between pt-3">
          <span 
            className="text-xs truncate flex-1"
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              color: THEME.colors.stone[500]
            }}
          >
            {article.source_name || 'Unknown Source'}
          </span>
          <div className="ml-3">
            <button
              className="group/link inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                fontFamily: '"DM Sans", system-ui, sans-serif',
                color: THEME.colors.teal[700],
                backgroundColor: THEME.colors.teal[50],
                border: `1px solid ${THEME.colors.teal[200]}`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = THEME.colors.teal[600]
                e.currentTarget.style.color = 'white'
                e.currentTarget.style.borderColor = THEME.colors.teal[600]
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = THEME.colors.teal[50]
                e.currentTarget.style.color = THEME.colors.teal[700]
                e.currentTarget.style.borderColor = THEME.colors.teal[200]
              }}
              onClick={(e) => {
                e.stopPropagation()
                if (article.link) {
                  window.open(article.link, '_blank', 'noopener,noreferrer')
                }
              }}
            >
              <span>Read</span>
              <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}