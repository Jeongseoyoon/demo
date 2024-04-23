module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        m8: '-8px',
        m60: '-240px'
      },
      boxShadow: {
        primary: '0 0 24px 0 rgba(0, 0, 0, 0.08)',
        sidebar: '0 0 12px 0 rgba(0, 0, 0, 0.12)'
      },
      opacity: {
        button_disabled: 0.3
      },
      fontSize: {
        heading1: ['32px', '48px'],
        heading2: ['24px', '36px'],
        heading3: ['20px', '30px'], // NOTE: Figma Components 에 정의되어 있지 않음
        body1: ['16px', '24px'],
        body2: ['14px', '21px'],
        small: ['12px', '14.4px'],
        medium: ['18px', '27px'], // NOTE: Figma Components 에 정의되어 있지 않음
        header: '15px' // NOTE: Figma Components 에 정의되어 있지 않음
      },
      fontWeight: {
        semibold: 600,
        medium: 500,
        regular: 400
      },
      colors: {
        yellow: '#F09E23',
        indigo: '#0047FF',
        skyblue: '#00A3FF',
        black: '#000000',
        white: '#FFFFFF',
        system100: '#0866F3',
        system50: '#F0F6FE',
        text: {
          primary: '#09090B',
          secondary: '#52525B',
          tertiary: '#A1A1AA',
          description: 'rgba(0, 0, 0, 0.6)' // NOTE: Figma Components 에 정의되어 있지 않음
        },
        bg: {
          main: '#F6F6F6',
          inner: '#FFFFFF',
          transparent_gray: 'rgba(0, 0, 0, 0.06)',
          transparent_gray_light: 'rgba(0, 0, 0, 0.02)'
        },
        border: {
          primary: '#E4E4E7',
          dimmed: 'rgba(0, 0, 0, 0.08)' // NOTE: Figma Components 에 정의되어 있지 않음
        },
        button: {
          text_primary: '#FFFFFF',
          text_secondary: '#09090B',
          text_tertiary: '#09090B',
          bg_primary: '#18181B',
          bg_secondary: '#FFFFFF',
          bg_tertiary: '#FFFFFF00'
        },
        tabs: {
          color_active: '#09090B',
          color_inactive: '#A1A1AA'
        }
      }
    }
  },
  plugins: [require('autoprefixer')]
};
