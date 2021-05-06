import {useLocation} from "react-router-dom";
import {Box, Card, Button, Typography} from "@material-ui/core";
import GoogleIcon from "@material-ui/icons/Google";
import {baseUrl} from "./api/serverConfig";

const LoginForm = () => {
  const {search} = useLocation();

  const error = search.endsWith("error");

  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {error && <Typography variant="h4">Error</Typography>}
      <Card sx={{p: 5}}>
        <Button href={`${baseUrl}/oauth2/authorization/google`}>
          <GoogleIcon sx={{mr: 1}}/> Login
        </Button>
        <Button href={`${baseUrl}/oauth2/authorization/google`}>
          <GoogleIcon sx={{mr: 1}}/> Sign up
        </Button>
      </Card>
    </Box>
  );
};

export default LoginForm;
