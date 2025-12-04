# @workokay/atom

A modern React component library built with TypeScript, Tailwind CSS, and Radix UI primitives.

## Installation

```bash
npm install @workokay/atom
```

## Setup

### 1. Import CSS Styles

Import the Atom UI CSS bundle in your app's entry point (e.g., `main.tsx`, `App.tsx`, or `index.tsx`):

```tsx
// main.tsx or App.tsx
import '@workokay/atom/dist/atom.css'
```

### 2. Wrap Your App with Theme Provider

Wrap your application (or the part using Atom components) with the `atom-theme` class and set the theme:

```tsx
// App.tsx
import { Button } from '@workokay/atom'
import '@workokay/atom/dist/atom.css'

function App() {
  return (
    <div className="atom-theme" data-theme="light">
      {/* Your app content */}
      <Button variant="primary" size="md">Click me</Button>
    </div>
  )
}
```

**Available themes:**
- `data-theme="light"` - Light theme with teal green primary color
- `data-theme="dark"` - Dark theme variant
- `data-theme="cyan-light"` - Cyan color scheme (light)
- `data-theme="cyan-dark"` - Cyan color scheme (dark)

### 3. Configure Tailwind CSS (Required)

Atom components use Tailwind CSS utility classes. Make sure you have Tailwind CSS configured in your project:

**Install Tailwind CSS:**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Configure `tailwind.config.js`:**
```js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@workokay/atom/dist/**/*.{js,jsx}", // Include Atom components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Add Tailwind directives to your CSS:**
```css
/* src/index.css or src/styles.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Usage

```tsx
import { Button, Input } from '@workokay/atom'
import '@workokay/atom/dist/atom.css'

function MyComponent() {
  return (
    <div className="atom-theme" data-theme="light">
      <Button variant="primary" size="md">
        Primary Button
      </Button>
      
      <Button variant="secondary" size="sm">
        Secondary Button
      </Button>
      
      <Input placeholder="Enter text..." />
    </div>
  )
}
```

## Components

### Button

```tsx
<Button 
  variant="primary" | "secondary" | "ghost" | "success" | "danger" | "warning" | "info" | "icon" | "iconGhost" | "iconSquare" | "iconSquareGhost"
  size="sm" | "md" | "lg"
  fullWidth={boolean}
  ripple={boolean} // Enable/disable ripple effect (default: true)
  asChild={boolean} // Render as child element via Radix Slot
>
  Button Text
</Button>
```

### Input

```tsx
<Input
  size="sm" | "md" | "lg"
  tone="default" | "invalid" | "success"
  leftIcon={ReactNode}
  rightIcon={ReactNode}
  hint={string}
  errorText={string}
  loading={boolean}
/>
```

## Features

- ✅ **Teal Green Theme** - Beautiful teal green primary color (`#00796B`) by default
- ✅ **Ripple Effects** - Material Design-inspired ripple animations on buttons
- ✅ **Dark Mode** - Built-in dark theme support
- ✅ **TypeScript** - Fully typed components
- ✅ **Accessible** - Built on Radix UI primitives
- ✅ **Customizable** - CSS variables for easy theming

## CSS Variables

All colors and styles are controlled via CSS variables. You can customize them:

```css
.atom-theme {
  --atom-primary: #00796B; /* Teal green */
  --atom-button-bg: var(--atom-primary);
  /* ... more variables */
}
```

See `dist/atom.css` for the complete list of CSS variables.

## Requirements

- React 18+ or React 19+
- Tailwind CSS configured in your project
- Modern browser with CSS custom properties support

## License

MIT
