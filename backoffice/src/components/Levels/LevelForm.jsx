import {useEffect, useState} from "react";
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputLabel,
  LinearProgress,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Rating,
  Slider,
  Typography,
} from "@material-ui/core";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import {deleteLevel, getLevel, updateLevel} from "../../api/levelApi";
import {getLevelQuestions} from "../../api/questionApi";
import DataLoader from "../DataLoader";

const LevelQuestion = ({id, name, difficulty}, topicId, levelId) => (
  <Grid key={`level-question-${id}`} item sx={{mt: 1}} xs={12} sm={6} md={4}>
    <Paper elevation={2}>
      <List dense={false}>
        <ListItem>
          <ListItemText sx={{mr: 2, overflow: "hidden"}}>{name}</ListItemText>
          <Rating
            name="half-rating-read"
            defaultValue={difficulty / 2}
            precision={0.5}
            readOnly
          />
          <ListItemSecondaryAction>
            <RouterLink to={`/topics/${topicId}/levels/${levelId}/questions/${id}`}>
              <IconButton edge="end" sx={{color: "text.primary"}}>
                <OpenInNewIcon/>
              </IconButton>
            </RouterLink>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Paper>
  </Grid>
);

const LevelForm = () => {
  const {topicId, levelId} = useParams();

  const [level, setLevel] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(5);
  const [questions, setQuestions] = useState([]);

  const [isFetchLoading, setFetchLoading] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [isFetchError, setFetchError] = useState(false);
  const [isError, setError] = useState(false);

  const navigate = useNavigate();

  const onLevelUpdate = async () => {
    try {
      setLoading(true);
      await updateLevel(levelId, {name, description, priority});
      navigate(`/topics/${topicId}`);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  const onLevelDelete = async () => {
    try {
      setLoading(true);
      await deleteLevel(levelId);
      navigate(`/topics/${topicId}`);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const level = await getLevel(levelId);
        const questions = await getLevelQuestions(levelId);
        setLevel(level);
        setName(level.name);
        setDescription(level.description);
        setPriority(level.priority);
        setQuestions(
          questions.sort(
            (question1, question2) =>
              question1.difficulty - question2.difficulty
          )
        );
      } catch (e) {
        setFetchError(true);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchLevel();
  }, [isFetchLoading, levelId]);

  return (
    <DataLoader
      isError={isFetchError}
      isLoading={isFetchLoading}
      onReload={() => {
        setFetchError(false);
        setFetchLoading(true);
      }}
    >
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
        }}
      >
        {!level && (
          <Box sx={{width: "100%", p: 2}}>
            <Alert severity="error">
              Level with id={levelId} in Topic with id={topicId} not found!
            </Alert>
          </Box>
        )}
        {level && (
          <>
            {isLoading && (
              <Box sx={{width: "100%"}}>
                <LinearProgress/>
              </Box>
            )}
            {isError && (
              <Box sx={{width: "100%", p: 2}}>
                <Alert severity="error" onClose={() => setError(false)}>
                  An error occurred when trying to update or delete the
                  resource!
                </Alert>
              </Box>
            )}
            <Container maxWidth={false} sx={{py: 3}}>
              <FormControl fullWidth sx={{my: 2}} variant="standard">
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl fullWidth sx={{my: 2}} variant="standard">
                <InputLabel htmlFor="description">Description</InputLabel>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
              <Box mt={2} maxWidth={400}>
                <Typography variant="caption" color="text.secondary">
                  Priority
                </Typography>
                <Slider
                  value={priority}
                  valueLabelDisplay="off"
                  step={1}
                  marks={Array.from(Array(11).keys())
                    .slice(1)
                    .map((value) => ({value, label: value}))}
                  min={1}
                  max={10}
                  onChange={(e) => setPriority(e.target.value)}
                />
              </Box>
              <Box my={2} sx={{flexGrow: 1}}>
                <Grid container mb={3}>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    display="flex"
                    alignItems="flex-end"
                  >
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
                      to={`/topics/${topicId}/levels/${levelId}/add`}
                    >
                      <Button>Add Question</Button>
                    </RouterLink>
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  {questions.map((question) => LevelQuestion(question, topicId, levelId))}
                </Grid>
              </Box>
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button onClick={onLevelUpdate}>Update</Button>
                <Button
                  sx={{ml: 2}}
                  color="secondary"
                  onClick={onLevelDelete}
                >
                  Delete
                </Button>
              </Box>
            </Container>
          </>
        )}
      </Box>
    </DataLoader>
  );
};

export default LevelForm;
