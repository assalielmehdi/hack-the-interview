import { baseUrl } from "./serverConfig";

export const getQuestions = async () => {
  const response = await fetch(`${baseUrl}/questions`);
  if (!response.ok) {
    throw Error("Cannot fetch questions");
  }
  return response.json();
};

export const addQuestion = async (payload) => {
  const response = await fetch(`${baseUrl}/questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw Error(`Cannot add question: ${response.text()}`);
  }
  return response.json();
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
    throw Error(`Cannot update question: ${response.text()}`);
  }
  return response.json();
};

export const deleteQuestion = async (id) => {
  const response = await fetch(`${baseUrl}/questions/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw Error(`Cannot delete question: ${response.text()}`);
  }
  return response.json();
};
