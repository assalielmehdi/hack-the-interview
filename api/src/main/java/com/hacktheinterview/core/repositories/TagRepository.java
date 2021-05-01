package com.hacktheinterview.core.repositories;

import com.hacktheinterview.core.models.Question;
import com.hacktheinterview.core.models.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "tag", path = "tags")
public interface TagRepository extends JpaRepository<Tag, Long> {

  List<Tag> findAllByQuestionsContains(Question question);

}