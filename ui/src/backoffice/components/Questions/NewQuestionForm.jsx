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

const NewQuestionForm = () => {
  const {
    _topicId,
    _levelId,
    topicId = +_topicId,
    levelId = +_levelId,
  } = useParams();

  const { addQuestion } = useContext(Context);

  const [name, setName] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const navigate = useNavigate();

  const onQuestionAdd = async () => {
    try {
      setLoading(true);
      await addQuestion(topicId, levelId, { name, levelId });
      navigate(`/backoffice/topics/${topicId}/levels/${levelId}`);
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
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={onQuestionAdd}>Save</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NewQuestionForm;
