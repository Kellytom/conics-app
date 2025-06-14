/**
 * Main application logic for Parabolas page
 * CONIC PLAN REFERENCE: Implements Phase 1 (Foundation) with modern UI
 * Converted from TypeScript to JavaScript for immediate functionality
 */

import { ParabolaUtils, ParabolaRenderer } from './parabola.js';

// Application state
let currentParabolas = [];
let renderOptions = {
  showGrid: true,
  showLatticePoints: true,
  showFormulas: false,
  showLabels: true,
  mathMode: false,
  colorScheme: {
    parabola: '#e74c3c',
    primary: '#3498db',
    secondary: '#f39c12',
    accent: '#2c3e50'
  },
  printMode: false
};

/**
 * Initialize the parabola explorer
 */
function initializeParabolaExplorer() {
  console.log('🎯 Initializing Parabola Explorer...');
  
  // Hide loading indicator
  const loadingIndicator = document.getElementById('loadingIndicator');
  if (loadingIndicator) {
    loadingIndicator.style.display = 'none';
  }
  
  // Generate standard parabolas
  const parabolaConfigs = ParabolaUtils.getStandardParabolas();
  currentParabolas = parabolaConfigs.map(config => ParabolaUtils.analyzeParabola(config));
  
  // Render parabola cards
  renderParabolaCards();
  
  // Initialize controls
  setupControls();
  
  console.log('✅ Parabola Explorer initialized with', currentParabolas.length, 'parabolas');
}

/**
 * Render all parabola cards
 */
function renderParabolaCards() {
  const container = document.getElementById('functionCards');
  if (!container) return;
  
  // Clear existing content
  container.innerHTML = '';
  
  currentParabolas.forEach(parabolaData => {
    const card = ParabolaRenderer.createParabolaCard(parabolaData, container);
    
    // Create SVG visualization for each card
    setTimeout(() => {
      createParabolaVisualization(parabolaData, card);
    }, 100);
  });
}

/**
 * Create D3 visualization for a parabola
 */
function createParabolaVisualization(data, cardElement) {
  const vizContainer = cardElement.querySelector(`#parabola-${data.id}`);
  if (!vizContainer) return;
  
  // Set up dimensions
  const margin = { top: 20, right: 20, bottom: 40, left: 50 };
  const width = 300 - margin.left - margin.right;
  const height = 250 - margin.top - margin.bottom;
  
  // Create SVG
  const svg = d3.select(vizContainer)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);
  
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
  
  // Set up scales
  const xScale = d3.scaleLinear()
    .domain([data.bounds.xMin, data.bounds.xMax])
    .range([0, width]);
  
  const yScale = d3.scaleLinear()
    .domain([data.bounds.yMax, data.bounds.yMin]) // Inverted for SVG
    .range([0, height]);
  
  // Add grid if enabled
  if (renderOptions.showGrid) {
    addGrid(g, xScale, yScale, width, height);
  }
  
  // Add axes
  addAxes(g, xScale, yScale, width, height);
  
  // Transform data points to screen coordinates
  const screenPoints = data.points.map(p => ({
    x: xScale(p.x),
    y: yScale(p.y)
  }));
  
  // Create line generator
  const line = d3.line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(d3.curveBasis);
  
  // Draw parabola
  g.append('path')
    .datum(screenPoints)
    .attr('class', 'parabola-curve')
    .attr('d', line)
    .style('stroke', renderOptions.colorScheme.parabola)
    .style('stroke-width', '2px')
    .style('fill', 'none');
  
  // Add lattice points
  if (renderOptions.showLatticePoints && data.latticePoints.length > 0) {
    g.selectAll('.lattice-point')
      .data(data.latticePoints)
      .enter()
      .append('circle')
      .attr('class', 'lattice-point')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 3)
      .style('fill', renderOptions.colorScheme.accent)
      .style('stroke', '#ffffff')
      .style('stroke-width', '1px');
  }
  
  // Add vertex
  g.append('circle')
    .attr('class', 'vertex-point')
    .attr('cx', xScale(data.vertex.x))
    .attr('cy', yScale(data.vertex.y))
    .attr('r', 4)
    .style('fill', renderOptions.colorScheme.primary)
    .style('stroke', '#ffffff')
    .style('stroke-width', '2px');
}

/**
 * Add grid to visualization
 */
function addGrid(g, xScale, yScale, width, height) {
  // Vertical grid lines
  g.selectAll('.grid-line-vertical')
    .data(xScale.ticks())
    .enter()
    .append('line')
    .attr('class', 'grid-line-vertical')
    .attr('x1', d => xScale(d))
    .attr('x2', d => xScale(d))
    .attr('y1', 0)
    .attr('y2', height)
    .style('stroke', '#e0e0e0')
    .style('stroke-width', '1px');
  
  // Horizontal grid lines
  g.selectAll('.grid-line-horizontal')
    .data(yScale.ticks())
    .enter()
    .append('line')
    .attr('class', 'grid-line-horizontal')
    .attr('x1', 0)
    .attr('x2', width)
    .attr('y1', d => yScale(d))
    .attr('y2', d => yScale(d))
    .style('stroke', '#e0e0e0')
    .style('stroke-width', '1px');
}

