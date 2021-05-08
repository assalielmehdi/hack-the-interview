import {baseUrl} from "./serverConfig";

export const getQuestionChoices = async (questionId) => {
  const response = await fetch(`${baseUrl}/questions/${questionId}/choices`);
  if (!response.ok) {
    throw Error();
  }
  const {
    _embedded: {choices},
  } = await response.json();
  return choices;
};

export const addChoice = async (payload) => {
  const response = await fetch(`${baseUrl}/choices`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw Error();
  }
  return response.json();
};

export const addQuestionChoice = async (questionId, payload) => {
  const {id} = await addChoice(payload);
  const response = await fetch(`${baseUrl}/choices/${id}/question`, {
    method: "PUT",
    headers: {
      "Content-Type": "text/uri-list",
    },
    body: `${baseUrl}/questions/${questionId}`,
  });
  if (!response.ok) {
    throw Error();
  }
};

export const deleteChoice = async (id) => {
  const response = await fetch(`${baseUrl}/choices/${id}`, {
    method: "DELETE"
  });
  if (!response.ok) {
    throw Error();
  }
}