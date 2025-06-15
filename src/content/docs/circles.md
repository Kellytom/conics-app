---
title: Circles Explorer
description: Perfect circular forms and their mathematical properties
---

import { Aside, Card, CardGrid } from '@astrojs/starlight/components';

<a href="/" class="back-button">← Back to Home</a>

# ⭕ Circles Explorer

<span class="priority-yellow">●</span> **Status: In Development**

Explore the mathematical perfection of circles - the most fundamental and beautiful of all geometric forms. Discover how the simple relationship between radius and circumference creates infinite possibilities for mathematical exploration.

<Aside type="caution">
**Development Status**: This page is currently in development. Basic functionality is available, with full interactive features coming soon.
</Aside>

## 🎯 Interactive Circle Visualization

<div id="circle-container" class="conic-grid">
  <div class="interactive-controls">
    <h3><span class="priority-yellow">●</span> Circle Parameters</h3>
    <div class="control-group">
      <label for="circle-radius">Radius:</label>
      <input type="range" id="circle-radius" min="1" max="8" step="0.1" value="3" class="interactive-control">
      <span id="circle-radius-value">3.0</span>
    </div>
    <div class="control-group">
      <label for="circle-center-x">Center X:</label>
      <input type="range" id="circle-center-x" min="-5" max="5" step="0.1" value="0" class="interactive-control">
      <span id="circle-center-x-value">0.0</span>
    </div>
    <div class="control-group">
      <label for="circle-center-y">Center Y:</label>
      <input type="range" id="circle-center-y" min="-5" max="5" step="0.1" value="0" class="interactive-control">
      <span id="circle-center-y-value">0.0</span>
    </div>
  </div>
  
  <div class="visualization-area">
    <svg id="circle-svg" width="500" height="400" viewBox="-10 -10 20 20">
      <!-- Grid -->
      <defs>
        <pattern id="grid" width="1" height="1" patternUnits="userSpaceOnUse">
          <path d="M 1 0 L 0 0 0 1" fill="none" stroke="#e0e0e0" stroke-width="0.1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      
      <!-- Axes -->
      <line x1="-10" y1="0" x2="10" y2="0" stroke="#666" stroke-width="0.2"/>
      <line x1="0" y1="-10" x2="0" y2="10" stroke="#666" stroke-width="0.2"/>
      
      <!-- Circle -->
      <circle id="main-circle" class="circle-curve conic-curve" r="3" cx="0" cy="0"/>
      
      <!-- Center point -->
      <circle id="center-point" r="0.2" cx="0" cy="0" fill="#f39c12"/>
      
      <!-- Radius line -->
      <line id="radius-line" x1="0" y1="0" x2="3" y2="0" stroke="#3498db" stroke-width="0.2"/>
    </svg>
  </div>
</div>

## 📐 Mathematical Foundation

### Standard Circle Equation
<div class="formula-display">
<span class="math-block">(x - h)² + (y - k)² = r²</span>
</div>

Where:
- <span class="priority-green">●</span> **(h, k)** is the center point
- <span class="priority-green">●</span> **r** is the radius
- <span class="priority-green">●</span> **x, y** are coordinates of points on the circle

### Key Properties
<div class="formula-display">
<span class="math-block">Circumference = 2πr</span>
<span class="math-block">Area = πr²</span>
<span class="math-block">Diameter = 2r</span>
</div>

<Aside type="note">
**Perfect Symmetry**: Circles have infinite rotational symmetry and are the only closed curve where every point is equidistant from the center.
</Aside>

## 🔢 Circle Calculations

<CardGrid stagger>
  <Card title="Current Measurements" icon="approve-check">
    <span class="priority-yellow">●</span> **Live Calculations**
    
    <div id="circle-measurements">
      <div>Radius: <span id="display-radius">3.0</span></div>
      <div>Diameter: <span id="display-diameter">6.0</span></div>
      <div>Circumference: <span id="display-circumference">18.85</span></div>
      <div>Area: <span id="display-area">28.27</span></div>
    </div>
  </Card>

  <Card title="Special Circles" icon="star">
    <span class="priority-blue">●</span> **Coming Soon**
    
    Special circle types to explore:
    - Unit Circle (r = 1)
    - Golden Circle (r = φ)
    - Fibonacci Circles
    - Nested Circle Patterns
  </Card>
</CardGrid>

## 🎨 Visual Properties

