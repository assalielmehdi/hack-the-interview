package com.hacktheinterview.core.services;

import com.hacktheinterview.core.dto.ProgressDto;

public interface ProgressService {

  ProgressDto getProgress(String email);

}
