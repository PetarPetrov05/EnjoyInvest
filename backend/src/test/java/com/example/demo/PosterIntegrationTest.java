package com.example.demo;

import com.example.demo.dto.PosterDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PosterIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    private String baseUrl;

    @BeforeEach
    void setUp() {
        baseUrl = "http://localhost:" + port + "/posters";
    }

    private PosterDTO createValidPoster() {
        return PosterDTO.builder()
                .title("Test Poster")
                .description("This is a description")
                .fullDescription("This is a full description with enough length")
                .price("100$")
                .type("Advertisement")
                .category("Tech")
                .image("main_image.png")
                .images(List.of("image1.png", "image2.png"))
                .location("Varna")
                .phone("123456789")
                .email("test@example.com")
                .build();
    }

    @Test
    void testCreatePoster_Success() {
        PosterDTO poster = createValidPoster();

        ResponseEntity<PosterDTO> response = restTemplate.postForEntity(baseUrl, poster, PosterDTO.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getId()).isNotNull();
        assertThat(response.getBody().getTitle()).isEqualTo(poster.getTitle());
    }

    @Test
    void testCreatePoster_WithoutTitle_Fails() {
        PosterDTO poster = createValidPoster();
        poster.setTitle(null);

        ResponseEntity<Void> response = restTemplate.postForEntity(baseUrl, poster, Void.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    void testGetAllPosters_Empty() {
        ResponseEntity<PosterDTO[]> response = restTemplate.getForEntity(baseUrl, PosterDTO[].class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEmpty();
    }

    @Test
    void testGetAllPosters() {
        // Create poster first
        PosterDTO poster = createValidPoster();
        restTemplate.postForEntity(baseUrl, poster, PosterDTO.class);

        ResponseEntity<PosterDTO[]> response = restTemplate.getForEntity(baseUrl, PosterDTO[].class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).hasSize(1);
        assertThat(response.getBody()[0].getTitle()).isEqualTo(poster.getTitle());
    }

    @Test
    void testGetPosterById_Success() {
        PosterDTO poster = createValidPoster();
        ResponseEntity<PosterDTO> createResponse = restTemplate.postForEntity(baseUrl, poster, PosterDTO.class);
        Long id = createResponse.getBody().getId();

        ResponseEntity<PosterDTO> response = restTemplate.getForEntity(baseUrl + "/" + id, PosterDTO.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getId()).isEqualTo(id);
        assertThat(response.getBody().getTitle()).isEqualTo(poster.getTitle());
    }
}
