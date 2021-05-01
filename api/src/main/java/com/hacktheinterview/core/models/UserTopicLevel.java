package com.hacktheinterview.core.models;


import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "user_topic_level")
@Data
public class UserTopicLevel {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "userId")
  private User user;

  @ManyToOne
  @JoinColumn(name = "topicId")
  private Topic topic;

  @ManyToOne
  @JoinColumn(name = "levelId")
  private Level level;

}
