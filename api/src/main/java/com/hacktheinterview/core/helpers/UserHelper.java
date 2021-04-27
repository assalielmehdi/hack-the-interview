package com.hacktheinterview.core.helpers;

import com.hacktheinterview.core.dto.User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

@Component
public class UserHelper {

  public User fromOAuth2User(OAuth2User oAuth2User) {
    return User.builder()
      .email(oAuth2User.getAttribute("email"))
      .name(oAuth2User.getAttribute("name"))
      .build();
  }

}
