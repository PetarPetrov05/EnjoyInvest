package com.example.demo.controller;

import com.example.demo.dto.CreatePosterRequest;
import com.example.demo.dto.PosterDTO;
import com.example.demo.dto.UpdatePosterRequest;
import com.example.demo.service.PosterService;

import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.couchbase.CouchbaseProperties.Io;
import org.springframework.context.annotation.Role;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static com.example.demo.util.LogMessages.*;

@RestController
@RequestMapping("/posters")
public class PosterController {

    private final PosterService posterService;
    private static final Logger logger = LoggerFactory.getLogger(PosterController.class);

    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    public PosterController(PosterService posterService) {
        this.posterService = posterService;
    }

    // GET all posters
    @GetMapping
    public ResponseEntity<List<PosterDTO>> getAllPosters() {
        logger.info(FETCHING_ALL_POSTERS);
        return ResponseEntity.ok(posterService.getAllPosters());
    }

    // GET poster by ID
    @GetMapping("/{id}")
    public ResponseEntity<PosterDTO> getPosterById(@PathVariable Long id) {
        logger.info(FETCHING_POSTER_BY_ID, id);
        PosterDTO poster = posterService.getPosterById(id);

        if (poster == null) {
            logger.warn(POSTER_NOT_FOUND_BY_ID, id);
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(poster);
    }

    // CREATE poster
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @RolesAllowed("Admin")
    public ResponseEntity<PosterDTO> createPoster(@ModelAttribute @Valid CreatePosterRequest request) {
        logger.info(CREATING_POSTER, request.getTitle());

        try {
            // Save main image
            String mainImagePath = saveFile(request.getImage());

            // Save additional images
            List<String> additionalImagePaths = new ArrayList<>();
            if (request.getImages() != null) {
                for (MultipartFile file : request.getImages()) {
                    if (!file.isEmpty()) {
                        additionalImagePaths.add(saveFile(file));
                    }
                }
            }

            // Create PosterDTO
            PosterDTO posterDTO = PosterDTO.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .fullDescription(request.getFullDescription())
                .price(request.getPrice())
                .type(request.getType())
                .category(request.getCategory())
                .location(request.getLocation())
                .phone(request.getPhone())
                .email(request.getEmail())
                .image(mainImagePath)
                .images(additionalImagePaths)
                .build();

            PosterDTO created = posterService.createPoster(posterDTO);

            if (created == null) {
                logger.error(FAILED_TO_CREATE_POSTER, request.getTitle());
                return ResponseEntity.badRequest().build();
            }

            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            logger.error("Failed to save files for poster: {}", request.getTitle(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // UPDATE poster
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PosterDTO> updatePoster(
            @PathVariable Long id,
            @ModelAttribute UpdatePosterRequest request) {

        logger.info(UPDATING_POSTER, id, request.getTitle());

        try {
            // Get existing poster
            PosterDTO existing = posterService.getPosterById(id);
            if (existing == null) {
                return ResponseEntity.notFound().build();
            }

            // Save new images if provided
            String mainImagePath = request.getImage() != null ? saveFile(request.getImage()) : existing.getImage();
            List<String> additionalImagePaths = request.getImages() != null && !request.getImages().isEmpty()
                ? request.getImages().stream()
                    .filter(file -> !file.isEmpty())
                    .map(this::saveFile)
                    .collect(Collectors.toList())
                : existing.getImages();

            // Create updated PosterDTO
            PosterDTO posterDTO = PosterDTO.builder()
                .title(request.getTitle() != null ? request.getTitle() : existing.getTitle())
                .description(request.getDescription() != null ? request.getDescription() : existing.getDescription())
                .fullDescription(request.getFullDescription() != null ? request.getFullDescription() : existing.getFullDescription())
                .price(request.getPrice() != null ? request.getPrice() : existing.getPrice())
                .type(request.getType() != null ? request.getType() : existing.getType())
                .category(request.getCategory() != null ? request.getCategory() : existing.getCategory())
                .location(request.getLocation() != null ? request.getLocation() : existing.getLocation())
                .phone(request.getPhone() != null ? request.getPhone() : existing.getPhone())
                .email(request.getEmail() != null ? request.getEmail() : existing.getEmail())
                .image(mainImagePath)
                .images(additionalImagePaths)
                .build();

            PosterDTO updated = posterService.updatePoster(id, posterDTO);

            if (updated == null) {
                logger.warn(FAILED_TO_UPDATE_POSTER, id);
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            logger.error("Failed to update poster: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // DELETE poster
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePoster(@PathVariable Long id) {
        logger.info(DELETING_POSTER, id);
        boolean deleted = posterService.deletePoster(id);

        if (!deleted) {
            logger.warn(FAILED_TO_DELETE_POSTER, id);
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }

    // TOGGLE like on poster
    @PostMapping("/{id}/like")
    public ResponseEntity<Void> toggleLike(@PathVariable Long id) {
        logger.info("Toggling like for poster {}", id);
        boolean liked = posterService.toggleLike(id);

        if (liked) {
            return ResponseEntity.ok().build(); // liked
        } else {
            return ResponseEntity.noContent().build(); // unliked
        }
    }

    public String saveFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return null;
        }

        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            file.transferTo(filePath.toFile());

            return fileName; // Return relative path
        } catch (IOException e) {
            throw new RuntimeException("Failed to save file", e);
        }
    }
}
