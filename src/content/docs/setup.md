---
title: Setup & Development Guide
description: Getting started with Conics Explorer development and deployment
---

import { Aside, Card, CardGrid } from '@astrojs/starlight/components';

<a href="/" class="back-button">← Back to Home</a>

# ⚙️ Setup & Development Guide

<span class="priority-blue">●</span> **Status: Technical Documentation**

Learn how to set up, develop, and deploy Conics Explorer. This guide covers everything from local development to GitHub Pages deployment, with a focus on the Astro Starlight implementation.

<Aside type="tip">
**Quick Start**: For the fastest setup, use GitHub Codespaces with our pre-configured environment. This bypasses all local installation requirements.
</Aside>

## 🚀 Quick Deployment to GitHub Pages

### Method 1: GitHub Codespaces (Recommended)
<span class="priority-green">●</span> **Zero Local Setup Required**

1. **Open in Codespaces**
   ```bash
   # From your GitHub repository
   Click "Code" → "Codespaces" → "Create codespace on main"
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

5. **Deploy via GitHub Actions**
   - Our automated workflow deploys on every push to main branch
   - No manual deployment steps required

### Method 2: Local Development
<span class="priority-yellow">●</span> **Requires Local Node.js**

1. **Prerequisites**
   - Node.js 18+ installed
   - Git for version control
   - VS Code (recommended)

2. **Clone Repository**
   ```bash
   git clone https://github.com/your-username/conics-app.git
   cd conics-app
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Start Development**
   ```bash
   npm run dev
   # Opens at http://localhost:4321
   ```

## 🏗️ Project Structure

