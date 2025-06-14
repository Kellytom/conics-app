/**
 * Main TypeScript entry point for Conics Explorer
 * CONIC PLAN REFERENCE: Implements modern JavaScript architecture supporting all phases
 * Provides type-safe initialization and cross-page functionality
 */

import type { AppConfig, RenderOptions } from '@/types';
import { MathUtils, ColorUtils } from '@/utils/math';

// Application configuration
const defaultConfig: AppConfig = {
  defaultBounds: {
    xMin: -10,
    xMax: 10,
    yMin: -8,
    yMax: 8,
    width: 800,
    height: 600,
  },
  renderOptions: {
    showGrid: true,
    showLatticePoints: true,
    showFormulas: false,
    showLabels: true,
    mathMode: false,
    colorScheme: 'default',
    printMode: false,
  },
  colorSchemes: {
    default: ColorUtils.CONIC_COLORS,
    mathematical: ColorUtils.SCHEMES.mathematical.reduce((acc, color, i) => {
      const types = ['parabola', 'ellipse', 'circle', 'hyperbola'];
      if (types[i]) acc[types[i]] = color;
      return acc;
    }, {} as Record<string, string>),
    celestial: { ...ColorUtils.CONIC_COLORS, accent: '#4facfe' },
    print: Object.keys(ColorUtils.CONIC_COLORS).reduce((acc, key) => {
      acc[key] = '#000000';
      return acc;
    }, {} as Record<string, string>),
  },
  gridResolution: 20,
  snapTolerance: 0.1,
  smoothnessTolerance: 0.001,
};

/**
 * Global application state management
 */
class ConicApp {
  private config: AppConfig;
  private currentPage: string;

  constructor(config: AppConfig = defaultConfig) {
    this.config = { ...config };
    this.currentPage = this.getCurrentPage();
    this.init();
  }

  private init(): void {
    this.setupEventListeners();
    this.initializeUI();
    this.loadUserPreferences();
    
    // Page-specific initialization
    if (this.currentPage === 'index') {
      this.initHomePage();
    }
  }

  private getCurrentPage(): string {
    const path = window.location.pathname;
    const page = path.split('/').pop()?.split('.')[0] || 'index';
    return page;
  }

  private setupEventListeners(): void {
    // Math mode toggle
    const mathModeToggle = document.getElementById('mathModeToggle');
    if (mathModeToggle) {
      mathModeToggle.addEventListener('click', () => this.toggleMathMode());
    }

    // Print mode toggle
    const printModeToggle = document.getElementById('printModeToggle');
    if (printModeToggle) {
      printModeToggle.addEventListener('click', () => this.togglePrintMode());
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));

