import React, { useEffect, useState } from "react";
import { Box, Button, Typography, LinearProgress } from "@material-ui/core";
import { getUsers } from "../helpers/ApiHelper";

export const Context = React.createContext({});

const ContextProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [users, setUsers] = useState(null);

  const updateUser = (email, newUser) => {
    const oldUser = users.find((user) => user.email === email);
    setUsers([
      ...users.filter((user) => user.email !== email),
      {
        email,
        ...oldUser,
        ...newUser,
      },
    ]);
  };

  const deleteUser = (email) =>
    setUsers(users.filter((user) => user.email !== email));

  useEffect(() => {
    const fetchContext = async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchContext();
  }, [isLoading]);

  return (
    <>
      {isError && (
        <Box
          sx={{ width: "100%" }}
          display="flex"
          justifyContent="center"
          p={5}
        >
          <Typography variant="h4">
            Error when attempting to fetch resources.{" "}
            <Button
              onClick={() => {
                setError(false);
                setLoading(true);
              }}
            >
              Try again
            </Button>
          </Typography>
        </Box>
      )}
      {isLoading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      {!isLoading && !isError && (
        <Context.Provider value={{ users, deleteUser, updateUser }}>
          {children}
        </Context.Provider>
      )}
    </>
  );
};

export default ContextProvider;
