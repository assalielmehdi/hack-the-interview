import { baseUrl } from "./serverConfig";

export const getTopics = async () => {
  const response = await fetch(`${baseUrl}/topics`);
  if (!response.ok) {
    throw Error("Cannot fetch topics");
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
    throw Error(`Cannot add topic: ${response.text()}`);
  }
  return response.json();
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
    throw Error(`Cannot update topic: ${response.text()}`);
  }
  return response.json();
};

export const deleteTopic = async (id) => {
  const response = await fetch(`${baseUrl}/topics/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw Error(`Cannot delete topic: ${response.text()}`);
  }
  return response.json();
};
