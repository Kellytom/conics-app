/**
 * Parabola-specific functionality for Conics Explorer
 * CONIC PLAN REFERENCE: Implements Phase 1 (Foundation) parabola visualization
 * with integer lattice intersections and assembly-ready curves
 * 
 * Converted from TypeScript to modern JavaScript - maintains all functionality
 */

// D3 is loaded via CDN in HTML
// Types are maintained through JSDoc comments for IDE support

/**
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {Object} ParabolaConfig
 * @property {number} a
 * @property {number} [b]
 * @property {number} [c]
 * @property {Point} [vertex]
 * @property {Point} [focus]
 * @property {number} [directrix]
 */

/**
 * @typedef {Object} ParabolaData
 * @property {string} type
 * @property {string} id
 * @property {string} equation
 * @property {Point[]} points
 * @property {ParabolaConfig} config
 * @property {Point[]} latticePoints
 * @property {Point} vertex
 * @property {Point} focus
 * @property {number} directrix
 * @property {number} axisOfSymmetry
 * @property {Object} bounds
 * @property {Object} metadata
 */

/**
 * Parabola mathematical utilities and rendering
 */
export class ParabolaUtils {
  /**
   * Generate standard parabola function sets for exploration
   * CONIC PLAN REFERENCE: Ground Rules Section 1 - Mathematical Precision
   * @returns {ParabolaConfig[]}
   */
  static getStandardParabolas() {
    return [
      // Basic quadratics
      { a: 1, b: 0, c: 0 },      // y = x²
      { a: 0.25, b: 0, c: 0 },   // y = x²/4
      { a: -1, b: 0, c: 4 },     // y = -x² + 4
      
      // Shifted parabolas
      { a: 1, b: -2, c: 1 },     // y = (x-1)²
      { a: 0.5, b: -2, c: 3 },   // y = 0.5(x-2)² + 1
      
      // Assembly-friendly parabolas (clean lattice intersections)
      { a: 1, b: 0, c: -4 },     // y = x² - 4
      { a: 0.125, b: 0, c: 0 },  // y = x²/8
      { a: -0.25, b: 0, c: 9 },  // y = -x²/4 + 9
      
      // Wide parabolas (for assembly connections)
      { a: 0.0625, b: 0, c: 0 }, // y = x²/16
      { a: 1/64, b: 0, c: 0 },   // y = x²/64 (very wide)
    ];
  }

  /**
   * Calculate parabola properties from coefficients
   * @param {ParabolaConfig} config 
   * @returns {ParabolaData}
   */
  static analyzeParabola(config) {
    const { a, b = 0, c = 0 } = config;
    
    // Vertex calculation: x = -b/(2a), y = c - b²/(4a)
    const vertexX = -b / (2 * a);
    const vertexY = a * vertexX * vertexX + b * vertexX + c;
    const vertex = { x: vertexX, y: vertexY };
    
    // Focus: (h, k + 1/(4a))
    const focus = {
      x: vertexX,
      y: vertexY + 1 / (4 * a)
    };
    
    // Directrix: y = k - 1/(4a)
    const directrix = vertexY - 1 / (4 * a);
    
    // Axis of symmetry
    const axisOfSymmetry = vertexX;
    
    // Generate curve points
    const range = this.getOptimalRange(a);
    const points = this.generatePoints(config, range);
    
    // Find lattice intersections
    const latticePoints = this.findLatticeIntersections(config, range);
    
    return {
      type: 'parabola',
      id: `parabola_${a}_${b}_${c}`.replace(/\./g, '_').replace(/-/g, 'neg'),
      equation: this.formatEquation(config),
      points,
      config,
      latticePoints,
      vertex,
      focus,
      directrix,
      axisOfSymmetry,
      bounds: range,
      metadata: {
        openDirection: a > 0 ? 'up' : 'down',
        width: Math.abs(1 / a),
        eccentricity: Infinity, // Parabolas have infinite eccentricity
      }
    };
  }

  /**
   * Determine optimal viewing range based on parabola width
   * FIXES: Addresses viewport display issues mentioned in original HTML
   * @param {number} a 
   * @returns {Object}
   */
  static getOptimalRange(a) {
    const absA = Math.abs(a);
    
    if (absA >= 1) {
      // Narrow parabolas
      return { xMin: -5, xMax: 5, yMin: -2, yMax: 20 };
    } else if (absA >= 0.1) {
      // Medium parabolas
      return { xMin: -10, xMax: 10, yMin: -5, yMax: 25 };
    } else if (absA >= 0.01) {
      // Wide parabolas
      return { xMin: -20, xMax: 20, yMin: -10, yMax: 50 };
    } else {
      // Very wide parabolas (like y = x²/64)
      return { xMin: -50, xMax: 50, yMin: -20, yMax: 100 };
    }
  }

