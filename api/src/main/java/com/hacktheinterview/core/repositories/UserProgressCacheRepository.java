package com.hacktheinterview.core.repositories;

import com.hacktheinterview.core.models.UserProgressCache;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserProgressCacheRepository extends JpaRepository<UserProgressCache, String> {

  Optional<UserProgressCache> findByEmail(String email);

}
