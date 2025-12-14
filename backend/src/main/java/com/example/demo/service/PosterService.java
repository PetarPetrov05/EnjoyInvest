package com.example.demo.service;

import com.example.demo.dto.CommentDTO;
import com.example.demo.dto.PosterDTO;
import com.example.demo.repository.PosterRepository;
import com.example.demo.repository.LikeRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.repoModels.RepoPoster;
import com.example.demo.repository.repoModels.RepoLike;
import com.example.demo.repository.repoModels.RepoUser;
import com.example.demo.util.LogMessages;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PosterService {

    private static final Logger logger = LoggerFactory.getLogger(PosterService.class);

    private final PosterRepository posterRepository;
    private final LikeRepository likeRepository;
    private final UserRepository userRepository;
    private final CommentService commentService;

    public PosterService(PosterRepository posterRepository,
                     LikeRepository likeRepository,
                     UserRepository userRepository,
                     CommentService commentService) {
    this.posterRepository = posterRepository;
    this.likeRepository = likeRepository;
    this.userRepository = userRepository;
    this.commentService = commentService;
}

    public List<PosterDTO> getAllPosters() {
        return posterRepository.findAll().stream()
                .map(repo -> {
                    PosterDTO dto = mapRepoToDTO(repo);
                    dto.setLikes((int) likeRepository.countByPoster(repo));
                    setIsLikedForCurrentUser(dto, repo);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public PosterDTO getPosterById(Long id) {
        return posterRepository.findById(id)
                .map(repo -> {
                    PosterDTO dto = mapRepoToDTO(repo);
                    dto.setLikes((int) likeRepository.countByPoster(repo));
                    setIsLikedForCurrentUser(dto, repo);
                    return dto;
                })
                .orElseGet(() -> {
                    logger.warn(LogMessages.POSTER_NOT_FOUND, id);
                    return null;
                });
    }

    public PosterDTO createPoster(PosterDTO posterDTO) {
        if (posterDTO == null || posterDTO.getTitle() == null) return null;

        if (posterDTO.getLikes() == null) posterDTO.setLikes(0);
        if (posterDTO.getSaved() == null) posterDTO.setSaved(false);
        if (posterDTO.getCreatedAt() == null) posterDTO.setCreatedAt(LocalDateTime.now());
        if (posterDTO.getUpdatedAt() == null) posterDTO.setUpdatedAt(LocalDateTime.now());
        if (posterDTO.getImages() == null) posterDTO.setImages(Collections.emptyList());

        RepoPoster saved = posterRepository.save(mapDTOToRepoPoster(posterDTO));

        logger.info(LogMessages.POSTER_CREATED, saved.getId());
        return mapRepoToDTO(saved);
    }

    public PosterDTO updatePoster(Long id, PosterDTO posterDTO) {
        return posterRepository.findById(id)
                .map(existing -> {
                    RepoPoster updated = mapDTOToRepoPoster(posterDTO)
                            .toBuilder()
                            .id(existing.getId())
                            .createdAt(existing.getCreatedAt())
                            .updatedAt(LocalDateTime.now())
                            .build();

                    RepoPoster saved = posterRepository.save(updated);
                    logger.info(LogMessages.POSTER_UPDATED, saved.getId());
                    return mapRepoToDTO(saved);
                })
                .orElseGet(() -> {
                    logger.warn(LogMessages.POSTER_NOT_FOUND, id);
                    return null;
                });
    }

    public boolean deletePoster(Long id) {
        if (!posterRepository.existsById(id)) {
            logger.warn(LogMessages.POSTER_NOT_FOUND, id);
            return false;
        }

        posterRepository.deleteById(id);
        logger.info(LogMessages.POSTER_DELETED, id);
        return true;
    }

    public boolean toggleLike(Long posterId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return false;
        }

        String email = auth.getPrincipal().toString();
        RepoUser user = userRepository.findByEmail(email).orElse(null);
        if (user == null) return false;

        RepoPoster poster = posterRepository.findById(posterId).orElse(null);
        if (poster == null) return false;

        Optional<RepoLike> existingLike = likeRepository.findByUserAndPoster(user, poster);
        if (existingLike.isPresent()) {
            likeRepository.delete(existingLike.get());
            poster.setLikes(Math.max(0, poster.getLikes() - 1));
            posterRepository.save(poster);
            return false; // unliked
        } else {
            RepoLike like = RepoLike.builder()
                    .user(user)
                    .poster(poster)
                    .build();
            likeRepository.save(like);
            poster.setLikes(poster.getLikes() + 1);
            posterRepository.save(poster);
            return true; // liked
        }
    }

    private void setIsLikedForCurrentUser(PosterDTO dto, RepoPoster repo) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            String email = auth.getPrincipal().toString();
            RepoUser user = userRepository.findByEmail(email).orElse(null);
            if (user != null) {
                dto.setIsLiked(likeRepository.existsByUserAndPoster(user, repo));
            }
        }
    }

    // ---------- Mapping Methods ----------

    private PosterDTO mapRepoToDTO(RepoPoster repo) {
    List<CommentDTO> comments = commentService.getCommentsForPoster(repo.getId());

    return PosterDTO.builder()
            .id(repo.getId())
            .title(repo.getTitle())
            .description(repo.getDescription())
            .fullDescription(repo.getFullDescription())
            .price(repo.getPrice())
            .type(repo.getType())
            .category(repo.getCategory())
            .image(repo.getImage())
            .images(repo.getImages())
            .likes(repo.getLikes())
            .saved(repo.getSaved())
            .location(repo.getLocation())
            .phone(repo.getPhone())
            .email(repo.getEmail())
            .createdAt(repo.getCreatedAt())
            .updatedAt(repo.getUpdatedAt())
            .comments(comments)
            .build();
}

    private RepoPoster mapDTOToRepoPoster(PosterDTO dto) {
        return RepoPoster.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .fullDescription(dto.getFullDescription())
                .price(dto.getPrice())
                .type(dto.getType())
                .category(dto.getCategory())
                .image(dto.getImage())
                .images(dto.getImages() != null ? dto.getImages() : Collections.emptyList())
                .likes(dto.getLikes() != null ? dto.getLikes() : 0)
                .saved(dto.getSaved() != null ? dto.getSaved() : false)
                .location(dto.getLocation())
                .phone(dto.getPhone())
                .email(dto.getEmail())
                .createdAt(dto.getCreatedAt())
                .updatedAt(dto.getUpdatedAt())
                .build();
    }
}
