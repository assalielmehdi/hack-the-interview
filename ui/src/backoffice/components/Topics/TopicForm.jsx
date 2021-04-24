import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

  const [name, setName] = useState(topic.name);
  const [description, setDescription] = useState(topic.description);

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
      }}
    >
      <Container maxWidth={false}>
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
          <Typography variant="caption" color="text.secondary">
            Levels
          </Typography>
          <Grid container spacing={1}>
            {topic.levels.map(TopicLevel)}
          </Grid>
        </Box>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            onClick={() => {
              updateTopic(id, { name, description });
              navigate("/backoffice/topics");
            }}
          >
            Update
          </Button>
          <Button
            sx={{ ml: 2 }}
            color="secondary"
            onClick={() => {
              deleteTopic(id);
              navigate("/backoffice/topics");
            }}
          >
            Delete
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TopicForm;
