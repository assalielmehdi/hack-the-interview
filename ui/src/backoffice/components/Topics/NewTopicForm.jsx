import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { addTopic } from "../../../api/topicApi";

const NewTopicForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const navigate = useNavigate();

  const onTopicAdd = async () => {
    try {
      setLoading(true);
      await addTopic({ name, description });
      navigate("/backoffice/topics");
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
          <Button onClick={onTopicAdd}>Save</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NewTopicForm;
