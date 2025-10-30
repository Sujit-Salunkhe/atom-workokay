import type { Config } from 'tailwindcss'
import radixPlugin from 'tailwindcss-radix' // optional; remove if not used
import animate from "tailwindcss-animate"

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,mdx}',
    './.storybook/**/*.{ts,tsx,mdx}', // 👈 important
  ],
  darkMode: ['class', '[data-theme="dark"]'], // aligns with .atom-theme[data-theme]
  theme: {
    extend: {
      // Use CSS variables; arbitrary values also work (bg-[var(--atom-primary)])
      colors: {
        atom: {
          bg: 'var(--atom-bg)',
          surface: 'var(--atom-surface)',
          text: 'var(--atom-text)',
          muted: 'var(--atom-muted)',
          border: 'var(--atom-border)',
          primary: 'var(--atom-primary)',
          'primary-contrast': 'var(--atom-primary-contrast)',
          danger: 'var(--atom-danger)',
          success: 'var(--atom-success)',
          warning: 'var(--atom-warning)',
        },
      },
      borderRadius: {
        atom1: 'var(--atom-radius-1)',
        atom2: 'var(--atom-radius-2)',
        round: 'var(--atom-radius-round)',
      },
      boxShadow: {
        atom1: 'var(--atom-shadow-1)',
        atom2: 'var(--atom-shadow-2)',
      },
      spacing: {
        atom1: 'var(--atom-space-1)',
        atom2: 'var(--atom-space-2)',
        atom3: 'var(--atom-space-3)',
        atom4: 'var(--atom-space-4)',
        atom5: 'var(--atom-space-5)',
        atom6: 'var(--atom-space-6)',
      },
      fontSize: {
        xs: 'var(--atom-text-xs)',
        sm: 'var(--atom-text-sm)',
        base: 'var(--atom-text-md)',
        lg: 'var(--atom-text-lg)',
        xl: 'var(--atom-text-xl)',
      },
      transitionDuration: {
        atomFast: 'var(--atom-duration-fast)',
        atom: 'var(--atom-duration)',
      },
      keyframes: {
        // works with tailwindcss-animate classes
      },
    },
  },
  plugins: [
    radixPlugin({}),           // data-[state=open] variants like radix-open:, etc.
    animate,
  ],
} satisfies Config
