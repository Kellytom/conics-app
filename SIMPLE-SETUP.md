# Conics Explorer - Simple TypeScript Setup (No Bundler)

## Option 1: Browser-Native ES Modules + TypeScript Compiler

### Setup
```bash
# Install only TypeScript and Tailwind
npm install --save-dev typescript tailwindcss @tailwindcss/typography daisyui autoprefixer postcss-cli

# Create simple build scripts
npm run tsc        # Compile TypeScript to ES modules
npm run css        # Build Tailwind CSS
npm run serve      # Simple HTTP server
```

### File Structure
```
src/
├── main.ts          # TypeScript source
├── utils/math.ts    # Will compile to .js
└── types/index.ts   # Type definitions only

dist/
├── main.js          # Compiled JavaScript (ES modules)
├── utils/math.js    # Browser-ready modules
└── styles.css       # Compiled Tailwind

# HTML files import directly:
<script type="module" src="dist/main.js"></script>
```

## Option 2: No Build Step - Pure JavaScript + JSDoc Types

### Benefits
- Zero configuration
- Works immediately in browser
- Maintains TypeScript-like benefits with JSDoc
- Perfect for educational/mathematical tools

### Example
```javascript
/**
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {Object} ConicSection
 * @property {string} id
 * @property {string} equation
 * @property {Point[]} latticePoints
 */

/**
 * Calculate distance between two points
 * @param {Point} p1 
 * @param {Point} p2 
 * @returns {number}
 */
function distance(p1, p2) {
    return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
}
```

## Option 3: Hybrid Approach - Tailwind + Simple TypeScript

Keep Tailwind for the design system, but simplify the JavaScript:

```bash
# Minimal dependencies
npm install --save-dev tailwindcss postcss autoprefixer typescript

# Simple package.json scripts
{
  "scripts": {
    "css:build": "tailwindcss -i src/styles/main.css -o css/styles.css",
    "css:watch": "tailwindcss -i src/styles/main.css -o css/styles.css --watch",
    "ts:build": "tsc",
    "ts:watch": "tsc --watch",
    "serve": "python -m http.server 8000"
  }
}
```
