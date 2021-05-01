package com.hacktheinterview.core.models;


import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Tag {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @NotNull
  @Column(unique = true)
  private String name;

  @ManyToMany(mappedBy = "tags")
  private List<Question> questions = new ArrayList<>();

}
