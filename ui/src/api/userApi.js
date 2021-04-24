import { baseUrl } from "./serverConfig";

export const getUsers = async () => {
  const response = await fetch(`${baseUrl}/users`);
  if (!response.ok) {
    throw Error(`Cannot fetch users: ${response.text()}`);
  }
  return response.json();
};

export const updateUser = async (id, payload) => {
  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw Error(`Cannot update user: ${response.text()}`);
  }
  return response.json();
};

export const deleteUser = async (id) => {
  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw Error(`Cannot delete user: ${response.text()}`);
  }
  return response.json();
};
