import {baseUrl} from "./serverConfig";

export const getTags = async () => {
  const response = await fetch(`${baseUrl}/tags`);
  if (!response.ok) {
    throw Error();
  }
  const {
    _embedded: {tags},
  } = await response.json();
  return tags;
};


export const getQuestionTags = async (questionId) => {
  const response = await fetch(`${baseUrl}/questions/${questionId}/tags`);
  if (!response.ok) {
    throw Error();
  }
  const {
    _embedded: {tags},
  } = await response.json();
  return tags;
};

export const addTag = async (payload) => {
  const response = await fetch(`${baseUrl}/tags`, {
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

export const addQuestionTags = async (questionId, tags) => {
  const response = await fetch(`${baseUrl}/questions/${questionId}/tags`, {
    method: "PUT",
    headers: {
      "Content-Type": "text/uri-list",
    },
    body: tags.map(({id}) => `${baseUrl}/tags/${id}`).join("\n"),
  });
  if (!response.ok) {
    throw Error();
  }
};

export const deleteTag = async (id) => {
  const response = await fetch(`${baseUrl}/tags/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw Error();
  }
};
