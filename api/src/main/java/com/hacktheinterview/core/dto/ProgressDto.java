package com.hacktheinterview.core.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Builder
@Data
public class ProgressDto {

  private final List<TopicDto> topics;

}
