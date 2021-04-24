const API_BASE_URL = "http://localhost:9999/api";

export const getUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) {
    throw Error("Cannot fetch data");
  }
  return response.json();
};

export const getTopics = async () => {
  const response = await fetch(`${API_BASE_URL}/topics`);
  if (!response.ok) {
    throw Error("Cannot fetch data");
  }
  return response.json();
};

export const getLevels = async () => {
  const response = await fetch(`${API_BASE_URL}/levels`);
  if (!response.ok) {
    throw Error("Cannot fetch data");
  }
  return response.json();
};
