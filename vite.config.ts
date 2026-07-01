import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// EveGlyph Editor marketing site. Mirrors the EML site stack:
// React 18 + Vite 6 + Tailwind v4 (plugin) + GSAP.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
