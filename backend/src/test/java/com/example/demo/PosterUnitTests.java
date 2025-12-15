package com.example.demo;

import com.example.demo.dto.PosterDTO;
import com.example.demo.repository.LikeRepository;
import com.example.demo.repository.PosterRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.repoModels.RepoLike;
import com.example.demo.repository.repoModels.RepoPoster;
import com.example.demo.repository.repoModels.RepoUser;
import com.example.demo.service.CommentService;
import com.example.demo.service.PosterService;
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
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PosterUnitTests {

    @Mock
    private PosterRepository posterRepository;

    @Mock
    private LikeRepository likeRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private CommentService commentService;

    @InjectMocks
    private PosterService posterService;

    @BeforeEach
    void clearSecurityContext() {
        SecurityContextHolder.clearContext();
    }

    // ---------------- HELPER ----------------

    private void mockAuthenticatedUser(String email) {
        Authentication auth = mock(Authentication.class);
        when(auth.isAuthenticated()).thenReturn(true);
        when(auth.getPrincipal()).thenReturn(email);

        SecurityContext context = mock(SecurityContext.class);
        when(context.getAuthentication()).thenReturn(auth);

        SecurityContextHolder.setContext(context);
    }

    // ---------------- getAllPosters ----------------

    @Test
    void getAllPosters_ReturnsMappedDtos() {
        RepoPoster repo = RepoPoster.builder().id(1L).build();

        when(posterRepository.findAll()).thenReturn(List.of(repo));
        when(likeRepository.countByPoster(repo)).thenReturn(5L);
        when(commentService.getCommentsForPoster(1L)).thenReturn(Collections.emptyList());

        List<PosterDTO> result = posterService.getAllPosters();

        assertEquals(1, result.size());
        assertEquals(5, result.get(0).getLikes());
    }

    // ---------------- getPosterById ----------------

    @Test
    void getPosterById_Found() {
        RepoPoster repo = RepoPoster.builder().id(1L).build();

        when(posterRepository.findById(1L)).thenReturn(Optional.of(repo));
        when(likeRepository.countByPoster(repo)).thenReturn(2L);
        when(commentService.getCommentsForPoster(1L)).thenReturn(Collections.emptyList());

        PosterDTO dto = posterService.getPosterById(1L);

        assertNotNull(dto);
    }

    @Test
    void getPosterById_NotFound() {
        when(posterRepository.findById(1L)).thenReturn(Optional.empty());

        assertNull(posterService.getPosterById(1L));
    }

    // ---------------- createPoster ----------------

    @Test
    void createPoster_SetsDefaultsAndSaves() {
        PosterDTO input = PosterDTO.builder()
                .title("Title")
                .build();

        RepoPoster saved = RepoPoster.builder().id(1L).build();
        when(posterRepository.save(any())).thenReturn(saved);

        PosterDTO result = posterService.createPoster(input);

        assertNotNull(result);
        verify(posterRepository).save(any());
    }

    @Test
    void createPoster_NullInput_ReturnsNull() {
        assertNull(posterService.createPoster(null));
    }

    // ---------------- updatePoster ----------------

    @Test
    void updatePoster_Found() {
        RepoPoster existing = RepoPoster.builder()
                .id(1L)
                .createdAt(LocalDateTime.now())
                .build();

        when(posterRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(posterRepository.save(any())).thenReturn(existing);
        when(commentService.getCommentsForPoster(1L)).thenReturn(Collections.emptyList());

        PosterDTO dto = PosterDTO.builder().title("Updated").build();

        PosterDTO result = posterService.updatePoster(1L, dto);

        assertNotNull(result);
    }

    @Test
    void updatePoster_NotFound() {
        when(posterRepository.findById(1L)).thenReturn(Optional.empty());

        assertNull(posterService.updatePoster(1L, new PosterDTO()));
    }

    // ---------------- deletePoster ----------------

    @Test
    void deletePoster_Found() {
        when(posterRepository.existsById(1L)).thenReturn(true);

        assertTrue(posterService.deletePoster(1L));
        verify(posterRepository).deleteById(1L);
    }

    @Test
    void deletePoster_NotFound() {
        when(posterRepository.existsById(1L)).thenReturn(false);

        assertFalse(posterService.deletePoster(1L));
    }

    // ---------------- toggleLike ----------------

    @Test
    void toggleLike_NotAuthenticated() {
        assertFalse(posterService.toggleLike(1L));
    }

    @Test
    void toggleLike_UserNotFound() {
        mockAuthenticatedUser("test@test.com");
        when(userRepository.findByEmail("test@test.com")).thenReturn(Optional.empty());

        assertFalse(posterService.toggleLike(1L));
    }

    @Test
    void toggleLike_PosterNotFound() {
        mockAuthenticatedUser("test@test.com");
        when(userRepository.findByEmail(any())).thenReturn(Optional.of(new RepoUser()));
        when(posterRepository.findById(1L)).thenReturn(Optional.empty());

        assertFalse(posterService.toggleLike(1L));
    }

    @Test
    void toggleLike_Like() {
        mockAuthenticatedUser("test@test.com");

        RepoUser user = new RepoUser();
        RepoPoster poster = RepoPoster.builder().likes(0).build();

        when(userRepository.findByEmail(any())).thenReturn(Optional.of(user));
        when(posterRepository.findById(1L)).thenReturn(Optional.of(poster));
        when(likeRepository.findByUserAndPoster(user, poster)).thenReturn(Optional.empty());

        boolean result = posterService.toggleLike(1L);

        assertTrue(result);
        verify(likeRepository).save(any());
    }

    @Test
    void toggleLike_Unlike() {
        mockAuthenticatedUser("test@test.com");

        RepoUser user = new RepoUser();
        RepoPoster poster = RepoPoster.builder().likes(1).build();
        RepoLike like = new RepoLike();

        when(userRepository.findByEmail(any())).thenReturn(Optional.of(user));
        when(posterRepository.findById(1L)).thenReturn(Optional.of(poster));
        when(likeRepository.findByUserAndPoster(user, poster)).thenReturn(Optional.of(like));

        boolean result = posterService.toggleLike(1L);

        assertFalse(result);
        verify(likeRepository).delete(like);
    }
}