<CardGrid stagger>
  <Card title="Astro Configuration" icon="setting">
    <span class="priority-green">●</span> **astro.config.mjs**
    
    Main configuration for Astro and Starlight, including:
    - Site settings and base URL
    - Starlight theme configuration
    - Sidebar navigation structure
    - Tailwind CSS integration
  </Card>

  <Card title="Content Management" icon="document">
    <span class="priority-green">●</span> **src/content/docs/**
    
    All page content in Markdown/MDX format:
    - `index.mdx` - Homepage with cards and hero
    - `parabolas.mdx` - Interactive parabola explorer
    - `angels.mdx` - Mathematical art visualization
    - `*.md` - Documentation and guide pages
  </Card>

  <Card title="Styling System" icon="palette">
    <span class="priority-green">●</span> **src/styles/custom.css**
    
    Custom CSS including:
    - Color-coded priority system
    - Conic-specific curve styling
    - Interactive control styling
    - Responsive design patterns
  </Card>

  <Card title="Automation" icon="rocket">
    <span class="priority-green">●</span> **.github/workflows/**
    
    GitHub Actions for automated deployment:
    - Build process automation
    - GitHub Pages deployment
    - Continuous integration
  </Card>
</CardGrid>

## 🎨 Color System Implementation

### CSS Classes
```css
/* Priority indicators */
.priority-red { color: #e74c3c; }      /* do later */
.priority-orange { color: #f39c12; }   /* limited free */
.priority-yellow { color: #f1c40f; }   /* do maybe */
.priority-green { color: #27ae60; }    /* do */
.priority-blue { color: #3498db; }     /* free/open source */

/* Enhanced indicators with glow effects */
.indicator-critical { 
  color: #e74c3c; 
  font-weight: bold;
  text-shadow: 0 0 2px rgba(231, 76, 60, 0.3);
}
```

### Usage in Markdown
```markdown
- <span class="priority-green">●</span> **Ready Feature** - Fully implemented
- <span class="priority-yellow">●</span> **In Development** - Partially ready
- <span class="priority-orange">●</span> **Planned** - Future implementation
```

## 🔧 Development Workflow

### Local Development
<span class="priority-green">●</span> **Standard Workflow**

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Make Changes**
   - Edit content in `src/content/docs/`
   - Modify styles in `src/styles/custom.css`
   - Update configuration in `astro.config.mjs`

3. **Test Changes**
   - Hot reload shows changes immediately
   - Check responsive design on different screen sizes
   - Verify color coding and interactive features

4. **Build and Preview**
   ```bash
   npm run build
   npm run preview
   ```

### Deployment Process
<span class="priority-green">●</span> **Automated via GitHub Actions**

1. **Push to Main Branch**
   ```bash
   git add .
   git commit -m "Update content"
   git push origin main
   ```

2. **Automatic Build**
   - GitHub Actions triggers build process
   - Astro generates static files
   - Optimizes for production deployment

3. **Deploy to GitHub Pages**
   - Automatic deployment to `username.github.io/conics-app`
   - No manual intervention required
   - Usually completes within 2-3 minutes

## 📝 Content Creation Guidelines

### Page Structure
<span class="priority-blue">●</span> **Consistent Format**

```markdown
---
title: Page Title
description: Brief description for SEO and navigation
---

import { Aside, Card, CardGrid } from '@astrojs/starlight/components';

<a href="/" class="back-button">← Back to Home</a>

# 📊 Page Title

<span class="priority-green">●</span> **Status: Current Status**

Introduction paragraph with overview and context.

<Aside type="tip">
**Helpful Note**: Important information for users.
</Aside>

## 🎯 Main Content Sections

<CardGrid stagger>
  <Card title="Feature Name" icon="star">
    Content here...
  </Card>
</CardGrid>
```

### Interactive Elements
<span class="priority-green">●</span> **JavaScript Integration**

```javascript
// Add interactive features
<script type="module">
class InteractiveFeature {
  constructor() {
    this.initializeControls();
  }
  
  initializeControls() {
    // Implementation here
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new InteractiveFeature();
});
</script>
```

## 🌐 GitHub Pages Configuration

### Repository Settings
<span class="priority-green">●</span> **Required Setup**

1. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to Pages section
   - Source: GitHub Actions
   - Custom domain (optional)

2. **Update astro.config.mjs**
   ```javascript
   export default defineConfig({
     site: 'https://your-username.github.io',
     base: '/conics-app',
     // ... other configuration
   });
   ```

3. **Verify Deployment**
   - Check Actions tab for build status
   - Visit deployed site URL
   - Test all navigation and features

### Troubleshooting
<span class="priority-yellow">●</span> **Common Issues**

- **Build Failures**: Check package.json dependencies
- **Path Issues**: Verify base URL in configuration
- **Asset Loading**: Ensure relative paths for images/CSS
- **Interactive Features**: Test JavaScript functionality after deployment

## 🔗 Related Resources

<CardGrid>
  <Card title="Astro Documentation" icon="external">
    <span class="priority-blue">●</span> **Official Docs**
    
    Complete guide to Astro framework and Starlight theme.
    
    [Visit Astro Docs →](https://docs.astro.build/)
  </Card>

  <Card title="Corporate Solutions" icon="document">
    <span class="priority-green">●</span> **Development Constraints**
    
    Solutions for restricted development environments.
    
    [Read Guide →](/corporate-solutions/)
  </Card>

  <Card title="Color System" icon="palette">
    <span class="priority-blue">●</span> **Visual Design**
    
    Understanding our color-coded visual language.
    
    [Learn System →](/color-system/)
  </Card>
</CardGrid>

## 🤝 Contributing

### Development Contributions
<span class="priority-green">●</span> **Code & Content**

- **Bug Reports**: Submit issues via GitHub
- **Feature Requests**: Propose new mathematical explorations
- **Code Contributions**: Submit pull requests with improvements
- **Documentation**: Help improve setup and usage guides

### Content Contributions
<span class="priority-blue">●</span> **Educational Material**

- **Mathematical Accuracy**: Verify equations and calculations
- **Educational Value**: Suggest learning improvements
- **Visual Design**: Propose aesthetic enhancements
- **Accessibility**: Help improve universal access

<Aside type="note">
**Open Source**: This project is MIT licensed and welcomes contributions from educators, mathematicians, developers, and designers passionate about making mathematics beautiful and accessible.
</Aside>
