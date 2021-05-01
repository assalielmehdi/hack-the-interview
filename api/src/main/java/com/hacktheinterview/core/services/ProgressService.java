package com.hacktheinterview.core.services;

import com.hacktheinterview.core.dto.Progress;

public interface ProgressService {

  Progress getProgress(String email);

}
