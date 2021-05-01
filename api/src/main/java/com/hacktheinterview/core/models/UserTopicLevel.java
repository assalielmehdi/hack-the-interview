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
  @JoinColumn(name = "userId", nullable = false)
  private User user;

  @ManyToOne
  @JoinColumn(name = "topicId", nullable = false)
  private Topic topic;

  @ManyToOne
  @JoinColumn(name = "levelId", nullable = false)
  private Level level;

}
