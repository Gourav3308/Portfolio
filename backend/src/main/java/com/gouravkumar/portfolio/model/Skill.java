package com.gouravkumar.portfolio.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "skills")
public class Skill {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Name is required")
    @Column(nullable = false, unique = true)
    private String name;
    
    @NotNull(message = "Level is required")
    @Min(value = 0, message = "Level must be at least 0")
    @Max(value = 100, message = "Level must be at most 100")
    private Integer level;
    
    @NotBlank(message = "Category is required")
    private String category;
    
    @NotBlank(message = "Icon is required")
    private String icon;
    
    @NotBlank(message = "Color is required")
    private String color;
    
    @Column(name = "created_at")
    private java.time.LocalDate createdAt;
    
    @Column(name = "updated_at")
    private java.time.LocalDate updatedAt;
    
    // Constructors
    public Skill() {
        this.createdAt = java.time.LocalDate.now();
        this.updatedAt = java.time.LocalDate.now();
    }
    
    public Skill(String name, Integer level, String category, String icon, String color) {
        this();
        this.name = name;
        this.level = level;
        this.category = category;
        this.icon = icon;
        this.color = color;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public Integer getLevel() {
        return level;
    }
    
    public void setLevel(Integer level) {
        this.level = level;
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public String getIcon() {
        return icon;
    }
    
    public void setIcon(String icon) {
        this.icon = icon;
    }
    
    public String getColor() {
        return color;
    }
    
    public void setColor(String color) {
        this.color = color;
    }
    
    public java.time.LocalDate getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(java.time.LocalDate createdAt) {
        this.createdAt = createdAt;
    }
    
    public java.time.LocalDate getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(java.time.LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = java.time.LocalDate.now();
    }
}
