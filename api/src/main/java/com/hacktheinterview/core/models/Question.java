package com.hacktheinterview.core.models;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Question {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @NotNull
  @Column(unique = true)
  private String name;

  @NotNull
  private String content;

  @NotNull
  private String correctAnswer;

  @NotNull
  private int difficulty;

  @OneToMany(mappedBy = "question")
  private List<Choice> choices = new ArrayList<>();

  @ManyToMany
  @JoinTable(
    name = "question_tag",
    joinColumns = {@JoinColumn(name = "questionId")},
    inverseJoinColumns = {@JoinColumn(name = "tagId")}
  )
  private List<Tag> tags = new ArrayList<>();

  @ManyToMany(mappedBy = "questions")
  private List<User> users = new ArrayList<>();

  @ManyToOne
  @JoinColumn(name = "levelId")
  private Level level;

}
