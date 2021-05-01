package com.hacktheinterview.core.repositories;

import com.hacktheinterview.core.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "user", path = "users")
public interface UserRepository extends JpaRepository<User, Long> {
}