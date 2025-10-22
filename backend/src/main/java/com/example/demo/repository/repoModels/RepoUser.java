package com.example.demo.repository.repoModels;

import jakarta.persistence.*; // use jakarta.persistence for Spring Boot 3+

@Entity
@Table(name = "users") // optional
public class RepoUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;

    // Default constructor
    public RepoUser() {}

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
