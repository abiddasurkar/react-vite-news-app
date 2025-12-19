/**
 * NewsHub Design System
 * Unified theme configuration with Teal-600 primary color and enhanced UX
 */

export const THEME = {
  // Color Palette - Tailwind CSS Teal Scale
  colors: {
    // Primary - Teal (matches Tailwind's teal-*)
    teal: {
      50: '#F0FDFA',
      100: '#CCFBF1',
      200: '#99F6E4',
      300: '#5EEAD4',
      400: '#2DD4BF',
      500: '#14B8A6',
      600: '#0D9488',  // Main color - use bg-teal-600, text-teal-600
      700: '#0F766E',
      800: '#115E59',
      900: '#134E4A',
      950: '#042F2E',
    },
    // Secondary - Amber (matches Tailwind's amber-*)
    amber: {
      50: '#FFFBEB',
      100: '#FEF3C7',
      200: '#FDE68A',
      300: '#FCD34D',
      400: '#FBBF24',
      500: '#F59E0B',
      600: '#D97706',
      700: '#B45309',
      800: '#92400E',
      900: '#78350F',
      950: '#451A03',
    },
    // Sentiment - Tailwind Scales
    emerald: {
      500: '#10B981',  // positive
      100: '#D1FAE5',  // positive light
    },
    red: {
      500: '#EF4444',  // negative
      100: '#FEE2E2',  // negative light
    },
    gray: {
      500: '#6B7280',  // neutral
      100: '#F3F4F6',  // neutral light
    },
    // Neutral - Stone (matches Tailwind's stone-*)
    stone: {
      50: '#FAFAF9',
      100: '#F5F5F4',
      200: '#E7E5E4',
      300: '#D6D3D1',
      400: '#A8A29E',
      500: '#78716C',
      600: '#57534E',
      700: '#44403C',
      800: '#292524',
      900: '#1C1917',
      950: '#0C0A09',
    },
    // Semantic - Tailwind Utility Colors
    success: {
      DEFAULT: '#10B981',  // emerald-500
      light: '#D1FAE5',    // emerald-100
    },
    warning: {
      DEFAULT: '#F59E0B',  // amber-500
      light: '#FEF3C7',    // amber-100
    },
    error: {
      DEFAULT: '#EF4444',  // red-500
      light: '#FEE2E2',    // red-100
    },
    info: {
      DEFAULT: '#0D9488',  // teal-600
      light: '#CCFBF1',    // teal-100
    },
  },

  // Typography - Optimized Readability
  typography: {
    // Display font for headlines
    display: {
      family: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      weights: {
        extrabold: 800,
        bold: 700,
        semibold: 600,
        medium: 500,
      },
      sizes: {
        h1: '2.5rem',    // 40px
        h2: '2rem',      // 32px
        h3: '1.75rem',   // 28px
        h4: '1.5rem',    // 24px
        h5: '1.25rem',   // 20px
        h6: '1.125rem',  // 18px
      },
      lineHeights: {
        tight: 1.1,
        normal: 1.3,
        relaxed: 1.5,
      },
    },
    // Body font for content
    body: {
      family: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", sans-serif',
      weights: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      sizes: {
        xl: '1.125rem',  // 18px
        lg: '1.0625rem', // 17px
        base: '1rem',    // 16px
        sm: '0.875rem',  // 14px
        xs: '0.8125rem', // 13px
        xxs: '0.75rem',  // 12px
      },
      lineHeights: {
        tight: 1.3,
        normal: 1.5,
        relaxed: 1.7,
        loose: 1.9,
      },
    },
  },

  // Spacing System (4px base for finer control)
  spacing: {
    0: '0',
    1: '0.25rem',    // 4px
    2: '0.5rem',     // 8px
    3: '0.75rem',    // 12px
    4: '1rem',       // 16px
    5: '1.25rem',    // 20px
    6: '1.5rem',     // 24px
    8: '2rem',       // 32px
    10: '2.5rem',    // 40px
    12: '3rem',      // 48px
    16: '4rem',      // 64px
    20: '5rem',      // 80px
    24: '6rem',      // 96px
  },

  // Border Radius - Refined Scale
  radius: {
    none: '0',
    sm: '0.25rem',    // 4px
    base: '0.5rem',   // 8px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '2rem',    // 32px
    full: '9999px',
  },

  // Shadows - Enhanced Depth
  shadows: {
    none: 'none',
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '2xl': '0 30px 60px -15px rgba(0, 0, 0, 0.3)',
    // Teal accent shadow
    teal: '0 10px 25px -5px rgba(13, 148, 136, 0.2), 0 4px 6px -2px rgba(13, 148, 136, 0.1)',
    tealHover: '0 20px 35px -5px rgba(13, 148, 136, 0.3), 0 8px 10px -6px rgba(13, 148, 136, 0.2)',
  },

  // Animations & Transitions - Smooth & Natural
  transitions: {
    fast: '100ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
    slowest: '700ms cubic-bezier(0.4, 0, 0.2, 1)',
    spring: '400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  },

  // Z-Index Scale
  zIndex: {
    hide: -1,
    base: 0,
    raised: 10,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modalBackdrop: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600,
  },

  // Category Colors - Tailwind Based
  categories: {
    business: { 
      bg: '#DBEAFE',      // blue-100
      text: '#1E40AF',    // blue-800
      accent: '#3B82F6',  // blue-500
      icon: '💼' 
    },
    politics: { 
      bg: '#FEE2E2',      // red-100
      text: '#991B1B',    // red-800
      accent: '#DC2626',  // red-600
      icon: '🏛️' 
    },
    top: { 
      bg: '#CCFBF1',      // teal-100
      text: '#0F766E',    // teal-700
      accent: '#0D9488',  // teal-600
      icon: '⭐' 
    },
    technology: { 
      bg: '#E0E7FF',      // indigo-100
      text: '#4338CA',    // indigo-700
      accent: '#6366F1',  // indigo-500
      icon: '🚀' 
    },
    health: { 
      bg: '#D1FAE5',      // emerald-100
      text: '#065F46',    // emerald-800
      accent: '#10B981',  // emerald-500
      icon: '🏥' 
    },
    sports: { 
      bg: '#FEF3C7',      // amber-100
      text: '#92400E',    // amber-800
      accent: '#F59E0B',  // amber-500
      icon: '⚽' 
    },
    entertainment: { 
      bg: '#FCE7F3',      // pink-100
      text: '#831843',    // pink-900
      accent: '#DB2777',  // pink-600
      icon: '🎬' 
    },
    world: { 
      bg: '#CFFAFE',      // cyan-100
      text: '#155E75',    // cyan-800
      accent: '#0891B2',  // cyan-600
      icon: '🌍' 
    },
    science: { 
      bg: '#DDD6FE',      // violet-200
      text: '#5B21B6',    // violet-800
      accent: '#8B5CF6',  // violet-500
      icon: '🔬' 
    },
    finance: { 
      bg: '#D1FAE5',      // emerald-100
      text: '#065F46',    // emerald-800
      accent: '#059669',  // emerald-600
      icon: '💰' 
    },
  },

  // Gradients - Teal Based
  gradients: {
    primary: 'linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)',
    primarySoft: 'linear-gradient(135deg, #5EEAD4 0%, #14B8A6 100%)',
    secondary: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    accent: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)',
    dark: 'linear-gradient(135deg, #134E4A 0%, #0F766E 100%)',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
    subtle: 'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0))',
    glass: 'linear-gradient(135deg, rgba(204, 251, 241, 0.1) 0%, rgba(153, 246, 228, 0.05) 100%)',
  },

  // Responsive Breakpoints
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1440px',
    '3xl': '1920px',
  },

  // Component-Specific Styles - Enhanced UX
  components: {
    button: {
      height: {
        xs: '1.75rem',   // 28px
        sm: '2rem',      // 32px
        base: '2.5rem',  // 40px
        lg: '3rem',      // 48px
        xl: '3.5rem',    // 56px
      },
      padding: {
        xs: '0.375rem 0.75rem',
        sm: '0.5rem 1rem',
        base: '0.625rem 1.25rem',
        lg: '0.875rem 1.75rem',
        xl: '1rem 2rem',
      },
      fontSize: {
        xs: '0.8125rem',
        sm: '0.875rem',
        base: '0.9375rem',
        lg: '1rem',
        xl: '1.125rem',
      },
    },
    input: {
      height: {
        sm: '2.25rem',   // 36px
        base: '2.75rem', // 44px
        lg: '3.25rem',   // 52px
      },
      padding: {
        sm: '0.5rem 0.75rem',
        base: '0.75rem 1rem',
        lg: '1rem 1.25rem',
      },
      fontSize: {
        sm: '0.875rem',
        base: '0.9375rem',
        lg: '1rem',
      },
    },
    card: {
      padding: {
        sm: '1rem',
        base: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
      radius: {
        sm: '0.5rem',
        base: '0.75rem',
        lg: '1rem',
        xl: '1.25rem',
      },
      gap: {
        sm: '0.75rem',
        base: '1rem',
        lg: '1.5rem',
      },
    },
    badge: {
      padding: '0.25rem 0.625rem',
      fontSize: '0.75rem',
      radius: '0.375rem',
      height: '1.5rem',
    },
    avatar: {
      size: {
        xs: '1.5rem',    // 24px
        sm: '2rem',      // 32px
        base: '2.5rem',  // 40px
        lg: '3rem',      // 48px
        xl: '4rem',      // 64px
        '2xl': '5rem',   // 80px
      },
    },
  },

  // Focus States - Accessibility
  focus: {
    ring: '0 0 0 3px rgba(204, 251, 241, 0.5)',
    ringTeal: '0 0 0 3px rgba(13, 148, 136, 0.3)',
    outline: '2px solid #14B8A6',
    outlineOffset: '2px',
  },

  // Interactive States
  states: {
    hover: {
      scale: 1.02,
      opacity: 0.9,
      brightness: 1.05,
    },
    active: {
      scale: 0.98,
      opacity: 0.8,
    },
    disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
}

export default THEME