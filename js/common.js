// Common utilities for the Conics Explorer website
// 
// CONIC PLAN REFERENCE: This file implements the shared mathematical and SVG utilities
// referenced in "Technical Implementation Section 1 - Modular Conic Construction"
// and supports the "Integer Lattice Points" principle from "Why Conics?" section.
//
// This provides the foundation for Phase 1 (Foundation) and Phase 2 (Assembly System)
// by offering reusable mathematical functions and SVG rendering capabilities.

// Mathematical constants used throughout conic calculations
// PLAN REF: Supports "Mathematical Precision" principle - exact algebraic definitions
const MATH_CONSTANTS = {
    PI: Math.PI,
    E: Math.E,
    GOLDEN_RATIO: (1 + Math.sqrt(5)) / 2,  // Used in natural motifs (Phase 3)
    SQRT_2: Math.sqrt(2),                  // Common in lattice calculations
    SQRT_3: Math.sqrt(3)                   // Used in geometric constructions
};

// Color schemes for visualizations
// PLAN REF: Supports gallery.html visual organization and motif categorization
const COLOR_SCHEMES = {
    primary: ['#667eea', '#764ba2', '#f093fb', '#f5576c'],
    mathematical: ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'],
    celestial: ['#4facfe', '#00f2fe', '#43e97b', '#38f9d7', '#a8edea'],    // For angels project
    warm: ['#fa709a', '#fee140', '#ffecd2', '#fcb69f'],
    cool: ['#667eea', '#764ba2', '#a8edea', '#fed6e3']
};

// Utility functions for mathematical operations
// PLAN REF: Core mathematical functions supporting "Integer Lattice Points" and 
// "Smooth Connections" principles from the "Why Conics?" section
const MathUtils = {
    // Round to specified decimal places
    // PLAN REF: Essential for lattice intersection validation (floating point precision)
    round: (num, decimals = 2) => {
        return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
    },
    
    // Check if a number is an integer
    // PLAN REF: Critical for "Integer Lattice Points" validation in all conic implementations
    isInteger: (num) => {
        return Number.isInteger(num);
    },
    
    // Calculate distance between two points
    // PLAN REF: Used in assembly workflow for connection point validation
    distance: (x1, y1, x2, y2) => {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    },
    
    // Convert degrees to radians
    // PLAN REF: Supporting angle calculations for "No Acute Angles" ground rule
    toRadians: (degrees) => {
        return degrees * Math.PI / 180;
    },
    
    // Convert radians to degrees  
    // PLAN REF: Supporting angle validation for ground rules enforcement
    toDegrees: (radians) => {
        return radians * 180 / Math.PI;
    },
    
    // Generate range of numbers
    // PLAN REF: Used in conic point generation and lattice iteration
    range: (start, end, step = 1) => {
        const result = [];
        for (let i = start; i <= end; i += step) {
            result.push(i);
        }
        return result;
    },
    
    // Linear interpolation
    lerp: (a, b, t) => {
        return a + (b - a) * t;
    }
};

