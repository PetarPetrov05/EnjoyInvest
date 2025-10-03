package com.example.demo.service;

import com.example.demo.dto.PosterDTO;
import com.example.demo.model.Poster;
import com.example.demo.repository.PosterRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PosterService {

    private final PosterRepository posterRepository;

    public PosterService(PosterRepository posterRepository) {
        this.posterRepository = posterRepository;
    }

    public List<PosterDTO> getAllPosters() {
        return posterRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public PosterDTO getPosterById(Long id) {
        Poster poster = posterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Poster not found with id: " + id));
        return convertToDTO(poster);
    }

    public PosterDTO createPoster(PosterDTO posterDTO) {
        Poster poster = convertToEntity(posterDTO);
        Poster savedPoster = posterRepository.save(poster);
        return convertToDTO(savedPoster);
    }

    public PosterDTO updatePoster(Long id, PosterDTO posterDTO) {
        Poster existingPoster = posterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Poster not found with id: " + id));
        
        existingPoster.setTitle(posterDTO.getTitle());
        existingPoster.setDescription(posterDTO.getDescription());
        existingPoster.setImageUrl(posterDTO.getImageUrl());
        
        Poster updatedPoster = posterRepository.save(existingPoster);
        return convertToDTO(updatedPoster);
    }

    public void deletePoster(Long id) {
        if (!posterRepository.existsById(id)) {
            throw new RuntimeException("Poster not found with id: " + id);
        }
        posterRepository.deleteById(id);
    }

    // Helper method to convert Poster entity to PosterDTO
    private PosterDTO convertToDTO(Poster poster) {
        PosterDTO dto = new PosterDTO();
        dto.setPosterId(poster.getId());
        dto.setTitle(poster.getTitle());
        dto.setDescription(poster.getDescription());
        dto.setImageUrl(poster.getImageUrl());
        dto.setCreatedAt(poster.getCreatedAt() != null ? poster.getCreatedAt().toString() : null);
        return dto;
    }

    // Helper method to convert PosterDTO to Poster entity
    private Poster convertToEntity(PosterDTO dto) {
        Poster poster = new Poster();
        poster.setTitle(dto.getTitle());
        poster.setDescription(dto.getDescription());
        poster.setImageUrl(dto.getImageUrl());
        return poster;
    }
}