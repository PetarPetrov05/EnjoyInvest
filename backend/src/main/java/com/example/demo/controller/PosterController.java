package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.service.PosterService;
import com.example.demo.dto.PosterDTO;

import java.util.List;

@RestController
@RequestMapping("/posters")
@CrossOrigin(origins = "*")
public class PosterController {

    private final PosterService posterService;

    public PosterController(PosterService posterService) {
        this.posterService = posterService;
    }

    @GetMapping
    public ResponseEntity<List<PosterDTO>> getAllPosters() {
        List<PosterDTO> posters = posterService.getAllPosters();
        if (posters.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content if list is empty
        }
        return ResponseEntity.ok(posters); // 200 OK
    }

    @GetMapping("/{id}")
    public ResponseEntity<PosterDTO> getPosterById(@PathVariable Long id) {
        PosterDTO poster = posterService.getPosterById(id);
        if (poster == null) {
            return ResponseEntity.notFound().build(); // 404 Not Found if poster doesn't exist
        }
        return ResponseEntity.ok(poster); // 200 OK
    }

    @PostMapping
    public ResponseEntity<PosterDTO> createPoster(@RequestBody PosterDTO posterDTO) {
        PosterDTO createdPoster = posterService.createPoster(posterDTO);
        if (createdPoster == null) {
            return ResponseEntity.badRequest().build(); // 400 Bad Request if creation fails
        }
        return ResponseEntity.status(201).body(createdPoster); // 201 Created
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePoster(@PathVariable Long id) {
    boolean deleted = posterService.deletePoster(id);

    if (!deleted) {
        return ResponseEntity.notFound().build(); // 404 Not Found if poster doesn't exist
    }

    return ResponseEntity.noContent().build(); // 204 No Content if deleted successfully
    }
}
