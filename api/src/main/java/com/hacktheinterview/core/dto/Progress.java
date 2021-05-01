package com.hacktheinterview.core.dto;

import com.hacktheinterview.core.models.Topic;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Builder
@Data
public class Progress {

  private final List<Topic> topics;

}
