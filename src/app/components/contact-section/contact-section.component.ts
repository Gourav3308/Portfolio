import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { environment } from '../../../environments/environment';

gsap.registerPlugin(ScrollTrigger);

interface ContactInfo {
  icon: string;
  title: string;
  value: string;
  link: string;
}

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.scss']
})
export class ContactSectionComponent implements OnInit, AfterViewInit {
  @ViewChild('contactContainer', { static: true }) contactContainer!: ElementRef;

  contactForm: FormGroup;
  isSubmitting = false;

  contactInfo: ContactInfo[] = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      value: 'gouravkrsah78@gmail.com',
      link: 'mailto:gouravkrsah78@gmail.com'
    },
    {
      icon: 'fas fa-phone',
      title: 'Phone',
      value: '(+91) 7903840357',
      link: 'tel:+917903840357'
    },
    {
      icon: 'fab fa-linkedin',
      title: 'LinkedIn',
      value: 'linkedin.com/in/gourav-java-dev',
      link: 'https://www.linkedin.com/in/gourav-java-dev'
    },
    {
      icon: 'fab fa-github',
      title: 'GitHub',
      value: 'github.com/Gourav3308',
      link: 'https://github.com/Gourav3308'
    }
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.initializeAnimations();
  }

  private initializeAnimations() {
    // Contact container animation
    gsap.fromTo('.contact-content', 
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
          trigger: this.contactContainer.nativeElement,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Contact info cards animation
    gsap.fromTo('.contact-info-card', 
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
          trigger: '.contact-info-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Form animation
    gsap.fromTo('.contact-form', 
      { 
        x: 100, 
        opacity: 0
      },
      { 
        x: 0, 
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  onSubmit() {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      const formData = this.contactForm.value;
      
      // Use backend API to save message and send email
      this.sendMessageViaAPI(formData);
      
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  private sendMessageViaAPI(formData: any) {
    // Send message to backend API
    const apiUrl = `${environment.apiUrl}/contact/send`;
    
    this.http.post(apiUrl, formData).subscribe({
      next: (response: any) => {
        console.log('Message sent successfully:', response);
        this.isSubmitting = false;
        this.contactForm.reset();
        
        // Show success message
        alert(`✅ Message sent successfully!\n\nYour message has been saved and I've been notified.\nI'll get back to you as soon as possible!\n\nMessage ID: ${response.id}`);
      },
      error: (error) => {
        console.error('Error sending message:', error);
        this.isSubmitting = false;
        
        // Show error message
        alert(`❌ Failed to send message.\n\nPlease try again or contact me directly at gouravkrsah78@gmail.com\n\nError: ${error.message || 'Unknown error'}`);
      }
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${requiredLength} characters`;
      }
    }
    return '';
  }

  openContact(link: string) {
    window.open(link, '_blank');
  }
}
