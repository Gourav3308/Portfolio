import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  opacity: number;
  color: string;
}

@Component({
  selector: 'app-particle-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './particle-background.component.html',
  styleUrls: ['./particle-background.component.scss']
})
export class ParticleBackgroundComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId: number = 0;
  private mouseX = 0;
  private mouseY = 0;

  ngOnInit() {
    this.createParticles();
  }

  ngAfterViewInit() {
    this.initCanvas();
    this.animate();
  }

  private initCanvas() {
    const canvas = this.canvas.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    window.addEventListener('mousemove', (e) => this.updateMousePosition(e));
  }

  private resizeCanvas() {
    const canvas = this.canvas.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private updateMousePosition(e: MouseEvent) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  private createParticles() {
    const particleCount = 150;
    this.particles = [];

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        color: this.getRandomColor()
      });
    }
  }

  private getRandomColor(): string {
    const colors = [
      '#6366f1', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  private animate() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    this.updateParticles();
    this.drawParticles();
    this.drawConnections();
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  private updateParticles() {
    this.particles.forEach(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.z += particle.vz;

      // Mouse interaction
      const dx = this.mouseX - particle.x;
      const dy = this.mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const force = (100 - distance) / 100;
        particle.vx += (dx / distance) * force * 0.01;
        particle.vy += (dy / distance) * force * 0.01;
      }

      // Apply friction
      particle.vx *= 0.99;
      particle.vy *= 0.99;
      particle.vz *= 0.99;

      // Boundary check
      if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
      if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;
      if (particle.z < 0 || particle.z > 1000) particle.vz *= -1;

      // Keep particles in bounds
      particle.x = Math.max(0, Math.min(window.innerWidth, particle.x));
      particle.y = Math.max(0, Math.min(window.innerHeight, particle.y));
      particle.z = Math.max(0, Math.min(1000, particle.z));
    });
  }

  private drawParticles() {
    this.particles.forEach(particle => {
      const x = particle.x;
      const y = particle.y;
      const size = particle.size * (1 - particle.z / 1000);
      const opacity = particle.opacity * (1 - particle.z / 1000);

      this.ctx.save();
      this.ctx.globalAlpha = opacity;
      this.ctx.fillStyle = particle.color;
      this.ctx.shadowBlur = 20;
      this.ctx.shadowColor = particle.color;
      
      this.ctx.beginPath();
      this.ctx.arc(x, y, size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });
  }

  private drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dz = this.particles[i].z - this.particles[j].z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < 120) {
          const opacity = (120 - distance) / 120 * 0.2;
          this.ctx.save();
          this.ctx.globalAlpha = opacity;
          this.ctx.strokeStyle = '#6366f1';
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
          this.ctx.restore();
        }
      }
    }
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}
