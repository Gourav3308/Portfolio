package com.gouravkumar.portfolio.config;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.gouravkumar.portfolio.model.Project;
import com.gouravkumar.portfolio.model.Skill;
import com.gouravkumar.portfolio.repository.ProjectRepository;
import com.gouravkumar.portfolio.repository.SkillRepository;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Override
    public void run(String... args) throws Exception {
        seedProjects();
        seedSkills();
    }

    private void seedProjects() {
        // Only seed if no projects exist
        if (projectRepository.count() == 0) {
            System.out.println("Seeding projects...");
            
            Project smartBank = new Project();
            smartBank.setTitle("SmartBank");
            smartBank.setDescription("A comprehensive full-stack banking application with role-based access control and secure transactions.");
            smartBank.setLongDescription("Engineered a full-stack banking application using Spring Boot and MySQL, which features a robust, Spring Security-based system for role-based access, enabling core banking operations for users and providing comprehensive management tools for administrators. The application includes features like account management, transaction processing, loan management, and real-time notifications.");
            smartBank.setTechnologies(Arrays.asList("Java", "Spring Boot", "Spring Security", "MySQL", "Thymeleaf", "Bootstrap"));
            smartBank.setGithubUrl("https://github.com/gouravkumar/smartbank");
            smartBank.setLiveUrl("");
            smartBank.setFeatured(true);
            smartBank.setCategory("Full Stack");
            smartBank.setDate(LocalDate.of(2024, 8, 1));
            
            Project paymentGateway = new Project();
            paymentGateway.setTitle("Spring Boot Payment Gateway");
            paymentGateway.setDescription("A multi-faceted payment solution with Razorpay integration and Google OAuth2 authentication.");
            paymentGateway.setLongDescription("Architected a multi-faceted payment solution built on Spring Boot and MySQL, which leverages Razorpay for payment processing and Google OAuth2 for streamlined user access, all managed from a centralized admin dashboard. The system supports multiple payment methods, transaction tracking, and comprehensive reporting features.");
            paymentGateway.setTechnologies(Arrays.asList("Java", "Spring Boot", "Razorpay", "Google OAuth2", "MySQL", "REST APIs"));
            paymentGateway.setGithubUrl("https://github.com/gouravkumar/payment-gateway");
            paymentGateway.setLiveUrl("");
            paymentGateway.setFeatured(true);
            paymentGateway.setCategory("Backend");
            paymentGateway.setDate(LocalDate.of(2025, 1, 1));
            
            Project healthBridge = new Project();
            healthBridge.setTitle("HealthBridge");
            healthBridge.setDescription("A comprehensive digital healthcare portal connecting patients with top medical professionals.");
            healthBridge.setLongDescription("Developing a comprehensive digital healthcare portal using Spring Boot and React, designed to streamline appointment booking with top medical professionals. Implementing key modules including a doctor listing, appointment scheduling, medicine search, and a repository of verified health articles, with the goal of providing accessible and reliable medical services to all populations.");
            healthBridge.setTechnologies(Arrays.asList("Java", "Spring Boot", "React", "MySQL", "REST APIs", "JWT"));
            healthBridge.setGithubUrl("https://github.com/Gourav3308/Healthbridge");
            healthBridge.setLiveUrl("https://healthbridge-frontend-jj1l.onrender.com/");
            healthBridge.setFeatured(true);
            healthBridge.setCategory("Full Stack");
            healthBridge.setDate(LocalDate.of(2025, 4, 1));
            
            projectRepository.saveAll(Arrays.asList(smartBank, paymentGateway, healthBridge));
            System.out.println("Projects seeded successfully!");
        } else {
            System.out.println("Projects already exist, skipping seeding.");
        }
    }

    private void seedSkills() {
        // Only seed if no skills exist
        if (skillRepository.count() == 0) {
            System.out.println("Seeding skills...");
            
            List<Skill> skills = Arrays.asList(
                new Skill("Java", 90, "Languages", "fab fa-java", "#f89820"),
                new Skill("Spring Boot", 85, "Frameworks", "fas fa-leaf", "#6db33f"),
                new Skill("React", 80, "Frontend", "fab fa-react", "#61dafb"),
                new Skill("JavaScript", 85, "Languages", "fab fa-js-square", "#f7df1e"),
                new Skill("MySQL", 80, "Database", "fas fa-database", "#4479a1"),
                new Skill("HTML/CSS", 90, "Frontend", "fab fa-html5", "#e34f26"),
                new Skill("Git", 75, "Tools", "fab fa-git-alt", "#f05032"),
                new Skill("REST APIs", 85, "Backend", "fas fa-code", "#8b5cf6")
            );
            
            skillRepository.saveAll(skills);
            System.out.println("Skills seeded successfully!");
        } else {
            System.out.println("Skills already exist, skipping seeding.");
        }
    }
}
