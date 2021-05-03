package com.hacktheinterview.core.configurations;

import com.hacktheinterview.core.models.*;
import com.hacktheinterview.core.properties.CorsProperties;
import lombok.AllArgsConstructor;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Component
@AllArgsConstructor
public class DataRestConfig implements RepositoryRestConfigurer {

  private final CorsProperties corsProperties;

  @Override
  public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
    cors
      .addMapping("/**")
      .allowedMethods("*")
      .allowedOrigins(corsProperties.getOrigins().toArray(new String[0]));

    config.exposeIdsFor(User.class, Topic.class, Level.class, Question.class, Tag.class, Choice.class);
  }

}
