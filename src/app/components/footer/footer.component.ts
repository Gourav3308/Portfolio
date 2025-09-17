import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentYear = new Date().getFullYear();

  socialLinks = [
    { icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/gourav-java-dev', label: 'LinkedIn' },
    { icon: 'fab fa-github', url: 'https://github.com/Gourav3308', label: 'GitHub' },
    { icon: 'fas fa-envelope', url: 'mailto:gouravkrsah78@gmail.com', label: 'Email' },
    { icon: 'fas fa-phone', url: 'tel:+917903840357', label: 'Phone' }
  ];

  quickLinks = [
    { name: 'Home', section: 'home' },
    { name: 'About', section: 'about' },
    { name: 'Skills', section: 'skills' },
    { name: 'Projects', section: 'projects' },
    { name: 'Education', section: 'education' },
    { name: 'Contact', section: 'contact' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openSocialLink(url: string) {
    window.open(url, '_blank');
  }
}
