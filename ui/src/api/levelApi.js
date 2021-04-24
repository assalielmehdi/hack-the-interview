import { baseUrl } from "./serverConfig";

export const getLevels = async () => {
  const response = await fetch(`${baseUrl}/levels`);
  if (!response.ok) {
    throw Error("Cannot fetch data");
  }
  return response.json();
};

export const addLevel = async (topicId, payload) => {
  const response = await fetch(`${baseUrl}/topics/${topicId}/levels`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw Error(`Cannot add level: ${response.text()}`);
  }
  return response.json();
};
