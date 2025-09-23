import { Injectable } from '@angular/core';

export interface DeviceCapabilities {
  isLowEnd: boolean;
  supportsWebGL: boolean;
  supportsWebGL2: boolean;
  prefersReducedMotion: boolean;
  devicePixelRatio: number;
  memoryEstimate?: number;
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceOptimizerService {
  private capabilities: DeviceCapabilities;

  constructor() {
    this.capabilities = this.detectCapabilities();
  }

  private detectCapabilities(): DeviceCapabilities {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const gl2 = canvas.getContext('webgl2');
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Estimate device capabilities
    const devicePixelRatio = window.devicePixelRatio || 1;
    const memoryEstimate = this.estimateMemory();
    
    // Determine if device is low-end
    const isLowEnd = this.isLowEndDevice(devicePixelRatio, memoryEstimate);
    
    return {
      isLowEnd,
      supportsWebGL: !!gl,
      supportsWebGL2: !!gl2,
      prefersReducedMotion,
      devicePixelRatio,
      memoryEstimate
    };
  }

  private estimateMemory(): number {
    // @ts-ignore - navigator.deviceMemory is experimental
    return navigator.deviceMemory || 4; // Default to 4GB if not available
  }

  private isLowEndDevice(pixelRatio: number, memory: number): boolean {
    // Consider device low-end if:
    // - Memory is less than 4GB
    // - Very high pixel ratio (indicating high-DPI display that might be taxing)
    // - Screen resolution is small
    const screenWidth = screen.width;
    const screenHeight = screen.height;
    const totalPixels = screenWidth * screenHeight;
    
    return memory < 4 || 
           pixelRatio > 2.5 || 
           totalPixels < 800000 || // Less than HD resolution
           navigator.hardwareConcurrency < 4; // Less than 4 CPU cores
  }

  getCapabilities(): DeviceCapabilities {
    return this.capabilities;
  }

  getOptimizedConfig() {
    const caps = this.capabilities;
    
    if (caps.prefersReducedMotion) {
      return {
        particleCount: 50,
        connectionDistance: 100,
        particleSpeed: 0.1,
        mouseInteraction: false,
        opacity: 0.3
      };
    }
    
    if (caps.isLowEnd) {
      return {
        particleCount: 100,
        connectionDistance: 120,
        particleSpeed: 0.2,
        mouseInteraction: true,
        opacity: 0.4
      };
    }
    
    // High-end device
    return {
      particleCount: 200,
      connectionDistance: 150,
      particleSpeed: 0.3,
      mouseInteraction: true,
      opacity: 0.7
    };
  }

  shouldUseWebGL2(): boolean {
    return this.capabilities.supportsWebGL2 && !this.capabilities.isLowEnd;
  }

  getOptimalPixelRatio(): number {
    if (this.capabilities.isLowEnd) {
      return Math.min(this.capabilities.devicePixelRatio, 1);
    }
    return Math.min(this.capabilities.devicePixelRatio, 2);
  }
}
