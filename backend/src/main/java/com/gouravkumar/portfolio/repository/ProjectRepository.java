package com.gouravkumar.portfolio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gouravkumar.portfolio.model.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    
    List<Project> findByFeaturedTrueOrderByDateDesc();
    
    List<Project> findByCategoryOrderByDateDesc(String category);
    
    @Query("SELECT DISTINCT p.category FROM Project p ORDER BY p.category")
    List<String> findDistinctCategories();
    
    List<Project> findAllByOrderByDateDesc();
}
