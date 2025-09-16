# Gourav Kumar - Portfolio Website

A unique and professional portfolio website featuring advanced 3D animations, modern UI design, and a full-stack architecture built with Angular, Spring Boot, and MySQL.

## 🌟 Features

### Frontend (Angular)
- **Unique 3D Animations**: Custom 3D effects using CSS transforms and GSAP
- **Interactive Skill Spheres**: 3D rotating skill visualization
- **Particle Background**: Dynamic particle system with mouse interaction
- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox
- **Smooth Animations**: GSAP-powered scroll animations and transitions
- **Modern UI**: Glassmorphism effects and gradient designs

### Backend (Spring Boot)
- **RESTful APIs**: Complete CRUD operations for projects, skills, and contact messages
- **MySQL Database**: Structured data storage with JPA/Hibernate
- **CORS Support**: Cross-origin resource sharing for frontend integration
- **Security**: Basic authentication for admin endpoints
- **Data Validation**: Comprehensive input validation and error handling

## 🚀 Technology Stack

### Frontend
- **Angular 17**: Modern web framework
- **TypeScript**: Type-safe JavaScript
- **SCSS**: Advanced CSS with variables and mixins
- **GSAP**: Professional animation library
- **Three.js**: 3D graphics (ready for implementation)
- **Font Awesome**: Icon library

### Backend
- **Spring Boot 3.2**: Java enterprise framework
- **Spring Data JPA**: Database abstraction layer
- **Spring Security**: Authentication and authorization
- **MySQL 8.0**: Relational database
- **Maven**: Dependency management

## 📁 Project Structure

```
gourav-portfolio/
├── src/                          # Angular frontend
│   ├── app/
│   │   ├── components/           # Reusable components
│   │   │   ├── header/
│   │   │   ├── hero-section/
│   │   │   ├── about-section/
│   │   │   ├── skills-section/
│   │   │   ├── projects-section/
│   │   │   ├── education-section/
│   │   │   ├── contact-section/
│   │   │   └── footer/
│   │   ├── app.module.ts
│   │   └── app.component.*
│   └── styles.scss
├── backend/                      # Spring Boot backend
│   ├── src/main/java/
│   │   └── com/gouravkumar/portfolio/
│   │       ├── controller/       # REST controllers
│   │       ├── model/           # JPA entities
│   │       ├── repository/      # Data repositories
│   │       └── config/          # Configuration classes
│   └── src/main/resources/
│       ├── application.yml
│       └── data.sql
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Java 17+
- MySQL 8.0+
- Maven 3.6+

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create MySQL database
mysql -u root -p
CREATE DATABASE portfolio_db;

# Run Spring Boot application
mvn spring-boot:run
```

### Database Configuration
Update `backend/src/main/resources/application.yml` with your MySQL credentials:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/portfolio_db
    username: your_username
    password: your_password
```

## 🎨 Unique Design Features

### 3D Animations
- **Floating Elements**: Dynamic particle system with physics simulation
- **Skill Spheres**: Interactive 3D skill visualization with hover effects
- **Project Cards**: 3D card animations with depth and perspective
- **Profile Visualization**: 3D rotating profile elements

### Modern UI Elements
- **Glassmorphism**: Frosted glass effects with backdrop blur
- **Gradient Overlays**: Dynamic color gradients and lighting effects
- **Smooth Transitions**: GSAP-powered animations with easing functions
- **Responsive Grid**: CSS Grid layouts that adapt to all screen sizes

### Interactive Features
- **Mouse Tracking**: Particles follow cursor movement
- **Scroll Animations**: Elements animate as they enter viewport
- **Hover Effects**: 3D transforms and glow effects on interaction
- **Form Validation**: Real-time validation with smooth error animations

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop**: 1920px and above
- **Laptop**: 1024px - 1919px
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

## 🔧 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/category/{category}` - Get projects by category
- `POST /api/projects` - Create new project
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/category/{category}` - Get skills by category
- `POST /api/skills` - Create new skill
- `PUT /api/skills/{id}` - Update skill
- `DELETE /api/skills/{id}` - Delete skill

### Contact
- `POST /api/contact/send` - Send contact message
- `GET /api/contact` - Get all messages (admin)
- `GET /api/contact/unread` - Get unread messages (admin)

## 🚀 Deployment

### Frontend (Angular)
```bash
# Build for production
ng build --prod

# Deploy to your hosting service
# Files will be in dist/gourav-portfolio/
```

### Backend (Spring Boot)
```bash
# Build JAR file
mvn clean package

# Run JAR file
java -jar target/portfolio-backend-1.0.0.jar
```

## 🎯 Future Enhancements

- [ ] Three.js integration for advanced 3D scenes
- [ ] Real-time chat functionality
- [ ] Blog section with CMS
- [ ] Dark/Light theme toggle
- [ ] PWA capabilities
- [ ] Advanced analytics dashboard
- [ ] Multi-language support

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Gourav Kumar**
- Java Full Stack Developer
- Centurion University of Technology and Management
- Email: gouravkumar@example.com
- LinkedIn: [linkedin.com/in/gouravkumar](https://linkedin.com/in/gouravkumar)
- GitHub: [github.com/gouravkumar](https://github.com/gouravkumar)

---

*Built with ❤️ using Angular, Spring Boot, and MySQL*
