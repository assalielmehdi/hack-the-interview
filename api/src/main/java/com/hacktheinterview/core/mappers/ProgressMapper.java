package com.hacktheinterview.core.mappers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hacktheinterview.core.dto.Progress;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class ProgressMapper {

  private final ObjectMapper objectMapper;

  @SneakyThrows
  public String toJson(Progress progress) {
    return objectMapper.writeValueAsString(progress);
  }

  @SneakyThrows
  public Progress fromJson(String json) {
    return objectMapper.readValue(json, Progress.class);
  }

}
