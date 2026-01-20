package com.example.demo.repository.repoModels;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "posters")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class RepoPoster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 255, nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    @Column(columnDefinition = "TEXT")
    private String fullDescription;

    @Column(length = 50)
    private String price;

    @Column(length = 50)
    private String type;

    @Column(length = 100)
    private String category;

    @Column(length = 2000)
    private String image;

    @ElementCollection
    @CollectionTable(name = "poster_images", joinColumns = @JoinColumn(name = "poster_id"))
    @Column(name = "image_url", length = 2000)
    private List<String> images;

    private Integer likes;

    private Boolean saved;

    @Column(length = 255)
    private String location;

    @Column(length = 50)
    private String phone;

    @Column(length = 255)
    private String email;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();
}