// DOM utilities
const DOMUtils = {
    // Create element with attributes
    createElement: (tag, attributes = {}, textContent = '') => {
        const element = document.createElement(tag);
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        if (textContent) {
            element.textContent = textContent;
        }
        return element;
    },
    
    // Add event listener with cleanup
    addEventListenerWithCleanup: (element, event, handler) => {
        element.addEventListener(event, handler);
        return () => element.removeEventListener(event, handler);
    },
    
    // Debounce function calls
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// D3.js utilities
const D3Utils = {
    // Create responsive SVG
    createResponsiveSVG: (container, width, height) => {
        return d3.select(container)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', `0 0 ${width} ${height}`)
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .style('width', '100%')
            .style('height', 'auto');
    },
    
    // Create scale with nice ticks
    createScale: (domain, range, type = 'linear') => {
        let scale;
        switch (type) {
            case 'log':
                scale = d3.scaleLog();
                break;
            case 'sqrt':
                scale = d3.scaleSqrt();
                break;
            default:
                scale = d3.scaleLinear();
        }
        return scale.domain(domain).range(range).nice();
    },
    
    // Add grid lines to SVG
    addGridLines: (svg, xScale, yScale, width, height) => {
        const gridGroup = svg.append('g').attr('class', 'grid');
        
        // Vertical grid lines
        gridGroup.selectAll('.grid-line-vertical')
            .data(xScale.ticks())
            .enter().append('line')
            .attr('class', 'grid-line-vertical')
            .attr('x1', d => xScale(d))
            .attr('x2', d => xScale(d))
            .attr('y1', 0)
            .attr('y2', height)
            .attr('stroke', '#eee')
            .attr('stroke-width', 0.5);
        
        // Horizontal grid lines
        gridGroup.selectAll('.grid-line-horizontal')
            .data(yScale.ticks())
            .enter().append('line')
            .attr('class', 'grid-line-horizontal')
            .attr('x1', 0)
            .attr('x2', width)
            .attr('y1', d => yScale(d))
            .attr('y2', d => yScale(d))
            .attr('stroke', '#eee')
            .attr('stroke-width', 0.5);
    }
};

// Animation utilities
const AnimationUtils = {
    // Smooth transition function
    easeInOutCubic: (t) => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    
    // Animate value over time
    animateValue: (start, end, duration, callback, easing = AnimationUtils.easeInOutCubic) => {
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easing(progress);
            const currentValue = start + (end - start) * easedProgress;
            
            callback(currentValue);
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }
};

// Lattice calculation utilities
const LatticeUtils = {
    // Find integer points within a given range
    getIntegerPoints: (xMin, xMax, yMin, yMax) => {
        const points = [];
        for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
            for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
                points.push({ x, y });
            }
        }
        return points;
    },
    
    // Check if a point satisfies a conic equation
    satisfiesConicEquation: (x, y, coefficients, tolerance = 0.001) => {
        const { A = 0, B = 0, C = 0, D = 0, E = 0, F = 0 } = coefficients;
        const result = A * x * x + B * x * y + C * y * y + D * x + E * y + F;
        return Math.abs(result) < tolerance;
    }
};

