import React, { useEffect, useState } from "react";
import { Box, Button, Typography, LinearProgress } from "@material-ui/core";
import { getUsers } from "../api/userApi";
import { getTopics } from "../api/topicApi";
import { getLevels } from "../api/levelApi";
import { updateUser, deleteUser } from "./userContext";
import { addTopic, updateTopic, deleteTopic } from "./topicContext";
import { addLevel } from "./levelContext";

export const Context = React.createContext({});

const ContextProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  const [users, setUsers] = useState(null);
  const [topics, setTopics] = useState(null);
  const [levels, setLevels] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState(["Backoffice"]);

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
        setLevels(levels);
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
        <Context.Provider
          value={{
            users,
            updateUser: updateUser(users, setUsers),
            deleteUser: deleteUser(users, setUsers),
            topics,
            addTopic: addTopic(topics, setTopics),
            updateTopic: updateTopic(topics, setTopics),
            deleteTopic: deleteTopic(topics, setTopics),
            addLevel: addLevel(topics, setTopics, levels, setLevels),
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
