package com.example.demo.controller;

import com.example.demo.dto.PosterDTO;
import com.example.demo.service.PosterService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static com.example.demo.util.LogMessages.*;

@RestController
@RequestMapping("/posters")
public class PosterController {

    private final PosterService posterService;
    private static final Logger logger = LoggerFactory.getLogger(PosterController.class);

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
    @PostMapping
    public ResponseEntity<PosterDTO> createPoster(@Valid @RequestBody PosterDTO posterDTO) {
        logger.info(CREATING_POSTER, posterDTO.getTitle());
        PosterDTO created = posterService.createPoster(posterDTO);

        if (created == null) {
            logger.error(FAILED_TO_CREATE_POSTER, posterDTO.getTitle());
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // UPDATE poster
    @PutMapping("/{id}")
    public ResponseEntity<PosterDTO> updatePoster(
            @PathVariable Long id,
            @Valid @RequestBody PosterDTO posterDTO) {

        logger.info(UPDATING_POSTER, id, posterDTO.getTitle());
        PosterDTO updated = posterService.updatePoster(id, posterDTO);

        if (updated == null) {
            logger.warn(FAILED_TO_UPDATE_POSTER, id);
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updated);
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
}
