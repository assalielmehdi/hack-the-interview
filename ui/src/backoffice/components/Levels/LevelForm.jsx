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
  Rating,
} from "@material-ui/core";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { Context } from "../../../context";

const LevelQuestion = ({ id, name, difficulty }) => (
  <Grid key={`level-question-${id}`} item sx={{ mt: 1 }} xs={12} sm={6} md={4}>
    <Paper elevation={2}>
      <List dense={false}>
        <ListItem>
          <ListItemText>{name}</ListItemText>

          <Rating
            name="half-rating-read"
            defaultValue={difficulty / 2}
            precision={0.5}
            readOnly
          />
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

const LevelForm = () => {
  const { _topicId, _id, topicId = +_topicId, id = +_id } = useParams();

  const { topics, updateLevel, deleteLevel } = useContext(Context);
  const level = topics
    .find(({ id }) => id === topicId)
    .levels.find((level) => level.id === id);

  const [name, setName] = useState(level ? level.name : "");
  const [description, setDescription] = useState(
    level ? level.description : ""
  );
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const navigate = useNavigate();

  const onLevelUpdate = async () => {
    try {
      setLoading(true);
      await updateLevel(topicId, id, { name, description });
      navigate(`/backoffice/topics/${topicId}`);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  const onLevelDelete = async () => {
    try {
      setLoading(true);
      await deleteLevel(topicId, id);
      navigate(`/backoffice/topics/${topicId}`);
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
      {!level && (
        <Box sx={{ width: "100%", p: 2 }}>
          <Alert severity="error">
            Level with id={id} in Topic with id={topicId} not found!
          </Alert>
        </Box>
      )}
      {level && (
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
                    Questions
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
                  <RouterLink
                    to={`/backoffice/topics/${topicId}/levels/${id}/add`}
                  >
                    <Button>Add Question</Button>
                  </RouterLink>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                {level.questions.map(LevelQuestion)}
              </Grid>
            </Box>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button onClick={onLevelUpdate}>Update</Button>
              <Button sx={{ ml: 2 }} color="secondary" onClick={onLevelDelete}>
                Delete
              </Button>
            </Box>
          </Container>
        </>
      )}
    </Box>
  );
};

export default LevelForm;
