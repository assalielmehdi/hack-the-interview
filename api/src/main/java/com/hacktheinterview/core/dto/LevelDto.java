package com.hacktheinterview.core.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Builder
@Data
public class LevelDto {

  private final String name;

  private final String description;

  private final List<QuestionDto> questions;

}
