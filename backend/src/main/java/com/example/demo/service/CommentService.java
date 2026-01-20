package com.example.demo.service;

import com.example.demo.dto.CommentDTO;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.PosterRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.repoModels.RepoComment;
import com.example.demo.repository.repoModels.RepoPoster;
import com.example.demo.repository.repoModels.RepoUser;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PosterRepository posterRepository;
    private final UserRepository userRepository;

    public CommentService(CommentRepository commentRepository,
                          PosterRepository posterRepository,
                          UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.posterRepository = posterRepository;
        this.userRepository = userRepository;
    }

    public CommentDTO addComment(Long posterId, String content) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return null; // Or throw exception
        }

        String email = auth.getPrincipal().toString();
        RepoUser user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        RepoPoster poster = posterRepository.findById(posterId)
                .orElseThrow(() -> new RuntimeException("Poster not found"));

        RepoComment comment = RepoComment.builder()
                .poster(poster)
                .user(user)
                .content(content)
                .build();

        RepoComment saved = commentRepository.save(comment);
        return mapToDTO(saved);
    }

    public List<CommentDTO> getCommentsForPoster(Long posterId) {
        RepoPoster poster = posterRepository.findById(posterId)
                .orElseThrow(() -> new RuntimeException("Poster not found"));

        return commentRepository.findByPosterOrderByCreatedAtAsc(poster)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private CommentDTO mapToDTO(RepoComment comment) {
        return CommentDTO.builder()
                .id(comment.getId())
                .posterId(comment.getPoster().getId())
                .userId(comment.getUser().getId())
                .username(comment.getUser().getUsername())
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
                .build();
    }
}
