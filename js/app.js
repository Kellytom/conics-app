// This file contains the main JavaScript code for the application. It generates the formulas for the conics, calculates the points that intersect the fractional integer lattice, and uses D3.js to visualize the grid lattice and the points on the parabola with crisp SVG graphics.

console.log('Loading app.js - D3.js/SVG version');

// TODO: Parabolas are currently outside the view range and need to be corrected
// The current scaling and coordinate system needs adjustment to properly display the parabolas within the visible viewport
//
// CORE DESIGN GOALS:
// 1. TARGET: ~29 lattice intersections per graph (meaningful mathematical content)
// 2. CARD SCALING: Scale graph to fit card dimensions (1/2 page wide)
//    - Narrow cards: can be tall for steep parabolas
//    - Wide cards: can be wide for flat parabolas, but not too high
// 3. COMPLETE PARABOLA: Show bottom of parabola (vertex at origin) - currently clipped off
// 4. ADAPTIVE RANGES: Calculate coordinate ranges to achieve target intersection count
//
// ATTEMPTED FIXES ANALYSIS:
// - First attempt: Arbitrary small ranges (x:[-10,10], y:[0,25]) - lost most points
// - Second attempt: Mathematics-driven ranges - graph too small, still clipping parabola bottom
// - Current issue: Need to work backwards from target intersection count to determine optimal ranges
//
// REQUIRED LOGIC:
// 1. For equation y = x²/a, find range that gives ~29 integer intersection points
// 2. Ensure parabola vertex (0,0) is always visible
// 3. Scale coordinate system to fit card dimensions while maintaining aspect ratio
// 4. Adjust card height/width based on parabola shape (narrow vs wide)
//
// DETAILED TECHNICAL ANALYSIS:
// Problem: Parabola y = x²/a becomes increasingly flat as 'a' increases
// Example: For a=1024, at x=±32, y = 1024/1024 = 1 (very flat curve)
// 
// Current Implementation Issues:
// 1. COORDINATE TRANSFORMATION: SVG pixel coordinates vs mathematical coordinates
//    - SVG: origin (0,0) top-left, Y increases downward
//    - Math: origin typically center, Y increases upward
//    - Current mapping: px = leftMargin + (x - xMin) * (effectiveWidth / (xMax - xMin))
//    - Current mapping: py = topMargin + effectiveHeight - y * (effectiveHeight / yMax)
//
// 2. LATTICE INTERSECTION ALGORITHM: 
//    - Uses: step = Math.sqrt(a / getSquareFreePart(a))
//    - May not generate correct integer lattice points for all 'a' values
//    - Integer check: Number.isInteger(x) && Number.isInteger(y) may fail due to floating point precision
//    - Range constraints may eliminate valid intersections
//
// 3. SCALING PROBLEMS:
//    - Linear scaling inadequate for wide range of 'a' values (1 to 3136)
//    - Large 'a' values produce curves too flat to visualize effectively
//    - Small 'a' values may produce curves too steep/narrow
//
// 4. D3.js CURVE INTERPOLATION:
//    - Using d3.curveCardinal which may smooth out important features
//    - Step size of (xMax-xMin)/200 may miss critical points
//
// DEBUGGING STEPS TAKEN:
// - Added console.log to verify D3.js loading ✓
// - Added cache-busting parameter to prevent JS conflicts ✓
// - Implemented adaptive coordinate ranges (didn't solve core issue)
// - Modified axis labeling to reflect actual ranges
//
// POTENTIAL SOLUTIONS TO TRY:
// 1. Add debug logging for generated points: console.log(points, intersections)
// 2. Test with simple cases first (a=1, a=4, a=9) to verify basic functionality
// 3. Use logarithmic or square-root scaling for large 'a' values
// 4. Implement separate scaling strategies per card type
// 5. Fix floating-point precision issues in intersection detection
// 6. Use d3.curveLinear instead of curveCardinal for more accurate representation
// 7. Consider viewport-relative scaling instead of fixed coordinate ranges
// 8. Verify mathematical correctness of lattice intersection formula
//
// STATUS: TODO - Additional debugging and algorithm refinement needed

