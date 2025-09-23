import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent implements OnInit, AfterViewInit {
  @ViewChild('heroContent', { static: true }) heroContent!: ElementRef;
  @ViewChild('floatingElements', { static: true }) floatingElements!: ElementRef;
  @ViewChild('typingText', { static: true }) typingText!: ElementRef;

  currentText = '';
  texts = [
    'Java Full Stack Developer',
    'Spring Boot Expert',
    'Angular and React Enthusiast',
    'Problem Solver',
    'Tech Innovator'
  ];
  currentIndex = 0;
  isDeleting = false;

  ngOnInit() {
    this.startTypingAnimation();
  }

  ngAfterViewInit() {
    this.initializeAnimations();
    // this.createFloatingElements(); // Removed floating icons
  }

  private initializeAnimations() {
    // Hero content entrance animation
    gsap.fromTo(this.heroContent.nativeElement, 
      { 
        y: 100, 
        opacity: 0,
        scale: 0.8
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.5
      }
    );

    // Floating elements animation
    gsap.fromTo('.floating-element', 
      { 
        y: 50, 
        opacity: 0,
        rotation: 0
      },
      { 
        y: 0, 
        opacity: 1,
        rotation: 360,
        duration: 2,
        ease: 'power2.out',
        stagger: 0.2,
        delay: 1
      }
    );

    // Continuous floating animation
    gsap.to('.floating-element', {
      y: -20,
      duration: 3,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.5
    });
  }

  private createFloatingElements() {
    const container = this.floatingElements.nativeElement;
    const elementCount = 8;

    for (let i = 0; i < elementCount; i++) {
      const element = document.createElement('div');
      element.className = 'floating-element';
      element.style.left = Math.random() * 100 + '%';
      element.style.top = Math.random() * 100 + '%';
      element.style.animationDelay = Math.random() * 2 + 's';
      
      // Add random tech icons or shapes
      const icons = ['💻', '⚡', '🚀', '🔧', '💡', '🌟', '🎯', '🔥'];
      element.textContent = icons[i];
      
      container.appendChild(element);
    }
  }

  private startTypingAnimation() {
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;

    const type = () => {
      const current = this.texts[this.currentIndex];
      
      if (this.isDeleting) {
        this.currentText = current.substring(0, this.currentText.length - 1);
      } else {
        this.currentText = current.substring(0, this.currentText.length + 1);
      }

      if (!this.isDeleting && this.currentText === current) {
        setTimeout(() => {
          this.isDeleting = true;
          type();
        }, pauseTime);
      } else if (this.isDeleting && this.currentText === '') {
        this.isDeleting = false;
        this.currentIndex = (this.currentIndex + 1) % this.texts.length;
        setTimeout(type, 500);
      } else {
        setTimeout(type, this.isDeleting ? deleteSpeed : typeSpeed);
      }
    };

    type();
  }

  scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  downloadResume() {
    // Google Drive file ID from the provided link
    const fileId = '1WgRY0RnNG9qmKjlRUK215NgzT1KA73Q5';
    
    // Create direct download link from Google Drive
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'Gourav_Kumar_Resume.pdf'; // Set the filename for download
    link.target = '_blank';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('Resume download initiated...');
  }
}
