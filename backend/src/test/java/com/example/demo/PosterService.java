// package com.example.demo;

// import com.example.demo.dto.PosterDTO;
// import com.example.demo.model.Poster;
// import com.example.demo.repository.PosterRepository;
// import com.example.demo.service.PosterService;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.MockitoAnnotations;

// import java.util.Arrays;
// import java.util.Optional;

// import static org.junit.jupiter.api.Assertions.*;
// import static org.mockito.Mockito.*;

// class PosterServiceTest {

//     @Mock
//     private PosterRepository posterRepository;

//     @InjectMocks
//     private PosterService posterService;

//     @BeforeEach
//     void setUp() {
//         MockitoAnnotations.openMocks(this);
//     }

//     @Test
//     void getAllPosters_ShouldReturnListOfDTOs() {
//         Poster p1 = new Poster();
//         p1.setId(1L);
//         p1.setTitle("Poster 1");

//         Poster p2 = new Poster();
//         p2.setId(2L);
//         p2.setTitle("Poster 2");

//         when(posterRepository.findAll()).thenReturn(Arrays.asList(p1, p2));

//         var result = posterService.getAllPosters();
//         assertEquals(2, result.size());
//     }

//     @Test
//     void getPosterById_ShouldReturnDTO_WhenExists() {
//         Poster poster = new Poster();
//         poster.setId(10L);
//         poster.setTitle("Test Poster");

//         when(posterRepository.findById(10L)).thenReturn(Optional.of(poster));

//         PosterDTO dto = posterService.getPosterById(10L);
//         assertEquals(10L, dto.getPosterId());
//         assertEquals("Test Poster", dto.getTitle());
//     }

//     @Test
//     void getPosterById_ShouldThrow_WhenNotFound() {
//         when(posterRepository.findById(99L)).thenReturn(Optional.empty());
//         assertThrows(RuntimeException.class, () -> posterService.getPosterById(99L));
//     }

//     @Test
//     void createPoster_ShouldReturnSavedDTO() {
//         PosterDTO dto = new PosterDTO();
//         dto.setTitle("New Poster");
//         dto.setDescription("Some description");

//         Poster poster = new Poster();
//         poster.setTitle("New Poster");
//         poster.setDescription("Some description");

//         Poster savedPoster = new Poster();
//         savedPoster.setId(1L);
//         savedPoster.setTitle("New Poster");
//         savedPoster.setDescription("Some description");

//         when(posterRepository.save(any(Poster.class))).thenReturn(savedPoster);

//         PosterDTO result = posterService.createPoster(dto);
//         assertEquals(1L, result.getPosterId());
//     }

//     @Test
//     void updatePoster_ShouldModifyAndReturnDTO() {
//         Poster existing = new Poster();
//         existing.setId(5L);
//         existing.setTitle("Old Title");
//         existing.setDescription("Old Desc");

//         PosterDTO dto = new PosterDTO();
//         dto.setTitle("Updated Title");
//         dto.setDescription("Updated Desc");
//         dto.setImageUrl("newUrl");

//         when(posterRepository.findById(5L)).thenReturn(Optional.of(existing));
//         when(posterRepository.save(any(Poster.class))).thenReturn(existing);

//         PosterDTO result = posterService.updatePoster(5L, dto);

//         assertEquals("Updated Title", result.getTitle());
//         assertEquals("Updated Desc", result.getDescription());
//         assertEquals("newUrl", result.getImageUrl());
//     }

//     @Test
//     void deletePoster_ShouldDelete_WhenExists() {
//         when(posterRepository.existsById(3L)).thenReturn(true);

//         posterService.deletePoster(3L);

//         verify(posterRepository, times(1)).deleteById(3L);
//     }

//     @Test
//     void deletePoster_ShouldThrow_WhenNotFound() {
//         when(posterRepository.existsById(55L)).thenReturn(false);
//         assertThrows(RuntimeException.class, () -> posterService.deletePoster(55L));
//     }
// }
