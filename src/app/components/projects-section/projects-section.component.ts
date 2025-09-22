import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  category: string;
  date: string;
}

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.scss']
})
export class ProjectsSectionComponent implements OnInit {

  projects: Project[] = [];
  selectedProject: Project | null = null;
  projectCategories = ['All', 'Full Stack', 'Backend', 'Frontend'];
  activeCategory = 'All';
  isLoading = false; // Set to false initially since we load fallback data immediately

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log('ProjectsSectionComponent ngOnInit called');
    // Load fallback data immediately to ensure projects always show
    this.loadFallbackProjects();
    this.isLoading = false;
    console.log('Fallback projects loaded:', this.projects.length, 'projects');
    
    // Also try to load from API
    this.loadProjects();
  }

  private loadProjects() {
    const apiUrl = `${environment.apiUrl}/projects`;
    
    this.http.get<Project[]>(apiUrl).subscribe({
      next: (data) => {
        // Only update if we got data from API
        if (data && data.length > 0) {
          this.projects = data;
          this.selectedProject = this.projects[0];
          console.log('Projects loaded from API:', this.projects);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading projects from API:', error);
        this.isLoading = false;
        // Keep the fallback data that was already loaded
        console.log('API unavailable, keeping fallback data');
      }
    });
  }

  private loadFallbackProjects() {
    console.log('Loading fallback projects...');
    this.projects = [
      {
        id: 1,
        title: 'SmartBank',
        description: 'A comprehensive full-stack banking application with role-based access control and secure transactions.',
        longDescription: 'Engineered a full-stack banking application using Spring Boot and MySQL, which features a robust, Spring Security-based system for role-based access, enabling core banking operations for users and providing comprehensive management tools for administrators. The application includes features like account management, transaction processing, loan management, and real-time notifications.',
        technologies: ['Java', 'Spring Boot', 'Spring Security', 'MySQL', 'Thymeleaf', 'Bootstrap'],
        image: 'smartbank.jpg',
        githubUrl: 'https://github.com/gouravkumar/smartbank',
        liveUrl: '',
        featured: true,
        category: 'Full Stack',
        date: 'Aug 2024'
      },
      {
        id: 2,
        title: 'Spring Boot Payment Gateway',
        description: 'A multi-faceted payment solution with Razorpay integration and Google OAuth2 authentication.',
        longDescription: 'Architected a multi-faceted payment solution built on Spring Boot and MySQL, which leverages Razorpay for payment processing and Google OAuth2 for streamlined user access, all managed from a centralized admin dashboard. The system supports multiple payment methods, transaction tracking, and comprehensive reporting features.',
        technologies: ['Java', 'Spring Boot', 'Razorpay', 'Google OAuth2', 'MySQL', 'REST APIs'],
        image: 'payment-gateway.jpg',
        githubUrl: 'https://github.com/gouravkumar/payment-gateway',
        liveUrl: '',
        featured: true,
        category: 'Backend',
        date: 'Jan 2025'
      },
      {
        id: 3,
        title: 'HealthBridge',
        description: 'A comprehensive digital healthcare portal connecting patients with top medical professionals.',
        longDescription: 'Developing a comprehensive digital healthcare portal using Spring Boot and React, designed to streamline appointment booking with top medical professionals. Implementing key modules including a doctor listing, appointment scheduling, medicine search, and a repository of verified health articles, with the goal of providing accessible and reliable medical services to all populations.',
        technologies: ['Java', 'Spring Boot', 'React', 'MySQL', 'REST APIs', 'JWT'],
        image: 'healthbridge.jpg',
        githubUrl: 'https://github.com/Gourav3308/Healthbridge',
        liveUrl: 'https://healthbridge-frontend-jj1l.onrender.com/',
        featured: true,
        category: 'Full Stack',
        date: 'Apr 2025'
      }
    ];
    console.log('Fallback projects array created with', this.projects.length, 'projects');
    if (this.projects.length > 0) {
      this.selectedProject = this.projects[0];
      console.log('Selected project set to:', this.selectedProject.title);
    }
    console.log('Final projects array:', this.projects);
  }



  selectProject(project: Project) {
    this.selectedProject = project;
  }

  filterProjects(category: string) {
    this.activeCategory = category;
  }

  getFilteredProjects(): Project[] {
    if (this.activeCategory === 'All') {
      return this.projects;
    }
    return this.projects.filter(project => project.category === this.activeCategory);
  }

  openProject(url: string) {
    window.open(url, '_blank');
  }
}