// Function to calculate optimal SVG dimensions based on card type and available space
function calculateSVGDimensions(cardType, containerElement = null) {
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

// Function to create SVG lattice grid
function createSVGLattice(svg, width, height) {
    const leftMargin = 35;
    const bottomMargin = 25;
    const topMargin = 10;
    const effectiveWidth = width - leftMargin;
    const effectiveHeight = height - bottomMargin - topMargin;
    
    const gridGroup = svg.append('g').attr('class', 'grid');
    
    // Vertical grid lines
    const gridSpacingX = effectiveWidth / 20;
    for (let i = 0; i <= 20; i++) {
        const x = leftMargin + (i * gridSpacingX);
        gridGroup.append('line')
            .attr('x1', x).attr('y1', topMargin)
            .attr('x2', x).attr('y2', height - bottomMargin)
            .attr('stroke', '#eee').attr('stroke-width', 0.5);
    }
    
    // Horizontal grid lines
    const gridSpacingY = effectiveHeight / 15;
    for (let i = 0; i <= 15; i++) {
        const y = topMargin + (i * gridSpacingY);
        gridGroup.append('line')
            .attr('x1', leftMargin).attr('y1', y)
            .attr('x2', width).attr('y2', y)
            .attr('stroke', '#eee').attr('stroke-width', 0.5);
    }
}

// Function to create SVG axes with tick marks and labels
function createSVGAxes(svg, width, height) {
    // FAILED ATTEMPT: Added yMin parameter to show vertex at origin
    // function createSVGAxes(svg, width, height, xMin, xMax, yMin, yMax)
    // This failed because it didn't maintain the 29+ intersection requirement
    // Reverting to original function signature for now
    
    const leftMargin = 35;
    const bottomMargin = 25;
    const topMargin = 10;
    const effectiveWidth = width - leftMargin;
    const effectiveHeight = height - bottomMargin - topMargin;
    
    const axesGroup = svg.append('g').attr('class', 'axes');
    
    // X and Y axes
    axesGroup.append('line')
        .attr('x1', 0).attr('y1', height - bottomMargin)
        .attr('x2', width).attr('y2', height - bottomMargin)
        .attr('stroke', '#888').attr('stroke-width', 1.5);
        
    axesGroup.append('line')
        .attr('x1', leftMargin).attr('y1', topMargin)
        .attr('x2', leftMargin).attr('y2', height - bottomMargin)
        .attr('stroke', '#888').attr('stroke-width', 1.5);

    // Axis labels
    axesGroup.append('text')
        .attr('x', width - 15)
        .attr('y', height - bottomMargin - 5)
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
    const xTickSpacing = effectiveWidth / 12;
    for (let i = 1; i < 12; i++) {
        const x = leftMargin + (i * xTickSpacing);
        
        // Tick mark
        axesGroup.append('line')
            .attr('x1', x)
            .attr('y1', height - bottomMargin - 2)
            .attr('x2', x)
            .attr('y2', height - bottomMargin + 2)
            .attr('stroke', '#888')
            .attr('stroke-width', 1);
        
        // Label
        const xValue = Math.round(-50 + (i * 100 / 12));
        axesGroup.append('text')
            .attr('x', x)
            .attr('y', height - bottomMargin + 15)
            .attr('fill', '#222')
            .attr('font-size', '8px')
            .attr('text-anchor', 'middle')
            .text(xValue);
    }
    
    // Y-axis ticks and labels
    const yTickSpacing = effectiveHeight / 8;
    for (let i = 1; i < 8; i++) {
        const y = topMargin + effectiveHeight - (i * yTickSpacing);
        
        // Tick mark
        axesGroup.append('line')
            .attr('x1', leftMargin - 2)
            .attr('y1', y)
            .attr('x2', leftMargin + 2)
            .attr('y2', y)
            .attr('stroke', '#888')
            .attr('stroke-width', 1);
        
        // Label
        const yValue = Math.round(i * 100 / 8);
        axesGroup.append('text')
            .attr('x', leftMargin - 8)
            .attr('y', y + 3)
            .attr('fill', '#222')
            .attr('font-size', '8px')
            .attr('text-anchor', 'end')
            .text(yValue);
    }
}

// SVG-based lattice intersection calculation with mathematical optimization
function calculateParabolaLatticeIntersections(a, width, height) {
    const points = [];
    const intersections = [];
    
    const leftMargin = 35;
    const bottomMargin = 25;
    const topMargin = 10;
    const effectiveWidth = width - leftMargin;
    const effectiveHeight = height - bottomMargin - topMargin;
    
    // FAILED ATTEMPT: Tried to work backwards from target intersection count (~29 points)
    // const targetK = 14; // Target ~29 intersections (14 positive + origin + 14 negative)
    // This approach failed because it didn't maintain the minimum 29 intersections requirement
    // Reverting to previous mathematics-driven ranges approach for now
    // TODO: Need to implement proper logic to ensure 29+ intersections per graph
    
    // Calculate proper mathematical ranges based on lattice intersections
    // For y = x²/a, integer intersections occur when x = k*√a for integer k
    const sqrtA = Math.sqrt(a);
    
    // Find the maximum k that gives reasonable y values
    let maxK = 1;
    while ((maxK * sqrtA) * (maxK * sqrtA) / a <= 200) {
        maxK++;
    }
    maxK = Math.max(maxK - 1, 1); // Back off one step
    
    // Set coordinate ranges based on actual lattice points
    const xMin = -maxK * sqrtA * 1.2; // Add 20% padding
    const xMax = maxK * sqrtA * 1.2;
    const yMax = (maxK * sqrtA) * (maxK * sqrtA) / a * 1.5; // Add 50% padding
    
    // Generate parabola points for smooth curve
    const stepSize = (xMax - xMin) / 400; // High resolution
    for (let x = xMin; x <= xMax; x += stepSize) {
        const y = (x * x) / a;
        if (y >= 0 && y <= yMax) {
            const px = leftMargin + (x - xMin) * (effectiveWidth / (xMax - xMin));
            const py = topMargin + effectiveHeight - y * (effectiveHeight / yMax);
            points.push({ x: px, y: py, origX: x, origY: y });
        }
    }
    
    // Calculate actual lattice intersections mathematically
    // For y = x²/a to have integer solutions, x must be of form k*√a where k*√a is integer
    for (let k = -maxK; k <= maxK; k++) {
        const x = k * sqrtA;
        const y = (x * x) / a;
        
        // Check if both x and y are integers (within floating point precision)
        if (Math.abs(x - Math.round(x)) < 1e-10 && Math.abs(y - Math.round(y)) < 1e-10) {
            const roundedX = Math.round(x);
            const roundedY = Math.round(y);
            
            if (roundedX >= xMin && roundedX <= xMax && roundedY >= 0 && roundedY <= yMax) {
                const px = leftMargin + (roundedX - xMin) * (effectiveWidth / (xMax - xMin));
                const py = topMargin + effectiveHeight - roundedY * (effectiveHeight / yMax);
                intersections.push({ x: px, y: py, origX: roundedX, origY: roundedY });
            }
        }
    }
    
    return { points, intersections, xMin, xMax };
}

// Function to draw SVG parabola and label intersections
function drawSVGParabola(svg, a, color, width, height) {
    const { points, intersections, xMin, xMax } = calculateParabolaLatticeIntersections(a, width, height);
    // FAILED ATTEMPT: Added yMin, yMax return values
    // const { points, intersections, xMin, xMax, yMin, yMax } = calculateParabolaLatticeIntersections(a, width, height);
    // This failed because it didn't maintain the 29+ intersection requirement
    // Reverting to previous return structure for now
    
    if (points.length === 0) return { points: [], intersections: [] };
    
    // Create parabola path
    const line = d3.line()
        .x(d => d.x)
        .y(d => d.y)
        .curve(d3.curveLinear); // Use linear interpolation for mathematical accuracy
    
    const parabolaGroup = svg.append('g').attr('class', 'parabola');
    
    // Draw parabola curve
    parabolaGroup.append('path')
        .datum(points)
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', 2)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round');
    
    // Draw intersection points and labels
    const intersectionGroup = svg.append('g').attr('class', 'intersections');
    
    intersections.forEach(pt => {
        // Draw red dot
        intersectionGroup.append('circle')
            .attr('cx', pt.x)
            .attr('cy', pt.y)
            .attr('r', 2.5)
            .attr('fill', 'red')
            .attr('stroke', 'darkred')
            .attr('stroke-width', 0.5);
        
        // Position labels: negative x values on left, positive on right
        const isNegative = pt.origX < 0;
        const labelX = isNegative ? pt.x - 4 : pt.x + 4;
        const textAnchor = isNegative ? 'end' : 'start';
        
        intersectionGroup.append('text')
            .attr('x', labelX)
            .attr('y', pt.y - 4)
            .attr('fill', 'black')
            .attr('font-size', '8px')
            .attr('font-family', 'Arial, sans-serif')
            .attr('text-anchor', textAnchor)
            .text(`(${Math.round(pt.origX)}, ${Math.round(pt.origY)})`);
    });
    
    return { points, intersections };
}

