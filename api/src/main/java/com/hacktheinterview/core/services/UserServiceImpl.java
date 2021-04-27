package com.hacktheinterview.core.services;

import com.hacktheinterview.core.dto.User;
import com.hacktheinterview.core.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;

  @Override
  public Optional<User> getByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  @Override
  public void addUser(User user) {
    userRepository.save(user);
  }

}
