# Conics Explorer Project Plan

## Overview
This is the plan for the next phase of the Conics Explorer project. We will build a system for assembling complex paths from conic sections (parabolas, arcs, hyperbolas, etc.) that intersect the lattice at the same points and with matching slopes.

---

## 1. Modular Conic Construction
- **Goal:** Create individual conic sections (parabolas, arcs, hyperbolas) that can be combined.
- Each conic will be labeled (e.g., `parabola n64`, `e60`) to indicate orientation and parameters.
- The orientation labels (n, s, e, w, ne, nw, se, sw) will help with assembly.

## 2. Spare Parts Page (`spare-parts.html`)
- **Purpose:** A workspace to assemble and experiment with conic parts.
- Users can select a conic from a list, set endpoints, and attach it to another conic at a matching intersection point and slope.
- Assembly will be guided verbally (by selecting intersection points and slopes) rather than by dragging.
- Each assembled part will be labeled (e.g., `rounded corner ne1`, `ne5` for northeast pointing, radius 1 or 5).

## 3. Assembly Workflow
- Choose a conic (e.g., parabola, arc, hyperbola) from the labeled list.
- Specify the intersection point and slope where it should connect to the previous part.
- Attach the next arc or conic at the chosen point.
- Repeat to build up a complex path.

## 4. Gallery Page (`gallery.html`)
- Assembled paths (open or closed) will be saved and displayed in a gallery.
- Each path will be labeled and described for reuse.

## 5. Angel Wing Project
- One of the first projects will be to make an angel wing, and then mirror it for the second wing.
- The final products will go in `angels-fine.html` and will be standalone paths (no grid, labels, or names).
- The test products will go in `angel-math.html` and include the intersection points, formulas, and names.

## 6. Next Steps
- Finish and label all basic conic parts.
- Build the `spare-parts.html` page for assembly.
- Implement the interface for selecting, labeling, and connecting parts.
- Create the `gallery.html` to showcase completed paths.
- Develop the angel wing project and its two output pages.

---

## Suggestions and To-Do Ideas

- Add interactive controls to adjust conic parameters (e.g., sliders for a, b, orientation) directly on the assembly page.
- Implement snapping or auto-alignment when joining conic parts at intersection points.
- Allow users to export assembled paths as SVG or PNG for use in other projects.
- Add a "history" or "undo" feature to the assembly workflow.
- Create a library of common conic motifs (e.g., arches, loops, corners) for quick reuse.
- Enable sharing or importing of assembled paths via JSON or a simple code.
- Add a "math mode" toggle to show/hide intersection coordinates and formulas on any page.
- Develop a tutorial or guided mode for new users to learn how to assemble conic paths.
- Support for color and style customization of each conic segment.
- Add keyboard shortcuts for common actions (e.g., add, connect, delete part).
- Implement a "randomize" button to generate interesting conic assemblies automatically.
- Add a feedback or suggestion form for users to submit ideas directly from the app.

### Expanded: Create a Library of Common Conic Motifs
- **Purpose:** Build a reusable collection of conic-based motifs and elements inspired by medieval tracery and stained glass window designs.
- **Motif Types:**
  - **Arches and Corners:** Standard gothic arches, pointed arches, and various corner pieces for window frames.
  - **Knot-like Forms:** Interlaced or woven patterns, where intersection points and slopes allow, to mimic the look of medieval stonework and symbolic knots.
  - **Decorative Crosses:** Cross shapes with partial curved edges, using conic sections for each arm or embellishment.
  - **Crown of Thorns:** A circular or elliptical motif with interlaced, thorn-like arcs, assembled from small conic segments.
  - **Cat o' Nine Tails:** A radiating motif with nine curved, whip-like arms, each constructed from a conic segment, symbolizing the scourging at the pillar.
  - **The Pillar:** A vertical motif, possibly with a base and capital, constructed from stacked or joined conic sections.
  - **Tears of Blood:** Droplet-shaped motifs, each formed from a parabola or similar curve, representing the tears of Jesus in the garden.
- **Usage:**
  - Each motif will be labeled and saved for quick reuse in new window designs or as decorative elements.
  - Motifs can be combined, mirrored, or rotated to create complex, symbolic compositions.
  - The library will serve as a palette for assembling new tracery and symbolic art.
- **Next Steps:**
  - Research and sketch traditional tracery and symbolic forms for reference.
  - Implement motif creation and labeling in the app.
  - Add a motif browser to the assembly and gallery pages for easy access.

---

*We have a lot of work to do, but this modular approach will allow us to create and share complex, beautiful mathematical paths from simple conic building blocks.*
