# Parabolas Page JavaScript Loading Fix

## Problem
The parabolas.html page gets stuck on "Loading D3.js and initializing graphics..." and shows the error:
```
Uncaught TypeError: Cannot read properties of null (reading 'getContext')
    at HTMLDocument.<anonymous> (app.js:12:34)
```

## Root Cause
There are **two different JavaScript files** in the workspace:
1. `js/app.js` - Uses D3.js and SVG (correct version for parabolas.html)
2. `js/app-new.js` - Uses Canvas with `getContext()` (causes the error)

The browser may cache the wrong JavaScript file or load a conflicting version.

## Quick Fix Steps

### Step 1: Hard Refresh Browser
Clear browser cache to force reload of JavaScript files:
- **Mac**: `Cmd + Shift + R`
- **PC**: `Ctrl + Shift + R`
- **Alternative**: Open Developer Tools (F12) → Right-click refresh button → "Empty Cache and Hard Reload"

### Step 2: Cache-Busting Parameter
If hard refresh doesn't work, add a version parameter to force reload:

In `parabolas.html`, change:
```html
<script src="js/app.js" defer></script>
```
To:
```html
<script src="js/app.js?v=2" defer></script>
```
(Increment the version number each time you need to force a reload)

### Step 3: Verify Correct File Loading
Check browser console for these messages:
- ✅ `"Loading app.js - D3.js/SVG version"`
- ✅ `"D3.js loaded, starting initialization..."`
- ❌ If you see canvas/getContext errors, the wrong file is still loading

## Prevention
To avoid this issue in the future:

1. **Use unique filenames** for different implementations:
   - `app-svg.js` for D3.js/SVG version
   - `app-canvas.js` for Canvas version

2. **Clear browser cache** when switching between JavaScript files

3. **Use cache-busting parameters** during development:
   ```html
   <script src="js/app.js?v=1.0.0" defer></script>
   ```

## File References Fixed
Also corrected navigation links in all HTML files from `../index.html` to `index.html` since all files are in the same directory.

## Server Commands
To test the fix:
```bash
cd /Users/thomaskelly/Documents/fract-int-conic/conics-app
python3 -m http.server 8000
```
Then visit: http://localhost:8000/parabolas.html

## Expected Result
The parabolas page should display:
- Grid with mathematical lattice
- Multiple parabola curves with equations like y = x²/a
- Red dots marking lattice intersections
- Tables showing intersection coordinates
- Both narrow cards (2x2 grid) and wide cards (full width)

## Troubleshooting
If the page still doesn't load:
1. Check Network tab in Developer Tools to see which files are loading
2. Look for any 404 errors for missing CSS/JS files
3. Verify D3.js loads by typing `d3` in browser console
4. Check for any other JavaScript errors in console

---
**Last Updated**: June 13, 2025
**Fix Applied**: Cache-busting parameter and hard refresh instructions