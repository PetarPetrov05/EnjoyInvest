package com.example.demo.repository;

import com.example.demo.repository.repoModels.RepoMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<RepoMessage, Long> {}