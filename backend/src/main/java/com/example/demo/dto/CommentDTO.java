package com.example.demo.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentDTO {
    private Long id;
    private Long posterId;
    private Long userId;
    private String username;
    private String content;
    private LocalDateTime createdAt;
}
