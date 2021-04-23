import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@material-ui/core";
import { Context } from "../../../context";

const UserForm = () => {
  const { _id, id = +_id } = useParams();

  const { users, deleteUser, updateUser } = useContext(Context);
  const user = users.find((user) => id === user.id);

  const [email] = useState(user.email);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

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
        <FormControl fullWidth sx={{ mb: 2 }} variant="standard">
          <InputLabel htmlFor="email" disabled={true}>
            Email
          </InputLabel>
          <Input id="email" value={email} disabled={true} />
        </FormControl>
        <FormControl fullWidth sx={{ my: 2 }} variant="standard">
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth sx={{ my: 2 }} variant="standard">
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormControl>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            onClick={() => {
              updateUser(id, { email, firstName, lastName });
              navigate("/backoffice/users");
            }}
          >
            Update
          </Button>
          <Button
            sx={{ ml: 2 }}
            color="secondary"
            onClick={() => {
              deleteUser(id);
              navigate("/backoffice/users");
            }}
          >
            Delete
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default UserForm;
