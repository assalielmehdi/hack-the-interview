package com.hacktheinterview.core.services;

import com.hacktheinterview.core.dto.User;

import java.util.Optional;

public interface UserService {

  Optional<User> getByEmail(String email);

  void addUser(User user);

}
