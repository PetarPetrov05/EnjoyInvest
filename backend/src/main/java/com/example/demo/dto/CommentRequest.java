// backend: CommentRequest.java
package com.example.demo.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CommentRequest {
    @NotNull(message = "User id is required")
    private String content;
}
