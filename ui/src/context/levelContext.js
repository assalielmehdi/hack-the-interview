import {
  addLevel as addLevelApi,
  updateLevel as updateLevelApi,
  deleteLevel as deleteLevelApi,
} from "../api/levelApi";

export const addLevel = (topics, setTopics, levels, setLevels) => async (
  topicId,
  payload
) => {
  await addLevelApi(payload);

  const level = { id: Math.ceil(Math.random() * 1000000), ...payload };
  const idx = topics.findIndex(({ id }) => id === topicId);

  setLevels([...levels, level]);
  setTopics([
    ...topics.slice(0, idx),
    {
      ...topics[idx],
      levels: [...topics[idx].levels, level],
    },
    ...topics.slice(idx + 1),
  ]);
};

export const updateLevel = (topics, setTopics, levels, setLevels) => async (
  topicId,
  id,
  payload
) => {
  const levelIdx = levels.findIndex((level) => level.id === id);
  const level = {
    ...levels[levelIdx],
    ...payload,
  };

  await updateLevelApi(id, level);

  const topicIdx = topics.findIndex(({ id }) => id === topicId);
  const topicLevelIdx = topics[topicIdx].levels.findIndex(
    (level) => level.id === id
  );

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
        level,
        ...topics[topicIdx].levels.slice(topicLevelIdx + 1),
      ],
    },
    ...topics.slice(topicIdx + 1),
  ]);
};

export const deleteLevel = (topics, setTopics, levels, setLevels) => async (
  topicId,
  id
) => {
  await deleteLevelApi(id);

  const idx = topics.findIndex(({ id }) => id === topicId);

  setLevels(levels.filter((level) => level.id !== id));
  setTopics([
    ...topics.slice(0, idx),
    {
      ...topics[idx],
      levels: topics[idx].levels.filter((level) => level.id !== id),
    },
    ...topics.slice(idx + 1),
  ]);
};
