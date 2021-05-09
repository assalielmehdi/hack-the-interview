import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Alert, Box, Button, Container, FormControl, Input, InputLabel, LinearProgress,} from "@material-ui/core";
import {deleteUser, getUser, updateUser} from "../../api/userApi";
import DataLoader from "../DataLoader";

const UserForm = () => {
  const {id} = useParams();

  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [isFetchLoading, setFetchLoading] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [isFetchError, setFetchError] = useState(false);
  const [isError, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser(id);
        setUser(user);
        setEmail(user.email);
        setName(user.name);
      } catch (e) {
        setFetchError(true);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchUser();
  }, [isFetchLoading, id]);

  const onUserUpdate = async () => {
    try {
      setLoading(true);
      await updateUser(id, {...user, name});
      navigate("/users");
    } catch (e) {
      setError(true);
      setLoading(false);
    }
  };

  const onUserDelete = async () => {
    try {
      setLoading(true);
      await deleteUser(id);
      navigate("/users");
    } catch (e) {
      setError(true);
      setLoading(false);
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
          <FormControl fullWidth sx={{mb: 2}} variant="standard">
            <InputLabel htmlFor="email" disabled={true}>
              Email
            </InputLabel>
            <Input id="email" value={email} disabled={true}/>
          </FormControl>
          <FormControl fullWidth sx={{my: 2}} variant="standard">
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={onUserUpdate}>Update</Button>
            <Button sx={{ml: 2}} color="secondary" onClick={onUserDelete}>
              Delete
            </Button>
          </Box>
        </Container>
      </Box>
    </DataLoader>
  );
};

export default UserForm;
