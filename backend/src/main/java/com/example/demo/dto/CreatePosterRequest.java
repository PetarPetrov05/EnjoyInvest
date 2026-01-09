package com.example.demo.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreatePosterRequest {

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

    @NotNull(message = "Main image is required")
    private MultipartFile image;

    private List<MultipartFile> images;

    @NotBlank(message = "Location is required")
    private String location;

    @NotBlank(message = "Phone is required")
    private String phone;

    @Email(message = "Email must be valid")
    @NotBlank(message = "Email is required")
    private String email;
}