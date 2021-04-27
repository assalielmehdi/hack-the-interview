package com.hacktheinterview.core.properties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

@ConfigurationProperties(prefix = "spa")
@AllArgsConstructor
@Getter
public class SpaProperties {

  private final List<String> patterns;

}
