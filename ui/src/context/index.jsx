import React, { useEffect, useState } from "react";
import { Box, Button, Typography, LinearProgress } from "@material-ui/core";
import { getUsers, getTopics, getLevels } from "../helpers/ApiHelper";

export const Context = React.createContext({});

const ContextProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  const [users, setUsers] = useState(null);
  const [topics, setTopics] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState(["Backoffice"]);

  const updateUser = (id, newUser) => {
    console.log("updateUser");
    const oldUser = users.find((user) => user.id === id);
    setUsers([
      ...users.filter((user) => user.id !== id),
      {
        id,
        ...oldUser,
        ...newUser,
      },
    ]);
  };

  const deleteUser = (id) => setUsers(users.filter((user) => user.id !== id));

  const addTopic = (newTopic) =>
    setTopics([
      ...topics,
      { id: Math.ceil(Math.random() * 1000000), ...newTopic },
    ]);

  const updateTopic = (id, newTopic) => {
    const oldTopic = topics.find((topic) => topic.id === id);
    setTopics([
      ...topics.filter((topic) => topic.id !== id),
      {
        id,
        ...oldTopic,
        ...newTopic,
      },
    ]);
  };

  const deleteTopic = (id) =>
    setTopics(topics.filter((topic) => topic.id !== id));

  useEffect(() => {
    const fetchContext = async () => {
      try {
        const users = await getUsers();
        const topics = await getTopics();
        const levels = await getLevels();
        const levelsMap = levels.reduce((map, level) => {
          map[level.topicId] = [...(map[level.topicId] || []), level];
          return map;
        }, {});
        setUsers(users);
        setTopics(
          topics.map((topic) => ({ ...topic, levels: levelsMap[topic.id] }))
        );
      } catch (err) {
        console.log(err);
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
        <Context.Provider
          value={{
            users,
            updateUser,
            deleteUser,
            topics,
            addTopic,
            updateTopic,
            deleteTopic,
            breadcrumbs,
            setBreadcrumbs,
          }}
        >
          {children}
        </Context.Provider>
      )}
    </>
  );
};

export default ContextProvider;
