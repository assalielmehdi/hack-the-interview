import {
  addTopic as addTopicApi,
  updateTopic as updateTopicApi,
  deleteTopic as deleteTopicApi,
} from "../api/topicApi";

export const addTopic = (topics, setTopics) => async (payload) => {
  await addTopicApi(payload);
  
  setTopics([
    ...topics,
    { id: Math.ceil(Math.random() * 1000000), ...payload },
  ]);
};

export const updateTopic = (topics, setTopics) => async (id, payload) => {
  const idx = topics.findIndex((topic) => topic.id === id);
  const topic = {
    ...topics[idx],
    ...payload,
  };

  await updateTopicApi(id, topic);

  setTopics([...topics.slice(0, idx), topic, ...topics.slice(idx + 1)]);
};

export const deleteTopic = (topics, setTopics) => async (id) => {
  await deleteTopicApi(id);

  setTopics(topics.filter((topic) => topic.id !== id));
};
