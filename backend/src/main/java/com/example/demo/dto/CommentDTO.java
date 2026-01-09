package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentDTO {

    private Long id;

    @NotNull(message = "Poster id is required")
    private Long posterId;

    @NotNull(message = "User id is required")
    private Long userId;

    @NotBlank(message = "Username is required")
    @Size(min = 2, max = 50, message = "Username must be between 2 and 50 characters")
    private String username;

    @NotBlank(message = "Comment content cannot be empty")
    @Size(min = 1, max = 500, message = "Comment must be between 1 and 500 characters")
    private String content;

    @NotNull(message = "Creation time is required")
    private LocalDateTime createdAt;
}