import React from 'react';
import THEME from '../config/theme';

export default function NewsCard({ article, onArticleClick }) {
  const imageUrl = article.image_url || 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?q=80&w=600&auto=format&fit=crop';
  
  const pubDate = new Date(article.pubDate || article.publishedAt || new Date()).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Category handling
  let primaryCategory = article.category || 'top';
  if (Array.isArray(primaryCategory)) primaryCategory = primaryCategory[0] || 'top';

  const categoryConfig = THEME.categories[primaryCategory.toLowerCase()] || THEME.categories.top;

  // Sentiment
  const sentimentMap = {
    positive: { bg: THEME.colors.emerald[100], text: THEME.colors.emerald[500], icon: '📈', label: 'Positive' },
    negative: { bg: THEME.colors.red[100], text: THEME.colors.red[500], icon: '📉', label: 'Negative' },
    neutral: { bg: THEME.colors.gray[100], text: THEME.colors.gray[500], icon: '➡️', label: 'Neutral' },
  };
  const sentiment = article.sentiment || 'neutral';
  const sentimentStyle = sentimentMap[sentiment] || sentimentMap.neutral;

  const handleCardClick = () => {
    if (onArticleClick) onArticleClick(article);
    else if (article.link) window.open(article.link, '_blank', 'noopener,noreferrer');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <article
      role="article"
      tabIndex={0}
      className="group flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-transform"
      style={{
        backgroundColor: THEME.colors.stone[50],
        borderRadius: THEME.radius['2xl'],
        boxShadow: THEME.shadows.base,
        transition: THEME.transitions.normal,
      }}
      onClick={handleCardClick}
      onKeyDown={handleKeyPress}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = THEME.shadows.tealHover}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = THEME.shadows.base}
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          onError={(e) => { e.target.src = imageUrl; }}
        />
        {/* Category badge */}
        <div
          className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
          style={{
            backgroundColor: categoryConfig.bg,
            color: categoryConfig.text,
            borderRadius: THEME.radius.sm,
            fontFamily: THEME.typography.body.family,
          }}
        >
          <span>{categoryConfig.icon}</span>
          <span className="capitalize">{primaryCategory}</span>
        </div>
        {/* Source badge */}
        {article.source_name && (
          <div
            className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-bold"
            style={{
              backgroundColor: categoryConfig.accent,
              color: THEME.colors.stone[50],
              borderRadius: THEME.radius.sm,
              fontFamily: THEME.typography.body.family,
            }}
          >
            {article.source_name.length > 15 ? `${article.source_name.substring(0, 12)}...` : article.source_name}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col" style={{ gap: THEME.components.card.gap.base }}>
        <div className="flex items-center justify-between mb-2">
          <time style={{ fontFamily: THEME.typography.body.family, fontSize: THEME.typography.body.sizes.sm, color: THEME.colors.stone[500] }}>
            📅 {pubDate}
          </time>
        </div>

        <h3
          className="font-bold mb-2 line-clamp-2"
          style={{
            fontFamily: THEME.typography.display.family,
            fontSize: THEME.typography.display.sizes.h5,
            lineHeight: THEME.typography.display.lineHeights.normal,
            color: THEME.colors.stone[900],
          }}
        >
          {article.title}
        </h3>

        <p
          className="text-sm mb-3 line-clamp-3 flex-1"
          style={{
            fontFamily: THEME.typography.body.family,
            fontSize: THEME.typography.body.sizes.base,
            lineHeight: THEME.typography.body.lineHeights.relaxed,
            color: THEME.colors.stone[600],
          }}
        >
          {article.description || article.content?.substring(0, 180) || 'Click to read the full story...'}
        </p>

        {/* Sentiment badge */}
        {sentiment !== 'neutral' && (
          <div className="mb-3">
            <span
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: sentimentStyle.bg,
                color: sentimentStyle.text,
                fontFamily: THEME.typography.body.family,
                borderRadius: THEME.radius.sm,
              }}
            >
              <span>{sentimentStyle.icon}</span>
              {sentimentStyle.label}
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto">
          <span style={{ fontFamily: THEME.typography.body.family, fontSize: THEME.typography.body.sizes.sm, color: THEME.colors.stone[500] }}>
            {article.source_name || 'Unknown Source'}
          </span>
          <button
            className="px-4 py-2 rounded-lg font-semibold transition-all"
            style={{
              fontFamily: THEME.typography.body.family,
              fontSize: THEME.components.button.fontSize.base,
              color: categoryConfig.accent,
              backgroundColor: categoryConfig.bg,
              borderRadius: THEME.radius.base,
              border: `1px solid ${categoryConfig.accent}`,
              height: THEME.components.button.height.base,
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (article.link) window.open(article.link, '_blank', 'noopener,noreferrer');
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = categoryConfig.accent;
              e.currentTarget.style.color = THEME.colors.stone[50];
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = categoryConfig.bg;
              e.currentTarget.style.color = categoryConfig.accent;
            }}
          >
            Read →
          </button>
        </div>
      </div>
    </article>
  );
}
