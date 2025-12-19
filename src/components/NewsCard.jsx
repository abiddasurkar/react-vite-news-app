import React from 'react'

export default function NewsCard({ article }) {
  // Safe category handling with inline fallback (no theme import needed)
  const imageUrl =
    article.image_url || 'https://via.placeholder.com/400x200?text=No+Image'

  const pubDate = new Date(article.pubDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  // Get primary category safely
  const primaryCategory = Array.isArray(article.category)
    ? article.category[0]
    : article.category

  // Category color mapping with safe defaults
  const categoryMap = {
    business: { bg: '#DBEAFE', text: '#1E40AF', icon: '💼' },
    politics: { bg: '#FECACA', text: '#991B1B', icon: '🏛️' },
    top: { bg: '#FEF08A', text: '#854D0E', icon: '⭐' },
    technology: { bg: '#DDD6FE', text: '#4C1D95', icon: '🚀' },
    tech: { bg: '#DDD6FE', text: '#4C1D95', icon: '🚀' },
    health: { bg: '#DCFCE7', text: '#166534', icon: '🏥' },
    sports: { bg: '#FEDF72', text: '#B45309', icon: '⚽' },
    entertainment: { bg: '#FBCFE8', text: '#831843', icon: '🎬' },
    world: { bg: '#CFF0F5', text: '#164E63', icon: '🌍' },
    science: { bg: '#E0E7FF', text: '#3730A3', icon: '🔬' },
    finance: { bg: '#D1FAE5', text: '#065F46', icon: '💰' },
  }

  // Get category config with safe fallback
  const categoryConfig = categoryMap[primaryCategory?.toLowerCase()] || {
    bg: '#F3F4F6',
    text: '#374151',
    icon: '📰',
  }

  // Sentiment mapping
  const sentimentMap = {
    positive: {
      bg: '#DCFCE7',
      text: '#166534',
      icon: '📈',
    },
    negative: {
      bg: '#FEE2E2',
      text: '#991B1B',
      icon: '📉',
    },
    neutral: {
      bg: '#F3F4F6',
      text: '#374151',
      icon: '➡️',
    },
  }

  const sentiment = article.sentiment || 'neutral'
  const sentimentStyle = sentimentMap[sentiment] || sentimentMap.neutral

  const isHighPriority = article.source_priority && article.source_priority < 1000

  return (
    <div
      className="
        bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform
        hover:translate-y-[-12px]
        h-full flex flex-col
        border border-gray-100
      "
      style={{
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 group">
        {/* Image */}
        <img
          src={imageUrl}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src =
              'https://via.placeholder.com/400x200?text=News&bg=3B82F6&tc=FFFFFF'
          }}
        />

        {/* Overlay Gradient on Hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(31,41,55,0.8), rgba(31,41,55,0.6))',
          }}
        ></div>

        {/* Category Badge */}
        <div
          className="absolute top-3 left-3 px-3 py-1.5 rounded-full font-semibold text-xs flex items-center gap-1 shadow-lg"
          style={{
            backgroundColor: categoryConfig.bg,
            color: categoryConfig.text,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <span>{categoryConfig.icon}</span>
          <span className="capitalize">{primaryCategory || 'news'}</span>
        </div>

        {/* Source Badge */}
        {article.source_name && (
          <div
            className="absolute top-3 right-3 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
            style={{
              backgroundColor: 'rgba(59, 130, 246, 0.9)',
            }}
          >
            {article.source_name.substring(0, 12)}
          </div>
        )}

        {/* Priority Badge */}
        {isHighPriority && (
          <div className="absolute bottom-3 right-3 text-yellow-500 text-lg animate-pulse">
            ⚡
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col">
        {/* Metadata Row */}
        <div className="flex items-center justify-between mb-3 text-xs gap-2">
          <span className="text-gray-500 flex items-center gap-1">
            📅 {pubDate}
          </span>
          {article.source_priority && (
            <span className="text-gray-400 text-xs">
              Rank: {article.source_priority}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {article.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
          {article.description ||
            article.content?.substring(0, 150) ||
            'Click to read the full article...'}
        </p>

        {/* Sentiment Badge */}
        {sentiment && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-xs text-gray-600">Sentiment:</span>
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1"
              style={{
                backgroundColor: sentimentStyle.bg,
                color: sentimentStyle.text,
              }}
            >
              <span>{sentimentStyle.icon}</span>
              <span className="capitalize">{sentiment}</span>
            </span>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-200 pt-3 mt-auto"></div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3">
          <span className="text-xs text-gray-500 truncate flex-1">
            {article.source_name || 'Unknown Source'}
          </span>
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              ml-2 text-blue-600 hover:text-blue-800 font-semibold text-sm
              transition-all duration-200 whitespace-nowrap flex items-center gap-1
              group/link
            "
          >
            Read
            <span className="group-hover/link:translate-x-1 transition-transform duration-300">
              →
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}