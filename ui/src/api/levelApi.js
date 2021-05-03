import { baseUrl } from "./serverConfig";

export const getTopicLevels = async (topicId) => {
  const response = await fetch(`${baseUrl}/topics/${topicId}/levels`);
  if (!response.ok) {
    throw Error();
  }
  const {
    _embedded: { levels },
  } = await response.json();
  return levels;
};

export const getLevel = async (id) => {
  const response = await fetch(`${baseUrl}/levels/${id}`);
  if (!response.ok) {
    throw Error();
  }
  return response.json();
};

export const addTopicLevel = async (topicId, payload) => {
  let response = await fetch(`${baseUrl}/levels`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw Error();
  }
  const { id } = await response.json();
  response = await fetch(`${baseUrl}/levels/${id}/topic`, {
    method: "PUT",
    headers: {
      "Content-Type": "text/uri-list",
    },
    body: `${baseUrl}/topics/${topicId}`,
  });
  if (!response.ok) {
    throw Error();
  }
};

export const updateLevel = async (id, payload) => {
  const response = await fetch(`${baseUrl}/levels/${id}`, {
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

export const deleteLevel = async (id) => {
  const response = await fetch(`${baseUrl}/levels/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw Error();
  }
};