// Function to create a card for each function
function displayFunctionCards(aValues, cardType = 'narrow', container = null) {
    const parent = container || document.getElementById('functionCards');
    const colors = ['blue', 'green', 'red', 'purple', 'orange', 'brown', 'pink', 'gray', 'olive', 'navy'];
    
    if (!parent) {
        console.error('Parent container not found!');
        return;
    }
    
    aValues.forEach((a, idx) => {
        // Create card
        const card = document.createElement('div');
        card.className = `function-card ${cardType}`;
        
        if (cardType === 'narrow') {
            card.style.cssText = 'border: 1px solid #ddd; margin: 10px; padding: 10px; background: white; border-radius: 8px;';
        } else {
            card.style.cssText = 'border: 1px solid #ddd; margin: 20px 0; padding: 15px; background: white; border-radius: 8px; width: 100%;';
        }
        
        const dimensions = calculateSVGDimensions(cardType, card);
        const svgWidth = dimensions.width;
        const svgHeight = dimensions.height;
        
        const svg = d3.select(card)
            .append('svg')
            .attr('width', svgWidth)
            .attr('height', svgHeight)
            .style('width', '100%')
            .style('height', 'auto')
            .style('background-color', '#fafafa')
            .style('border', '1px solid #ddd')
            .style('border-radius', '4px');
        
        // Draw elements
        let intersections = [];
        // FAILED ATTEMPT: Added coordinate ranges with yMin/yMax support
        // coordinateRanges = { xMin: result.xMin, xMax: result.xMax, yMin: result.yMin, yMax: result.yMax };
        // createSVGAxes(svg, svgWidth, svgHeight, coordinateRanges.xMin, coordinateRanges.xMax, coordinateRanges.yMin, coordinateRanges.yMax);
        // This failed because it didn't maintain the 29+ intersection requirement
        // Reverting to original function calls for now
        try {
            createSVGLattice(svg, svgWidth, svgHeight);
            createSVGAxes(svg, svgWidth, svgHeight);
            const result = drawSVGParabola(svg, a, colors[idx % colors.length], svgWidth, svgHeight);
            intersections = result.intersections || [];
        } catch (error) {
            console.error('Error creating SVG elements:', error);
        }
        
        // Add formula and info
        const formula = document.createElement('div');
        formula.innerHTML = `<b style="color:${colors[idx % colors.length]}">y = x² / ${a}</b><br><span style="color:#333;font-size:10px;">√a = ${Math.sqrt(a) % 1 === 0 ? Math.sqrt(a) : Math.sqrt(a).toFixed(2)}</span>`;
        formula.style.textAlign = 'center';
        formula.style.marginTop = '5px';
        formula.style.fontSize = '12px';
        card.appendChild(formula);
        
        // Add intersection count
        const count = document.createElement('div');
        count.innerHTML = `<span style="color:#666;font-size:10px;">${intersections.length} intersections</span>`;
        count.style.textAlign = 'center';
        count.style.marginTop = '2px';
        card.appendChild(count);
        
        // Add intersection table for narrow cards
        if (cardType === 'narrow' && intersections.length > 0) {
            const tableContainer = document.createElement('div');
            tableContainer.style.cssText = 'max-height: 100px; overflow-y: auto; margin-top: 10px; font-size: 8px;';
            
            let tableHtml = '<table style="width: 100%; border-collapse: collapse;"><tr><th style="border: 1px solid #ddd; padding: 2px;">x</th><th style="border: 1px solid #ddd; padding: 2px;">y</th></tr>';
            intersections.slice(0, 20).forEach(pt => {
                tableHtml += `<tr><td style="border: 1px solid #ddd; padding: 2px; text-align: center;">${pt.origX}</td><td style="border: 1px solid #ddd; padding: 2px; text-align: center;">${pt.origY}</td></tr>`;
            });
            if (intersections.length > 20) {
                tableHtml += '<tr><td colspan="2" style="text-align: center; font-style: italic;">...</td></tr>';
            }
            tableHtml += '</table>';
            tableContainer.innerHTML = tableHtml;
            card.appendChild(tableContainer);
        }
        
        // Add horizontal intersection table for wide cards
        if (cardType === 'wide' && intersections.length > 0) {
            const tableContainer = document.createElement('div');
            tableContainer.style.cssText = 'margin-top: 15px; font-size: 10px;';
            
            let tableHtml = '<b>Lattice Intersections:</b><br><table style="width: 100%; border-collapse: collapse; margin-top: 5px;">';
            tableHtml += '<tr><th style="border: 1px solid #ddd; padding: 4px;">x</th>';
            intersections.slice(0, 15).forEach(pt => {
                tableHtml += `<td style="border: 1px solid #ddd; padding: 4px; text-align: center;">${pt.origX}</td>`;
            });
            if (intersections.length > 15) tableHtml += '<td style="text-align: center;">...</td>';
            tableHtml += '</tr><tr><th style="border: 1px solid #ddd; padding: 4px;">y</th>';
            intersections.slice(0, 15).forEach(pt => {
                tableHtml += `<td style="border: 1px solid #ddd; padding: 4px; text-align: center;">${pt.origY}</td>`;
            });
            if (intersections.length > 15) tableHtml += '<td style="text-align: center;">...</td>';
            tableHtml += `</tr></table><div style="text-align:center; margin-top:5px; color:#666;">Total: ${intersections.length} intersections</div>`;
            tableContainer.innerHTML = tableHtml;
            card.appendChild(tableContainer);
        }
        
        parent.appendChild(card);
    });
}

