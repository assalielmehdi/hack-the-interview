package com.hacktheinterview.core.repositories;

import com.hacktheinterview.core.models.Level;
import com.hacktheinterview.core.models.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "levels", path = "levels")
public interface LevelRepository extends JpaRepository<Level, Long> {

  List<Level> findAllByTopic(Topic topic);

}

