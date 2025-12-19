import React from 'react'

export default function NewsCard({ article }) {
  const imageUrl = article.image_url || 'https://via.placeholder.com/600x400/0D9488/ffffff?text=NewsHub'

  const pubDate = new Date(article.pubDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const primaryCategory = Array.isArray(article.category)
    ? article.category[0]
    : article.category

  // Category styling with teal-based theme - using direct hex values
  const categoryMap = {
    business: { bg: '#DBEAFE', text: '#1E40AF', icon: '💼' },
    politics: { bg: '#FEE2E2', text: '#991B1B', icon: '🏛️' },
    top: { bg: '#CCFBF1', text: '#115E59', icon: '⭐' },
    technology: { bg: '#E0E7FF', text: '#4338CA', icon: '🚀' },
    tech: { bg: '#E0E7FF', text: '#4338CA', icon: '🚀' },
    health: { bg: '#D1FAE5', text: '#065F46', icon: '🏥' },
    sports: { bg: '#FEF3C7', text: '#92400E', icon: '⚽' },
    entertainment: { bg: '#FCE7F3', text: '#831843', icon: '🎬' },
    world: { bg: '#CFFAFE', text: '#155E75', icon: '🌍' },
    science: { bg: '#DDD6FE', text: '#5B21B6', icon: '🔬' },
    finance: { bg: '#D1FAE5', text: '#065F46', icon: '💰' },
  }

  const categoryConfig = categoryMap[primaryCategory?.toLowerCase()] || {
    bg: '#F5F5F4',
    text: '#44403C',
    icon: '📰',
  }

  const sentimentMap = {
    positive: {
      bg: '#D1FAE5',
      text: '#047857',
      icon: '📈',
      label: 'Positive'
    },
    negative: {
      bg: '#FEE2E2',
      text: '#B91C1C',
      icon: '📉',
      label: 'Negative'
    },
    neutral: {
      bg: '#F5F5F4',
      text: '#78716C',
      icon: '➡️',
      label: 'Neutral'
    },
  }

  const sentiment = article.sentiment || 'neutral'
  const sentimentStyle = sentimentMap[sentiment] || sentimentMap.neutral

  return (
    <article 
      className="group h-full flex flex-col rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] cursor-pointer"
      style={{
        backgroundColor: 'white',
        border: `1px solid #E7E5E4`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 20px 40px -15px rgba(13, 148, 136, 0.25), 0 0 0 1px #99F6E4`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02)'
      }}
    >
      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/600x400/0D9488/ffffff?text=NewsHub'
          }}
        />
        
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(180deg, transparent 0%, rgba(41, 37, 36, 0.9) 100%)`
          }}
        />

        {/* Category badge */}
        <div 
          className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md transition-all duration-300"
          style={{
            backgroundColor: categoryConfig.bg + 'E6',
            color: categoryConfig.text,
            fontFamily: '"DM Sans", system-ui, sans-serif',
            border: `1px solid ${categoryConfig.bg}`
          }}
        >
          <span>{categoryConfig.icon}</span>
          <span className="capitalize">{primaryCategory || 'news'}</span>
        </div>

        {/* Source badge */}
        {article.source_name && (
          <div 
            className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md"
            style={{
              backgroundColor: 'rgba(13, 148, 136, 0.9)',
              color: 'white',
              fontFamily: '"DM Sans", system-ui, sans-serif',
              border: `1px solid #14B8A6`
            }}
          >
            {article.source_name.substring(0, 15)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col">
        {/* Meta info */}
        <div className="flex items-center gap-3 mb-3 text-xs">
          <time 
            className="flex items-center gap-1.5"
            style={{ 
              fontFamily: '"DM Sans", system-ui, sans-serif',
              color: '#78716C'
            }}
          >
            <span className="text-sm">📅</span>
            {pubDate}
          </time>
          {article.source_priority && article.source_priority < 1000 && (
            <span 
              className="px-2 py-0.5 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: '#FEF3C7',
                color: '#92400E',
                fontFamily: '"DM Sans", system-ui, sans-serif'
              }}
            >
              ⚡ Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h3 
          className="text-lg font-bold mb-3 line-clamp-2 transition-colors duration-300"
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            color: '#292524',
            lineHeight: '1.3'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#0D9488'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#292524'
          }}
        >
          {article.title}
        </h3>

        {/* Description */}
        <p 
          className="text-sm mb-4 line-clamp-3 flex-1"
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            color: '#57534E',
            lineHeight: '1.6'
          }}
        >
          {article.description || article.content?.substring(0, 150) || 'Click to read the full story...'}
        </p>

        {/* Sentiment indicator */}
        {sentiment && (
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
          style={{ borderColor: '#E7E5E4' }}
        />

        {/* Footer */}
        <div className="flex items-center justify-between pt-3">
          <span 
            className="text-xs truncate flex-1"
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              color: '#78716C'
            }}
          >
            {article.source_name || 'Unknown Source'}
          </span>
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link ml-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 whitespace-nowrap"
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              color: '#0D9488',
              backgroundColor: '#F0FDFA',
              border: `1px solid #99F6E4`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0D9488'
              e.currentTarget.style.color = 'white'
              e.currentTarget.style.borderColor = '#0D9488'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#F0FDFA'
              e.currentTarget.style.color = '#0D9488'
              e.currentTarget.style.borderColor = '#99F6E4'
            }}
          >
            <span>Read</span>
            <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </article>
  )
}