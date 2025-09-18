package com.gouravkumar.portfolio.controller;

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
