import {baseUrl} from "./serverConfig";

export const getTopics = async () => {
  const response = await fetch(`${baseUrl}/topics`);
  if (!response.ok) {
    throw Error();
  }
  const {
    _embedded: {topics},
  } = await response.json();
  return topics;
};

export const getTopic = async (id) => {
  const response = await fetch(`${baseUrl}/topics/${id}`);
  if (!response.ok) {
    throw Error();
  }
  return response.json();
};

export const addTopic = async (payload) => {
  const response = await fetch(`${baseUrl}/topics`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw Error();
  }
};

export const updateTopic = async (id, payload) => {
  const response = await fetch(`${baseUrl}/topics/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw Error();
  }
};

export const deleteTopic = async (id) => {
  const response = await fetch(`${baseUrl}/topics/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw Error();
  }
};
