import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
  color: string;
}


@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills-section.component.html',
  styleUrls: ['./skills-section.component.scss']
})
export class SkillsSectionComponent implements OnInit, AfterViewInit {
  @ViewChild('skillsContainer', { static: true }) skillsContainer!: ElementRef;

  skills: Skill[] = [
    // Languages
    { name: 'Java', level: 90, category: 'Languages', icon: 'fab fa-java', color: '#f89820' },
    { name: 'JavaScript', level: 85, category: 'Languages', icon: 'fab fa-js-square', color: '#f7df1e' },
    { name: 'HTML', level: 90, category: 'Languages', icon: 'fab fa-html5', color: '#e34f26' },
    { name: 'CSS', level: 88, category: 'Languages', icon: 'fab fa-css3-alt', color: '#1572b6' },
    { name: 'SQL', level: 82, category: 'Languages', icon: 'fas fa-database', color: '#336791' },
    
    // Frameworks
    { name: 'Spring Boot', level: 85, category: 'Frameworks', icon: 'fas fa-leaf', color: '#6db33f' },
    { name: 'Spring MVC', level: 80, category: 'Frameworks', icon: 'fas fa-leaf', color: '#6db33f' },
    { name: 'Spring Data JPA', level: 78, category: 'Frameworks', icon: 'fas fa-leaf', color: '#6db33f' },
    { name: 'Hibernate', level: 75, category: 'Frameworks', icon: 'fas fa-database', color: '#bcae79' },
    { name: 'Angular', level: 80, category: 'Frameworks', icon: 'fab fa-angular', color: '#dd0031' },
    
    // Libraries
    { name: 'React.js', level: 82, category: 'Libraries', icon: 'fab fa-react', color: '#61dafb' },
    { name: 'Thymeleaf', level: 75, category: 'Libraries', icon: 'fas fa-file-code', color: '#005f0f' },
    
    // Databases
    { name: 'MySQL', level: 80, category: 'Database', icon: 'fas fa-database', color: '#4479a1' },
    { name: 'PostgreSQL', level: 75, category: 'Database', icon: 'fas fa-database', color: '#336791' },
    
    // Tools
    { name: 'Git', level: 85, category: 'Tools', icon: 'fab fa-git-alt', color: '#f05032' },
    { name: 'GitHub', level: 88, category: 'Tools', icon: 'fab fa-github', color: '#181717' },
    { name: 'Eclipse', level: 75, category: 'Tools', icon: 'fas fa-code', color: '#2c2255' },
    { name: 'IntelliJ IDEA', level: 85, category: 'Tools', icon: 'fas fa-code', color: '#000000' },
    { name: 'Visual Studio Code', level: 90, category: 'Tools', icon: 'fas fa-code', color: '#007acc' },
    { name: 'Postman', level: 80, category: 'Tools', icon: 'fas fa-paper-plane', color: '#ff6c37' },
    
    // Concepts
    { name: 'OOP', level: 88, category: 'Concepts', icon: 'fas fa-cube', color: '#8b5cf6' },
    { name: 'RESTful APIs', level: 85, category: 'Concepts', icon: 'fas fa-cloud', color: '#10b981' },
    { name: 'MVC Architecture', level: 82, category: 'Concepts', icon: 'fas fa-sitemap', color: '#f59e0b' },
    { name: 'ORM', level: 80, category: 'Concepts', icon: 'fas fa-exchange-alt', color: '#ef4444' },
    { name: 'Microservices', level: 70, category: 'Concepts', icon: 'fas fa-microchip', color: '#6366f1' }
  ];

  selectedSkill: Skill | null = null;
  skillCategories = ['All', 'Languages', 'Frameworks', 'Libraries', 'Database', 'Tools', 'Concepts'];
  activeCategory = 'All';


  ngOnInit() {
    this.selectedSkill = this.skills[0];
  }

  ngAfterViewInit() {
    this.initializeAnimations();
  }

  private initializeAnimations() {
    // Skills container animation
    gsap.fromTo('.skill-card', 
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
        stagger: 0.1,
        scrollTrigger: {
          trigger: this.skillsContainer.nativeElement,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Skill sphere animation
    gsap.fromTo('.skill-sphere-container', 
      { 
        scale: 0,
        rotation: 180
      },
      { 
        scale: 1,
        rotation: 0,
        duration: 1.5,
        ease: 'elastic.out(1, 0.3)',
        scrollTrigger: {
          trigger: this.skillsContainer.nativeElement,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }


  selectSkill(skill: Skill) {
    this.selectedSkill = skill;
    
    // Animate skill selection
    gsap.fromTo('.skill-details', 
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );
  }


  filterSkills(category: string) {
    this.activeCategory = category;
    
    gsap.to('.skill-card', {
      scale: 0.8,
      opacity: 0.5,
      duration: 0.3,
      onComplete: () => {
        gsap.to('.skill-card', {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          stagger: 0.1
        });
      }
    });
  }

  getFilteredSkills(): Skill[] {
    if (this.activeCategory === 'All') {
      return this.skills;
    }
    return this.skills.filter(skill => skill.category === this.activeCategory);
  }

}
