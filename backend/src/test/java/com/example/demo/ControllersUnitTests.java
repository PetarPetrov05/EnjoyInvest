package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.demo.controller.PosterController;
import com.example.demo.dto.PosterDTO;
import com.example.demo.service.PosterService;
import java.util.Arrays;
import java.util.List;
public class ControllersUnitTests {
    
    private PosterService posterService;
    private PosterController posterController;

    @BeforeEach
    void setUp() {
        posterService = mock(PosterService.class);
        posterController = new PosterController(posterService);
    }

    @Test
    void testGetAllPosters() {
        PosterDTO poster = PosterDTO.builder()
                .id(1L)
                .title("Poster1")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        when(posterService.getAllPosters()).thenReturn(Arrays.asList(poster));

        ResponseEntity<List<PosterDTO>> response = posterController.getAllPosters();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().size());
        verify(posterService, times(1)).getAllPosters();
    }

    @Test
    void testGetPosterById_Found() {
        PosterDTO poster = PosterDTO.builder().id(1L).title("Poster1").build();
        when(posterService.getPosterById(1L)).thenReturn(poster);

        ResponseEntity<PosterDTO> response = posterController.getPosterById(1L);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(poster, response.getBody());
        verify(posterService).getPosterById(1L);
    }

    @Test
    void testGetPosterById_NotFound() {
        when(posterService.getPosterById(1L)).thenReturn(null);

        ResponseEntity<PosterDTO> response = posterController.getPosterById(1L);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
        verify(posterService).getPosterById(1L);
    }

    @Test
    void testCreatePoster_Success() {
        PosterDTO dto = PosterDTO.builder().title("New Poster").build();
        PosterDTO created = PosterDTO.builder().id(1L).title("New Poster").build();
        when(posterService.createPoster(dto)).thenReturn(created);

        ResponseEntity<PosterDTO> response = posterController.createPoster(dto);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(created, response.getBody());
        verify(posterService).createPoster(dto);
    }

    @Test
    void testCreatePoster_Failure() {
        PosterDTO dto = PosterDTO.builder().title(null).build();
        when(posterService.createPoster(dto)).thenReturn(null);

        ResponseEntity<PosterDTO> response = posterController.createPoster(dto);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertNull(response.getBody());
        verify(posterService).createPoster(dto);
    }

    @Test
    void testUpdatePoster_Success() {
        PosterDTO dto = PosterDTO.builder().title("Updated Poster").build();
        PosterDTO updated = PosterDTO.builder().id(1L).title("Updated Poster").build();
        when(posterService.updatePoster(1L, dto)).thenReturn(updated);

        ResponseEntity<PosterDTO> response = posterController.updatePoster(1L, dto);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updated, response.getBody());
        verify(posterService).updatePoster(1L, dto);
    }

    @Test
    void testUpdatePoster_NotFound() {
        PosterDTO dto = PosterDTO.builder().title("Updated Poster").build();
        when(posterService.updatePoster(1L, dto)).thenReturn(null);

        ResponseEntity<PosterDTO> response = posterController.updatePoster(1L, dto);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
        verify(posterService).updatePoster(1L, dto);
    }

    @Test
    void testDeletePoster_Success() {
        when(posterService.deletePoster(1L)).thenReturn(true);

        ResponseEntity<Void> response = posterController.deletePoster(1L);
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(posterService).deletePoster(1L);
    }

    @Test
    void testDeletePoster_NotFound() {
        when(posterService.deletePoster(1L)).thenReturn(false);

        ResponseEntity<Void> response = posterController.deletePoster(1L);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(posterService).deletePoster(1L);
    }

    @Test
    void testToggleLike_Liked() {
        when(posterService.toggleLike(1L)).thenReturn(true);

        ResponseEntity<Void> response = posterController.toggleLike(1L);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(posterService).toggleLike(1L);
    }

    @Test
    void testToggleLike_Unliked() {
        when(posterService.toggleLike(1L)).thenReturn(false);

        ResponseEntity<Void> response = posterController.toggleLike(1L);
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(posterService).toggleLike(1L);
    }
}
