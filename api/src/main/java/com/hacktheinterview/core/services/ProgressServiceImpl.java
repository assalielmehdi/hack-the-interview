package com.hacktheinterview.core.services;

import com.hacktheinterview.core.dto.Progress;
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

  private final LevelRepository levelRepository;

  private final QuestionRepository questionRepository;

  private final ChoiceRepository choiceRepository;

  private final TagRepository tagRepository;

  private final UserTopicLevelRepository userTopicLevelRepository;

  @Override
  public Progress getProgress(String email) {
    User user = userRepository.findByEmail(email)
      .orElseThrow(() -> {
        String notFoundMessage = String.format("User with email %s not found", email);
        log.info(notFoundMessage);
        return new NotFoundException(notFoundMessage);
      });

    List<Topic> topics = topicRepository.findAll();

    topics.forEach(topic -> fillTopic(user, topic));

    return Progress.builder().topics(topics).build();
  }

  private void fillTopic(User user, Topic topic) {
    List<Level> levels = levelRepository.findAllByTopic(topic);

    List<Level> unlockedLevels = userTopicLevelRepository
      .findAllByUserAndTopic(user, topic)
      .stream()
      .map(UserTopicLevel::getLevel)
      .collect(Collectors.toList());

    levels.stream()
      .filter(unlockedLevels::contains)
      .forEach(level -> fillLevel(user, level));

    topic.setLevels(levels);
  }

  private void fillLevel(User user, Level level) {
    List<Question> questions = questionRepository.findAllByUsersContainsAndLevel(user, level);

    questions.forEach(this::fillQuestion);

    level.setQuestions(questions);
  }

  private void fillQuestion(Question question) {
    List<Choice> choices = choiceRepository.findAllByQuestion(question);
    List<Tag> tags = tagRepository.findAllByQuestionsContains(question);

    choices.forEach(choice -> choice.setCorrect(false));

    question.setChoices(choices);
    question.setTags(tags);
  }

}
