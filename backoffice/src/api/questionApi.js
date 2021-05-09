import {baseUrl} from "./serverConfig";

export const getLevelQuestions = async (levelId) => {
  const response = await fetch(`${baseUrl}/levels/${levelId}/questions`);
  if (!response.ok) {
    throw Error();
  }
  const {
    _embedded: {questions},
  } = await response.json();
  return questions;
};

export const getQuestion = async (id) => {
  const response = await fetch(`${baseUrl}/questions/${id}`);
  if (!response.ok) {
    throw Error();
  }
  return response.json();
};

export const addLevelQuestion = async (levelId, payload) => {
  let response = await fetch(`${baseUrl}/questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw Error();
  }
  const question = await response.json();
  response = await fetch(`${baseUrl}/questions/${question.id}/level`, {
    method: "PUT",
    headers: {
      "Content-Type": "text/uri-list",
    },
    body: `${baseUrl}/levels/${levelId}`,
  });
  if (!response.ok) {
    throw Error();
  }
  return question;
};

export const updateQuestion = async (id, payload) => {
  const response = await fetch(`${baseUrl}/questions/${id}`, {
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

export const deleteQuestion = async (id) => {
  const response = await fetch(`${baseUrl}/questions/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw Error();
  }
};
