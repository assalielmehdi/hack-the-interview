import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  Input,
  Button,
  LinearProgress,
  Alert,
  Typography,
  Slider,
} from "@material-ui/core";
import {addTopicLevel} from "../../api/levelApi";

const NewTopicForm = () => {
  const {topicId} = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(5);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const navigate = useNavigate();

  const onLevelAdd = async () => {
    try {
      setLoading(true);
      await addTopicLevel(topicId, {name, description, priority});
      navigate(`/topics/${topicId}`);
    } catch (e) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
      }}
    >
      {isLoading && (
        <Box sx={{width: "100%"}}>
          <LinearProgress/>
        </Box>
      )}
      {isError && (
        <Box sx={{width: "100%", p: 2}}>
          <Alert severity="error" onClose={() => setError(false)}>
            An error occurred when trying to update or delete the resource!
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
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={onLevelAdd}>Save</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NewTopicForm;
