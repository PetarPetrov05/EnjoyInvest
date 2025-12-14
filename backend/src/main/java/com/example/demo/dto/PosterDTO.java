package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PosterDTO {

    private Long id;

    @NotBlank(message = "Title is required")
    @Size(min = 4, max = 255, message = "Title must be at least 4 characters")
    private String title;

    @NotBlank(message = "Description is required")
    @Size(min = 10, max = 1000, message = "Description must be at least 10 characters")
    private String description;

    @NotBlank(message = "Full description is required")
    @Size(min = 20, max = 3000, message = "Full description must be at least 20 characters")
    private String fullDescription;

    @NotBlank(message = "Price is required")
    private String price;

    @NotBlank(message = "Type is required")
    private String type;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Main image is required")
    private String image;

    @Size(max = 10, message = "You can upload up to 10 images")
    private List<@NotBlank String> images;

    @Min(value = 0, message = "Likes cannot be negative")
    private Integer likes;

    private Boolean saved;

    private Boolean isLiked;

    @NotBlank(message = "Location is required")
    private String location;

    @NotBlank(message = "Phone is required")
    private String phone;

    @Email(message = "Email must be valid")
    @NotBlank(message = "Email is required")
    private String email;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updatedAt;
    private List<CommentDTO> comments;
}
