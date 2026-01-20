package com.example.demo.controller;

import com.example.demo.dto.CommentDTO;
import com.example.demo.dto.CommentRequest;
import com.example.demo.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/{posterId}")
public ResponseEntity<CommentDTO> addComment(@PathVariable Long posterId,
                                             @RequestBody CommentRequest request) {
    CommentDTO comment = commentService.addComment(posterId, request.getContent());
    if (comment == null) return ResponseEntity.status(401).build();
    return ResponseEntity.ok(comment);
}

    @GetMapping("/{posterId}")
    public ResponseEntity<List<CommentDTO>> getComments(@PathVariable Long posterId) {
        List<CommentDTO> comments = commentService.getCommentsForPoster(posterId);
        return ResponseEntity.ok(comments);
    }
}
