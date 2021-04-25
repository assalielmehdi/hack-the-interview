import {
  updateUser as updateUserApi,
  deleteUser as deleteUserApi,
} from "../api/userApi";

export const updateUser = (users, setUsers) => async (
  id,
  payload,
  navigateTo
) => {
  const idx = users.findIndex((user) => user.id === id);
  const user = {
    ...users[idx],
    ...payload,
  };

  await updateUserApi(id, user);

  setUsers([...users.slice(0, idx), user, ...users.slice(idx + 1)]);
};

export const deleteUser = (users, setUsers) => async (id) => {
  await deleteUserApi(id);
  
  setUsers(users.filter((user) => user.id !== id));
};
