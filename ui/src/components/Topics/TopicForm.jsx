import {useState, useEffect} from "react";
import {useParams, useNavigate, Link as RouterLink} from "react-router-dom";
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
  Chip,
} from "@material-ui/core";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import {getTopic, updateTopic, deleteTopic} from "../../api/topicApi";
import {getTopicLevels} from "../../api/levelApi";
import DataLoader from "../DataLoader";

const TopicLevel = ({id, name, priority}, topicId) => (
  <Grid key={`topic-level-${id}`} item sx={{mt: 1}} xs={12} sm={6} md={4}>
    <Paper elevation={2}>
      <List dense={false}>
        <ListItem>
          <ListItemText primary={name} sx={{mr: 2, overflow: "hidden"}}/>
          <Chip
            label={`${priority}`}
            sx={{mr: 1, backgroundColor: "background.paper"}}
          />
          <ListItemSecondaryAction>
            <RouterLink to={`/topics/${topicId}/levels/${id}`}>
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

const TopicForm = () => {
  const {id} = useParams();

  const [topic, setTopic] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [levels, setLevels] = useState([]);

  const [isFetchLoading, setFetchLoading] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [isFetchError, setFetchError] = useState(false);
  const [isError, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const topic = await getTopic(id);
        const levels = await getTopicLevels(id);
        setTopic(topic);
        setName(topic.name);
        setDescription(topic.description);
        setLevels(
          levels.sort((level1, level2) => level1.priority - level2.priority)
        );
      } catch (e) {
        setFetchError(true);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchTopic();
  }, [isFetchLoading, id]);

  const onTopicUpdate = async () => {
    try {
      setLoading(true);
      await updateTopic(id, {name, description});
      navigate("/topics");
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  const onTopicDelete = async () => {
    try {
      setLoading(true);
      await deleteTopic(id);
      navigate("/topics");
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

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
        {!topic && (
          <Box sx={{width: "100%", p: 2}}>
            <Alert severity="error">Topic with id={id} not found!</Alert>
          </Box>
        )}
        {topic && (
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
                    <RouterLink to={`/topics/${id}/add`}>
                      <Button>Add Level</Button>
                    </RouterLink>
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  {levels.map((topic) => TopicLevel(topic, id))}
                </Grid>
              </Box>
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button onClick={onTopicUpdate}>Update</Button>
                <Button
                  sx={{ml: 2}}
                  color="secondary"
                  onClick={onTopicDelete}
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

export default TopicForm;
