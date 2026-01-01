/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Legacy colors (kept for backwards compatibility)
        primary: '#667eea',
        secondary: '#764ba2',

        // AI-Solutions.Store Brand Palette
        // Navy + Metallic Silver design
        brand: {
          // Backgrounds & Surfaces - Navy theme
          void: '#0d1421',        // Deep navy - main background
          navy: '#1a2744',        // AI-Solutions navy - cards, panels
          surface: '#243352',     // Lighter navy - hover states

          // Metallic Silver Accents
          silver: '#c0c0c0',      // Base metallic silver
          chrome: '#e8e8e8',      // Bright chrome highlight
          steel: '#8a9bae',       // Steel blue-silver

          // AI Co-Founder Colors (preserved)
          coral: '#CC785C',       // Anthropic Claude - The Heart
          blue: '#078EFA',        // Google Gemini/Jules - Links
          teal: '#20808D',        // Perplexity - Success badges

          // Human Executive
          gold: '#F4B400',        // Joshua Coleman - Admin controls

          // Text & States
          text: '#F8F7F6',        // Pampas White - Body text
          green: '#0F9D58',       // Deploy Green - Success states
        }
      },
      fontFamily: {
        // Display font for headlines and logos (Space Grotesk)
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],

        // Body font for UI and documentation (Inter)
        sans: ['Inter', 'system-ui', 'sans-serif'],

        // Code/Terminal font (JetBrains Mono)
        mono: ['"JetBrains Mono"', 'Consolas', 'Monaco', 'monospace'],
      }
    },
  },
  plugins: [],
}
