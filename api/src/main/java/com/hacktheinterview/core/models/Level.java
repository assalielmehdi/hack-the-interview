package com.hacktheinterview.core.models;


import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Level {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @NotNull
  private String name;

  @NotNull
  private String description;

  @NotNull
  private int priority;

  @OneToMany(mappedBy = "level")
  private List<Question> questions = new ArrayList<>();

  @OneToMany(mappedBy = "level")
  private List<UserTopicLevel> userTopicLevel = new ArrayList<>();

  @ManyToOne
  @JoinColumn(name = "topicId")
  private Topic topic;

}
