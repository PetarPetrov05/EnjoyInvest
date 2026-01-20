package com.example.demo.repository;

import com.example.demo.repository.repoModels.RepoComment;
import com.example.demo.repository.repoModels.RepoPoster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<RepoComment, Long> {

    List<RepoComment> findByPosterOrderByCreatedAtAsc(RepoPoster poster);

}
