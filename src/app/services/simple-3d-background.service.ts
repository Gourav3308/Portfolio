import { ElementRef, Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class Simple3DBackgroundService {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private animationId!: number;
  private particles: THREE.Points[] = [];
  private mouse = new THREE.Vector2();
  
  initialize(container: ElementRef): boolean {
    try {
      console.log('Initializing simple 3D background...');
      
      // Create scene
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x0a0a0a);
      
      // Create camera
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.camera.position.z = 50;
      
      // Create renderer
      this.renderer = new THREE.WebGLRenderer({ alpha: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      // Create simple particles
      this.createSimpleParticles();
      
      // Setup mouse interaction
      this.setupMouseInteraction();
      
      // Add renderer to container
      container.nativeElement.appendChild(this.renderer.domElement);
      
      // Start animation
      this.animate();
      
      console.log('Simple 3D background initialized successfully');
      return true;
      
    } catch (error) {
      console.error('Failed to initialize simple 3D background:', error);
      return false;
    }
  }
  
  private createSimpleParticles(): void {
    const particleCount = 100;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Position
      positions[i3] = (Math.random() - 0.5) * 100;
      positions[i3 + 1] = (Math.random() - 0.5) * 100;
      positions[i3 + 2] = (Math.random() - 0.5) * 100;
      
      // Color (blue theme)
      colors[i3] = 0.3;     // R
      colors[i3 + 1] = 0.6; // G
      colors[i3 + 2] = 1.0; // B
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });
    
    const particleSystem = new THREE.Points(geometry, material);
    this.particles.push(particleSystem);
    this.scene.add(particleSystem);
  }
  
  private setupMouseInteraction(): void {
    window.addEventListener('mousemove', (event) => {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
  
  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());
    
    // Rotate particles
    this.particles.forEach(particle => {
      particle.rotation.y += 0.002;
      particle.rotation.x += 0.001;
    });
    
    // Move camera based on mouse
    this.camera.position.x += (this.mouse.x * 10 - this.camera.position.x) * 0.05;
    this.camera.position.y += (this.mouse.y * 10 - this.camera.position.y) * 0.05;
    this.camera.lookAt(this.scene.position);
    
    this.renderer.render(this.scene, this.camera);
  }
  
  destroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    if (this.renderer) {
      this.renderer.dispose();
    }
    
    // Clean up particles
    this.particles.forEach(particle => {
      particle.geometry.dispose();
      if (particle.material instanceof THREE.Material) {
        particle.material.dispose();
      }
    });
  }
}
