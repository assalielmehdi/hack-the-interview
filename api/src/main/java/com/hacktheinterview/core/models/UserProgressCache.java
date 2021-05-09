package com.hacktheinterview.core.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
@Data
public class UserProgressCache {

  @Id
  private String email;

  @NotNull
  private String progressCache;

}
