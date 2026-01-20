package com.example.demo;

import com.example.demo.dto.PosterDTO;
import com.example.demo.service.PosterService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

import org.springframework.transaction.annotation.Transactional;

@Transactional
public class PosterIntegrationTest extends BaseIntegrationTest {

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
    void testCreatePoster_EmptyTitle_Fails() {
        samplePoster.setTitle("");
        PosterDTO created = posterService.createPoster(samplePoster);
        assertNull(created, "Poster with empty title should return null");
    }

    @Test
    void testCreatePoster_WithoutDescription_Fails() {
        samplePoster.setDescription(null);
        PosterDTO created = posterService.createPoster(samplePoster);
        assertNull(created, "Poster without description should return null");
    }

    @Test
    void testCreatePoster_InvalidEmail_Fails() {
        samplePoster.setEmail("invalid-email");
        PosterDTO created = posterService.createPoster(samplePoster);
        assertNull(created, "Poster with invalid email should return null");
    }

    @Test
    void testCreatePoster_LargeTitle_Success() {
        String largeTitle = "A".repeat(255); // Title allows up to 255 chars
        samplePoster.setTitle(largeTitle);
        PosterDTO created = posterService.createPoster(samplePoster);
        assertNotNull(created);
        assertEquals(largeTitle, created.getTitle());
    }

    @Test
    void testCreatePoster_SpecialCharactersInTitle_Success() {
        String specialTitle = "Title with @#$%^&*()!";
        samplePoster.setTitle(specialTitle);
        PosterDTO created = posterService.createPoster(samplePoster);
        assertNotNull(created);
        assertEquals(specialTitle, created.getTitle());
    }

    @Test
    void testCreatePoster_EmptyImagesList_Success() {
        samplePoster.setImages(new ArrayList<>()); // Already set, but ensure
        PosterDTO created = posterService.createPoster(samplePoster);
        assertNotNull(created);
        assertNotNull(created.getImages());
        assertTrue(created.getImages().isEmpty());
    }

    @Test
    void testGetAllPosters_Empty() {
        List<PosterDTO> posters = posterService.getAllPosters();
        assertNotNull(posters);
        assertTrue(posters.isEmpty(), "Should return empty list when no posters");
    }

    @Test
    void testGetAllPosters_Multiple() {
        posterService.createPoster(samplePoster);
        PosterDTO another = PosterDTO.builder()
                .title("Another Title")
                .description(samplePoster.getDescription())
                .fullDescription(samplePoster.getFullDescription())
                .price(samplePoster.getPrice())
                .type(samplePoster.getType())
                .category(samplePoster.getCategory())
                .image(samplePoster.getImage())
                .images(new ArrayList<>(samplePoster.getImages()))
                .likes(0)
                .saved(false)
                .location(samplePoster.getLocation())
                .phone(samplePoster.getPhone())
                .email("another@example.com")
                .build();
        posterService.createPoster(another);
        List<PosterDTO> posters = posterService.getAllPosters();
        assertEquals(2, posters.size(), "Should return two posters");
    }

    @Test
    void testGetAllPosters() {
        PosterDTO created = posterService.createPoster(samplePoster);
        List<PosterDTO> posters = posterService.getAllPosters();
        assertFalse(posters.isEmpty(), "Should return at least one poster");
        PosterDTO first = posters.get(0);
        assertEquals(created.getId(), first.getId(), "ID should match");
        assertEquals(samplePoster.getTitle(), first.getTitle(), "Title should match");
        assertEquals(samplePoster.getDescription(), first.getDescription(), "Description should match");
        assertEquals(samplePoster.getPrice(), first.getPrice(), "Price should match");
        assertEquals(samplePoster.getType(), first.getType(), "Type should match");
        assertEquals(samplePoster.getCategory(), first.getCategory(), "Category should match");
        assertEquals(samplePoster.getLocation(), first.getLocation(), "Location should match");
        assertEquals(samplePoster.getPhone(), first.getPhone(), "Phone should match");
        assertEquals(samplePoster.getEmail(), first.getEmail(), "Email should match");
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
