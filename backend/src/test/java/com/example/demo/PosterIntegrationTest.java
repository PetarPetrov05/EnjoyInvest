package com.example.demo;

import com.example.demo.dto.PosterDTO;
import com.example.demo.service.PosterService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
public class PosterIntegrationTest {

    @Autowired
    private PosterService posterService;

    private PosterDTO samplePoster;

    @BeforeEach
    void setup() {
        // Full valid PosterDTO to pass validation
        samplePoster = PosterDTO.builder()
                .title("Sample Poster")
                .description("This is a sample description")
                .fullDescription("This is a full description with more than 20 chars")
                .price("100")
                .type("Type A")
                .category("Category X")
                .image("http://example.com/main.jpg")
                .images(new ArrayList<>(List.of("http://example.com/1.jpg", "http://example.com/2.jpg"))) // mutable
                .likes(0)
                .saved(false)
                .location("Sample Location")
                .phone("1234567890")
                .email("test@example.com")
                .build();
    }

    @Test
    void testCreatePoster_Success() {
        PosterDTO created = posterService.createPoster(samplePoster);
        assertNotNull(created.getId(), "Created poster should have an ID");
        assertEquals(samplePoster.getTitle(), created.getTitle());
    }

    @Test
    void testCreatePoster_WithoutTitle_Fails() {
        samplePoster.setTitle(null);
        PosterDTO created = posterService.createPoster(samplePoster);
        assertNull(created, "Poster without title should return null");
    }

    @Test
    void testGetAllPosters() {
        posterService.createPoster(samplePoster);
        List<PosterDTO> posters = posterService.getAllPosters();
        assertFalse(posters.isEmpty(), "Should return at least one poster");
        assertEquals(samplePoster.getTitle(), posters.get(0).getTitle());
    }

    @Test
    void testGetPosterById_Success() {
        PosterDTO created = posterService.createPoster(samplePoster);
        PosterDTO fetched = posterService.getPosterById(created.getId());
        assertNotNull(fetched, "Fetched poster should not be null");
        assertEquals(created.getId(), fetched.getId());
        assertEquals(created.getTitle(), fetched.getTitle());
    }

    @Test
    void testGetAllPosters_Empty() {
        List<PosterDTO> posters = posterService.getAllPosters();
        assertTrue(posters.isEmpty(), "Initially there should be no posters");
    }

    @Test
    void testUpdatePoster_Success() {
        PosterDTO created = posterService.createPoster(samplePoster);
        // Use a mutable list to avoid UnsupportedOperationException
        created.setImages(new ArrayList<>(created.getImages()));
        created.setTitle("Updated Title");
        PosterDTO updated = posterService.updatePoster(created.getId(), created);
        assertNotNull(updated);
        assertEquals("Updated Title", updated.getTitle());
    }

    @Test
    void testUpdatePoster_NotFound() {
        PosterDTO updated = posterService.updatePoster(999L, samplePoster);
        assertNull(updated, "Updating non-existing poster should return null");
    }

    @Test
    void testDeletePoster_Success() {
        PosterDTO created = posterService.createPoster(samplePoster);
        boolean deleted = posterService.deletePoster(created.getId());
        assertTrue(deleted, "Delete should return true for existing poster");
    }

    @Test
    void testDeletePoster_NotFound() {
        boolean deleted = posterService.deletePoster(999L);
        assertFalse(deleted, "Delete should return false for non-existing poster");
    }
}
