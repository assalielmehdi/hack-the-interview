package com.hacktheinterview.core.repositories;

import com.hacktheinterview.core.models.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "question", path = "questions")
public interface QuestionRepository extends JpaRepository<Question, Long> {
}
