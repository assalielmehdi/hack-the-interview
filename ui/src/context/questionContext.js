import { addQuestion as addQuestionApi } from "../api/questionApi";

export const addQuestion = (
  topics,
  setTopics,
  levels,
  setLevels,
  questions,
  setQuestions
) => async (topicId, levelId, payload) => {
  await addQuestionApi(payload);

  const question = { id: Math.ceil(Math.random() * 1000000), ...payload };
  const levelIdx = levels.findIndex(({ id }) => id === levelId);
  const topicIdx = topics.findIndex(({ id }) => id === topicId);
  const topicLevelIdx = topics[topicIdx].levels.findIndex(
    ({ id }) => id === levelId
  );
  const level = {
    ...levels[levelIdx],
    questions: [...levels[levelIdx].questions, question],
  };

  setQuestions([...questions, question]);
  setLevels([
    ...levels.slice(0, levelIdx),
    level,
    ...levels.slice(levelIdx + 1),
  ]);
  setTopics([
    ...topics.slice(0, topicIdx),
    {
      ...topics[topicIdx],
      levels: [
        ...topics[topicIdx].levels.slice(0, topicLevelIdx),
        {
          ...topics[topicIdx].levels[topicLevelIdx],
          questions: [
            ...topics[topicIdx].levels[topicLevelIdx].questions,
            question,
          ],
        },
        ...topics[topicIdx].levels.slice(topicLevelIdx + 1),
      ],
    },
    ...topics.slice(topicIdx + 1),
  ]);
};
