import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-section.component.html',
  styleUrls: ['./about-section.component.scss']
})
export class AboutSectionComponent implements OnInit, AfterViewInit {
  @ViewChild('aboutContainer', { static: true }) aboutContainer!: ElementRef;

  timelineItems: TimelineItem[] = [
    {
      year: '2022',
      title: 'Started Computer Science Journey',
      description: 'Began pursuing Bachelor of Technology in Computer Science and Engineering at Centurion University.',
      icon: 'fas fa-graduation-cap',
      color: '#6366f1'
    },
    {
      year: '2023',
      title: 'First Programming Projects',
      description: 'Developed initial projects in Java and started exploring web development technologies.',
      icon: 'fas fa-code',
      color: '#8b5cf6'
    },
    {
      year: '2024',
      title: 'Full-Stack Development',
      description: 'Built comprehensive applications using Spring Boot, React, and MySQL. Created SmartBank application.',
      icon: 'fas fa-laptop-code',
      color: '#ec4899'
    },
    {
      year: '2025',
      title: 'Advanced Projects',
      description: 'Developed payment gateway and started HealthBridge project. Gained expertise in REST APIs and microservices.',
      icon: 'fas fa-rocket',
      color: '#10b981'
    }
  ];

  stats = [
    { number: '3+', label: 'Major Projects', icon: 'fas fa-project-diagram' },
    { number: '2+', label: 'Years Learning', icon: 'fas fa-clock' },
    { number: '5+', label: 'Technologies', icon: 'fas fa-tools' },
    { number: '100%', label: 'Dedication', icon: 'fas fa-heart' }
  ];

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initializeAnimations();
  }

  private initializeAnimations() {
    // About container animation
    gsap.fromTo('.about-content', 
      { 
        y: 100, 
        opacity: 0,
        scale: 0.9
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: this.aboutContainer.nativeElement,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Timeline animation
    gsap.fromTo('.timeline-item', 
      { 
        x: -100, 
        opacity: 0
      },
      { 
        x: 0, 
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.timeline',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Stats animation
    gsap.fromTo('.stat-item', 
      { 
        y: 50, 
        opacity: 0,
        scale: 0.8
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.stats-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }



  scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