    // Print event handling
    window.addEventListener('beforeprint', () => this.preparePrint());
    window.addEventListener('afterprint', () => this.restoreAfterPrint());
  }

  private initializeUI(): void {
    // Set theme based on user preference or default
    this.applyTheme(this.config.renderOptions.printMode ? 'print' : 'light');

    // Update UI state
    this.updateMathModeUI();
    this.updatePrintModeUI();
  }

  private initHomePage(): void {
    // Animate conic curves on homepage
    this.animateConicPreviews();
    
    // Setup interactive cards
    this.setupInteractiveCards();
  }

  private animateConicPreviews(): void {
    // Find all SVG paths in conic cards and animate them
    const conicCards = document.querySelectorAll('.conic-card svg path');
    
    conicCards.forEach((path, index) => {
      setTimeout(() => {
        (path as SVGPathElement).style.animation = 'drawPath 2s ease-in-out';
      }, index * 500);
    });
  }

  private setupInteractiveCards(): void {
    const cards = document.querySelectorAll('.conic-card.interactive');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const svg = card.querySelector('svg');
        if (svg) {
          svg.style.transform = 'scale(1.05)';
          svg.style.transition = 'transform 0.3s ease';
        }
      });

      card.addEventListener('mouseleave', () => {
        const svg = card.querySelector('svg');
        if (svg) {
          svg.style.transform = 'scale(1)';
        }
      });
    });
  }

  /**
   * Toggle mathematical annotations display
   * PLAN REF: Supports "math mode toggle" from enhancement suggestions
   */
  public toggleMathMode(): void {
    this.config.renderOptions.mathMode = !this.config.renderOptions.mathMode;
    this.config.renderOptions.showFormulas = this.config.renderOptions.mathMode;
    this.config.renderOptions.showLatticePoints = this.config.renderOptions.mathMode;
    
    this.updateMathModeUI();
    this.saveUserPreferences();
    
    // Apply math mode styles
    document.body.classList.toggle('math-mode', this.config.renderOptions.mathMode);
    
    // Trigger re-render event for conic pages
    window.dispatchEvent(new CustomEvent('mathModeChanged', { 
      detail: { mathMode: this.config.renderOptions.mathMode } 
    }));
  }

  /**
   * Toggle print-friendly view
   * PLAN REF: Supports print compatibility from "Why Conics?" craftsman reproduction
   */
  public togglePrintMode(): void {
    this.config.renderOptions.printMode = !this.config.renderOptions.printMode;
    this.config.renderOptions.colorScheme = this.config.renderOptions.printMode ? 'print' : 'default';
    
    this.updatePrintModeUI();
    this.applyTheme(this.config.renderOptions.printMode ? 'print' : 'light');
    this.saveUserPreferences();
    
    // Trigger re-render event
    window.dispatchEvent(new CustomEvent('printModeChanged', { 
      detail: { printMode: this.config.renderOptions.printMode } 
    }));
  }

  private updateMathModeUI(): void {
    const toggle = document.getElementById('mathModeToggle');
    if (toggle) {
      toggle.classList.toggle('active', this.config.renderOptions.mathMode);
      toggle.textContent = this.config.renderOptions.mathMode ? '📐 Math Mode ✓' : '📐 Math Mode';
    }
  }

  private updatePrintModeUI(): void {
    const toggle = document.getElementById('printModeToggle');
    if (toggle) {
      toggle.classList.toggle('active', this.config.renderOptions.printMode);
      toggle.textContent = this.config.renderOptions.printMode ? '🖨️ Print View ✓' : '🖨️ Print View';
    }
  }

  private applyTheme(theme: 'light' | 'print'): void {
    document.documentElement.setAttribute('data-theme', theme);
    
    if (theme === 'print') {
      document.body.classList.add('theme-print');
      document.body.classList.remove('theme-light');
    } else {
      document.body.classList.add('theme-light');
      document.body.classList.remove('theme-print');
    }
  }

  private handleKeyboard(event: KeyboardEvent): void {
    // Ctrl/Cmd + M: Toggle math mode
    if ((event.ctrlKey || event.metaKey) && event.key === 'm') {
      event.preventDefault();
      this.toggleMathMode();
    }

    // Ctrl/Cmd + P: Toggle print mode (in addition to browser print)
    if ((event.ctrlKey || event.metaKey) && event.key === 'p' && event.shiftKey) {
      event.preventDefault();
      this.togglePrintMode();
    }

    // Escape: Clear any selections or modals
    if (event.key === 'Escape') {
      this.clearSelections();
    }
  }

  private clearSelections(): void {
    // Clear any active selections in assembly workspace
    document.querySelectorAll('.selected').forEach(el => {
      el.classList.remove('selected');
    });
  }

  private preparePrint(): void {
    // Ensure print mode is active for printing
    const wasPrintMode = this.config.renderOptions.printMode;
    if (!wasPrintMode) {
      this.togglePrintMode();
    }
    
    // Store original state for restoration
    (window as any).__printModeRestore = !wasPrintMode;
  }

  private restoreAfterPrint(): void {
    // Restore original print mode state
    if ((window as any).__printModeRestore) {
      this.togglePrintMode();
      delete (window as any).__printModeRestore;
    }
  }

  private loadUserPreferences(): void {
    try {
      const saved = localStorage.getItem('conicExplorerPrefs');
      if (saved) {
        const prefs = JSON.parse(saved);
        this.config.renderOptions = { ...this.config.renderOptions, ...prefs };
      }
    } catch (error) {
      console.warn('Failed to load user preferences:', error);
    }
  }

  private saveUserPreferences(): void {
    try {
      localStorage.setItem('conicExplorerPrefs', JSON.stringify(this.config.renderOptions));
    } catch (error) {
      console.warn('Failed to save user preferences:', error);
    }
  }

  /**
   * Public API for other modules
   */
  public getConfig(): AppConfig {
    return { ...this.config };
  }

  public updateConfig(updates: Partial<AppConfig>): void {
    this.config = { ...this.config, ...updates };
    this.saveUserPreferences();
  }

  public getRenderOptions(): RenderOptions {
    return { ...this.config.renderOptions };
  }
}

// Global app instance
let app: ConicApp;

/**
 * Initialize application when DOM is ready
 */
function initializeApp(): void {
  app = new ConicApp();
  
  // Make app globally available for debugging and other modules
  (window as any).conicApp = app;
  
  console.log('🚀 Conics Explorer initialized');
  console.log('📐 Math mode:', app.getRenderOptions().mathMode);
  console.log('🖨️ Print mode:', app.getRenderOptions().printMode);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Export for use in other modules
export { ConicApp, defaultConfig };
export default app;
