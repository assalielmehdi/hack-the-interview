import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  Input,
  Button,
  LinearProgress,
  Alert,
} from "@material-ui/core";
import { Context } from "../../../context";

const NewTopicForm = () => {
  const { _id, topicId = +_id } = useParams();

  const { addLevel } = useContext(Context);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const navigate = useNavigate();

  const onLevelAdd = async () => {
    try {
      setLoading(true);
      await addLevel(topicId, { name, description, questions: [] });
      navigate(`/backoffice/topics/${topicId}`);
    } catch (e) {
      console.log(e);
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
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={onLevelAdd}>Save</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NewTopicForm;
