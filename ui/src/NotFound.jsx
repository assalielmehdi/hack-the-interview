import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core";

const NotFound = () => (
  <Box
    backgroundColor="background.default"
    minHeight="100vh"
    py={3}
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <Card
      elevation={5}
      sx={{
        minHeight: 180,
        minWidth: 360,
      }}
    >
      <CardContent
        sx={{
          textAlign: "center",
        }}
      >
        <Typography sx={{ fontSize: 60 }}>404</Typography>
      </CardContent>
      <CardActions
        sx={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RouterLink to="/">
          <Button size="small">Home</Button>
        </RouterLink>
      </CardActions>
    </Card>
  </Box>
);

export default NotFound;
