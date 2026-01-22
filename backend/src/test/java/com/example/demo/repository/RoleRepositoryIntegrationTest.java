package com.example.demo.repository;

import com.example.demo.repository.repoModels.RepoRole;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RoleRepositoryIntegrationTest extends com.example.demo.BaseIntegrationTest {
    @Autowired
    private RoleRepository roleRepository;

    @Test
    void findByName_returnsCorrectRole() {
        RepoRole role = roleRepository.findByName("ADMIN").orElseGet(() -> {
            RepoRole newRole = new RepoRole();
            newRole.setName("ADMIN");
            return roleRepository.save(newRole);
        });

        Optional<RepoRole> found = roleRepository.findByName("ADMIN");
        assertTrue(found.isPresent());
        assertEquals("ADMIN", found.get().getName());
    }

    @Test
    void findByName_returnsCorrectRole_andVerifyInDatabase() {
        RepoRole role = roleRepository.findByName("ADMIN").orElseGet(() -> {
            RepoRole newRole = new RepoRole();
            newRole.setName("ADMIN");
            return roleRepository.save(newRole);
        });

        Optional<RepoRole> found = roleRepository.findByName("ADMIN");
        assertTrue(found.isPresent());
        assertEquals("ADMIN", found.get().getName());
        // Verify in DB
        Long id = found.get().getId().longValue();
        assertTrue(roleRepository.existsById(id));
        assertEquals("ADMIN", roleRepository.findById(id).get().getName());
    }
}
