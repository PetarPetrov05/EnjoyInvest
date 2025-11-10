package com.example.demo.repository;

import com.example.demo.repository.repoModels.RepoRole;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<RepoRole, Long> {
    Optional<RepoRole> findByName(String name);
}