package com.hacktheinterview.core.controllers;

import com.hacktheinterview.core.dto.User;
import com.hacktheinterview.core.helpers.UserHelper;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
@AllArgsConstructor
public class SecurityController {

  private final UserHelper userHelper;

  @GetMapping("/authenticated")
  public ResponseEntity<User> user(@AuthenticationPrincipal OAuth2User principal) {
    User user = userHelper.fromOAuth2User(principal);
    return ResponseEntity.ok(user);
  }

}
