package com.example.demo.service;

import com.example.demo.dto.PosterDTO;
import com.example.demo.model.Poster;
import com.example.demo.repository.PosterRepository;
import com.example.demo.repository.repoModels.RepoPoster;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PosterService {

    private final PosterRepository posterRepository;

    public PosterService(PosterRepository posterRepository) {
        this.posterRepository = posterRepository;
    }

    // Get all posters
    public List<PosterDTO> getAllPosters() {
        return posterRepository.findAll()
                .stream()
                .map(this::mapRepoToModel)
                .map(this::mapModelToDTO)
                .collect(Collectors.toList());
    }

    // Get poster by ID
    public PosterDTO getPosterById(Long id) {
        RepoPoster repoPoster = posterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Poster not found with ID: " + id));

        Poster model = mapRepoToModel(repoPoster);
        return mapModelToDTO(model);
    }

    // Create a new poster with edge-case handling
    public PosterDTO createPoster(PosterDTO posterDTO) {
        if (posterDTO == null) {
            throw new RuntimeException("Cannot create poster from null DTO");
        }
        if (posterDTO.getTitle() == null) {
            throw new RuntimeException("Poster title cannot be null");
        }
        if (posterDTO.getImages() == null) {
            posterDTO.setImages(Collections.emptyList());
        }

        Poster poster = mapDTOToModel(posterDTO);
        RepoPoster saved = posterRepository.save(mapModelToRepo(poster));
        return mapModelToDTO(mapRepoToModel(saved));
    }

    // ---------- MAPPERS ----------

    private Poster mapRepoToModel(RepoPoster repo) {
        return new Poster(
                repo.getId(),
                repo.getTitle(),
                repo.getDescription(),
                repo.getFullDescription(),
                repo.getPrice(),
                repo.getType(),
                repo.getCategory(),
                repo.getImage(),
                repo.getImages(),
                repo.getLikes(),
                repo.getSaved(),
                repo.getLocation(),
                repo.getPhone(),
                repo.getEmail(),
                repo.getCreatedAt(),
                repo.getUpdatedAt()
        );
    }

    private RepoPoster mapModelToRepo(Poster poster) {
        RepoPoster repo = new RepoPoster(
                poster.getTitle(),
                poster.getDescription(),
                poster.getFullDescription(),
                poster.getPrice(),
                poster.getType(),
                poster.getCategory(),
                poster.getImage(),
                poster.getImages(),
                poster.getLikes(),
                poster.getSaved(),
                poster.getLocation(),
                poster.getPhone(),
                poster.getEmail()
        );
        repo.setId(poster.getId());
        repo.setCreatedAt(poster.getCreatedAt());
        repo.setUpdatedAt(poster.getUpdatedAt());
        return repo;
    }

    private PosterDTO mapModelToDTO(Poster poster) {
        return new PosterDTO(
                poster.getId(),
                poster.getTitle(),
                poster.getDescription(),
                poster.getFullDescription(),
                poster.getPrice(),
                poster.getType(),
                poster.getCategory(),
                poster.getImage(),
                poster.getImages(),
                poster.getLikes(),
                poster.getSaved(),
                poster.getLocation(),
                poster.getPhone(),
                poster.getEmail(),
                poster.getCreatedAt(),
                poster.getUpdatedAt()
        );
    }

    private Poster mapDTOToModel(PosterDTO dto) {
        return new Poster(
                dto.getId(),
                dto.getTitle(),
                dto.getDescription(),
                dto.getFullDescription(),
                dto.getPrice(),
                dto.getType(),
                dto.getCategory(),
                dto.getImage(),
                dto.getImages(),
                dto.getLikes(),
                dto.getSaved(),
                dto.getLocation(),
                dto.getPhone(),
                dto.getEmail(),
                dto.getCreatedAt(),
                dto.getUpdatedAt()
        );
    }
}
