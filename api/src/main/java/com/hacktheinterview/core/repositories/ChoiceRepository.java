package com.hacktheinterview.core.repositories;


import com.hacktheinterview.core.models.Choice;
import com.hacktheinterview.core.models.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "choices", path = "choices")
public interface ChoiceRepository extends JpaRepository<Choice, Long> {

  List<Choice> findAllByQuestion(Question question);

}
