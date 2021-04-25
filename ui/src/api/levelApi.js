import { baseUrl } from "./serverConfig";

export const getLevels = async () => {
  const response = await fetch(`${baseUrl}/levels`);
  if (!response.ok) {
    throw Error("Cannot fetch levels");
  }
  return response.json();
};

export const addLevel = async (payload) => {
  const response = await fetch(`${baseUrl}/levels`, {
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

export const updateLevel = async (id, payload) => {
  const response = await fetch(`${baseUrl}/levels/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw Error(`Cannot update level: ${response.text()}`);
  }
  return response.json();
};

export const deleteLevel = async (id) => {
  const response = await fetch(`${baseUrl}/levels/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw Error(`Cannot delete level: ${response.text()}`);
  }
  return response.json();
};
