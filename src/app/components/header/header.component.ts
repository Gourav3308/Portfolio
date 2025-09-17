import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isMenuOpen = false;
  @Output() menuToggle = new EventEmitter<void>();

  isScrolled = false;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMenu() {
    this.menuToggle.emit();
  }

  scrollToSection(sectionId: string) {
    console.log('Header: Attempting to scroll to section:', sectionId);
    const element = document.getElementById(sectionId);
    console.log('Header: Found element:', element);
    
    if (element) {
      console.log('Header: Element position:', element.offsetTop);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.error('Header: Section not found:', sectionId);
    }
  }
}