/**
 * Add coordinate axes
 */
function addAxes(g, xScale, yScale, width, height) {
  // X-axis
  g.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0,${yScale(0)})`)
    .call(d3.axisBottom(xScale).ticks(5))
    .style('color', '#666');
  
  // Y-axis
  g.append('g')
    .attr('class', 'y-axis')
    .attr('transform', `translate(${xScale(0)},0)`)
    .call(d3.axisLeft(yScale).ticks(5))
    .style('color', '#666');
}

/**
 * Set up interactive controls
 */
function setupControls() {
  // Grid toggle
  const showGridToggle = document.getElementById('showGrid');
  if (showGridToggle) {
    showGridToggle.addEventListener('change', function() {
      renderOptions.showGrid = this.checked;
      rerenderVisualizations();
    });
  }
  
  // Lattice points toggle
  const showLatticeToggle = document.getElementById('showLatticePoints');
  if (showLatticeToggle) {
    showLatticeToggle.addEventListener('change', function() {
      renderOptions.showLatticePoints = this.checked;
      rerenderVisualizations();
    });
  }
  
  // Formulas toggle
  const showFormulasToggle = document.getElementById('showFormulas');
  if (showFormulasToggle) {
    showFormulasToggle.addEventListener('change', function() {
      renderOptions.showFormulas = this.checked;
      toggleFormulas(this.checked);
    });
  }
  
  // Color scheme selector
  const colorSchemeSelect = document.getElementById('colorScheme');
  if (colorSchemeSelect) {
    colorSchemeSelect.addEventListener('change', function() {
      updateColorScheme(this.value);
      rerenderVisualizations();
    });
  }
}

/**
 * Update color scheme
 */
function updateColorScheme(scheme) {
  const schemes = {
    default: {
      parabola: '#e74c3c',
      primary: '#3498db',
      secondary: '#f39c12',
      accent: '#2c3e50'
    },
    mathematical: {
      parabola: '#2c3e50',
      primary: '#34495e',
      secondary: '#7f8c8d',
      accent: '#95a5a6'
    },
    celestial: {
      parabola: '#4facfe',
      primary: '#00f2fe',
      secondary: '#9b59b6',
      accent: '#8e44ad'
    },
    print: {
      parabola: '#000000',
      primary: '#000000',
      secondary: '#666666',
      accent: '#333333'
    }
  };
  
  renderOptions.colorScheme = schemes[scheme] || schemes.default;
}

/**
 * Toggle formula display
 */
function toggleFormulas(show) {
  const formulas = document.querySelectorAll('.formula-display');
  formulas.forEach(formula => {
    formula.style.display = show ? 'block' : 'none';
  });
}

/**
 * Re-render all visualizations
 */
function rerenderVisualizations() {
  // Clear and re-render all cards
  renderParabolaCards();
}

/**
 * Global functions for button interactions
 */
window.exportParabola = function(parabolaId) {
  const parabola = currentParabolas.find(p => p.id === parabolaId);
  if (parabola) {
    console.log('Exporting parabola:', parabola.equation);
    // TODO: Implement export functionality
    alert(`Export functionality for "${parabola.equation}" will be implemented in Phase 2`);
  }
};

window.analyzeParabola = function(parabolaId) {
  const parabola = currentParabolas.find(p => p.id === parabolaId);
  if (parabola) {
    console.log('Analyzing parabola:', parabola);
    
    // Create analysis modal or detailed view
    const analysis = `
Equation: ${parabola.equation}
Vertex: (${parabola.vertex.x.toFixed(2)}, ${parabola.vertex.y.toFixed(2)})
Focus: (${parabola.focus.x.toFixed(2)}, ${parabola.focus.y.toFixed(2)})
Directrix: y = ${parabola.directrix.toFixed(2)}
Lattice Points: ${parabola.latticePoints.length}
Opening: ${parabola.metadata.openDirection}
Width Parameter: ${parabola.metadata.width.toFixed(3)}
    `;
    
    alert(`Parabola Analysis:\n\n${analysis}`);
  }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Wait for D3 to be loaded
  if (typeof d3 !== 'undefined') {
    initializeParabolaExplorer();
  } else {
    console.log('⏳ Waiting for D3 to load...');
    setTimeout(() => {
      if (typeof d3 !== 'undefined') {
        initializeParabolaExplorer();
      } else {
        console.error('❌ D3.js failed to load');
      }
    }, 1000);
  }
});

// Export for other modules
export { initializeParabolaExplorer, renderOptions };
