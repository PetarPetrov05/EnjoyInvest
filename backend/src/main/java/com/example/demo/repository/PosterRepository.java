package com.example.demo.repository;

import com.example.demo.repository.repoModels.RepoPoster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PosterRepository extends JpaRepository<RepoPoster, Long> {
}