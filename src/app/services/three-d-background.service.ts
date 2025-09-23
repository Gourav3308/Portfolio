import { ElementRef, Injectable } from '@angular/core';
import * as THREE from 'three';
import { PerformanceOptimizerService } from './performance-optimizer.service';

export interface BackgroundConfig {
  particleCount: number;
  connectionDistance: number;
  particleSpeed: number;
  mouseInteraction: boolean;
  colorScheme: 'blue' | 'purple' | 'tech' | 'gradient';
  opacity: number;
}

export type InitializationCallback = (success: boolean) => void;

@Injectable({
  providedIn: 'root'
})
export class ThreeDBackgroundService {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private animationId!: number;
  private particles: THREE.Points[] = [];
  private connections: THREE.Line[] = [];
  private mouse = new THREE.Vector2();
  private windowHalf = new THREE.Vector2();
  
  private config: BackgroundConfig = {
    particleCount: 150,
    connectionDistance: 120,
    particleSpeed: 0.5,
    mouseInteraction: true,
    colorScheme: 'tech',
    opacity: 0.6
  };

  constructor(private performanceOptimizer: PerformanceOptimizerService) {
    this.windowHalf.set(window.innerWidth / 2, window.innerHeight / 2);
  }

  initialize(container: ElementRef, callback?: InitializationCallback): void {
    try {
      console.log('Initializing 3D background...');
      this.createScene();
      this.createCamera();
      this.createRenderer(container);
      
      // Only create 3D elements if renderer was created successfully
      if (this.renderer) {
        this.createParticles();
        this.createConnections();
        this.setupLighting();
        this.setupEventListeners();
        this.animate();
        console.log('3D background initialized successfully');
        if (callback) callback(true);
      } else {
        console.log('Using fallback background');
        if (callback) callback(false);
      }
    } catch (error) {
      console.error('Error initializing 3D background:', error);
      if (callback) callback(false);
      throw error;
    }
  }

  private createScene(): void {
    this.scene = new THREE.Scene();
    
    // Add gradient background
    const gradientTexture = this.createGradientTexture();
    this.scene.background = gradientTexture;
  }

  private createGradientTexture(): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    
    const context = canvas.getContext('2d')!;
    const gradient = context.createLinearGradient(0, 0, 512, 512);
    