  /**
   * Generate smooth curve points for rendering
   * @param {ParabolaConfig} config 
   * @param {Object} range 
   * @returns {Point[]}
   */
  static generatePoints(config, range) {
    const { a, b = 0, c = 0 } = config;
    const points = [];
    
    // Adaptive resolution based on parabola width
    const resolution = Math.abs(a) >= 0.1 ? 100 : 200;
    const step = (range.xMax - range.xMin) / resolution;
    
    for (let x = range.xMin; x <= range.xMax; x += step) {
      const y = a * x * x + b * x + c;
      
      // Only include points within the y-range
      if (y >= range.yMin && y <= range.yMax) {
        points.push({ x, y });
      }
    }
    
    return points;
  }

  /**
   * Find integer lattice points on the parabola
   * CONIC PLAN REFERENCE: Ground Rules Section 2 - Integer Lattice Points
   * @param {ParabolaConfig} config 
   * @param {Object} range 
   * @returns {Point[]}
   */
  static findLatticeIntersections(config, range) {
    const { a, b = 0, c = 0 } = config;
    const latticePoints = [];
    
    // Check integer x values in range
    for (let x = Math.ceil(range.xMin); x <= Math.floor(range.xMax); x++) {
      const y = a * x * x + b * x + c;
      
      // Check if y is close to an integer (within tolerance)
      const roundedY = Math.round(y);
      if (Math.abs(y - roundedY) < 0.001 && 
          roundedY >= range.yMin && 
          roundedY <= range.yMax) {
        latticePoints.push({ x, y: roundedY });
      }
    }
    
    return latticePoints;
  }

  /**
   * Format equation for display
   * @param {ParabolaConfig} config 
   * @returns {string}
   */
  static formatEquation(config) {
    const { a, b = 0, c = 0 } = config;
    
    let equation = 'y = ';
    
    // a term
    if (a === 1) {
      equation += 'x²';
    } else if (a === -1) {
      equation += '-x²';
    } else if (a === 0.25) {
      equation += 'x²/4';
    } else if (a === 1/64) {
      equation += 'x²/64';
    } else {
      equation += `${a}x²`;
    }
    
    // b term
    if (b !== 0) {
      if (b > 0) equation += ' + ';
      else equation += ' ';
      
      if (Math.abs(b) === 1) {
        equation += b > 0 ? 'x' : '-x';
      } else {
        equation += `${b}x`;
      }
    }
    
    // c term
    if (c !== 0) {
      if (c > 0) equation += ' + ';
      else equation += ' ';
      equation += Math.abs(c);
    }
    
    return equation;
  }

  /**
   * Calculate slope at a given x coordinate
   * CONIC PLAN REFERENCE: Technical Implementation Section 5 - Smooth Transitions
   * @param {ParabolaConfig} config 
   * @param {number} x 
   * @returns {number}
   */
  static getSlope(config, x) {
    const { a, b = 0 } = config;
    return 2 * a * x + b;
  }

  /**
   * Find connection points for assembly
   * Returns points where slopes match specified values
   * @param {ParabolaConfig} config 
   * @param {number} targetSlope 
   * @returns {Point[]}
   */
  static findConnectionPoints(config, targetSlope) {
    const { a, b = 0, c = 0 } = config;
    
    // Solve: 2ax + b = targetSlope
    const x = (targetSlope - b) / (2 * a);
    const y = a * x * x + b * x + c;
    
    return [{ x, y }];
  }

  /**
   * Generate assembly-ready parabola segment
   * CONIC PLAN REFERENCE: Technical Implementation Section 1 - Modular Construction
   * @param {ParabolaConfig} config 
   * @param {number} startX 
   * @param {number} endX 
   * @param {string} [label] 
   * @returns {Object}
   */
  static generateAssemblySegment(config, startX, endX, label) {
    const points = [];
    const resolution = 50;
    const step = (endX - startX) / resolution;
    
    for (let x = startX; x <= endX; x += step) {
      const y = config.a * x * x + (config.b || 0) * x + (config.c || 0);
      points.push({ x, y });
    }
    
    return {
      type: 'parabola',
      id: `parabola_segment_${label || 'unlabeled'}`,
      equation: this.formatEquation(config),
      points,
      bounds: { xMin: startX, xMax: endX, yMin: 0, yMax: 0 }, // Will be calculated
      metadata: {
        isSegment: true,
        label: label,
        startSlope: this.getSlope(config, startX),
        endSlope: this.getSlope(config, endX),
      }
    };
  }
}

