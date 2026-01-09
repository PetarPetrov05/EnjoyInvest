// backend: CommentRequest.java
package com.example.demo.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor  // Required for JSON deserialization
@AllArgsConstructor
public class CommentRequest {
    @NotNull(message = "User id is required")
    private String content;
}
