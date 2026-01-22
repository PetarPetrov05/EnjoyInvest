package com.example.demo.repository;

import com.example.demo.repository.repoModels.RepoComment;
import com.example.demo.repository.repoModels.RepoPoster;
import com.example.demo.repository.repoModels.RepoUser;
import com.example.demo.repository.repoModels.RepoRole;
import java.util.Set;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CommentRepositoryIntegrationTest extends com.example.demo.BaseIntegrationTest {
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private PosterRepository posterRepository;

    @Test
    void findByPosterOrderByCreatedAtAsc_returnsComments() {
        RepoPoster poster = new RepoPoster();
        poster.setTitle("Poster for Comments");
        poster.setDescription("desc");
        poster.setFullDescription("full desc");
        poster.setPrice("100");
        poster.setType("type");
        poster.setCategory("cat");
        poster.setImage("img.png");
        poster.setLikes(0);
        poster.setSaved(false);
        poster.setLocation("loc");
        poster.setPhone("1234567890");
        poster.setEmail("poster@example.com");
        poster = posterRepository.save(poster);

        RepoRole role = roleRepository.findByName("USER").orElseGet(() -> {
            RepoRole newRole = new RepoRole();
            newRole.setName("USER");
            return roleRepository.save(newRole);
        });

        RepoUser user = userRepository.findByEmail("commentuser@example.com").orElseGet(() -> {
            RepoUser newUser = new RepoUser();
            newUser.setUsername("commentuser");
            newUser.setEmail("commentuser@example.com");
            newUser.setName("Comment User");
            newUser.setPassword("password");
            newUser.setRoles(Set.of(role));
            return userRepository.save(newUser);
        });

        // Ensure referenced user and poster exist before creating comments
        if (user.getId() != null && poster.getId() != null) {
            RepoComment comment1 = new RepoComment();
            comment1.setPoster(poster);
            comment1.setUser(user);
            comment1.setContent("First comment");
            comment1 = commentRepository.save(comment1);

            RepoComment comment2 = new RepoComment();
            comment2.setPoster(poster);
            comment2.setUser(user);
            comment2.setContent("Second comment");
            comment2 = commentRepository.save(comment2);
        }

        List<RepoComment> comments = commentRepository.findByPosterOrderByCreatedAtAsc(poster);
        assertEquals(2, comments.size());
        assertEquals("First comment", comments.get(0).getContent());
        assertEquals("Second comment", comments.get(1).getContent());
    }

    @Test
    void findByPosterOrderByCreatedAtAsc_returnsComments_andVerifyInDatabase() {
        RepoPoster poster = new RepoPoster();
        poster.setTitle("Poster for Comments");
        poster.setDescription("desc");
        poster.setFullDescription("full desc");
        poster.setPrice("100");
        poster.setType("type");
        poster.setCategory("cat");
        poster.setImage("img.png");
        poster.setLikes(0);
        poster.setSaved(false);
        poster.setLocation("loc");
        poster.setPhone("1234567890");
        poster.setEmail("poster@example.com");
        poster = posterRepository.save(poster);

        RepoRole role = roleRepository.findByName("USER").orElseGet(() -> {
            RepoRole newRole = new RepoRole();
            newRole.setName("USER");
            return roleRepository.save(newRole);
        });

        RepoUser user = userRepository.findByEmail("commentuser@example.com").orElseGet(() -> {
            RepoUser newUser = new RepoUser();
            newUser.setUsername("commentuser");
            newUser.setEmail("commentuser@example.com");
            newUser.setName("Comment User");
            newUser.setPassword("password");
            newUser.setRoles(Set.of(role));
            return userRepository.save(newUser);
        });

        RepoComment comment1 = null;
        RepoComment comment2 = null;
        if (user.getId() != null && poster.getId() != null) {
            comment1 = new RepoComment();
            comment1.setPoster(poster);
            comment1.setUser(user);
            comment1.setContent("First comment");
            comment1 = commentRepository.save(comment1);

            comment2 = new RepoComment();
            comment2.setPoster(poster);
            comment2.setUser(user);
            comment2.setContent("Second comment");
            comment2 = commentRepository.save(comment2);
        }

        List<RepoComment> comments = commentRepository.findByPosterOrderByCreatedAtAsc(poster);
        assertEquals(2, comments.size());
        assertEquals("First comment", comments.get(0).getContent());
        assertEquals("Second comment", comments.get(1).getContent());
        // Verify in DB
        assertTrue(commentRepository.existsById(comment1.getId()));
        assertTrue(commentRepository.existsById(comment2.getId()));
        assertEquals("First comment", commentRepository.findById(comment1.getId()).get().getContent());
        assertEquals("Second comment", commentRepository.findById(comment2.getId()).get().getContent());
    }
}
