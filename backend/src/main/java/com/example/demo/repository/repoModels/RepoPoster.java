package com.example.demo.repository.repoModels;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "posters")
public class RepoPoster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    @Column(length = 1000)
    private String description;
    @Column(length = 3000)
    private String fullDescription;
    private String price;
    private String type;
    private String category;
    private String image;

    @ElementCollection
    @CollectionTable(name = "poster_images", joinColumns = @JoinColumn(name = "poster_id"))
    @Column(name = "image_url")
    private List<String> images;

    private Integer likes;
    private Boolean saved;
    private String location;
    private String phone;
    private String email;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();

    public RepoPoster() {}

    public RepoPoster(String title, String description, String fullDescription, String price, String type,
                      String category, String image, List<String> images, Integer likes, Boolean saved,
                      String location, String phone, String email) {
        this.title = title;
        this.description = description;
        this.fullDescription = fullDescription;
        this.price = price;
        this.type = type;
        this.category = category;
        this.image = image;
        this.images = images;
        this.likes = likes;
        this.saved = saved;
        this.location = location;
        this.phone = phone;
        this.email = email;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // --- Getters and Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getFullDescription() { return fullDescription; }
    public void setFullDescription(String fullDescription) { this.fullDescription = fullDescription; }

    public String getPrice() { return price; }
    public void setPrice(String price) { this.price = price; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public List<String> getImages() { return images; }
    public void setImages(List<String> images) { this.images = images; }

    public Integer getLikes() { return likes; }
    public void setLikes(Integer likes) { this.likes = likes; }

    public Boolean getSaved() { return saved; }
    public void setSaved(Boolean saved) { this.saved = saved; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
