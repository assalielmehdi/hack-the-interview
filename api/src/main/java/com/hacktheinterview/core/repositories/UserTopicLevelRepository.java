package com.hacktheinterview.core.repositories;

import com.hacktheinterview.core.models.UserTopicLevel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTopicLevelRepository extends JpaRepository<UserTopicLevel, Long> {
}
