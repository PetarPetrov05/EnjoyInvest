package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "posters")
public class Poster {
    
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title; 

    @Column(nullable = true, length = 1000)
    private String description;

    @Column(name = "image_url", nullable = true)
    private String imageUrl;

    @Column(nullable = true)
    private Double price;

    @Column(nullable = true)
    private String tags; 

    @Column(nullable = true)
    private String location;

    private LocalDateTime createdAt = LocalDateTime.now();

    public Poster() {}

    public Poster(String title, String description, String imageUrl, Double price, String tags, String location) {
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
        this.tags = tags;
        this.location = location;
        this.createdAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getImageUrl() {
        return imageUrl;
    }
    
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}