// Main function to initialize the application
function init() {
    const functionCards = document.getElementById('functionCards');
    if (!functionCards) {
        console.error('functionCards element not found!');
        return;
    }
    
    functionCards.innerHTML = '';
    
    // Narrow cards section
    const narrowHeader = document.createElement('h2');
    narrowHeader.textContent = 'Narrow Cards (2x2 Grid) - Perfect Squares 1² to 25²';
    functionCards.appendChild(narrowHeader);
    
    const narrowContainer = document.createElement('div');
    narrowContainer.id = 'narrowCards';
    narrowContainer.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 20px; margin-bottom: 40px;';
    functionCards.appendChild(narrowContainer);
    
    // Wide cards section
    const wideHeader = document.createElement('h2');
    wideHeader.textContent = 'Wide Cards (Full Width) - Perfect Squares 32² to 56²';
    wideHeader.style.marginTop = '40px';
    functionCards.appendChild(wideHeader);
    
    const wideContainer = document.createElement('div');
    wideContainer.id = 'wideCards';
    wideContainer.style.cssText = 'display: block;';
    functionCards.appendChild(wideContainer);
    
    // Values
    const narrowValues = [
        1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 
        121, 144, 169, 196, 225, 256, 289, 324, 361, 400, 
        441, 484, 529, 576, 625
    ];
    const wideValues = [
        1024, 1089, 1156, 1225, 1296, 1369, 1444, 1521, 1600, 1681,
        1764, 1849, 1936, 2025, 2116, 2209, 2304, 2401, 2500, 2601,
        2704, 2809, 2916, 3025, 3136
    ];
    
    // Render cards
    displayFunctionCards(narrowValues, 'narrow', narrowContainer);
    displayFunctionCards(wideValues, 'wide', wideContainer);
}

document.addEventListener('DOMContentLoaded', () => {
    // Hide loading indicator
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
    
    // Test if D3.js is loaded
    if (typeof d3 === 'undefined') {
        console.error('D3.js is not loaded!');
        document.getElementById('functionCards').innerHTML = '<p style="color: red; text-align: center; padding: 20px;">Error: D3.js library failed to load. Please refresh the page.</p>';
        return;
    }
    
    console.log('D3.js loaded, starting initialization...');
    init();
});