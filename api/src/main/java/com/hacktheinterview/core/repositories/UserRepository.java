package com.hacktheinterview.core.repositories;

import com.hacktheinterview.core.dto.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, String> {

  Optional<User> findByEmail(String email);

}
