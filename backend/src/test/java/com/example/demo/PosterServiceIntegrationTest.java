package com.example.demo;

import com.example.demo.dto.PosterDTO;
import com.example.demo.repository.PosterRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class PosterIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private PosterRepository posterRepository;

    @BeforeEach
    void setUp() {
        posterRepository.deleteAll();
    }

    @Test
    void testCreatePoster_Success() throws Exception {
        // Arrange
        PosterDTO posterDTO = new PosterDTO(
                null,
                "iPhone 13 Pro",
                "Excellent condition, lightly used",
                "Full description: iPhone 13 Pro 256GB, Space Gray, with all accessories",
                "$899",
                "For Sale",
                "Electronics",
                "https://example.com/iphone.jpg",
                Arrays.asList("https://example.com/iphone1.jpg", "https://example.com/iphone2.jpg"),
                0,
                false,
                "San Francisco, CA",
                "+1234567890",
                "seller@example.com",
                null,
                null
        );

        // Act
        MvcResult result = mockMvc.perform(post("/posters")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(posterDTO)))
                .andExpect(status().isCreated())
                .andReturn();

        // Assert
        String response = result.getResponse().getContentAsString();
        PosterDTO createdPoster = objectMapper.readValue(response, PosterDTO.class);

        assertNotNull(createdPoster.getId(), "Poster ID should not be null");
        assertEquals("iPhone 13 Pro", createdPoster.getTitle());
        assertEquals("For Sale", createdPoster.getType());
        assertEquals("$899", createdPoster.getPrice());
        assertNotNull(createdPoster.getCreatedAt(), "CreatedAt should not be null");
    }

    @Test
    void testCreatePoster_WithoutTitle_Fails() throws Exception {
        // Arrange - title is null
        PosterDTO posterDTO = new PosterDTO(
                null,
                null, // Missing title
                "Description",
                "Full description",
                "$100",
                "For Sale",
                "Electronics",
                "image.jpg",
                Arrays.asList(),
                0,
                false,
                "Location",
                "+1234567890",
                "email@example.com",
                null,
                null
        );

        // Act & Assert
        mockMvc.perform(post("/posters")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(posterDTO)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testGetAllPosters() throws Exception {
        // Arrange - create multiple posters
        PosterDTO poster1 = new PosterDTO(
                null, "Car for Sale", "2019 Honda Civic", "Full description",
                "$15000", "For Sale", "Vehicles", "car.jpg", Arrays.asList(),
                5, false, "LA", "+1111111111", "seller1@example.com", null, null
        );

        PosterDTO poster2 = new PosterDTO(
                null, "Apartment for Rent", "2BR apartment downtown", "Full description",
                "$2000/month", "For Rent", "Real Estate", "apt.jpg", Arrays.asList(),
                2, false, "NYC", "+2222222222", "seller2@example.com", null, null
        );

        mockMvc.perform(post("/posters")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(poster1)))
                .andExpect(status().isCreated());

        mockMvc.perform(post("/posters")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(poster2)))
                .andExpect(status().isCreated());

        // Act
        MvcResult result = mockMvc.perform(get("/posters")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        // Assert
        String response = result.getResponse().getContentAsString();
        List<PosterDTO> posters = Arrays.asList(objectMapper.readValue(response, PosterDTO[].class));

        assertEquals(2, posters.size(), "Should return 2 posters");
        assertTrue(posters.stream().anyMatch(p -> "Car for Sale".equals(p.getTitle())));
        assertTrue(posters.stream().anyMatch(p -> "Apartment for Rent".equals(p.getTitle())));
    }

    @Test
    void testGetAllPosters_Empty() throws Exception {
        // Act & Assert - no posters created
        mockMvc.perform(get("/posters")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }

    @Test
    void testGetPosterById_Success() throws Exception {
        // Arrange - create a poster
        PosterDTO posterDTO = new PosterDTO(
                null, "Laptop for Sale", "MacBook Pro M1", "Full description",
                "$1200", "For Sale", "Electronics", "laptop.jpg", Arrays.asList(),
                10, false, "Boston", "+3333333333", "seller@example.com", null, null
        );

        MvcResult createResult = mockMvc.perform(post("/posters")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(posterDTO)))
                .andExpect(status().isCreated())
                .andReturn();

        PosterDTO createdPoster = objectMapper.readValue(
                createResult.getResponse().getContentAsString(), PosterDTO.class
        );
        Long posterId = createdPoster.getId();

        // Act
        MvcResult result = mockMvc.perform(get("/posters/" + posterId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        // Assert
        String response = result.getResponse().getContentAsString();
        PosterDTO retrievedPoster = objectMapper.readValue(response, PosterDTO.class);

        assertEquals(posterId, retrievedPoster.getId());
        assertEquals("Laptop for Sale", retrievedPoster.getTitle());
        assertEquals("$1200", retrievedPoster.getPrice());
    }

    @Test
    void testGetPosterById_NotFound() throws Exception {
        // Act & Assert
        mockMvc.perform(get("/posters/999")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    void testCreatePoster_WithImages() throws Exception {
        // Arrange
        PosterDTO posterDTO = new PosterDTO(
                null,
                "House for Sale",
                "Beautiful 3-bedroom house",
                "Full description with details",
                "$500000",
                "For Sale",
                "Real Estate",
                "house-main.jpg",
                Arrays.asList("house1.jpg", "house2.jpg", "house3.jpg"),
                0,
                false,
                "Miami, FL",
                "+1555555555",
                "realtor@example.com",
                null,
                null
        );

        // Act
        MvcResult result = mockMvc.perform(post("/posters")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(posterDTO)))
                .andExpect(status().isCreated())
                .andReturn();

        // Assert
        String response = result.getResponse().getContentAsString();
        PosterDTO createdPoster = objectMapper.readValue(response, PosterDTO.class);

        assertNotNull(createdPoster.getId());
        assertEquals(3, createdPoster.getImages().size());
        assertTrue(createdPoster.getImages().contains("house1.jpg"));
    }
}