
package com.example.demo.controller;
import org.springframework.web.bind.annotation.*;
import com.example.demo.service.PosterService;
import com.example.demo.dto.PosterDTO;
import java.util.List;

@RestController
public class PosterController {

    private final PosterService posterService;

    public PosterController(PosterService posterService) {
        this.posterService = posterService;
    }

    @GetMapping("/posters")
    public List<PosterDTO> getAllPosters() {
        return posterService.getAllPosters();
    }

    @GetMapping("posters/{id}")
    public PosterDTO getPosterById(@PathVariable Long id) {
        return posterService.getPosterById(id);
    }
}
