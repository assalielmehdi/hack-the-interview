package com.hacktheinterview.core.repositories;

import com.hacktheinterview.core.models.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "topic", path = "topics")
public interface TopicRepository extends JpaRepository<Topic, Long> {
}