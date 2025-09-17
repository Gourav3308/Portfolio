-- Insert sample projects
INSERT INTO projects (title, description, long_description, github_url, live_url, featured, category, date, created_at, updated_at) VALUES
('SmartBank', 'A comprehensive full-stack banking application with role-based access control and secure transactions.', 'Engineered a full-stack banking application using Spring Boot and MySQL, which features a robust, Spring Security-based system for role-based access, enabling core banking operations for users and providing comprehensive management tools for administrators. The application includes features like account management, transaction processing, loan management, and real-time notifications.', 'https://github.com/gouravkumar/smartbank', '', true, 'Full Stack', '2024-08-01', '2024-08-01', '2024-08-01'),
('Spring Boot Payment Gateway', 'A multi-faceted payment solution with Razorpay integration and Google OAuth2 authentication.', 'Architected a multi-faceted payment solution built on Spring Boot and MySQL, which leverages Razorpay for payment processing and Google OAuth2 for streamlined user access, all managed from a centralized admin dashboard. The system supports multiple payment methods, transaction tracking, and comprehensive reporting features.', 'https://github.com/gouravkumar/payment-gateway', '', true, 'Backend', '2025-01-01', '2025-01-01', '2025-01-01'),
('HealthBridge', 'A comprehensive digital healthcare portal connecting patients with top medical professionals.', 'Developing a comprehensive digital healthcare portal using Spring Boot and React, designed to streamline appointment booking with top medical professionals. Implementing key modules including a doctor listing, appointment scheduling, medicine search, and a repository of verified health articles, with the goal of providing accessible and reliable medical services to all populations.', 'https://github.com/gouravkumar/healthbridge', '', true, 'Full Stack', '2025-08-01', '2025-08-01', '2025-08-01');

-- Insert project technologies
INSERT INTO project_technologies (project_id, technology) VALUES
(1, 'Java'),
(1, 'Spring Boot'),
(1, 'Spring Security'),
(1, 'MySQL'),
(1, 'Thymeleaf'),
(1, 'Bootstrap'),
(2, 'Java'),
(2, 'Spring Boot'),
(2, 'Razorpay'),
(2, 'Google OAuth2'),
(2, 'MySQL'),
(2, 'REST APIs'),
(3, 'Java'),
(3, 'Spring Boot'),
(3, 'React'),
(3, 'MySQL'),
(3, 'REST APIs'),
(3, 'JWT');

-- Insert sample skills
INSERT INTO skills (name, level, category, icon, color, created_at, updated_at) VALUES
('Java', 90, 'Languages', 'fab fa-java', '#f89820', '2024-01-01', '2024-01-01'),
('Spring Boot', 85, 'Frameworks', 'fas fa-leaf', '#6db33f', '2024-01-01', '2024-01-01'),
('React', 80, 'Frontend', 'fab fa-react', '#61dafb', '2024-01-01', '2024-01-01'),
('JavaScript', 85, 'Languages', 'fab fa-js-square', '#f7df1e', '2024-01-01', '2024-01-01'),
('MySQL', 80, 'Database', 'fas fa-database', '#4479a1', '2024-01-01', '2024-01-01'),
('HTML/CSS', 90, 'Frontend', 'fab fa-html5', '#e34f26', '2024-01-01', '2024-01-01'),
('Git', 75, 'Tools', 'fab fa-git-alt', '#f05032', '2024-01-01', '2024-01-01'),
('REST APIs', 85, 'Backend', 'fas fa-code', '#8b5cf6', '2024-01-01', '2024-01-01');
