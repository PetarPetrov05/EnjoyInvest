package com.example.demo.dto;

public class PosterDTO {
    private Long posterId;
    private String title;
    private String description;
    private String imageUrl;
    private String createdAt;

    // Default constructor
    public PosterDTO() {}

    // Constructor with parameters
    public PosterDTO(Long posterId, String title, String description, String imageUrl, String createdAt) {
        this.posterId = posterId;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Long getPosterId() {
        return posterId;
    }

    public void setPosterId(Long posterId) {
        this.posterId = posterId;
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

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}