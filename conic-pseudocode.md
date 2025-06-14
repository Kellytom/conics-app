# Conics Explorer Pseudocode and Design Notes

## Overview
This document describes the core algorithms and design for the Conics Explorer app, focusing on:
- Finding lattice intersections for parabolas
- Displaying SVGs with correct scaling and axis
- Ensuring 29+ intersections for narrow parabolas
- CSS and SVG layout notes

---

## 1. Finding Lattice Intersections (Plain English)
To find all points where the parabola y = x²/a crosses integer lattice points, we:
- Loop through possible integer values of k so that x = k * sqrt(a) is an integer.
- For each such x, compute y = x²/a and check if y is also an integer and within the visible range.
- Only keep points where both x and y are integers and inside the display window.

```pseudo
# For a parabola y = x^2 / a
function findLatticeIntersections(a, xMin, xMax, yMin, yMax):
    intersections = []
    sqrtA = sqrt(a)
    # k is an integer such that x = k * sqrtA is integer
    for k from ceil(xMin / sqrtA) to floor(xMax / sqrtA):
        x = k * sqrtA
        y = (x^2) / a
        if x in [xMin, xMax] and y in [yMin, yMax] and isInteger(x) and isInteger(y):
            intersections.append((x, y))
    return intersections
```

- **Note:** Floating point precision is handled by checking if |x - round(x)| < epsilon.
- **Purpose:** This ensures only integer lattice points are found.

---

## 2. SVG Display and Scaling (Plain English)
To make sure the parabola and axes fit nicely in the SVG:
- Calculate the x and y ranges so the curve and enough intersections are visible.
- Map mathematical coordinates (x, y) to SVG pixel positions using a linear transformation.
- Use margins to leave space for axis labels.

```pseudo
# Calculate SVG coordinate ranges to fit 29+ intersections
function calculateSVGRange(a, targetIntersections=29):
    sqrtA = sqrt(a)
    # Estimate k range for target intersections (k = ±(targetIntersections//2))
    maxK = ceil(targetIntersections / 2)
    xMin = -maxK * sqrtA
    xMax = maxK * sqrtA
    yMin = -10  # Always show a bit below vertex
    yMax = (maxK * sqrtA)^2 / a * 1.5  # Add padding
    return xMin, xMax, yMin, yMax

# Map math coordinates to SVG pixel space
function mathToSVG(x, y, xMin, xMax, yMin, yMax, width, height, leftMargin, topMargin, bottomMargin):
    effectiveWidth = width - leftMargin
    effectiveHeight = height - bottomMargin - topMargin
    px = leftMargin + (x - xMin) * (effectiveWidth / (xMax - xMin))
    py = topMargin + effectiveHeight - (y - yMin) * (effectiveHeight / (yMax - yMin))
    return px, py
```

- **Purpose:** Ensures the parabola and axes are always visible and scaled to fit the SVG.
- **Wide Parabolas:** Use a larger x-range and y-range, but same mapping logic.

---

## 3. Ensuring 29+ Intersections (Adaptive Range, Plain English)
To guarantee at least 29 intersections for narrow parabolas:
- Start with a small range and increase it until the number of integer lattice intersections is at least 29.
- Use the value of k (from the intersection logic) to set the x and y ranges.
- This ensures the graph is always mathematically interesting.

```pseudo
# Adaptive range selection for narrow parabolas
function chooseRangeForIntersections(a, minIntersections=29):
    sqrtA = sqrt(a)
    k = 1
    while True:
        x = k * sqrtA
        y = (x^2) / a
        if y > yMaxLimit:  # yMaxLimit is a practical display bound
            break
        k += 1
    # Use k to set xMin/xMax
    xMin = -k * sqrtA
    xMax = k * sqrtA
    # yMin, yMax as above
    return xMin, xMax, yMin, yMax
```

- **Purpose:** Dynamically adjusts the visible range to ensure enough intersections.

---

## 4. CSS and SVG Layout Notes (Plain English)
- Use CSS Grid to arrange the cards in two columns on desktop and one on mobile.
- SVGs have margins to make room for axis labels and prevent overlap.
- All drawing (axes, grid, curves) uses the same coordinate transformation for consistency.
- SVGs are responsive: width is 100%, height is auto.

```css
#narrowCards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
@media (max-width: 768px) {
  #narrowCards { grid-template-columns: 1fr; }
}
```

---

## 5. Additional Notes (Plain English)
- Always check for integer values with a small epsilon to avoid floating point errors.
- Place the x-axis at y=0 and space labels to avoid overlap.
- Draw grid lines using the same yMin/yMax as the parabola for perfect alignment.
- Wide cards use the same logic but with larger ranges for flatter parabolas.

---

*This pseudocode and design summary reflects the core logic and layout strategies for the Conics Explorer app as of June 2025.*
