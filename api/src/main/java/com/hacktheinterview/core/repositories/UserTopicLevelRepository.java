package com.hacktheinterview.core.repositories;

import com.hacktheinterview.core.models.Topic;
import com.hacktheinterview.core.models.User;
import com.hacktheinterview.core.models.UserTopicLevel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserTopicLevelRepository extends JpaRepository<UserTopicLevel, Long> {

  List<UserTopicLevel> findAllByUserAndTopic(User user, Topic topic);

}
