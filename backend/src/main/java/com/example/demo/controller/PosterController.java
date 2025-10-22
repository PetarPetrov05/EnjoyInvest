package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.service.PosterService;
import com.example.demo.dto.PosterDTO;
import java.util.List;

@RestController
@RequestMapping("/posters")
public class PosterController {

    private final PosterService posterService;

    public PosterController(PosterService posterService) {
        this.posterService = posterService;
    }

    @GetMapping
    public List<PosterDTO> getAllPosters() {
        return posterService.getAllPosters();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PosterDTO> getPosterById(@PathVariable Long id) {
        PosterDTO poster = posterService.getPosterById(id);
        return ResponseEntity.ok(poster);
    }

    @PostMapping
    public PosterDTO createPoster(@RequestBody PosterDTO posterDTO) {
        return posterService.createPoster(posterDTO);
    }
}
