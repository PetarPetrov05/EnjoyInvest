package com.example.demo.dto;

public class PosterDTO {
    private Long posterId;
    private String title;
    private String description;
    private String imageUrl;
    private Double price;
    private String tags;
    private String location;
    private String createdAt; // You can keep it as String for JSON formatting

    // Default constructor
    public PosterDTO() {}

    // Constructor with all fields
    public PosterDTO(Long posterId, String title, String description, String imageUrl,
                     Double price, String tags, String location, String createdAt) {
        this.posterId = posterId;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
        this.tags = tags;
        this.location = location;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Long getId() {
        return posterId;
    }

    public void setId(Long posterId) {
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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}
