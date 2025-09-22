package com.gouravkumar.portfolio.controller;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gouravkumar.portfolio.model.Project;
import com.gouravkumar.portfolio.repository.ProjectRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;

@RestController
@RequestMapping("/projects")
@CrossOrigin(origins = {"http://localhost:4200", "https://portfolio-juhw.onrender.com"})
public class ProjectController {
    
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Projects service is running");
    }
    
    @Autowired
    private EntityManager entityManager;
    
    @GetMapping("/cleanup")
    @Transactional
    public ResponseEntity<String> cleanupDuplicates() {
        try {
            // Get count before cleanup
            int originalCount = projectRepository.findAll().size();
            
            // Use native SQL to delete duplicates, keeping only the one with the lowest ID
            String sql = "DELETE p1 FROM projects p1 " +
                        "INNER JOIN projects p2 " +
                        "WHERE p1.id > p2.id " +
                        "AND p1.title = p2.title";
            
            Query query = entityManager.createNativeQuery(sql);
            int deletedCount = query.executeUpdate();
            
            // Get count after cleanup
            int finalCount = projectRepository.findAll().size();
            
            String result = "Cleanup completed! Removed " + deletedCount + " duplicates. " + 
                           "Projects: " + originalCount + " -> " + finalCount;
            System.out.println(result);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            String error = "Error: " + e.getMessage();
            System.err.println(error);
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(error);
        }
    }
    
    @GetMapping("/reset")
    @Transactional
    public ResponseEntity<String> resetData() {
        try {
            // Delete all projects
            projectRepository.deleteAll();
            
            // Force the DataSeeder to run again by calling it manually
            // This will only add data if count is 0 (which it will be after deleteAll)
            return ResponseEntity.ok("All projects deleted. DataSeeder will recreate them on next startup.");
        } catch (Exception e) {
            String error = "Error: " + e.getMessage();
            System.err.println(error);
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(error);
        }
    }
    
    @PostMapping("/seed")
    @Transactional
    public ResponseEntity<String> seedData() {
        try {
            // Check if projects already exist
            if (projectRepository.count() > 0) {
                return ResponseEntity.ok("Projects already exist. Count: " + projectRepository.count());
            }
            
            // Create projects manually
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
            
            return ResponseEntity.ok("Projects seeded successfully! Count: " + projectRepository.count());
        } catch (Exception e) {
            String error = "Error: " + e.getMessage();
            System.err.println(error);
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(error);
        }
    }
    
    @Autowired
    private ProjectRepository projectRepository;
    
    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectRepository.findAllByOrderByDateDesc();
        return ResponseEntity.ok(projects);
    }
    
    @GetMapping("/featured")
    public ResponseEntity<List<Project>> getFeaturedProjects() {
        List<Project> projects = projectRepository.findByFeaturedTrueOrderByDateDesc();
        return ResponseEntity.ok(projects);
    }
    
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Project>> getProjectsByCategory(@PathVariable String category) {
        List<Project> projects = projectRepository.findByCategoryOrderByDateDesc(category);
        return ResponseEntity.ok(projects);
    }
    
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {
        List<String> categories = projectRepository.findDistinctCategories();
        return ResponseEntity.ok(categories);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        Optional<Project> project = projectRepository.findById(id);
        return project.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    @Transactional
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        Project savedProject = projectRepository.save(project);
        return ResponseEntity.ok(savedProject);
    }
    
    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project projectDetails) {
        Optional<Project> optionalProject = projectRepository.findById(id);
        if (optionalProject.isPresent()) {
            Project project = optionalProject.get();
            project.setTitle(projectDetails.getTitle());
            project.setDescription(projectDetails.getDescription());
            project.setLongDescription(projectDetails.getLongDescription());
            project.setTechnologies(projectDetails.getTechnologies());
            project.setImageUrl(projectDetails.getImageUrl());
            project.setGithubUrl(projectDetails.getGithubUrl());
            project.setLiveUrl(projectDetails.getLiveUrl());
            project.setFeatured(projectDetails.getFeatured());
            project.setCategory(projectDetails.getCategory());
            project.setDate(projectDetails.getDate());
            
            Project updatedProject = projectRepository.save(project);
            return ResponseEntity.ok(updatedProject);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        if (projectRepository.existsById(id)) {
            projectRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
