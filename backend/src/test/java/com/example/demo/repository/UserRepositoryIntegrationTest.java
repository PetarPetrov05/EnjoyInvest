package com.example.demo.repository;

import com.example.demo.repository.repoModels.RepoUser;
import com.example.demo.repository.repoModels.RepoRole;
import java.util.Set;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserRepositoryIntegrationTest extends com.example.demo.BaseIntegrationTest {
    @Autowired
    private UserRepository userRepository;

    @Test
    void findByEmail_returnsCorrectUser() {
        RepoRole role = roleRepository.findByName("USER").orElseGet(() -> {
            RepoRole newRole = new RepoRole();
            newRole.setName("USER");
            return roleRepository.save(newRole);
        });

        RepoUser user = userRepository.findByEmail("test@example.com").orElseGet(() -> {
            RepoUser newUser = new RepoUser();
            newUser.setUsername("testuser");
            newUser.setEmail("test@example.com");
            newUser.setName("Test User");
            newUser.setPassword("password");
            newUser.setRoles(Set.of(role));
            return userRepository.save(newUser);
        });

        Optional<RepoUser> found = userRepository.findByEmail("test@example.com");
        assertTrue(found.isPresent());
        assertEquals("testuser", found.get().getUsername());
    }

    @Test
    void findByEmail_returnsCorrectUser_andVerifyInDatabase() {
        RepoRole role = roleRepository.findByName("USER").orElseGet(() -> {
            RepoRole newRole = new RepoRole();
            newRole.setName("USER");
            return roleRepository.save(newRole);
        });

        RepoUser user = userRepository.findByEmail("test@example.com").orElseGet(() -> {
            RepoUser newUser = new RepoUser();
            newUser.setUsername("testuser");
            newUser.setEmail("test@example.com");
            newUser.setName("Test User");
            newUser.setPassword("password");
            newUser.setRoles(Set.of(role));
            return userRepository.save(newUser);
        });

        Optional<RepoUser> found = userRepository.findByEmail("test@example.com");
        assertTrue(found.isPresent());
        assertEquals("testuser", found.get().getUsername());
        // Verify in DB
        assertTrue(userRepository.existsById(found.get().getId()));
        assertEquals("testuser", userRepository.findById(found.get().getId()).get().getUsername());
    }
}
