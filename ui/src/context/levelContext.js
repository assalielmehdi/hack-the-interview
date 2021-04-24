import { addLevel as addLevelApi } from "../api/levelApi";

export const addLevel = (topics, setTopics, levels, setLevels) => async (
  topicId,
  payload
) => {
  await addLevelApi(topicId, payload);
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
