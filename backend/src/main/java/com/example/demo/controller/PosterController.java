package com.example.demo.controller;

import com.example.demo.dto.PosterDTO;
import com.example.demo.service.PosterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posters")
public class PosterController {

    private final PosterService posterService;

    public PosterController(PosterService posterService) {
        this.posterService = posterService;
    }

    @GetMapping
    public ResponseEntity<List<PosterDTO>> getAllPosters() {
        List<PosterDTO> posters = posterService.getAllPosters();
        return ResponseEntity.ok(posters);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PosterDTO> getPosterById(@PathVariable Long id) {
        PosterDTO poster = posterService.getPosterById(id);
        return ResponseEntity.ok(poster);
    }

    @PostMapping
    public ResponseEntity<PosterDTO> createPoster(@RequestBody PosterDTO posterDTO) {
        PosterDTO created = posterService.savePoster(posterDTO);
        return ResponseEntity.ok(created);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePoster(@PathVariable Long id) {
        posterService.deletePoster(id);
        return ResponseEntity.noContent().build();
    }
}
