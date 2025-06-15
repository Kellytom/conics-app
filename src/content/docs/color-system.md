---
title: Color Coding System
description: Visual indicators and graphics for emphasis and discrimination
---

import { Aside } from '@astrojs/starlight/components';

# 🎨 Color Coding System

Our comprehensive color-coded system uses Unicode symbols and CSS styling to provide clear visual communication throughout the Conics Explorer platform.

## 🎯 Priority Indicators

### Primary System
- <span class="priority-green">●</span> **Green (Do)** - Ready for use, fully implemented, high priority
- <span class="priority-yellow">●</span> **Yellow (Do Maybe)** - In development, partially ready, medium priority
- <span class="priority-orange">●</span> **Orange (Limited Free)** - Planned features, design phase, limited access
- <span class="priority-blue">●</span> **Blue (Free/Open Source)** - Research phase, future consideration, open source
- <span class="priority-red">●</span> **Red (Do Later)** - Deferred, low priority, future implementation

### Enhanced Indicators
- <span class="indicator-critical">●</span> **Critical** - Urgent attention required
- <span class="indicator-important">●</span> **Important** - High priority, needs focus
- <span class="indicator-moderate">●</span> **Moderate** - Medium priority, can wait
- <span class="indicator-success">●</span> **Success** - Completed, working well
- <span class="indicator-info">●</span> **Info** - Informational, reference only

## 🔬 Mathematical Elements

### Conic Section Colors
- <span style="color: #e74c3c; font-weight: bold;">●</span> **Parabolas** - Red (#e74c3c)
- <span style="color: #3498db; font-weight: bold;">●</span> **Ellipses** - Blue (#3498db)
- <span style="color: #27ae60; font-weight: bold;">●</span> **Circles** - Green (#27ae60)
- <span style="color: #f39c12; font-weight: bold;">●</span> **Hyperbolas** - Orange (#f39c12)
- <span style="color: #9b59b6; font-weight: bold;">●</span> **General** - Purple (#9b59b6)

### Status Badges
- <span class="status-completed">Completed</span> - Feature is fully implemented
- <span class="status-in-progress">In Progress</span> - Currently being developed
- <span class="status-planned">Planned</span> - Scheduled for future development

## 📊 Usage Examples

### In Documentation
```markdown
- <span class="priority-green">●</span> **Feature Name** - Description of ready feature
- <span class="priority-yellow">●</span> **Partial Feature** - Description of in-development feature
- <span class="priority-red">●</span> **Future Feature** - Description of planned feature
```

### In Code Comments
```javascript
// ● Green: Fully implemented function
function calculateParabola(x, a) {
  return x * x / a;
}

// ● Yellow: Partially implemented
function calculateEllipse(x, y, a, b) {
  // TODO: Add validation
  return (x*x)/(a*a) + (y*y)/(b*b);
}
```

### In Navigation
- <span class="priority-green">●</span> [Ready Pages](/parabolas/) - Fully functional
- <span class="priority-yellow">●</span> [Development Pages](/circles/) - Partially ready
- <span class="priority-orange">●</span> [Planned Pages](/ellipses/) - Design phase

## 🎭 Visual Hierarchy

<Aside type="tip">
The color system creates a clear visual hierarchy that helps users quickly understand:
- What's ready to use
- What's in development  
- What's planned for the future
- Priority levels for different features
</Aside>

### Level 1: Immediate Action
<span class="priority-green">●</span> Green indicators show what users should interact with first.

### Level 2: Exploration
<span class="priority-yellow">●</span> Yellow indicators suggest areas for exploration and testing.

### Level 3: Future Planning
<span class="priority-orange">●</span> Orange indicators help users understand upcoming features.

### Level 4: Reference
<span class="priority-blue">●</span> Blue indicators provide reference information and research areas.

### Level 5: Deferred
<span class="priority-red">●</span> Red indicators show low-priority or deferred items.

## 🔧 Implementation Details

### CSS Classes Available
```css
.priority-red { color: #e74c3c; }
.priority-orange { color: #f39c12; }
.priority-yellow { color: #f1c40f; }
.priority-green { color: #27ae60; }
.priority-blue { color: #3498db; }
.priority-purple { color: #9b59b6; }

.indicator-critical { color: #e74c3c; font-weight: bold; text-shadow: 0 0 2px rgba(231, 76, 60, 0.3); }
.indicator-important { color: #f39c12; font-weight: bold; text-shadow: 0 0 2px rgba(243, 156, 18, 0.3); }
.indicator-moderate { color: #f1c40f; font-weight: bold; text-shadow: 0 0 2px rgba(241, 196, 15, 0.3); }
.indicator-success { color: #27ae60; font-weight: bold; text-shadow: 0 0 2px rgba(39, 174, 96, 0.3); }
.indicator-info { color: #3498db; font-weight: bold; text-shadow: 0 0 2px rgba(52, 152, 219, 0.3); }
```

### Unicode Symbols Used
- `●` (U+25CF) - Black Circle
- `◆` (U+25C6) - Black Diamond  
- `▲` (U+25B2) - Black Up-Pointing Triangle
- `■` (U+25A0) - Black Square
- `★` (U+2605) - Black Star

## 📱 Responsive Considerations

The color system is designed to work across all devices:

- **Desktop**: Full color visibility with hover effects
- **Tablet**: Optimized touch targets with clear color distinction  
- **Mobile**: Simplified layout with maintained color hierarchy
- **Print**: Automatic conversion to grayscale with pattern indicators

## ♿ Accessibility

Our color system maintains accessibility through:

- **High Contrast**: All colors meet WCAG AA contrast requirements
- **Shape Coding**: Unicode symbols provide non-color visual cues
- **Alt Text**: Screen reader friendly descriptions
- **Pattern Support**: Fallback patterns for color-blind users

<Aside type="note">
The color coding system is consistently applied across all pages, components, and documentation to create a unified visual language that enhances usability and comprehension.
</Aside>

## 🔄 Navigation Integration

Every page includes:
- **Back Button**: <a href="/" class="back-button">← Back to Home</a>
- **Color Indicators**: Visual status of page content
- **Priority Markers**: Clear action guidance
- **Status Information**: Current development state

Ready to explore? <span class="priority-green">●</span> [**Return to Home →**](/)
