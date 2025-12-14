package com.example.demo;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

import org.junit.jupiter.api.Test;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.dto.PosterDTO;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.dto.CommentDTO;
import com.example.demo.model.Role;

public class DtoTests {

    @Test
    void testPosterDTO_GettersAndSetters() {
        // Arrange
        Long id = 1L;
        String title = "Sample Poster";
        String description = "Short descriptionFull descriptionShort descriptionFull description";
        String fullDescription = "Full descriptionFull descriptionFull descriptionFull descriptionFull descriptionFull description";
        String price = "$100";
        String type = "For Sale";
        String category = "Electronics";
        String image = "image.jpg";
        List<String> images = Arrays.asList("img1.jpg", "img2.jpg");
        Integer likes = 10;
        Boolean saved = true;
        String location = "New York";
        String phone = "+1234567890";
        String email = "test@example.com";
        LocalDateTime createdAt = LocalDateTime.now();
        LocalDateTime updatedAt = LocalDateTime.now();

        // Act
        PosterDTO poster = PosterDTO.builder()
                .id(id)
                .title(title)
                .description(description)
                .fullDescription(fullDescription)
                .price(price)
                .type(type)
                .category(category)
                .image(image)
                .images(images)
                .likes(likes)
                .saved(saved)
                .isLiked(null)
                .location(location)
                .phone(phone)
                .email(email)
                .createdAt(createdAt)
                .updatedAt(updatedAt)
                .comments(null)
                .build();

        // Assert - Getters
        assertEquals(id, poster.getId());
        assertEquals(title, poster.getTitle());
        assertEquals(description, poster.getDescription());
        assertEquals(fullDescription, poster.getFullDescription());
        assertEquals(price, poster.getPrice());
        assertEquals(type, poster.getType());
        assertEquals(category, poster.getCategory());
        assertEquals(image, poster.getImage());
        assertEquals(images, poster.getImages());
        assertEquals(likes, poster.getLikes());
        assertEquals(saved, poster.getSaved());
        assertEquals(location, poster.getLocation());
        assertEquals(phone, poster.getPhone());
        assertEquals(email, poster.getEmail());
        assertEquals(createdAt, poster.getCreatedAt());
        assertEquals(updatedAt, poster.getUpdatedAt());

        // Act - Setters
        poster.setId(2L);
        poster.setTitle("New Title");
        poster.setDescription("New Description");
        poster.setFullDescription("New Full Description");
        poster.setPrice("$200");
        poster.setType("For Rent");
        poster.setCategory("Vehicles");
        poster.setImage("new-image.jpg");
        poster.setImages(Arrays.asList("new1.jpg", "new2.jpg", "new3.jpg"));
        poster.setLikes(20);
        poster.setSaved(false);
        poster.setLocation("Los Angeles");
        poster.setPhone("+0987654321");
        poster.setEmail("new@example.com");
        LocalDateTime newCreatedAt = LocalDateTime.now().plusDays(1);
        LocalDateTime newUpdatedAt = LocalDateTime.now().plusDays(2);
        poster.setCreatedAt(newCreatedAt);
        poster.setUpdatedAt(newUpdatedAt);

        // Assert - After setting new values
        assertEquals(2L, poster.getId());
        assertEquals("New Title", poster.getTitle());
        assertEquals("New Description", poster.getDescription());
        assertEquals("New Full Description", poster.getFullDescription());
        assertEquals("$200", poster.getPrice());
        assertEquals("For Rent", poster.getType());
        assertEquals("Vehicles", poster.getCategory());
        assertEquals("new-image.jpg", poster.getImage());
        assertEquals(3, poster.getImages().size());
        assertTrue(poster.getImages().contains("new1.jpg"));
        assertEquals(20, poster.getLikes());
        assertFalse(poster.getSaved());
        assertEquals("Los Angeles", poster.getLocation());
        assertEquals("+0987654321", poster.getPhone());
        assertEquals("new@example.com", poster.getEmail());
        assertEquals(newCreatedAt, poster.getCreatedAt());
        assertEquals(newUpdatedAt, poster.getUpdatedAt());
    }

    @Test
    void testLoginRequest_GettersAndSetters() {
        LoginRequest loginRequest = new LoginRequest();

        loginRequest.setEmail("test@example.com");
        loginRequest.setPassword("password123");

        assertEquals("test@example.com", loginRequest.getEmail());
        assertEquals("password123", loginRequest.getPassword());
    }

    @Test
    void testRegisterRequest_GettersAndSetters() {
        RegisterRequest registerRequest = new RegisterRequest();

        registerRequest.setUsername("user1");
        registerRequest.setEmail("user1@example.com");
        registerRequest.setPassword("secret");
        registerRequest.setName("John Doe");

        assertEquals("user1", registerRequest.getUsername());
        assertEquals("user1@example.com", registerRequest.getEmail());
        assertEquals("secret", registerRequest.getPassword());
        assertEquals("John Doe", registerRequest.getName());
    }

    @Test
    void testLoginResponse_ConstructorAndGetters() {
        Set<Role> roles = Set.of(Role.USER, Role.ADMIN);
        LoginResponse response = new LoginResponse("token123", roles);

        assertEquals("token123", response.getToken());
        assertEquals(roles, response.getRoles());
        assertTrue(response.getRoles().contains(Role.USER));
        assertTrue(response.getRoles().contains(Role.ADMIN));
    }
}
