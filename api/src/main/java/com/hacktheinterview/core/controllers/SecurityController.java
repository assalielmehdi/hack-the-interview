package com.hacktheinterview.core.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api")
public class SecurityController {

  private final List<String> signed = new ArrayList<>();

  @GetMapping("login")
  public ResponseEntity<String> login(@AuthenticationPrincipal OAuth2User principal) {
    final String email = principal.getAttribute("email");
    if (signed.contains(email)) {
      return ResponseEntity.ok(email);
    }
    return ResponseEntity.badRequest().body(String.format("%s needs to sign up", email));
  }

  @GetMapping("signup")
  public ResponseEntity<String> signup(@AuthenticationPrincipal OAuth2User principal) {
    final String email = principal.getAttribute("email");
    if (signed.contains(email)) {
      return ResponseEntity.badRequest().body(String.format("%s already signed up", email));
    }
    signed.add(email);
    return ResponseEntity.ok(email);
  }

}
