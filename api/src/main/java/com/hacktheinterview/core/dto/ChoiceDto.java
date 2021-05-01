package com.hacktheinterview.core.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Builder
@Data
public class ChoiceDto {

  private final long id;

  private final String content;

}
