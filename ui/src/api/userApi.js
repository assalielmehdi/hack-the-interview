import {baseUrl} from "./serverConfig";

export const getUsers = async () => {
  const response = await fetch(`${baseUrl}/users`);
  if (!response.ok) {
    throw Error();
  }
  const {
    _embedded: {users},
  } = await response.json();
  return users;
};

export const getUser = async (id) => {
  const response = await fetch(`${baseUrl}/users/${id}`);
  if (!response.ok) {
    throw Error();
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
    throw Error();
  }
};

export const deleteUser = async (id) => {
  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw Error();
  }
};
