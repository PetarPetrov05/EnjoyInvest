package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Poster {
    private Long id;
    private String title;
    private String description;
    private String fullDescription;
    private String price;
    private String type;
    private String category;
    private String image;
    private List<String> images;
    private Integer likes;
    private Boolean saved;
    private String location;
    private String phone;
    private String email;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}