    switch (this.config.colorScheme) {
      case 'blue':
        gradient.addColorStop(0, '#0f172a');
        gradient.addColorStop(0.5, '#1e293b');
        gradient.addColorStop(1, '#334155');
        break;
      case 'purple':
        gradient.addColorStop(0, '#1a0b2e');
        gradient.addColorStop(0.5, '#2d1b69');
        gradient.addColorStop(1, '#4c1d95');
        break;
      case 'tech':
        gradient.addColorStop(0, '#0a0a0a');
        gradient.addColorStop(0.3, '#1a1a2e');
        gradient.addColorStop(0.7, '#16213e');
        gradient.addColorStop(1, '#0f3460');
        break;
      case 'gradient':
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(0.5, '#764ba2');
        gradient.addColorStop(1, '#f093fb');
        break;
    }
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, 512, 512);
    
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  private createCamera(): void {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 50;
  }

  private createRenderer(container: ElementRef): void {
    const capabilities = this.performanceOptimizer.getCapabilities();
    const optimalPixelRatio = this.performanceOptimizer.getOptimalPixelRatio();
    
    // Check WebGL support
    if (!capabilities.supportsWebGL) {
      console.warn('WebGL not supported, falling back to basic background');
      this.createFallbackBackground(container);
      return;
    }
    
    try {
      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !capabilities.isLowEnd,
        powerPreference: capabilities.isLowEnd ? 'low-power' : 'high-performance'
      });
      
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(optimalPixelRatio);
      this.renderer.setClearColor(0x000000, 0);
      
      // Optimize renderer settings based on device capabilities
      if (capabilities.isLowEnd) {
        this.renderer.shadowMap.enabled = false;
        this.renderer.setSize(window.innerWidth, window.innerHeight, false);
      }
      
      container.nativeElement.appendChild(this.renderer.domElement);
      console.log('WebGL renderer created successfully');
    } catch (error) {
      console.error('Failed to create WebGL renderer:', error);
      this.createFallbackBackground(container);
    }
  }

  private createFallbackBackground(container: ElementRef): void {
    // Create a simple CSS gradient background as fallback
    const fallbackDiv = document.createElement('div');
    fallbackDiv.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
      z-index: -1;
      pointer-events: none;
    `;
    container.nativeElement.appendChild(fallbackDiv);
    console.log('Fallback background created');
  }

  private createParticles(): void {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.config.particleCount * 3);
    const colors = new Float32Array(this.config.particleCount * 3);
    const sizes = new Float32Array(this.config.particleCount);
    
    const colorPalette = this.getColorPalette();
    
    for (let i = 0; i < this.config.particleCount; i++) {
      const i3 = i * 3;
      
      // Position
      positions[i3] = (Math.random() - 0.5) * 200;
      positions[i3 + 1] = (Math.random() - 0.5) * 200;
      positions[i3 + 2] = (Math.random() - 0.5) * 200;
      
      // Color
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
      
      // Size
      sizes[i] = Math.random() * 3 + 1;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: this.config.opacity,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending
    });
    
    const particleSystem = new THREE.Points(geometry, material);
    this.particles.push(particleSystem);
    this.scene.add(particleSystem);
  }

  private createConnections(): void {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.config.particleCount * 3 * 2);
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.LineBasicMaterial({
      color: 0x4a9eff,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    });
    
    const connections = new THREE.LineSegments(geometry, material);
    this.connections.push(connections);
    this.scene.add(connections);
  }

  private setupLighting(): void {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    this.scene.add(ambientLight);
    
    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(50, 50, 50);
    this.scene.add(directionalLight);
    
    // Point lights for dynamic effects
    const pointLight1 = new THREE.PointLight(0x4a9eff, 0.5, 100);
    pointLight1.position.set(-50, -50, 50);
    this.scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xff6b9d, 0.5, 100);
    pointLight2.position.set(50, 50, -50);
    this.scene.add(pointLight2);
  }

  private setupEventListeners(): void {
    window.addEventListener('resize', this.onWindowResize.bind(this));
    
    if (this.config.mouseInteraction) {
      window.addEventListener('mousemove', this.onMouseMove.bind(this));
    }
  }

  private onWindowResize(): void {
    this.windowHalf.set(window.innerWidth / 2, window.innerHeight / 2);
    
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private onMouseMove(event: MouseEvent): void {
    this.mouse.x = (event.clientX - this.windowHalf.x) / this.windowHalf.x;
    this.mouse.y = -(event.clientY - this.windowHalf.y) / this.windowHalf.y;
  }

  private animate(): void {
    if (!this.renderer || !this.scene || !this.camera) {
      console.warn('Cannot animate: renderer, scene, or camera not initialized');
      return;
    }
    
    this.animationId = requestAnimationFrame(() => this.animate());
    
    this.updateParticles();
    this.updateConnections();
    this.updateCamera();
    
    this.renderer.render(this.scene, this.camera);
  }

  private updateParticles(): void {
    this.particles.forEach(particleSystem => {
      const positions = particleSystem.geometry.attributes['position'].array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        // Add subtle movement
        positions[i] += (Math.random() - 0.5) * 0.1;
        positions[i + 1] += (Math.random() - 0.5) * 0.1;
        positions[i + 2] += (Math.random() - 0.5) * 0.1;
        
        // Mouse interaction
        if (this.config.mouseInteraction) {
          const dx = positions[i] - this.mouse.x * 100;
          const dy = positions[i + 1] - this.mouse.y * 100;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 50) {
            positions[i] += dx * 0.01;
            positions[i + 1] += dy * 0.01;
          }
        }
        
        // Boundary check
        if (Math.abs(positions[i]) > 100) positions[i] *= -1;
        if (Math.abs(positions[i + 1]) > 100) positions[i + 1] *= -1;
        if (Math.abs(positions[i + 2]) > 100) positions[i + 2] *= -1;
      }
      
      particleSystem.geometry.attributes['position'].needsUpdate = true;
      particleSystem.rotation.y += 0.001;
    });
  }

  private updateConnections(): void {
    this.connections.forEach(connection => {
      const positions = connection.geometry.attributes['position'].array as Float32Array;
      const particlePositions = this.particles[0].geometry.attributes['position'].array as Float32Array;
      
      let connectionIndex = 0;
      
      for (let i = 0; i < particlePositions.length; i += 9) {
        for (let j = i + 9; j < particlePositions.length; j += 9) {
          const dx = particlePositions[i] - particlePositions[j];
          const dy = particlePositions[i + 1] - particlePositions[j + 1];
          const dz = particlePositions[i + 2] - particlePositions[j + 2];
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          if (distance < this.config.connectionDistance && connectionIndex < positions.length - 5) {
            positions[connectionIndex] = particlePositions[i];
            positions[connectionIndex + 1] = particlePositions[i + 1];
            positions[connectionIndex + 2] = particlePositions[i + 2];
            positions[connectionIndex + 3] = particlePositions[j];
            positions[connectionIndex + 4] = particlePositions[j + 1];
            positions[connectionIndex + 5] = particlePositions[j + 2];
            connectionIndex += 6;
          }
        }
      }
      
      // Hide unused connections
      for (let i = connectionIndex; i < positions.length; i++) {
        positions[i] = 0;
      }
      
      connection.geometry.attributes['position'].needsUpdate = true;
    });
  }

  private updateCamera(): void {
    // Subtle camera movement
    this.camera.position.x += (this.mouse.x * 10 - this.camera.position.x) * 0.02;
    this.camera.position.y += (this.mouse.y * 10 - this.camera.position.y) * 0.02;
    this.camera.lookAt(this.scene.position);
  }

  private getColorPalette(): THREE.Color[] {
    switch (this.config.colorScheme) {
      case 'blue':
        return [
          new THREE.Color(0x4a9eff),
          new THREE.Color(0x6bb6ff),
          new THREE.Color(0x8cc8ff),
          new THREE.Color(0xaedaff)
        ];
      case 'purple':
        return [
          new THREE.Color(0x8b5cf6),
          new THREE.Color(0xa78bfa),
          new THREE.Color(0xc4b5fd),
          new THREE.Color(0xddd6fe)
        ];
      case 'tech':
        return [
          new THREE.Color(0x00d4ff),
          new THREE.Color(0x4a9eff),
          new THREE.Color(0x7c3aed),
          new THREE.Color(0xff6b9d),
          new THREE.Color(0x06ffa5)
        ];
      case 'gradient':
        return [
          new THREE.Color(0x667eea),
          new THREE.Color(0x764ba2),
          new THREE.Color(0xf093fb),
          new THREE.Color(0xf5576c)
        ];
      default:
        return [new THREE.Color(0x4a9eff)];
    }
  }

  updateConfig(newConfig: Partial<BackgroundConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    // Update background
    this.scene.background = this.createGradientTexture();
    
    // Update particle opacity
    this.particles.forEach(particle => {
      (particle.material as THREE.PointsMaterial).opacity = this.config.opacity;
    });
  }

  destroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    if (this.renderer) {
      this.renderer.dispose();
    }
    
    // Clean up geometries and materials
    this.particles.forEach(particle => {
      particle.geometry.dispose();
      if (particle.material instanceof THREE.Material) {
        particle.material.dispose();
      }
    });
    
    this.connections.forEach(connection => {
      connection.geometry.dispose();
      if (connection.material instanceof THREE.Material) {
        connection.material.dispose();
      }
    });
    
    // Remove event listeners
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    window.removeEventListener('mousemove', this.onMouseMove.bind(this));
  }
}
