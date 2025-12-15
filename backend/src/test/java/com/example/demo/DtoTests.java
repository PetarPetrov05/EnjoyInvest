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
import com.example.demo.dto.CommentRequest;
import com.example.demo.model.Poster;
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
    @Test
void testPosterDTO_EqualsHashCodeToStringAndExtraFields() {
    // Arrange
    LocalDateTime now = LocalDateTime.now();

    PosterDTO poster1 = PosterDTO.builder()
            .id(1L)
            .title("Poster")
            .description("Desc")
            .fullDescription("Full Desc")
            .price("$10")
            .type("Sale")
            .category("Tech")
            .image("img.jpg")
            .images(List.of("1.jpg"))
            .likes(5)
            .saved(true)
            .isLiked(true)
            .location("NY")
            .phone("123")
            .email("a@test.com")
            .createdAt(now)
            .updatedAt(now)
            .comments(List.of(new CommentDTO()))
            .build();

    PosterDTO poster2 = PosterDTO.builder()
            .id(1L)
            .title("Poster")
            .description("Desc")
            .fullDescription("Full Desc")
            .price("$10")
            .type("Sale")
            .category("Tech")
            .image("img.jpg")
            .images(List.of("1.jpg"))
            .likes(5)
            .saved(true)
            .isLiked(true)
            .location("NY")
            .phone("123")
            .email("a@test.com")
            .createdAt(now)
            .updatedAt(now)
            .comments(List.of(new CommentDTO()))
            .build();

    // equals & hashCode (covers canEqual internally)
    assertEquals(poster1, poster2);
    assertEquals(poster1.hashCode(), poster2.hashCode());

    // equals edge cases
    assertNotEquals(poster1, null);
    assertNotEquals(poster1, new Object());

    PosterDTO differentPoster = PosterDTO.builder().id(2L).build();
    assertNotEquals(poster1, differentPoster);

    // toString
    String toStringResult = poster1.toString();
    assertNotNull(toStringResult);
    assertTrue(toStringResult.contains("PosterDTO"));
    assertTrue(toStringResult.contains("Poster"));

    // isLiked getter/setter
    poster1.setIsLiked(false);
    assertFalse(poster1.getIsLiked());

    // comments getter/setter
    List<CommentDTO> comments = List.of(new CommentDTO(), new CommentDTO());
    poster1.setComments(comments);
    assertEquals(comments, poster1.getComments());
}
@Test
void testPosterDTO_NoArgsConstructor() {
    PosterDTO poster = new PosterDTO();
    assertNotNull(poster);
}
@Test
void testCommentDTO_AllMethods() {
    LocalDateTime now = LocalDateTime.now();

    CommentDTO comment1 = CommentDTO.builder()
            .id(1L)
            .posterId(10L)
            .userId(20L)
            .username("john")
            .content("Nice poster!")
            .createdAt(now)
            .build();

    CommentDTO comment2 = CommentDTO.builder()
            .id(1L)
            .posterId(10L)
            .userId(20L)
            .username("john")
            .content("Nice poster!")
            .createdAt(now)
            .build();

    // getters
    assertEquals(1L, comment1.getId());
    assertEquals(10L, comment1.getPosterId());
    assertEquals(20L, comment1.getUserId());
    assertEquals("john", comment1.getUsername());
    assertEquals("Nice poster!", comment1.getContent());
    assertEquals(now, comment1.getCreatedAt());

    // setters
    comment1.setContent("Updated content");
    assertEquals("Updated content", comment1.getContent());

    // equals & hashCode (covers canEqual internally)
    assertEquals(comment2, comment2); // self check
    assertEquals(comment2, comment2);
    assertEquals(comment2.hashCode(), comment2.hashCode());

    assertEquals(comment2, CommentDTO.builder()
            .id(1L)
            .posterId(10L)
            .userId(20L)
            .username("john")
            .content("Nice poster!")
            .createdAt(now)
            .build());

    assertNotEquals(comment1, null);
    assertNotEquals(comment1, new Object());

    CommentDTO different = CommentDTO.builder().id(2L).build();
    assertNotEquals(comment1, different);

    // toString (ONLY check it runs)
    assertNotNull(comment1.toString());
}
@Test
void testCommentRequest_GettersSettersEqualsAndToString() {
    CommentRequest request1 = new CommentRequest();
    request1.setContent("Hello");

    CommentRequest request2 = new CommentRequest();
    request2.setContent("Hello");

    // getter / setter
    assertEquals("Hello", request1.getContent());

    // equals & hashCode
    assertEquals(request1, request2);
    assertEquals(request1.hashCode(), request2.hashCode());

    // equals edge cases
    assertNotEquals(request1, null);
    assertNotEquals(request1, new Object());

    CommentRequest different = new CommentRequest();
    different.setContent("Different");
    assertNotEquals(request1, different);

    // toString
    String toStringResult = request1.toString();
    assertNotNull(toStringResult);
    assertTrue(toStringResult.contains("CommentRequest"));
    assertTrue(toStringResult.contains("Hello"));
}
@Test
void testPosterModel_AllLombokMethods() {
    LocalDateTime now = LocalDateTime.now();

    Poster poster1 = Poster.builder()
            .id(1L)
            .title("Title")
            .description("Desc")
            .fullDescription("Full Desc")
            .price("$100")
            .type("Sale")
            .category("Tech")
            .image("img.jpg")
            .images(List.of("1.jpg", "2.jpg"))
            .likes(5)
            .saved(true)
            .location("NY")
            .phone("123")
            .email("a@test.com")
            .createdAt(now)
            .updatedAt(now)
            .build();

    Poster poster2 = Poster.builder()
            .id(1L)
            .title("Title")
            .description("Desc")
            .fullDescription("Full Desc")
            .price("$100")
            .type("Sale")
            .category("Tech")
            .image("img.jpg")
            .images(List.of("1.jpg", "2.jpg"))
            .likes(5)
            .saved(true)
            .location("NY")
            .phone("123")
            .email("a@test.com")
            .createdAt(now)
            .updatedAt(now)
            .build();

    // getters
    assertEquals(1L, poster1.getId());
    assertEquals("Title", poster1.getTitle());
    assertEquals("Desc", poster1.getDescription());

    // setters
    poster1.setTitle("New Title");
    assertEquals("New Title", poster1.getTitle());

    // equals & hashCode (covers canEqual internally)
    assertEquals(poster2, poster2);
    assertEquals(poster2, poster2);
    assertEquals(poster2.hashCode(), poster2.hashCode());

    assertEquals(poster2, Poster.builder()
            .id(1L)
            .title("Title")
            .description("Desc")
            .fullDescription("Full Desc")
            .price("$100")
            .type("Sale")
            .category("Tech")
            .image("img.jpg")
            .images(List.of("1.jpg", "2.jpg"))
            .likes(5)
            .saved(true)
            .location("NY")
            .phone("123")
            .email("a@test.com")
            .createdAt(now)
            .updatedAt(now)
            .build());

    assertNotEquals(poster1, null);
    assertNotEquals(poster1, new Object());

    Poster different = Poster.builder().id(2L).build();
    assertNotEquals(poster1, different);

    // toString
    assertNotNull(poster1.toString());

    // no-args constructor
    assertNotNull(new Poster());
}
}
