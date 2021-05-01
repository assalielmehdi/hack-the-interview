package com.hacktheinterview.core.models;


import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @NotNull
  @Column(unique = true)
  private String email;

  @NotNull
  private String name;

  @ManyToMany
  @JoinTable(
    name = "user_question",
    joinColumns = {@JoinColumn(name = "userId")},
    inverseJoinColumns = {@JoinColumn(name = "questionId")}
  )
  private List<Question> questions = new ArrayList<>();

  @OneToMany(mappedBy = "user")
  private List<UserTopicLevel> userTopicLevel = new ArrayList<>();

}
