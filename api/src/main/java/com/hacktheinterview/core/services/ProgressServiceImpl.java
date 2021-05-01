package com.hacktheinterview.core.services;

import com.hacktheinterview.core.dto.*;
import com.hacktheinterview.core.exceptions.NotFoundException;
import com.hacktheinterview.core.models.*;
import com.hacktheinterview.core.repositories.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class ProgressServiceImpl implements ProgressService {

  private final UserRepository userRepository;

  private final TopicRepository topicRepository;

  private final UserTopicLevelRepository userTopicLevelRepository;

  private final QuestionRepository questionRepository;

  private final ChoiceRepository choiceRepository;

  private final TagRepository tagRepository;

  @Override
  public ProgressDto getProgress(String email) {
    User user = userRepository.findByEmail(email)
      .orElseThrow(() -> {
        String notFoundMessage = String.format("User with email %s not found", email);
        log.info(notFoundMessage);
        return new NotFoundException(notFoundMessage);
      });

    List<TopicDto> topics = topicRepository.findAll()
      .stream()
      .map(topic -> fillTopic(user, topic))
      .collect(Collectors.toList());

    return ProgressDto.builder().topics(topics).build();
  }

  private TopicDto fillTopic(User user, Topic topic) {
    List<LevelDto> levels = userTopicLevelRepository
      .findAllByUserAndTopic(user, topic)
      .stream()
      .map(UserTopicLevel::getLevel)
      .map(level -> fillLevel(user, level))
      .collect(Collectors.toList());

    return TopicDto.builder()
      .name(topic.getName())
      .description(topic.getDescription())
      .levels(levels)
      .build();
  }

  private LevelDto fillLevel(User user, Level level) {
    List<QuestionDto> questions = questionRepository
      .findAllByUsersContainsAndLevel(user, level)
      .stream()
      .map(this::fillQuestion)
      .collect(Collectors.toList());

    return LevelDto.builder()
      .name(level.getName())
      .description(level.getDescription())
      .questions(questions)
      .build();
  }

  private QuestionDto fillQuestion(Question question) {
    List<ChoiceDto> choices = choiceRepository
      .findAllByQuestion(question)
      .stream()
      .map(choice -> ChoiceDto.builder()
        .id(choice.getId())
        .content(choice.getContent())
        .build()
      )
      .collect(Collectors.toList());

    List<String> tags = tagRepository
      .findAllByQuestionsContains(question)
      .stream()
      .map(Tag::getName)
      .collect(Collectors.toList());

    return QuestionDto.builder()
      .name(question.getName())
      .content(question.getContent())
      .difficulty(question.getDifficulty())
      .choices(choices)
      .tags(tags)
      .build();
  }

}
