package com.example.demo.repository;

import com.example.demo.repository.repoModels.RepoLike;
import com.example.demo.repository.repoModels.RepoUser;
import com.example.demo.repository.repoModels.RepoPoster;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<RepoLike, Long> {
    Optional<RepoLike> findByUserAndPoster(RepoUser user, RepoPoster poster);
    boolean existsByUserAndPoster(RepoUser user, RepoPoster poster);
    long countByPoster(RepoPoster poster);
}