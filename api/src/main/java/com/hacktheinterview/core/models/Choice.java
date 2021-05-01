package com.hacktheinterview.core.models;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Data
public class Choice {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @NotNull
  private String content;

  @NotNull
  private boolean correct;

  @ManyToOne
  @JoinColumn(name = "questionId")
  private Question question;

}