/**
 * D3.js rendering utilities for parabolas
 */
export class ParabolaRenderer {
  /**
   * Render parabola with D3.js
   * @param {*} svg - D3 selection
   * @param {ParabolaData} data 
   * @param {Object} options 
   */
  static renderParabola(svg, data, options) {
    const line = d3.line()
      .x(d => d.x)
      .y(d => d.y)
      .curve(d3.curveBasis);

    // Main parabola curve
    svg.append('path')
      .datum(data.points)
      .attr('class', 'parabola-curve')
      .attr('d', line)
      .style('stroke', this.getColor(options.colorScheme, 'parabola', '#e74c3c'))
      .style('stroke-width', '2.5px')
      .style('fill', 'none');

    // Lattice points
    if (options.showLatticePoints && data.latticePoints.length > 0) {
      svg.selectAll('.lattice-point')
        .data(data.latticePoints)
        .enter()
        .append('circle')
        .attr('class', 'lattice-point')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 4)
        .style('fill', this.getColor(options.colorScheme, 'accent', '#2c3e50'))
        .style('stroke', '#ffffff')
        .style('stroke-width', '2px');
    }

    // Vertex point
    svg.append('circle')
      .attr('class', 'vertex-point')
      .attr('cx', data.vertex.x)
      .attr('cy', data.vertex.y)
      .attr('r', 6)
      .style('fill', this.getColor(options.colorScheme, 'primary', '#3498db'))
      .style('stroke', '#ffffff')
      .style('stroke-width', '2px');

    // Focus point (if enabled)
    if (options.showLabels) {
      svg.append('circle')
        .attr('class', 'focus-point')
        .attr('cx', data.focus.x)
        .attr('cy', data.focus.y)
        .attr('r', 3)
        .style('fill', this.getColor(options.colorScheme, 'secondary', '#f39c12'))
        .style('opacity', 0.7);
    }
  }

  /**
   * Helper to get color from scheme with fallback
   * @param {*} colorScheme 
   * @param {string} key 
   * @param {string} fallback 
   * @returns {string}
   */
  static getColor(colorScheme, key, fallback) {
    if (typeof colorScheme === 'object' && colorScheme[key]) {
      return colorScheme[key];
    }
    return fallback;
  }

  /**
   * Create interactive parabola card
   * @param {ParabolaData} data 
   * @param {HTMLElement} container 
   * @returns {HTMLElement}
   */
  static createParabolaCard(data, container) {
    const card = document.createElement('div');
    card.className = 'card bg-base-100 shadow-xl parabola-card';
    
    card.innerHTML = `
      <div class="card-body">
        <h3 class="card-title text-lg">${data.equation}</h3>
        <div class="parabola-visualization" id="parabola-${data.id}"></div>
        <div class="stats stats-vertical lg:stats-horizontal">
          <div class="stat">
            <div class="stat-title">Vertex</div>
            <div class="stat-value text-sm">(${data.vertex.x.toFixed(1)}, ${data.vertex.y.toFixed(1)})</div>
          </div>
          <div class="stat">
            <div class="stat-title">Lattice Points</div>
            <div class="stat-value text-sm">${data.latticePoints.length}</div>
          </div>
          <div class="stat">
            <div class="stat-title">Direction</div>
            <div class="stat-value text-sm">${data.metadata?.openDirection || 'N/A'}</div>
          </div>
        </div>
        <div class="card-actions justify-end mt-4">
          <button class="btn btn-primary btn-sm" onclick="window.exportParabola?.('${data.id}')">
            Export
          </button>
          <button class="btn btn-secondary btn-sm" onclick="window.analyzeParabola?.('${data.id}')">
            Analyze
          </button>
        </div>
      </div>
    `;
    
    container.appendChild(card);
    return card;
  }
}

// Make classes globally available for HTML integration
window.ParabolaUtils = ParabolaUtils;
window.ParabolaRenderer = ParabolaRenderer;
