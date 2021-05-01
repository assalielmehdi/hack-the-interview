package com.hacktheinterview.core.repositories;

import com.hacktheinterview.core.models.Choice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "level", path = "levels")
public interface LevelRepository extends JpaRepository<Choice, Long> {
}

