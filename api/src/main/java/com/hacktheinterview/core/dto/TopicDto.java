package com.hacktheinterview.core.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Builder
@Data
public class TopicDto {

  private final String name;

  private final String description;

  private final List<LevelDto> levels;

}
