package com.hacktheinterview.core.services;

import com.hacktheinterview.core.dto.Progress;
import com.hacktheinterview.core.exceptions.NotFoundException;
import com.hacktheinterview.core.mappers.ProgressMapper;
import com.hacktheinterview.core.models.*;
import com.hacktheinterview.core.repositories.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProgressServiceImplTest {

  @Mock
  private UserRepository userRepository;

  @Mock
  private TopicRepository topicRepository;

  @Mock
  private LevelRepository levelRepository;

  @Mock
  private QuestionRepository questionRepository;

  @Mock
  private ChoiceRepository choiceRepository;

  @Mock
  private TagRepository tagRepository;

  @Mock
  private UserTopicLevelRepository userTopicLevelRepository;

  @Mock
  private UserProgressCacheRepository userProgressCacheRepository;

  @Mock
  private ProgressMapper progressMapper;

  @InjectMocks
  private ProgressServiceImpl progressServiceImpl;

  @BeforeEach
  void init() throws Exception {
    MockitoAnnotations.openMocks(this).close();
  }

  @Test
  void givenNotFoundEmailShouldThrowNotFoundException() {
    // Given
    final String email = "email";

    when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

    assertThrows(
      // Then
      NotFoundException.class,
      // When
      () -> progressServiceImpl.getProgress(email)
    );
  }

  @Test
  void givenFoundUserAndNoUnlockedLevelsShouldReturnCorrectProgress() {
    // Given
    final String email = "email";
    final User user = mock(User.class);
    final Topic topic = new Topic();
    final List<Topic> topics = List.of(topic);
    final Level level = mock(Level.class);
    final List<Level> levels = List.of(level);

    when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
    when(topicRepository.findAll()).thenReturn(topics);
    when(levelRepository.findAllByTopic(topic)).thenReturn(levels);
    when(userTopicLevelRepository.findAllByUserAndTopic(user, topic)).thenReturn(List.of());

    // When
    Progress progress = progressServiceImpl.getProgress("email");

    // Then
    assertEquals(1, progress.getTopics().size());

    Topic progressTopic = progress.getTopics().get(0);

    assertEquals(topic, progressTopic);
    assertEquals(1, progressTopic.getLevels().size());

    Level topicLevel = progressTopic.getLevels().get(0);

    assertEquals(0, topicLevel.getQuestions().size());
  }

  @Test
  void givenFoundUserAndUnlockedLevelsShouldReturnCorrectProgress() {
    // Given
    final String email = "email";

    final User user = mock(User.class);

    final Topic topic = new Topic();
    final List<Topic> topics = List.of(topic);

    final Level level = new Level();
    final List<Level> levels = List.of(level);

    final UserTopicLevel userTopicLevel = mock(UserTopicLevel.class);

    final Question question = new Question();
    final List<Question> questions = List.of(question);

    final Choice choice = new Choice();
    choice.setCorrect(true);
    final List<Choice> choices = List.of(choice);

    Tag tag = mock(Tag.class);
    final List<Tag> tags = List.of(tag);

    when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
    when(topicRepository.findAll()).thenReturn(topics);
    when(levelRepository.findAllByTopic(topic)).thenReturn(levels);
    when(userTopicLevel.getLevel()).thenReturn(level);
    when(userTopicLevelRepository.findAllByUserAndTopic(user, topic)).thenReturn(List.of(userTopicLevel));
    when(questionRepository.findAllByUsersContainsAndLevel(user, level)).thenReturn(questions);
    when(choiceRepository.findAllByQuestion(question)).thenReturn(choices);
    when(tagRepository.findAllByQuestionsContains(question)).thenReturn(tags);

    // When
    Progress progress = progressServiceImpl.getProgress("email");

    // Then
    assertEquals(1, progress.getTopics().size());

    Topic progressTopic = progress.getTopics().get(0);

    assertEquals(topic, progressTopic);
    assertEquals(1, progressTopic.getLevels().size());

    Level topicLevel = progressTopic.getLevels().get(0);

    assertEquals(1, topicLevel.getQuestions().size());

    Question levelQuestion = topicLevel.getQuestions().get(0);

    assertEquals(question, levelQuestion);
    assertEquals(1, levelQuestion.getChoices().size());
    assertEquals(1, levelQuestion.getTags().size());

    Choice questionChoice = levelQuestion.getChoices().get(0);

    assertEquals(choice, questionChoice);
    assertFalse(choice.isCorrect());

    Tag questionTag = levelQuestion.getTags().get(0);

    assertEquals(tag, questionTag);
  }

  @Test
  void givenUserProgressCacheGetProgressShouldNotRecompute() {
    // Given
    String email = "email";
    User user = mock(User.class);
    UserProgressCache userProgressCache = mock(UserProgressCache.class);
    String progressCache = "progressCache";

    when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
    when(userProgressCacheRepository.findByEmail(email)).thenReturn(Optional.of(userProgressCache));
    when(userProgressCache.getProgressCache()).thenReturn(progressCache);
    when(progressMapper.fromJson(progressCache)).thenReturn(null);

    // When
    progressServiceImpl.getProgress(email);

    // Then
    verify(progressMapper).fromJson(progressCache);
    verify(userProgressCacheRepository, never()).save(any());
  }

  @Test
  void givenNotUserProgressCacheGetProgressShouldRecompute() {
    // Given
    String email = "email";
    User user = mock(User.class);
    String progressCache = "progressCache";

    when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
    when(userProgressCacheRepository.findByEmail(email)).thenReturn(Optional.empty());
    when(topicRepository.findAll()).thenReturn(List.of());
    when(progressMapper.toJson(any())).thenReturn(progressCache);
    when(userProgressCacheRepository.save(any())).thenReturn(null);

    // When
    progressServiceImpl.getProgress(email);

    // Then
    verify(progressMapper).toJson(any());
    verify(userProgressCacheRepository).save(any());
  }
}
