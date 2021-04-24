import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

const UserForm = () => {
  const { _id, id = +_id } = useParams();

  const { users, deleteUser, updateUser } = useContext(Context);
  const user = users.find((user) => id === user.id);

  const [email] = useState(user ? user.email : "");
  const [firstName, setFirstName] = useState(user ? user.firstName : "");
  const [lastName, setLastName] = useState(user ? user.lastName : "");
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const navigate = useNavigate();

  const onUserUpdate = async () => {
    try {
      setLoading(true);
      await updateUser(id, { firstName, lastName });
      navigate("/backoffice/users");
    } catch (e) {
      setError(true);
      setLoading(false);
    }
  };

  const onUserDelete = async () => {
    try {
      setLoading(true);
      await deleteUser(id);
      navigate("/backoffice/users");
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
      {!user && (
        <Box sx={{ width: "100%", p: 2 }}>
          <Alert severity="error">User with id={id} not found!</Alert>
        </Box>
      )}
      {user && (
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
              <Button onClick={onUserUpdate}>Update</Button>
              <Button sx={{ ml: 2 }} color="secondary" onClick={onUserDelete}>
                Delete
              </Button>
            </Box>
          </Container>
        </>
      )}
    </Box>
  );
};

export default UserForm;