### Circle Styling
- <span style="color: #27ae60; font-weight: bold;">●</span> **Circle Curve** - Success green (#27ae60)
- <span style="color: #f39c12; font-weight: bold;">●</span> **Center Point** - Warning orange (#f39c12)
- <span style="color: #3498db; font-weight: bold;">●</span> **Radius Line** - Info blue (#3498db)
- <span style="color: #e0e0e0; font-weight: bold;">●</span> **Grid Lines** - Light gray (#e0e0e0)

### Interactive Features
- <span class="priority-yellow">●</span> **Real-time Updates** - Changes reflect immediately
- <span class="priority-yellow">●</span> **Live Calculations** - Automatic measurement updates
- <span class="priority-green">●</span> **Responsive Design** - Works on all screen sizes
- <span class="priority-green">●</span> **Mathematical Precision** - Accurate circle rendering

## 🚧 Development Roadmap

<CardGrid>
  <Card title="Phase 1: Basic Circles" icon="pencil">
    <span class="status-in-progress">In Progress</span>
    
    - <span class="priority-yellow">●</span> Interactive radius control
    - <span class="priority-yellow">●</span> Center point positioning
    - <span class="priority-yellow">●</span> Real-time measurements
    - <span class="priority-green">●</span> Basic visualization
  </Card>

  <Card title="Phase 2: Advanced Features" icon="setting">
    <span class="status-planned">Planned</span>
    
    - <span class="priority-orange">●</span> Multiple circles
    - <span class="priority-orange">●</span> Tangent lines
    - <span class="priority-orange">●</span> Intersection points
    - <span class="priority-orange">●</span> Animation controls
  </Card>

  <Card title="Phase 3: Special Circles" icon="star">
    <span class="status-planned">Planned</span>
    
    - <span class="priority-blue">●</span> Unit circle trigonometry
    - <span class="priority-blue">●</span> Fibonacci spirals
    - <span class="priority-blue">●</span> Circle packing
    - <span class="priority-blue">●</span> Geometric constructions
  </Card>
</CardGrid>

## 🚀 Explore More

<CardGrid>
  <Card title="Parabolas" icon="right-arrow">
    <span class="priority-green">●</span> **Fully Ready**
    
    Explore quadratic curves with full interactive features.
    
    [Explore Parabolas →](/parabolas/)
  </Card>

  <Card title="Angels" icon="heart">
    <span class="priority-green">●</span> **Beautiful & Interactive**
    
    Experience mathematical beauty through celestial visualizations.
    
    [Meet Angels →](/angels/)
  </Card>

  <Card title="Ellipses" icon="puzzle">
    <span class="priority-orange">●</span> **Coming Soon**
    
    Discover elliptical curves and orbital mechanics.
    
    [View Ellipses →](/ellipses/)
  </Card>
</CardGrid>

## 📚 Educational Value

### Learning Objectives
Understanding circles helps with:

1. <span class="priority-green">●</span> **Fundamental Geometry** - Basic geometric principles
2. <span class="priority-green">●</span> **Trigonometry** - Unit circle and angle relationships
3. <span class="priority-yellow">●</span> **Calculus** - Areas and arc lengths
4. <span class="priority-blue">●</span> **Physics** - Circular motion and waves

### Real-world Applications
- <span class="priority-blue">●</span> **Engineering** - Wheels, gears, and rotating machinery
- <span class="priority-blue">●</span> **Architecture** - Domes, arches, and circular structures
- <span class="priority-blue">●</span> **Astronomy** - Planetary orbits and celestial mechanics
- <span class="priority-blue">●</span> **Art & Design** - Symmetry and proportion

<script type="module">
// Circle visualization script
class CircleExplorer {
  constructor() {
    this.svg = document.getElementById('circle-svg');
    this.circle = document.getElementById('main-circle');
    this.centerPoint = document.getElementById('center-point');
    this.radiusLine = document.getElementById('radius-line');
    
    this.radius = 3;
    this.centerX = 0;
    this.centerY = 0;
    
    this.initializeControls();
    this.updateVisualization();
  }
  
  initializeControls() {
    document.getElementById('circle-radius').addEventListener('input', (e) => {
      this.radius = parseFloat(e.target.value);
      document.getElementById('circle-radius-value').textContent = this.radius.toFixed(1);
      this.updateVisualization();
    });
    
    document.getElementById('circle-center-x').addEventListener('input', (e) => {
      this.centerX = parseFloat(e.target.value);
      document.getElementById('circle-center-x-value').textContent = this.centerX.toFixed(1);
      this.updateVisualization();
    });
    
    document.getElementById('circle-center-y').addEventListener('input', (e) => {
      this.centerY = parseFloat(e.target.value);
      document.getElementById('circle-center-y-value').textContent = this.centerY.toFixed(1);
      this.updateVisualization();
    });
  }
  
  updateVisualization() {
    // Update circle
    this.circle.setAttribute('cx', this.centerX);
    this.circle.setAttribute('cy', this.centerY);
    this.circle.setAttribute('r', this.radius);
    
    // Update center point
    this.centerPoint.setAttribute('cx', this.centerX);
    this.centerPoint.setAttribute('cy', this.centerY);
    
    // Update radius line
    this.radiusLine.setAttribute('x1', this.centerX);
    this.radiusLine.setAttribute('y1', this.centerY);
    this.radiusLine.setAttribute('x2', this.centerX + this.radius);
    this.radiusLine.setAttribute('y2', this.centerY);
    
    // Update calculations
    this.updateCalculations();
  }
  
  updateCalculations() {
    const diameter = this.radius * 2;
    const circumference = 2 * Math.PI * this.radius;
    const area = Math.PI * this.radius * this.radius;
    
    document.getElementById('display-radius').textContent = this.radius.toFixed(2);
    document.getElementById('display-diameter').textContent = diameter.toFixed(2);
    document.getElementById('display-circumference').textContent = circumference.toFixed(2);
    document.getElementById('display-area').textContent = area.toFixed(2);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new CircleExplorer();
});
</script>

<style>
.control-group {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.control-group label {
  min-width: 120px;
  font-weight: 500;
}

.control-group input[type="range"] {
  flex: 1;
  margin: 0 1rem;
}

.control-group span {
  min-width: 40px;
  font-family: monospace;
  font-weight: bold;
  color: var(--sl-color-accent);
}

.visualization-area {
  display: flex;
  justify-content: center;
  align-items: center;
}

#circle-svg {
  border: 1px solid var(--sl-color-gray-5);
  border-radius: 8px;
  background: white;
}

#circle-measurements {
  font-family: monospace;
  font-size: 0.95rem;
  background: rgba(52, 152, 219, 0.1);
  padding: 1rem;
  border-radius: 0.5rem;
  border-left: 4px solid #3498db;
}

#circle-measurements div {
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
}

#circle-measurements span {
  font-weight: bold;
  color: var(--sl-color-accent);
}

@media (max-width: 768px) {
  .conic-grid {
    grid-template-columns: 1fr;
  }
  
  #circle-svg {
    width: 100%;
    height: auto;
  }
}
</style>
