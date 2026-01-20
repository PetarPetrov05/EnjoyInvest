package com.example.demo.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdatePosterRequest {

    private String title;
    private String description;
    private String fullDescription;
    private String price;
    private String type;
    private String category;
    private MultipartFile image;
    private List<MultipartFile> images;
    private String location;
    private String phone;
    private String email;
}