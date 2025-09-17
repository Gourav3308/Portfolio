import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import all components
import { AboutSectionComponent } from './components/about-section/about-section.component';
import { ContactSectionComponent } from './components/contact-section/contact-section.component';
import { EducationSectionComponent } from './components/education-section/education-section.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { ParticleBackgroundComponent } from './components/particle-background/particle-background.component';
import { ProjectsSectionComponent } from './components/projects-section/projects-section.component';
import { SkillsSectionComponent } from './components/skills-section/skills-section.component';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    SkillsSectionComponent,
    ProjectsSectionComponent,
    EducationSectionComponent,
    ContactSectionComponent,
    FooterComponent,
    ParticleBackgroundComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Gourav Kumar - Portfolio';
  isMenuOpen = false;

  ngOnInit() {
    this.initializeAnimations();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.updateScrollProgress();
  }

  private initializeAnimations() {
    // Initialize GSAP animations
    gsap.from('.hero-content', {
      duration: 1.5,
      y: 100,
      opacity: 0,
      ease: 'power3.out'
    });

    // Parallax effect for sections
    gsap.utils.toArray('.section').forEach((section: any) => {
      gsap.fromTo(section, 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }

  private updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
      (progressBar as HTMLElement).style.width = scrollPercent + '%';
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    
    if (this.isMenuOpen) {
      gsap.to('.mobile-menu', {
        duration: 0.3,
        x: 0,
        ease: 'power2.out'
      });
    } else {
      gsap.to('.mobile-menu', {
        duration: 0.3,
        x: '100%',
        ease: 'power2.in'
      });
    }
  }

  scrollToSection(sectionId: string) {
    console.log('Attempting to scroll to section:', sectionId);
    const element = document.getElementById(sectionId);
    console.log('Found element:', element);
    
    if (element) {
      console.log('Element position:', element.offsetTop);
      console.log('Element visibility:', window.getComputedStyle(element).display);
      console.log('Element height:', element.offsetHeight);
      
      // Try multiple scroll methods
      try {
        // Method 1: scrollIntoView
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
        
        // Method 2: Fallback with manual scroll
        setTimeout(() => {
          const headerHeight = 80; // Adjust based on your header height
          const targetPosition = element.offsetTop - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }, 100);
        
      } catch (error) {
        console.error('Scroll error:', error);
        // Method 3: Simple fallback
        window.location.hash = sectionId;
      }
      
      this.isMenuOpen = false;
    } else {
      console.error('Section not found:', sectionId);
      // List all available elements with IDs for debugging
      const allIds = Array.from(document.querySelectorAll('[id]')).map(el => el.id);
      console.log('Available IDs:', allIds);
    }
  }
}
