package com.example.demo.repository;

import com.example.demo.repository.repoModels.RepoUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<RepoUser, Long> {}
