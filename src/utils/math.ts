/**
 * Mathematical utilities for the Conics Explorer
 * CONIC PLAN REFERENCE: Implements mathematical foundation from "Why Conics?" section
 * Supports "Mathematical Precision" and "Integer Lattice Points" principles
 */

import type { Point, LatticePoint, Bounds, ConicType, Orientation } from '@/types';

// Mathematical constants
export const MATH_CONSTANTS = {
  PI: Math.PI,
  E: Math.E,
  GOLDEN_RATIO: (1 + Math.sqrt(5)) / 2,
  SQRT_2: Math.sqrt(2),
  SQRT_3: Math.sqrt(3),
  TOLERANCE: 1e-10,
} as const;

/**
 * Precision utilities for lattice intersection validation
 * PLAN REF: Critical for "Integer Lattice Points" validation in all conic implementations
 */
export class MathUtils {
  /**
   * Round to specified decimal places with proper handling of floating point precision
   */
  static round(num: number, decimals: number = 2): number {
    const factor = Math.pow(10, decimals);
    return Math.round((num + Number.EPSILON) * factor) / factor;
  }

  /**
   * Check if a number is effectively an integer within tolerance
   * PLAN REF: Essential for lattice point validation
   */
  static isInteger(num: number, tolerance: number = MATH_CONSTANTS.TOLERANCE): boolean {
    return Math.abs(num - Math.round(num)) < tolerance;
  }

  /**
   * Check if a point lies on the integer lattice
   */
  static isLatticePoint(point: Point, tolerance: number = MATH_CONSTANTS.TOLERANCE): boolean {
    return this.isInteger(point.x, tolerance) && this.isInteger(point.y, tolerance);
  }

  /**
   * Convert point to lattice point with validation
   */
  static toLatticePoint(point: Point): LatticePoint {
    return {
      x: point.x,
      y: point.y,
      isInteger: this.isLatticePoint(point),
    };
  }

  /**
   * Calculate Euclidean distance between two points
   * PLAN REF: Used in assembly workflow for connection point validation
   */
  static distance(p1: Point, p2: Point): number {
    return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
  }

  /**
   * Calculate slope between two points
   */
  static slope(p1: Point, p2: Point): number {
    if (Math.abs(p2.x - p1.x) < MATH_CONSTANTS.TOLERANCE) {
      return p2.y > p1.y ? Infinity : -Infinity;
    }
    return (p2.y - p1.y) / (p2.x - p1.x);
  }

  /**
   * Check if two slopes are effectively equal within tolerance
   * PLAN REF: Essential for "Smooth Transitions" in assembly system
   */
  static slopesMatch(slope1: number, slope2: number, tolerance: number = 0.001): boolean {
    if (!isFinite(slope1) && !isFinite(slope2)) return true;
    if (!isFinite(slope1) || !isFinite(slope2)) return false;
    return Math.abs(slope1 - slope2) < tolerance;
  }

  /**
   * Normalize angle to [0, 2π) range
   */
  static normalizeAngle(angle: number): number {
    angle = angle % (2 * Math.PI);
    return angle < 0 ? angle + 2 * Math.PI : angle;
  }

  /**
   * Check if angle is acute (< π/2)
   * PLAN REF: Supports "No Acute Angles" ground rule for AI generation
   */
  static isAcuteAngle(angle: number): boolean {
    const normalized = this.normalizeAngle(Math.abs(angle));
    return normalized < Math.PI / 2 && normalized > MATH_CONSTANTS.TOLERANCE;
  }

  /**
   * Convert degrees to radians
   */
  static toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  /**
   * Convert radians to degrees
   */
  static toDegrees(radians: number): number {
    return radians * (180 / Math.PI);
  }

  /**
   * Linear interpolation between two values
   */
  static lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  /**
   * Clamp value between min and max
   */
  static clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  /**
   * Generate array of evenly spaced values
   */
  static linspace(start: number, end: number, num: number): number[] {
    if (num <= 1) return [start];
    const step = (end - start) / (num - 1);
    return Array.from({ length: num }, (_, i) => start + i * step);
  }

  /**
   * Find roots of quadratic equation ax² + bx + c = 0
   */
  static quadraticRoots(a: number, b: number, c: number): number[] {
    if (Math.abs(a) < MATH_CONSTANTS.TOLERANCE) {
      // Linear equation
      return Math.abs(b) < MATH_CONSTANTS.TOLERANCE ? [] : [-c / b];
    }

    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) return [];
    if (discriminant === 0) return [-b / (2 * a)];

    const sqrtD = Math.sqrt(discriminant);
    return [(-b - sqrtD) / (2 * a), (-b + sqrtD) / (2 * a)];
  }
}

/**
 * Coordinate system transformations for SVG rendering
 * PLAN REF: Supports SVG rendering system from Phase 1 Foundation
 */
