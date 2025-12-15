package com.example.demo;

import com.example.demo.dto.CommentDTO;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.PosterRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.repoModels.RepoComment;
import com.example.demo.repository.repoModels.RepoPoster;
import com.example.demo.repository.repoModels.RepoUser;
import com.example.demo.service.CommentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CommentServiceUnitTests {

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private PosterRepository posterRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CommentService commentService;

    @BeforeEach
    void clearSecurityContext() {
        SecurityContextHolder.clearContext();
    }

    // ---------- Helper ----------
    private void mockAuthenticatedUser(String email) {
        Authentication auth = mock(Authentication.class);
        when(auth.isAuthenticated()).thenReturn(true);
        when(auth.getPrincipal()).thenReturn(email);

        SecurityContext context = mock(SecurityContext.class);
        when(context.getAuthentication()).thenReturn(auth);

        SecurityContextHolder.setContext(context);
    }

    // ---------- addComment ----------

    @Test
    void addComment_NotAuthenticated_ReturnsNull() {
        CommentDTO result = commentService.addComment(1L, "Hello");

        assertNull(result);
    }

    @Test
    void addComment_UserNotFound_ThrowsException() {
        mockAuthenticatedUser("test@test.com");

        when(userRepository.findByEmail("test@test.com"))
                .thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(
                RuntimeException.class,
                () -> commentService.addComment(1L, "Hello")
        );

        assertEquals("User not found", ex.getMessage());
    }

    @Test
    void addComment_PosterNotFound_ThrowsException() {
        mockAuthenticatedUser("test@test.com");

        RepoUser user = RepoUser.builder().id(1L).build();

        when(userRepository.findByEmail(any()))
                .thenReturn(Optional.of(user));
        when(posterRepository.findById(1L))
                .thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(
                RuntimeException.class,
                () -> commentService.addComment(1L, "Hello")
        );

        assertEquals("Poster not found", ex.getMessage());
    }

    @Test
    void addComment_SuccessfullyCreatesComment() {
        mockAuthenticatedUser("test@test.com");

        RepoUser user = RepoUser.builder()
                .id(1L)
                .username("john")
                .build();

        RepoPoster poster = RepoPoster.builder()
                .id(2L)
                .build();

        RepoComment saved = RepoComment.builder()
                .id(3L)
                .user(user)
                .poster(poster)
                .content("Nice post")
                .createdAt(LocalDateTime.now())
                .build();

        when(userRepository.findByEmail(any())).thenReturn(Optional.of(user));
        when(posterRepository.findById(2L)).thenReturn(Optional.of(poster));
        when(commentRepository.save(any())).thenReturn(saved);

        CommentDTO dto = commentService.addComment(2L, "Nice post");

        assertNotNull(dto);
        assertEquals(3L, dto.getId());
        assertEquals(2L, dto.getPosterId());
        assertEquals(1L, dto.getUserId());
        assertEquals("john", dto.getUsername());
        assertEquals("Nice post", dto.getContent());
    }

    // ---------- getCommentsForPoster ----------

    @Test
    void getCommentsForPoster_PosterNotFound_ThrowsException() {
        when(posterRepository.findById(1L))
                .thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(
                RuntimeException.class,
                () -> commentService.getCommentsForPoster(1L)
        );

        assertEquals("Poster not found", ex.getMessage());
    }

    @Test
    void getCommentsForPoster_ReturnsMappedComments() {
        RepoPoster poster = RepoPoster.builder().id(1L).build();

        RepoUser user = RepoUser.builder()
                .id(10L)
                .username("alice")
                .build();

        RepoComment comment = RepoComment.builder()
                .id(5L)
                .poster(poster)
                .user(user)
                .content("Great!")
                .createdAt(LocalDateTime.now())
                .build();

        when(posterRepository.findById(1L)).thenReturn(Optional.of(poster));
        when(commentRepository.findByPosterOrderByCreatedAtAsc(poster))
                .thenReturn(List.of(comment));

        List<CommentDTO> result = commentService.getCommentsForPoster(1L);

        assertEquals(1, result.size());
        assertEquals("Great!", result.get(0).getContent());
        assertEquals("alice", result.get(0).getUsername());
    }
}
