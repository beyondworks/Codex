import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './{components,imports,styles,utils}/**/*.{ts,tsx}',
    './App.tsx'
  ],
  theme: {
    extend: {
      colors: {
        // Base system colors
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        popover: 'var(--popover)',
        'popover-foreground': 'var(--popover-foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        destructive: 'var(--destructive)',
        'destructive-foreground': 'var(--destructive-foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        
        // Apple-inspired refined palette
        'apple-gray': {
          50: '#f7f7f8',
          100: '#ededf0', 
          200: '#dddde1',
          300: '#c8c8cd',
          400: '#acacb4',
          500: '#8e8e96',
          600: '#6e6e7a',
          700: '#58586b',
          800: '#414153',
          900: '#27273a',
          950: '#1a1a24',
        },
        
        // Brand colors (refined)
        'brand-gradient': 'var(--brand-gradient)',
        'brand-primary': 'var(--brand-primary)',
        'brand-secondary': 'var(--brand-secondary)',
        
        // Sidebar
        sidebar: 'var(--sidebar)',
        'sidebar-foreground': 'var(--sidebar-foreground)',
        'sidebar-primary': 'var(--sidebar-primary)',
        'sidebar-primary-foreground': 'var(--sidebar-primary-foreground)',
        'sidebar-accent': 'var(--sidebar-accent)',
        'sidebar-accent-foreground': 'var(--sidebar-accent-foreground)',
        'sidebar-border': 'var(--sidebar-border)',
        'sidebar-ring': 'var(--sidebar-ring)'
      },
      
      // Apple-inspired typography scale
      fontSize: {
        'apple-caption-2': ['0.6875rem', { lineHeight: '1.2', letterSpacing: '0.03em' }],
        'apple-caption': ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.02em' }],
        'apple-footnote': ['0.8125rem', { lineHeight: '1.3', letterSpacing: '0.01em' }],
        'apple-body': ['1rem', { lineHeight: '1.4', letterSpacing: '0' }],
        'apple-callout': ['1.0625rem', { lineHeight: '1.35', letterSpacing: '-0.005em' }],
        'apple-subheadline': ['0.9375rem', { lineHeight: '1.3', letterSpacing: '0.005em' }],
        'apple-headline': ['1.125rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'apple-title-3': ['1.25rem', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        'apple-title-2': ['1.375rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'apple-title-1': ['1.75rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'apple-large-title': ['2.125rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
      },
      
      // Refined spacing system (4px base)
      spacing: {
        '0.5': '0.125rem', // 2px
        '1': '0.25rem',    // 4px
        '1.5': '0.375rem', // 6px
        '2': '0.5rem',     // 8px
        '2.5': '0.625rem', // 10px
        '3': '0.75rem',    // 12px
        '3.5': '0.875rem', // 14px
        '4': '1rem',       // 16px
        '5': '1.25rem',    // 20px
        '6': '1.5rem',     // 24px
        '7': '1.75rem',    // 28px
        '8': '2rem',       // 32px
        '10': '2.5rem',    // 40px
        '12': '3rem',      // 48px
        '16': '4rem',      // 64px
        '20': '5rem',      // 80px
        '24': '6rem',      // 96px
      },
      
      // Apple-inspired border radius
      borderRadius: {
        'none': '0',
        'xs': '0.1875rem',    // 3px
        'sm': '0.375rem',     // 6px  
        'md': '0.5rem',       // 8px
        'lg': '0.75rem',      // 12px
        'xl': '1rem',         // 16px
        '2xl': '1.25rem',     // 20px
        '3xl': '1.5rem',      // 24px
        'full': '9999px',
      },
      
      // Refined shadow system
      boxShadow: {
        'apple-xs': '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
        'apple-sm': '0 1px 6px 0 rgba(0, 0, 0, 0.07)',
        'apple-md': '0 4px 12px 0 rgba(0, 0, 0, 0.08)', 
        'apple-lg': '0 8px 20px 0 rgba(0, 0, 0, 0.1)',
        'apple-xl': '0 16px 32px 0 rgba(0, 0, 0, 0.12)',
        'apple-inset': 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
      
      // Animation improvements
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(4px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.98)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      }
    },
  },
  plugins: [],
} satisfies Config


