package com.hacktheinterview.core.repositories;

import com.hacktheinterview.core.models.Level;
import com.hacktheinterview.core.models.Question;
import com.hacktheinterview.core.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "questions", path = "questions")
public interface QuestionRepository extends JpaRepository<Question, Long> {

  List<Question> findAllByUsersContainsAndLevel(User user, Level level);

}
