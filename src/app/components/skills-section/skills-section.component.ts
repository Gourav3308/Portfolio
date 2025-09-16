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
  @ViewChild('skillSphere', { static: true }) skillSphere!: ElementRef;

  skills: Skill[] = [
    { name: 'Java', level: 90, category: 'Languages', icon: 'fab fa-java', color: '#f89820' },
    { name: 'Spring Boot', level: 85, category: 'Frameworks', icon: 'fas fa-leaf', color: '#6db33f' },
    { name: 'React', level: 80, category: 'Frontend', icon: 'fab fa-react', color: '#61dafb' },
    { name: 'JavaScript', level: 85, category: 'Languages', icon: 'fab fa-js-square', color: '#f7df1e' },
    { name: 'MySQL', level: 80, category: 'Database', icon: 'fas fa-database', color: '#4479a1' },
    { name: 'HTML/CSS', level: 90, category: 'Frontend', icon: 'fab fa-html5', color: '#e34f26' },
    { name: 'Git', level: 75, category: 'Tools', icon: 'fab fa-git-alt', color: '#f05032' },
    { name: 'REST APIs', level: 85, category: 'Backend', icon: 'fas fa-code', color: '#8b5cf6' }
  ];

  selectedSkill: Skill | null = null;
  skillCategories = ['All', 'Languages', 'Frameworks', 'Frontend', 'Database', 'Tools', 'Backend'];
  activeCategory = 'All';

  ngOnInit() {
    this.selectedSkill = this.skills[0];
  }

  ngAfterViewInit() {
    this.initializeAnimations();
    this.createSkillSphere();
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
}
