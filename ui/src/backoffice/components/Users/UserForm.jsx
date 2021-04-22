import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
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
  const { email } = useParams();

  const { users, deleteUser, updateUser } = useContext(Context);
  const user = users.find((user) => email === user.email);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>User Form | Hack The Interview</title>
      </Helmet>
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
            <Input id="email" disabled={true} value={email} />
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
                updateUser(email, { firstName, lastName });
                navigate("/backoffice/users");
              }}
            >
              Update
            </Button>
            <Button
              sx={{ ml: 2 }}
              color="secondary"
              onClick={() => {
                deleteUser(email);
                navigate("/backoffice/users");
              }}
            >
              Delete
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default UserForm;
