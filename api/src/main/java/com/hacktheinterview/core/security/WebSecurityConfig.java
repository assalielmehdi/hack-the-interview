package com.hacktheinterview.core.security;

import com.hacktheinterview.core.properties.SpaProperties;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@Configuration
@AllArgsConstructor
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  private final AuthenticationSuccessHandler authenticationSuccessHandler;

  private final SpaProperties spaProperties;

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.authorizeRequests()
      .antMatchers(spaProperties.getPatterns().toArray(new String[0])).permitAll()
      .anyRequest().authenticated()
      .and()
      .oauth2Login().successHandler(authenticationSuccessHandler);
  }

}