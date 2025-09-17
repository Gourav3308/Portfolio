import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
  gpa?: string;
  icon: string;
}

interface Certification {
  title: string;
  issuer: string;
  date: string;
  description: string;
  link: string;
  icon: string;
}

@Component({
  selector: 'app-education-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education-section.component.html',
  styleUrls: ['./education-section.component.scss']
})
export class EducationSectionComponent implements OnInit, AfterViewInit {
  @ViewChild('educationContainer', { static: true }) educationContainer!: ElementRef;

  education: Education[] = [
    {
      degree: 'Bachelor of Technology',
      institution: 'Centurion University of Technology and Management',
      period: 'Aug 2022 - Present',
      description: 'Computer Science and Engineering with focus on software development, algorithms, and system design.',
      gpa: 'Expected Graduation: 2026',
      icon: 'fas fa-graduation-cap'
    }
  ];

  certifications: Certification[] = [
    {
      title: 'Java Development Intern',
      issuer: 'TechnoHacks',
      date: '2024',
      description: 'Worked on REST APIs & web applications using Spring Boot. Gained hands-on experience in enterprise application development.',
      link: 'https://drive.google.com/file/d/1JlCg6wlKuGBJ8elNEXQ6ANadTUJcEndk/view?usp=sharing',
      icon: 'fab fa-java'
    },
    {
      title: 'Problem-Solving & Programming',
      issuer: 'GeeksforGeeks, CUTM',
      date: '2024',
      description: '16-week intensive training program covering data structures, algorithms, and competitive programming.',
      link: 'https://drive.google.com/file/d/1Dmwu71Xamb-mLlqhL-8HMKR8TnrQmVgx/view?usp=sharing',
      icon: 'fas fa-code'
    },
    {
      title: 'Quantum Computing Workshop',
      issuer: 'DRDO',
      date: '2024',
      description: 'Advanced workshop on quantum computing principles and applications conducted by Defence Research and Development Organisation.',
      link: 'https://drive.google.com/file/d/1Ad1HxPkr66XDuuR7R48VGmSb1iTvi7yo/view?usp=sharing',
      icon: 'fas fa-atom'
    }
  ];

  ngOnInit() {}

  ngAfterViewInit() {
    this.initializeAnimations();
  }

  private initializeAnimations() {
    // Education cards animation
    gsap.fromTo('.education-card', 
      { 
        y: 100, 
        opacity: 0,
        scale: 0.8
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: this.educationContainer.nativeElement,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Certifications animation
    gsap.fromTo('.certification-card', 
      { 
        x: -100, 
        opacity: 0
      },
      { 
        x: 0, 
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.certifications-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  openCertification(link: string) {
    if (link !== '#') {
      window.open(link, '_blank');
    }
  }
}
