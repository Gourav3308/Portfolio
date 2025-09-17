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

interface Tech {
  name: string;
  icon: string;
  color: string;
}

interface TechCategory {
  name: string;
  technologies: Tech[];
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
  @ViewChild('skillSphere', { static: true }) skillSphere!: ElementRef;
  @ViewChild('techSidebar', { static: true }) techSidebar!: ElementRef;

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

  techCategories: TechCategory[] = [
    {
      name: 'Languages',
      technologies: [
        { name: 'Java', icon: 'fab fa-java', color: '#f89820' },
        { name: 'JavaScript', icon: 'fab fa-js-square', color: '#f7df1e' },
        { name: 'HTML', icon: 'fab fa-html5', color: '#e34f26' },
        { name: 'CSS', icon: 'fab fa-css3-alt', color: '#1572b6' },
        { name: 'SQL', icon: 'fas fa-database', color: '#336791' }
      ]
    },
    {
      name: 'Frameworks',
      technologies: [
        { name: 'Spring Boot', icon: 'fas fa-leaf', color: '#6db33f' },
        { name: 'Angular', icon: 'fab fa-angular', color: '#dd0031' },
        { name: 'React', icon: 'fab fa-react', color: '#61dafb' },
        { name: 'Hibernate', icon: 'fas fa-database', color: '#bcae79' }
      ]
    },
    {
      name: 'Tools',
      technologies: [
        { name: 'Git', icon: 'fab fa-git-alt', color: '#f05032' },
        { name: 'GitHub', icon: 'fab fa-github', color: '#181717' },
        { name: 'VS Code', icon: 'fas fa-code', color: '#007acc' },
        { name: 'Postman', icon: 'fas fa-paper-plane', color: '#ff6c37' }
      ]
    },
    {
      name: 'Concepts',
      technologies: [
        { name: 'OOP', icon: 'fas fa-cube', color: '#8b5cf6' },
        { name: 'REST APIs', icon: 'fas fa-cloud', color: '#10b981' },
        { name: 'MVC', icon: 'fas fa-sitemap', color: '#f59e0b' },
        { name: 'ORM', icon: 'fas fa-exchange-alt', color: '#ef4444' }
      ]
    }
  ];

  ngOnInit() {
    this.selectedSkill = this.skills[0];
  }

  ngAfterViewInit() {
    this.initializeAnimations();
    this.createSkillSphere();
    this.initializeSidebarAnimations();
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
          trigger: this.skillSphere.nativeElement,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  private createSkillSphere() {
    const container = this.skillSphere.nativeElement;
    const sphere = container.querySelector('.skill-sphere');
    
    if (!sphere) return;

    // Create skill points on sphere
    this.skills.forEach((skill, index) => {
      const point = document.createElement('div');
      point.className = 'skill-point';
      point.style.setProperty('--index', index.toString());
      point.style.setProperty('--total', this.skills.length.toString());
      point.innerHTML = `<i class="${skill.icon}"></i>`;
      point.title = skill.name;
      
      point.addEventListener('click', () => this.selectSkill(skill));
      point.addEventListener('mouseenter', () => this.highlightSkill(skill));
      point.addEventListener('mouseleave', () => this.unhighlightSkill());
      
      sphere.appendChild(point);
    });

    // Continuous rotation
    gsap.to(sphere, {
      rotationY: 360,
      duration: 20,
      ease: 'none',
      repeat: -1
    });
  }

  private initializeSidebarAnimations() {
    // Sidebar entrance animation
    gsap.fromTo('.floating-tech-sidebar', 
      { 
        x: -100, 
        opacity: 0
      },
      { 
        x: 0, 
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5
      }
    );

    // Tech icons staggered animation
    gsap.fromTo('.tech-icon', 
      { 
        x: -50, 
        opacity: 0,
        rotation: -10
      },
      { 
        x: 0, 
        opacity: 1,
        rotation: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        stagger: 0.1,
        delay: 1
      }
    );

    // Continuous floating animation for categories
    gsap.to('.tech-category', {
      y: -5,
      duration: 3,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.5
    });
  }

  selectSkill(skill: Skill) {
    this.selectedSkill = skill;
    
    // Animate skill selection
    gsap.fromTo('.skill-details', 
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );
  }

  highlightSkill(skill: Skill) {
    gsap.to('.skill-point', { scale: 0.8, duration: 0.3 });
    gsap.to(`.skill-point:nth-child(${this.skills.indexOf(skill) + 1})`, { 
      scale: 1.2, 
      duration: 0.3 
    });
  }

  unhighlightSkill() {
    gsap.to('.skill-point', { scale: 1, duration: 0.3 });
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

  selectTech(tech: Tech) {
    // Find corresponding skill and select it
    const correspondingSkill = this.skills.find(skill => 
      skill.name.toLowerCase().includes(tech.name.toLowerCase()) ||
      tech.name.toLowerCase().includes(skill.name.toLowerCase())
    );
    
    if (correspondingSkill) {
      this.selectSkill(correspondingSkill);
    }
    
    // Filter to show relevant category
    const category = this.techCategories.find(cat => 
      cat.technologies.includes(tech)
    );
    if (category) {
      this.filterSkills(category.name);
    }
  }

  highlightTech(tech: Tech) {
    // Add highlight animation
    gsap.to('.tech-icon', { scale: 0.9, duration: 0.3 });
    const techElement = document.querySelector(`[title="${tech.name}"]`);
    if (techElement) {
      gsap.to(techElement, { 
        scale: 1.2, 
        duration: 0.3,
        boxShadow: `0 0 30px ${tech.color}50`
      });
    }
  }

  unhighlightTech() {
    // Remove highlight animation
    gsap.to('.tech-icon', { 
      scale: 1, 
      duration: 0.3,
      boxShadow: 'none'
    });
  }
}
