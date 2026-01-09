package com.example.demo;

import com.example.demo.controller.AuthController;
import com.example.demo.controller.CommentController;
import com.example.demo.controller.ImageController;
import com.example.demo.controller.PosterController;
import com.example.demo.dto.CommentDTO;
import com.example.demo.dto.CommentRequest;
import com.example.demo.dto.PosterDTO;
import com.example.demo.service.CommentService;
import com.example.demo.service.PosterService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.io.TempDir;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class ControllersUnitTests {

    private MockMvc mockMvc;

    @Mock
    private PosterService posterService;

    @Mock
    private CommentService commentService;

    @InjectMocks
    private CommentController commentController;
    @InjectMocks
    private PosterController posterController;

    @InjectMocks
    private ImageController imageController; // Added ImageController

    @TempDir
    Path tempDir; 
private final ObjectMapper objectMapper = new ObjectMapper();
    @BeforeEach
    void setUp() {
        // Build MockMvc to handle both controllers
        mockMvc = MockMvcBuilders.standaloneSetup(posterController, imageController,commentController).build();
        
        // Inject the same temp directory into both controllers
        ReflectionTestUtils.setField(posterController, "uploadDir", tempDir.toString());
        ReflectionTestUtils.setField(imageController, "uploadDir", tempDir.toString());
    }

    // -------------------- IMAGE CONTROLLER TESTS --------------------

    @Test
    void getImage_Success() throws Exception {
        String filename = "test.jpg";
        byte[] contentBytes = "fake-image-data".getBytes();
        Files.write(tempDir.resolve(filename), contentBytes);

        mockMvc.perform(get("/images/" + filename))
                .andExpect(status().isOk())
                // Use content().contentType() instead of contentType()
                .andExpect(content().contentType(MediaType.IMAGE_JPEG)) 
                .andExpect(header().string("Content-Disposition", "inline; filename=\"" + filename + "\""))
                .andExpect(content().bytes(contentBytes));
    }
    @Test
    void getImage_NotFound() throws Exception {
        // Act & Assert
        mockMvc.perform(get("/images/non-existent.jpg"))
                .andExpect(status().isNotFound());
    }

    // -------------------- POSTER GET TESTS --------------------

    @Test
    void getAllPosters_Success() throws Exception {
        PosterDTO poster = PosterDTO.builder().id(1L).title("Test Title").build();
        when(posterService.getAllPosters()).thenReturn(Arrays.asList(poster));

        mockMvc.perform(get("/posters"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Test Title"));
    }

    @Test
    void getPosterById_Found() throws Exception {
        PosterDTO poster = PosterDTO.builder().id(1L).title("Found Poster").build();
        when(posterService.getPosterById(1L)).thenReturn(poster);

        mockMvc.perform(get("/posters/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Found Poster"));
    }

    @Test
    void getPosterById_NotFound() throws Exception {
        when(posterService.getPosterById(1L)).thenReturn(null);

        mockMvc.perform(get("/posters/1"))
                .andExpect(status().isNotFound());
    }

    // -------------------- POSTER CREATE (POST) --------------------

    @Test
    void createPoster_Success() throws Exception {
        MockMultipartFile file = new MockMultipartFile("image", "test.jpg", "image/jpeg", "content".getBytes());

        PosterDTO savedDto = PosterDTO.builder()
                .id(1L)
                .title("Valid Title")
                .image("mock-image-path.jpg")
                .build();

        when(posterService.createPoster(any(PosterDTO.class))).thenReturn(savedDto);

        mockMvc.perform(multipart("/posters")
                        .file(file)
                        .param("title", "Valid Title")
                        .param("description", "A very long description for validation")
                        .param("fullDescription", "An even longer description for validation purposes")
                        .param("price", "100")
                        .param("type", "Type A")
                        .param("category", "Category A")
                        .param("location", "London")
                        .param("phone", "123456789")
                        .param("email", "test@test.com"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Valid Title"));
    }

    // -------------------- POSTER UPDATE (PUT) --------------------

    @Test
    void updatePoster_Success() throws Exception {
        PosterDTO existing = PosterDTO.builder().id(1L).title("Old").image("old.jpg").build();
        PosterDTO updated = PosterDTO.builder().id(1L).title("New").build();

        MockMultipartFile file = new MockMultipartFile("image", "new.jpg", "image/jpeg", "new content".getBytes());

        when(posterService.getPosterById(1L)).thenReturn(existing);
        when(posterService.updatePoster(eq(1L), any(PosterDTO.class))).thenReturn(updated);

        mockMvc.perform(multipart("/posters/1")
                        .file(file)
                        .param("title", "New")
                        .with(request -> { request.setMethod("PUT"); return request; }))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("New"));
    }

    // -------------------- POSTER DELETE --------------------

    @Test
    void deletePoster_Success() throws Exception {
        when(posterService.deletePoster(1L)).thenReturn(true);

        mockMvc.perform(delete("/posters/1"))
                .andExpect(status().isNoContent());
    }

    // -------------------- POSTER LIKE (TOGGLE) --------------------

    @Test
    void toggleLike_Liked() throws Exception {
        when(posterService.toggleLike(1L)).thenReturn(true);

        mockMvc.perform(post("/posters/1/like"))
                .andExpect(status().isOk());
    }

    @Test
    void toggleLike_Unliked() throws Exception {
        when(posterService.toggleLike(1L)).thenReturn(false);

        mockMvc.perform(post("/posters/1/like"))
                .andExpect(status().isNoContent());
    }
    @Test
    void addComment_Success() throws Exception {
        Long posterId = 1L;
        CommentRequest request = new CommentRequest("Great poster!");
        CommentDTO mockResponse = CommentDTO.builder()
                .id(10L)
                .content("Great poster!")
                .username("User1")
                .build();

        when(commentService.addComment(eq(posterId), anyString())).thenReturn(mockResponse);

        mockMvc.perform(post("/api/comments/{posterId}", posterId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").value("Great poster!"))
                .andExpect(jsonPath("$.username").value("User1"));
    }

    @Test
    void addComment_Unauthorized_WhenServiceReturnsNull() throws Exception {
        Long posterId = 1L;
        CommentRequest request = new CommentRequest("This will fail");

        // Controller returns 401 if service returns null
        when(commentService.addComment(eq(posterId), anyString())).thenReturn(null);

        mockMvc.perform(post("/api/comments/{posterId}", posterId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized());
    }

    // -------------------- GET (FETCH COMMENTS) --------------------

    @Test
    void getComments_Success() throws Exception {
        Long posterId = 1L;
        List<CommentDTO> comments = Arrays.asList(
                CommentDTO.builder().id(1L).content("Comment 1").build(),
                CommentDTO.builder().id(2L).content("Comment 2").build()
        );

        when(commentService.getCommentsForPoster(posterId)).thenReturn(comments);

        mockMvc.perform(get("/api/comments/{posterId}", posterId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].content").value("Comment 1"))
                .andExpect(jsonPath("$[1].content").value("Comment 2"));
    }
}