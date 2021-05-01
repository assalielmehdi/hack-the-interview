package com.hacktheinterview.core.controllers;

import com.hacktheinterview.core.dto.ProgressDto;
import com.hacktheinterview.core.services.ProgressService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class ProgressController {

  private final ProgressService progressService;

  @GetMapping("progress/{email}")
  @ResponseStatus(HttpStatus.OK)
  public ProgressDto getProgress(@PathVariable String email) {
    return progressService.getProgress(email);
  }

}
