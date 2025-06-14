/**
 * Type definitions for the Conics Explorer application
 * CONIC PLAN REFERENCE: Supports "Modular Conic Construction" and Phase 2 "Assembly System"
 * Defines TypeScript interfaces for mathematical precision and type safety
 */

// Basic geometric types
export interface Point {
  x: number;
  y: number;
}

export interface LatticePoint extends Point {
  isInteger: boolean;
}

// Orientation system from conic-plan.md Technical Implementation
export type Orientation = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

// Conic types for modular construction
export type ConicType = 'parabola' | 'ellipse' | 'circle' | 'hyperbola';

// Label format: [type][orientation][parameter] e.g., "c5n", "p64e"
export interface ConicLabel {
  type: ConicType;
  orientation: Orientation;
  parameter: number | string;
  toString(): string;
}

// Base interface for curve data and rendering
export interface ConicCurve {
  type: ConicType;
  id: string;
  equation: string;
  points: Point[];
  bounds: { xMin: number; xMax: number; yMin: number; yMax: number };
  metadata?: Record<string, any>;
}

// Base interface for all conic sections
export interface ConicSection {
  id: string;
  label: ConicLabel;
  color: string;
  title: string;
  
  // Mathematical properties
  equation: string;
  parameters: Record<string, number>;
  
  // Lattice intersection points
  latticePoints: LatticePoint[];
  
  // For assembly system - slope matching
  getSlope(point: Point): number;
  getDerivative(x: number): number;
  
  // SVG path generation
  generatePath(bounds: Bounds): string;
}

// Specific conic implementations
export interface Parabola extends ConicSection {
  a: number; // y = x²/a parameter
  vertex: Point;
  focus: Point;
  directrix: number;
}

export interface Circle extends ConicSection {
  center: Point;
  radius: number;
}

export interface Ellipse extends ConicSection {
  center: Point;
  a: number; // semi-major axis
  b: number; // semi-minor axis
  eccentricity: number;
  foci: [Point, Point];
}

export interface Hyperbola extends ConicSection {
  center: Point;
  a: number;
  b: number;
  type: 'horizontal' | 'vertical';
  vertices: [Point, Point];
  foci: [Point, Point];
  asymptotes: string[];
}

// Visualization bounds and scaling
export interface Bounds {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  width: number;
  height: number;
}

// Assembly system types (Phase 2)
export interface Connection {
  from: ConicSection;
  to: ConicSection;
  point: LatticePoint;
  slopeMatch: boolean;
  smoothness: number; // Quality score 0-1
}

export interface Assembly {
  id: string;
  name: string;
  description: string;
  parts: ConicSection[];
  connections: Connection[];
  bounds: Bounds;
  isComplete: boolean;
  created: Date;
  modified: Date;
}

// Motif library types (Phase 3)
export interface Motif {
  id: string;
  name: string;
  category: MotifCategory;
  description: string;
  assembly: Assembly;
  tags: string[];
  difficulty: 'simple' | 'medium' | 'complex';
  partCount: number;
}

export type MotifCategory = 
  | 'architectural' 
  | 'symbolic' 
  | 'decorative' 
  | 'celtic'
  | 'gothic'
  | 'geometric';

// AI generation types (Phase 4)
export interface ShapeDescription {
  text: string;
  style?: string;
  complexity?: 'simple' | 'medium' | 'complex';
  constraints?: DesignConstraints;
}

export interface DesignConstraints {
  minWidth: number;
  maxWidth: number;
  noAcuteAngles: boolean;
  minimizeSharpLines: boolean;
  latticeIntersections: boolean;
  standardProportions: boolean;
}

export interface GenerationResult {
  assembly: Assembly;
  confidence: number;
  ruleViolations: string[];
  suggestions: string[];
}

// Visualization and rendering types
export interface RenderOptions {
  showGrid: boolean;
  showLatticePoints: boolean;
  showFormulas: boolean;
  showLabels: boolean;
  mathMode: boolean;
  colorScheme: ColorScheme | ExtendedColorScheme;
  printMode: boolean;
}

export type ColorScheme = 'default' | 'mathematical' | 'celestial' | 'print';

// Extended color scheme interface for specific color access
export interface ExtendedColorScheme {
  parabola?: string;
  ellipse?: string;
  circle?: string;
  hyperbola?: string;
  primary?: string;
  secondary?: string;
  accent?: string;
  background?: string;
  text?: string;
}

// Event types for interactivity
export interface ConicEvent {
  type: 'select' | 'hover' | 'connect' | 'modify';
  conic: ConicSection;
  point?: Point;
  timestamp: Date;
}

export interface AssemblyEvent {
  type: 'add' | 'remove' | 'connect' | 'validate';
  assembly: Assembly;
  data?: any;
  timestamp: Date;
}

// Export and sharing types
export interface ExportOptions {
  format: 'svg' | 'png' | 'json' | 'pdf';
  includeGrid: boolean;
  includeLabels: boolean;
  resolution?: number;
  quality?: number;
}

// Configuration and settings
export interface AppConfig {
  defaultBounds: Bounds;
  renderOptions: RenderOptions;
  colorSchemes: Record<ColorScheme, Record<string, string>>;
  gridResolution: number;
  snapTolerance: number;
  smoothnessTolerance: number;
}

// Error handling
export interface ValidationError {
  type: 'geometry' | 'assembly' | 'constraint' | 'rendering';
  message: string;
  severity: 'warning' | 'error' | 'info';
  code?: string;
}

// Utility types for mathematical operations
export type MathFunction = (x: number) => number;
export type DerivativeFunction = (x: number) => number;
export type ParametricFunction = (t: number) => Point;
