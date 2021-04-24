import { useState, useContext } from "react";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  Input,
  Button,
  Typography,
  Grid,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Alert,
  LinearProgress,
} from "@material-ui/core";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { Context } from "../../../context";

const TopicLevel = ({ id, name }) => (
  <Grid key={`topic-level-${id}`} item sx={{ mt: 1 }} xs={12} sm={6} md={4}>
    <Paper elevation={2}>
      <List dense={false}>
        <ListItem>
          <ListItemText primary={name} />
          <ListItemSecondaryAction>
            <IconButton edge="end">
              <OpenInNewIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Paper>
  </Grid>
);

const TopicForm = () => {
  const { _id, id = +_id } = useParams();

  const { topics, updateTopic, deleteTopic } = useContext(Context);
  const topic = topics.find((topic) => id === topic.id);

  const [name, setName] = useState(topic ? topic.name : "");
  const [description, setDescription] = useState(
    topic ? topic.description : ""
  );
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const navigate = useNavigate();

  const onTopicUpdate = async () => {
    try {
      setLoading(true);
      await updateTopic(id, { name, description });
      navigate("/backoffice/topics");
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  const onTopicDelete = async () => {
    try {
      setLoading(true);
      await deleteTopic(id);
      navigate("/backoffice/topics");
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
      }}
    >
      {!topic && (
        <Box sx={{ width: "100%", p: 2 }}>
          <Alert severity="error">Topic with id={id} not found!</Alert>
        </Box>
      )}
      {topic && (
        <>
          {isLoading && (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          )}
          {isError && (
            <Box sx={{ width: "100%", p: 2 }}>
              <Alert severity="error" onClose={() => setError(false)}>
                An error occurred when trying to update or delete the resource!
              </Alert>
            </Box>
          )}
          <Container maxWidth={false} sx={{ py: 3 }}>
            <FormControl fullWidth sx={{ my: 2 }} variant="standard">
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ my: 2 }} variant="standard">
              <InputLabel htmlFor="description">Description</InputLabel>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <Box my={2} sx={{ flexGrow: 1 }}>
              <Grid container mb={3}>
                <Grid item xs={12} sm={6} display="flex" alignItems="flex-end">
                  <Typography variant="caption" color="text.secondary">
                    Levels
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  display="flex"
                  alignItems="flex-end"
                  justifyContent="flex-end"
                >
                  <RouterLink to={`/backoffice/topics/${id}/levels/add`}>
                    <Button>Add Level</Button>
                  </RouterLink>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                {topic.levels.map(TopicLevel)}
              </Grid>
            </Box>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button onClick={onTopicUpdate}>Update</Button>
              <Button sx={{ ml: 2 }} color="secondary" onClick={onTopicDelete}>
                Delete
              </Button>
            </Box>
          </Container>
        </>
      )}
    </Box>
  );
};

export default TopicForm;