export class CoordinateTransform {
  constructor(
    private mathBounds: Bounds,
    private pixelBounds: Bounds
  ) {}

  /**
   * Transform mathematical coordinates to SVG pixel coordinates
   */
  mathToPixel(point: Point): Point {
    const x = this.lerp(
      point.x,
      this.mathBounds.xMin,
      this.mathBounds.xMax,
      0,
      this.pixelBounds.width
    );
    
    // SVG Y-axis is inverted (positive down)
    const y = this.lerp(
      point.y,
      this.mathBounds.yMax,
      this.mathBounds.yMin,
      0,
      this.pixelBounds.height
    );

    return { x, y };
  }

  /**
   * Transform SVG pixel coordinates to mathematical coordinates
   */
  pixelToMath(point: Point): Point {
    const x = this.lerp(
      point.x,
      0,
      this.pixelBounds.width,
      this.mathBounds.xMin,
      this.mathBounds.xMax
    );

    const y = this.lerp(
      point.y,
      0,
      this.pixelBounds.height,
      this.mathBounds.yMax,
      this.mathBounds.yMin
    );

    return { x, y };
  }

  private lerp(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    return outMin + (value - inMin) * (outMax - outMin) / (inMax - inMin);
  }

  /**
   * Get scale factors for x and y axes
   */
  getScale(): { x: number; y: number } {
    return {
      x: this.pixelBounds.width / (this.mathBounds.xMax - this.mathBounds.xMin),
      y: this.pixelBounds.height / (this.mathBounds.yMax - this.mathBounds.yMin),
    };
  }
}

/**
 * Conic label utilities
 * PLAN REF: Implements labeling system from "Technical Implementation Section 1"
 */
export class ConicLabels {
  /**
   * Create standardized conic label
   * Format: [type][orientation][parameter] e.g., "c5n", "p64e"
   */
  static create(type: ConicType, orientation: Orientation, parameter: number | string): string {
    const typeCode = this.getTypeCode(type);
    return `${typeCode}${parameter}${orientation}`;
  }

  /**
   * Parse conic label into components
   */
  static parse(label: string): { type: ConicType; orientation: Orientation; parameter: string } | null {
    const match = label.match(/^([cpeh])(.+)([nsew]{1,2})$/);
    if (!match) return null;

    const [, typeCode, parameter, orientation] = match;
    const type = this.getTypeFromCode(typeCode);
    
    if (!type || !this.isValidOrientation(orientation)) return null;

    return {
      type,
      orientation: orientation as Orientation,
      parameter,
    };
  }

  private static getTypeCode(type: ConicType): string {
    const codes = {
      parabola: 'p',
      ellipse: 'e', 
      circle: 'c',
      hyperbola: 'h',
    };
    return codes[type];
  }

  private static getTypeFromCode(code: string): ConicType | null {
    const types = {
      p: 'parabola',
      e: 'ellipse',
      c: 'circle', 
      h: 'hyperbola',
    } as const;
    return types[code as keyof typeof types] || null;
  }

  private static isValidOrientation(orientation: string): boolean {
    const valid = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];
    return valid.includes(orientation);
  }
}

/**
 * Color scheme utilities
 * PLAN REF: Supports visual organization and motif categorization
 */
export class ColorUtils {
  static readonly SCHEMES = {
    primary: ['#667eea', '#764ba2', '#f093fb', '#f5576c'],
    mathematical: ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'],
    celestial: ['#4facfe', '#00f2fe', '#43e97b', '#38f9d7', '#a8edea'],
    warm: ['#fa709a', '#fee140', '#ffecd2', '#fcb69f'],
    cool: ['#667eea', '#764ba2', '#a8edea', '#fed6e3'],
    print: ['#000000', '#333333', '#666666', '#999999', '#cccccc'],
  } as const;

  static readonly CONIC_COLORS = {
    parabola: '#e74c3c',
    ellipse: '#3498db', 
    circle: '#2ecc71',
    hyperbola: '#9b59b6',
    accent: '#f39c12',
    celestial: '#4facfe',
  } as const;

  /**
   * Get color for specific conic type
   */
  static getConicColor(type: ConicType, printMode: boolean = false): string {
    if (printMode) return '#000000';
    return this.CONIC_COLORS[type];
  }

  /**
   * Convert hex color to RGB values
   */
  static hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : null;
  }

  /**
   * Convert RGB to hex color
   */
  static rgbToHex(r: number, g: number, b: number): string {
    return "#" + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  }

  /**
   * Get contrasting text color for background
   */
  static getContrastColor(backgroundColor: string): string {
    const rgb = this.hexToRgb(backgroundColor);
    if (!rgb) return '#000000';
    
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
  }
}

export default { MathUtils, CoordinateTransform, ConicLabels, ColorUtils, MATH_CONSTANTS };
