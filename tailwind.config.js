// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./**/*.{html,js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        print: {
          black: '#000000',
          white: '#ffffff',
          divider: '#e5e7eb', // Light gray for borders/dividers
        },
        conic: {
          parabola: '#e74c3c',    // Red
          ellipse: '#3498db',     // Blue
          circle: '#2ecc71',      // Green
          hyperbola: '#9b59b6',   // Purple
          accent: '#f39c12',      // Orange
          celestial: '#4facfe',   // Light blue for angels
        },
      },
      fontFamily: {
        garamond: ['Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'Helvetica', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      screens: {
        print: { raw: 'print' },
      },
      spacing: {
        'print-margin': '2cm', // Standard print margin
      },
      pageBreak: {
        before: 'page-break-before',
        after: 'page-break-after',
        avoid: 'avoid',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#000000',
            backgroundColor: '#ffffff',
            'h1, h2, h3, h4, h5, h6': {
              color: '#000000',
              fontFamily: 'Garamond, Georgia, serif',
            },
            p: {
              color: '#000000',
            },
            'a, blockquote, code': {
              color: '#000000 !important',
            },
            '--tw-prose-bullets': '#000000',
            '--tw-prose-counters': '#000000',
            '--tw-prose-links': '#000000',
          },
        },
        print: {
          css: {
            '@media print': {
              color: '#000000 !important',
              backgroundColor: '#ffffff !important',
              'h1, h2, h3, h4, h5, h6': {
                color: '#000000 !important',
                pageBreakAfter: 'avoid',
              },
              'a': {
                textDecoration: 'none !important',
                color: '#000000 !important',
              },
              'svg': {
                maxWidth: '100%',
                height: 'auto',
              },
            },
          },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'draw-path': 'drawPath 2s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        drawPath: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
    function ({ addUtilities }) {
      addUtilities({
        '.break-before': { 'page-break-before': 'always' },
        '.break-after': { 'page-break-after': 'always' },
        '.break-avoid': { 'page-break-inside': 'avoid' },
        '.print-hidden': { '@media print': { display: 'none' } },
        '.print-block': { '@media print': { display: 'block' } },
        '.print-only': { 
          display: 'none',
          '@media print': { display: 'block' } 
        },
        '.screen-only': { 
          '@media print': { display: 'none !important' } 
        },
        '.math-formula': {
          fontFamily: 'JetBrains Mono, Consolas, monospace',
          fontSize: '0.875rem',
          backgroundColor: '#f8f9fa',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.25rem',
          border: '1px solid #e9ecef',
        },
        '.conic-card': {
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          },
        },
        '.svg-responsive': {
          width: '100%',
          height: 'auto',
          maxWidth: '100%',
        },
      });
    },
  ],
  daisyui: {
    themes: [
      {
        light: {
          'base-100': '#ffffff',
          'base-200': '#f8f9fa', 
          'base-300': '#e9ecef',
          'base-content': '#000000',
          'neutral': '#6c757d',
          'primary': '#3498db',
          'secondary': '#9b59b6', 
          'accent': '#f39c12',
          'info': '#17a2b8',
          'success': '#2ecc71',
          'warning': '#f39c12',
          'error': '#e74c3c',
        },
        print: {
          'base-100': '#ffffff', // White background
          'base-content': '#000000', // Black text
          'neutral': '#e5e7eb', // Light gray for dividers
          'primary': '#000000', // Ensure buttons/links are black
          'secondary': '#000000',
          'accent': '#000000',
          'info': '#000000',
          'success': '#000000',
          'warning': '#000000',
          'error': '#000000',
        },
      },
    ],
    base: true,
    styled: true,
    utils: true,
  },
};
