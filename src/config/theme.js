/**
 * NewsHub Design System
 * Unified theme configuration for consistent UI/UX across the application
 */

export const THEME = {
  // Color Palette - Modern, Premium Blue with Warm Accents
  colors: {
    // Primary
    primary: {
      light: '#E8F2FF',
      main: '#3B82F6',
      dark: '#1E40AF',
      darker: '#1E3A8A',
    },
    // Secondary
    secondary: {
      light: '#FEF3E2',
      main: '#F59E0B',
      dark: '#D97706',
    },
    // Sentiment Colors
    sentiment: {
      positive: '#10B981',
      negative: '#EF4444',
      neutral: '#6B7280',
    },
    // Neutral
    neutral: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },

  // Typography - Premium Font Pairing
  typography: {
    // Display font for headlines
    display: {
      family: '"Geist Mono", "IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      weights: {
        bold: 700,
        semibold: 600,
      },
      sizes: {
        h1: '2.5rem', // 40px
        h2: '2rem',   // 32px
        h3: '1.5rem', // 24px
        h4: '1.25rem', // 20px
      },
      lineHeights: {
        tight: 1.2,
        normal: 1.5,
      },
    },
    // Body font for content
    body: {
      family: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif',
      weights: {
        light: 300,
        normal: 400,
        semibold: 600,
        bold: 700,
      },
      sizes: {
        base: '1rem',    // 16px
        sm: '0.875rem',  // 14px
        xs: '0.75rem',   // 12px
      },
      lineHeights: {
        tight: 1.3,
        normal: 1.6,
        relaxed: 1.8,
      },
    },
  },

  // Spacing System (8px base)
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
  },

  // Border Radius
  radius: {
    none: '0',
    sm: '0.375rem',   // 6px
    base: '0.5rem',   // 8px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    xl: '1.5rem',     // 24px
    full: '9999px',
  },

  // Shadows
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    elevation: '0 20px 40px 0 rgba(59, 130, 246, 0.15)',
  },

  // Animations & Transitions
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
    slowest: '700ms cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Z-Index Scale
  zIndex: {
    hide: '-10',
    base: '0',
    dropdown: '1000',
    sticky: '1020',
    fixed: '1030',
    modalBackdrop: '1040',
    modal: '1050',
    popover: '1060',
    tooltip: '1070',
  },

  // Category Colors
  categories: {
    business: { bg: '#DBEAFE', text: '#1E40AF', icon: '💼' },
    politics: { bg: '#FECACA', text: '#991B1B', icon: '🏛️' },
    top: { bg: '#FEF08A', text: '#854D0E', icon: '⭐' },
    technology: { bg: '#DDD6FE', text: '#4C1D95', icon: '🚀' },
    health: { bg: '#DCFCE7', text: '#166534', icon: '🏥' },
    sports: { bg: '#FEDF72', text: '#B45309', icon: '⚽' },
    entertainment: { bg: '#FBCFE8', text: '#831843', icon: '🎬' },
    world: { bg: '#CFF0F5', text: '#164E63', icon: '🌍' },
    science: { bg: '#E0E7FF', text: '#3730A3', icon: '🔬' },
    finance: { bg: '#D1FAE5', text: '#065F46', icon: '💰' },
  },

  // Gradient Overlays
  gradients: {
    primary: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
    secondary: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    accent: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
    subtle: 'linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0))',
    darkSoft: 'linear-gradient(135deg, rgba(31,41,55,0.8), rgba(31,41,55,0.6))',
  },

  // Responsive Breakpoints
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Component-Specific Styles
  components: {
    button: {
      height: {
        sm: '2rem',      // 32px
        base: '2.5rem',  // 40px
        lg: '3rem',      // 48px
      },
      padding: {
        sm: '0.5rem 1rem',
        base: '0.75rem 1.5rem',
        lg: '1rem 2rem',
      },
    },
    input: {
      height: '2.75rem', // 44px
      padding: '0.75rem 1rem',
    },
    card: {
      padding: '1.5rem',
      radius: '1rem',
    },
  },
}

export default THEME