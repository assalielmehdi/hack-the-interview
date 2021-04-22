const API_BASE_URL = "http://localhost:9999/api";

export const getUsers = async () => {
  const users = await fetch(`${API_BASE_URL}/users`);
  return users.json();
};