// Shared SVG drawing utilities
// PLAN REF: These functions implement the "SVG rendering and coordinate transformation"
// component from Phase 1 (Foundation). They provide the visual infrastructure for
// all conic section displays and support the assembly system visualization.
//
// These utilities enable the "Mathematical Precision" and "Scalability" principles
// by providing exact coordinate transformations and consistent grid systems.
const SVGUtils = {
    // Function to create SVG lattice grid
    // PLAN REF: Core visualization for "Integer Lattice Points" principle.
    // Used in all conic pages (parabolas.html, ellipses.html, etc.) and assembly system.
    // Supports the craftsman reproducibility goal by clearly showing integer intersections.
    createSVGLattice: function(svg, width, height, xMin = -50, xMax = 50, yMin = -10, yMax = 100) {
        const leftMargin = 35;
        const bottomMargin = 25;
        const topMargin = 10;
        const effectiveWidth = width - leftMargin;
        const effectiveHeight = height - bottomMargin - topMargin;
        const gridGroup = svg.append('g').attr('class', 'grid');
        
        // Vertical grid lines - show integer x-coordinates for lattice visibility
        const gridLinesX = 20;
        for (let i = 0; i <= gridLinesX; i++) {
            const x = leftMargin + (i * effectiveWidth / gridLinesX);
            gridGroup.append('line')
                .attr('x1', x).attr('y1', topMargin)
                .attr('x2', x).attr('y2', height - bottomMargin)
                .attr('stroke', '#eee').attr('stroke-width', 0.5);
        }
        
        // Horizontal grid lines - show integer y-coordinates for lattice visibility
        const gridLinesY = 15;
        for (let i = 0; i <= gridLinesY; i++) {
            const y = topMargin + effectiveHeight - (i * effectiveHeight / gridLinesY);
            gridGroup.append('line')
                .attr('x1', leftMargin).attr('y1', y)
                .attr('x2', width).attr('y2', y)
                .attr('stroke', '#eee').attr('stroke-width', 0.5);
        }
    },

    // Function to create SVG axes with tick marks and labels
    // PLAN REF: Provides mathematical context for all visualizations.
    // Essential for assembly system coordinate specification and slope calculations.
    // Supports "Mathematical Precision" by showing exact coordinate values.
    createSVGAxes: function(svg, width, height, xMin = -50, xMax = 50, yMin = -10, yMax = 100) {
        const leftMargin = 35;
        const bottomMargin = 25;
        const topMargin = 10;
        const effectiveWidth = width - leftMargin;
        const effectiveHeight = height - bottomMargin - topMargin;
        const axesGroup = svg.append('g').attr('class', 'axes');

        // X and Y axes - fundamental coordinate system for all conic mathematics
        const yZero = topMargin + effectiveHeight - (0 - yMin) * (effectiveHeight / (yMax - yMin));
        axesGroup.append('line')
            .attr('x1', 0).attr('y1', yZero)
            .attr('x2', width).attr('y2', yZero)
            .attr('stroke', '#888').attr('stroke-width', 1.5);
        axesGroup.append('line')
            .attr('x1', leftMargin).attr('y1', topMargin)
            .attr('x2', leftMargin).attr('y2', height - bottomMargin)
            .attr('stroke', '#888').attr('stroke-width', 1.5);

        // Axis labels for mathematical clarity
        axesGroup.append('text')
            .attr('x', width - 15)
            .attr('y', yZero - 5)
            .attr('fill', '#222')
            .attr('font-size', '12px')
            .attr('font-weight', 'bold')
            .text('x');
        axesGroup.append('text')
            .attr('x', leftMargin + 3)
            .attr('y', topMargin + 10)
            .attr('fill', '#222')
            .attr('font-size', '12px')
            .attr('font-weight', 'bold')
            .text('y');

        // X-axis ticks and labels
        const xTickCount = 12;
        const xTickSpacing = effectiveWidth / (xTickCount - 1);
        for (let i = 0; i < xTickCount; i++) {
            const x = leftMargin + (i * xTickSpacing);
            const xValue = Math.round(xMin + (i * (xMax - xMin) / (xTickCount - 1)));
            axesGroup.append('line')
                .attr('x1', x)
                .attr('y1', yZero - 4)
                .attr('x2', x)
                .attr('y2', yZero + 4)
                .attr('stroke', '#888')
                .attr('stroke-width', 1);
            axesGroup.append('text')
                .attr('x', x)
                .attr('y', yZero + 16)
                .attr('fill', '#222')
                .attr('font-size', '9px')
                .attr('text-anchor', 'middle')
                .text(xValue);
        }

        // Y-axis ticks and labels
        const yTickCount = 10;
        const yTickSpacing = effectiveHeight / (yTickCount - 1);
        for (let i = 0; i < yTickCount; i++) {
            const y = topMargin + effectiveHeight - (i * yTickSpacing);
            const yValue = Math.round(yMin + (i * (yMax - yMin) / (yTickCount - 1)));
            axesGroup.append('line')
                .attr('x1', leftMargin - 4)
                .attr('y1', y)
                .attr('x2', leftMargin + 4)
                .attr('y2', y)
                .attr('stroke', '#888')
                .attr('stroke-width', 1);
            axesGroup.append('text')
                .attr('x', leftMargin - 8)
                .attr('y', y + 3)
                .attr('fill', '#222')
                .attr('font-size', '9px')
                .attr('text-anchor', 'end')
                .text(yValue);
        }
    },

    // Function to calculate optimal SVG dimensions based on card type
    calculateSVGDimensions: function(cardType, containerElement = null) {
        const configs = {
            narrow: {
                paddingAndContent: 80,
                aspectRatio: 1.15,
                maxWidth: 600,
                minWidth: 400,
                maxHeight: 500,
                minHeight: 350
            },
            wide: {
                paddingAndContent: 100,
                aspectRatio: 2.0,
                maxWidth: 1200,
                minWidth: 800,
                maxHeight: 400,
                minHeight: 300
            }
        };
        
        const config = configs[cardType] || configs.narrow;
        let svgWidth = config.maxWidth;
        let svgHeight = svgWidth / config.aspectRatio;
        
        return { width: Math.round(svgWidth), height: Math.round(svgHeight) };
    }
};

// Export utilities for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MATH_CONSTANTS,
        COLOR_SCHEMES,
        MathUtils,
        DOMUtils,
        D3Utils,
        AnimationUtils,
        LatticeUtils,
        SVGUtils
    };
}

// Make available globally in browser
if (typeof window !== 'undefined') {
    window.ConicUtils = {
        MATH_CONSTANTS,
        COLOR_SCHEMES,
        MathUtils,
        DOMUtils,
        D3Utils,
        AnimationUtils,
        LatticeUtils,
        SVGUtils
    };
    
    // Make SVG functions globally available for backward compatibility
    window.createSVGLattice = SVGUtils.createSVGLattice;
    window.createSVGAxes = SVGUtils.createSVGAxes;
    window.calculateSVGDimensions = SVGUtils.calculateSVGDimensions;
}
