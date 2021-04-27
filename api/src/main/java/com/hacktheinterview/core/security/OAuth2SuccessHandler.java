package com.hacktheinterview.core.security;

import com.hacktheinterview.core.dto.User;
import com.hacktheinterview.core.helpers.UserHelper;
import com.hacktheinterview.core.services.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@AllArgsConstructor
@Slf4j
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

  private final UserService userService;

  private final UserHelper userHelper;

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
    User user = userHelper.fromOAuth2User((OAuth2User) authentication.getPrincipal());

    log.info("User {} is logged in correctly", user.getEmail());

    if (userService.getByEmail(user.getEmail()).isEmpty()) {
      userService.addUser(user);

      log.info("User {} is signed up correctly", user.getEmail());
    }

    response.sendRedirect("/");
  }

}
