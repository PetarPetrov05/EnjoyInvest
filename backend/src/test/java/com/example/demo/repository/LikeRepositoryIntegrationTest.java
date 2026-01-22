package com.example.demo.repository;

import com.example.demo.repository.repoModels.RepoLike;
import com.example.demo.repository.repoModels.RepoUser;
import com.example.demo.repository.repoModels.RepoPoster;
import com.example.demo.repository.repoModels.RepoRole;
import java.util.Set;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class LikeRepositoryIntegrationTest extends com.example.demo.BaseIntegrationTest {
    @Autowired
    private LikeRepository likeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PosterRepository posterRepository;

    @Test
    void findByUserAndPoster_returnsCorrectLike() {
        RepoRole role = roleRepository.findByName("USER").orElseGet(() -> {
            RepoRole newRole = new RepoRole();
            newRole.setName("USER");
            return roleRepository.save(newRole);
        });

        RepoUser user = userRepository.findByEmail("likeuser@example.com").orElseGet(() -> {
            RepoUser newUser = new RepoUser();
            newUser.setUsername("likeuser");
            newUser.setEmail("likeuser@example.com");
            newUser.setName("Like User");
            newUser.setPassword("password");
            newUser.setRoles(Set.of(role));
            return userRepository.save(newUser);
        });

        RepoPoster poster = new RepoPoster();
        poster.setTitle("Poster Title");
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

        RepoLike like = null;
        if (!likeRepository.findByUserAndPoster(user, poster).isPresent()) {
            like = new RepoLike();
            like.setUser(user);
            like.setPoster(poster);
            like = likeRepository.save(like);
        } else {
            like = likeRepository.findByUserAndPoster(user, poster).get();
        }

        assertTrue(likeRepository.findByUserAndPoster(user, poster).isPresent());
        assertTrue(likeRepository.existsByUserAndPoster(user, poster));
        assertEquals(1, likeRepository.countByPoster(poster));
        // Verify in DB
        assertTrue(likeRepository.findByUserAndPoster(user, poster).isPresent());
        assertTrue(likeRepository.existsById(like.getId()));
        assertEquals(user.getId(), likeRepository.findById(like.getId()).get().getUser().getId());
        assertEquals(poster.getId(), likeRepository.findById(like.getId()).get().getPoster().getId());
    }

    @Test
    void findByUserAndPoster_returnsCorrectLike_andVerifyInDatabase() {
        RepoRole role = roleRepository.findByName("USER").orElseGet(() -> {
            RepoRole newRole = new RepoRole();
            newRole.setName("USER");
            return roleRepository.save(newRole);
        });

        RepoUser user = userRepository.findByEmail("likeuser@example.com").orElseGet(() -> {
            RepoUser newUser = new RepoUser();
            newUser.setUsername("likeuser");
            newUser.setEmail("likeuser@example.com");
            newUser.setName("Like User");
            newUser.setPassword("password");
            newUser.setRoles(Set.of(role));
            return userRepository.save(newUser);
        });

        RepoPoster poster = new RepoPoster();
        poster.setTitle("Poster Title");
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

        RepoLike like = null;
        if (!likeRepository.findByUserAndPoster(user, poster).isPresent()) {
            like = new RepoLike();
            like.setUser(user);
            like.setPoster(poster);
            like = likeRepository.save(like);
        } else {
            like = likeRepository.findByUserAndPoster(user, poster).get();
        }

        assertTrue(likeRepository.findByUserAndPoster(user, poster).isPresent());
        assertTrue(likeRepository.existsByUserAndPoster(user, poster));
        assertEquals(1, likeRepository.countByPoster(poster));
        // Verify in DB
        assertTrue(likeRepository.existsById(like.getId()));
        assertEquals(user.getId(), likeRepository.findById(like.getId()).get().getUser().getId());
        assertEquals(poster.getId(), likeRepository.findById(like.getId()).get().getPoster().getId());
    }
}
