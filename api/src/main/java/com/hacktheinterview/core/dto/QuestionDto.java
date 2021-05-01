package com.hacktheinterview.core.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Builder
@Data
public class QuestionDto {

  private final String name;

  private final String content;

  private final int difficulty;

  private final List<ChoiceDto> choices;

  private final List<String> tags;

}
