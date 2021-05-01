package com.hacktheinterview.core.models;


import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Topic {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @NotNull
  @Column(unique = true)
  private String name;

  @NotNull
  private String description;

  @OneToMany(mappedBy = "topic")
  private List<Level> levels = new ArrayList<>();

  @OneToMany(mappedBy = "topic")
  private List<UserTopicLevel> userTopicLevel = new ArrayList<>();

}
