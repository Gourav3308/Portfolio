package com.gouravkumar.portfolio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gouravkumar.portfolio.model.Skill;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
    
    List<Skill> findByCategoryOrderByLevelDesc(String category);
    
    @Query("SELECT DISTINCT s.category FROM Skill s ORDER BY s.category")
    List<String> findDistinctCategories();
    
    List<Skill> findAllByOrderByLevelDesc();
}
