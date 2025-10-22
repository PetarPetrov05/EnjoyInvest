package com.example.demo.service;

import com.example.demo.dto.PosterDTO;
import com.example.demo.model.Poster;
import com.example.demo.repository.PosterRepository;
import com.example.demo.repository.repoModels.RepoPoster;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PosterService {

    private final PosterRepository posterRepository;
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    public PosterService(PosterRepository posterRepository) {
        this.posterRepository = posterRepository;
    }

    // Convert Model to Entity
    private RepoPoster toEntity(Poster model) {
        RepoPoster entity = new RepoPoster();
        entity.setId(model.getId());
        entity.setTitle(model.getTitle());
        entity.setDescription(model.getDescription());
        entity.setImageUrl(model.getImageUrl());
        entity.setPrice(model.getPrice());
        entity.setTags(model.getTags());
        entity.setLocation(model.getLocation());
        entity.setCreatedAt(model.getCreatedAt());
        return entity;
    }

    // Convert Entity to Model
    private Poster toModel(RepoPoster entity) {
        Poster model = new Poster();
        model.setId(entity.getId());
        model.setTitle(entity.getTitle());
        model.setDescription(entity.getDescription());
        model.setImageUrl(entity.getImageUrl());
        model.setPrice(entity.getPrice());
        model.setTags(entity.getTags());
        model.setLocation(entity.getLocation());
        model.setCreatedAt(entity.getCreatedAt());
        return model;
    }

    // Convert Model to DTO
    private PosterDTO toDTO(Poster model) {
        PosterDTO dto = new PosterDTO();
        dto.setId(model.getId());
        dto.setTitle(model.getTitle());
        dto.setDescription(model.getDescription());
        dto.setImageUrl(model.getImageUrl());
        dto.setPrice(model.getPrice());
        dto.setTags(model.getTags());
        dto.setLocation(model.getLocation());
        dto.setCreatedAt(model.getCreatedAt().toString());
        return dto;
    }

    // Convert DTO to Model
    private Poster fromDTO(PosterDTO dto) {
        Poster model = new Poster();
        model.setId(dto.getId());
        model.setTitle(dto.getTitle());
        model.setDescription(dto.getDescription());
        model.setImageUrl(dto.getImageUrl());
        model.setPrice(dto.getPrice());
        model.setTags(dto.getTags());
        model.setLocation(dto.getLocation());
        if (dto.getCreatedAt() != null) {
            model.setCreatedAt(LocalDateTime.parse(dto.getCreatedAt(), formatter));
        } else {
            model.setCreatedAt(LocalDateTime.now());
        }
        return model;
    }

    // Service methods
    public PosterDTO savePoster(PosterDTO dto) {
        Poster model = fromDTO(dto);                // DTO → Model
        RepoPoster entity = toEntity(model);        // Model → Entity
        RepoPoster savedEntity = posterRepository.save(entity); // save entity
        Poster savedModel = toModel(savedEntity);   // Entity → Model
        return toDTO(savedModel);                   // Model → DTO
    }

    public List<PosterDTO> getAllPosters() {
        return posterRepository.findAll()
                .stream()
                .map(this::toModel)    // Entity → Model
                .map(this::toDTO)      // Model → DTO
                .collect(Collectors.toList());
    }

    public PosterDTO getPosterById(Long id) {
        RepoPoster entity = posterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Poster not found"));
        Poster model = toModel(entity);
        return toDTO(model);
    }

    public void deletePoster(Long id) {
        if (!posterRepository.existsById(id)) {
            throw new RuntimeException("Poster not found");
        }
        posterRepository.deleteById(id);
    }
}
