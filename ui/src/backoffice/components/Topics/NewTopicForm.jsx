import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@material-ui/core";
import { Context } from "../../../context";

const NewTopicForm = () => {
  const { addTopic } = useContext(Context);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            onClick={() => {
              addTopic({ name, description });
              navigate("/backoffice/topics");
            }}
          >
            Save
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NewTopicForm;
