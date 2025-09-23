import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Simple3DBackgroundService } from '../../services/simple-3d-background.service';

@Component({
  selector: 'app-three-d-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './three-d-background.component.html',
  styleUrls: ['./three-d-background.component.scss']
})
export class ThreeDBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('threeDContainer', { static: true }) threeDContainer!: ElementRef;
  isLoading = true;

  constructor(
    private simple3DBackgroundService: Simple3DBackgroundService
  ) {}

  ngAfterViewInit(): void {
    console.log('ThreeDBackgroundComponent ngAfterViewInit called');
    console.log('Container element:', this.threeDContainer?.nativeElement);
    
    // Initialize with loading state
    try {
      const success = this.simple3DBackgroundService.initialize(this.threeDContainer);
      console.log('Simple 3D Background initialization result:', success);
      
      // Hide loading after initialization completes
      setTimeout(() => {
        console.log('Hiding loading screen');
        this.isLoading = false;
      }, 1000);
    } catch (error) {
      console.error('Failed to initialize simple 3D background:', error);
      // Hide loading even if initialization fails
      this.isLoading = false;
    }
  }

  ngOnDestroy(): void {
    this.simple3DBackgroundService.destroy();
  }
}
