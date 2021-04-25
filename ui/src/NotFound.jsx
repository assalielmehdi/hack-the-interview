import { Box, Card, Typography } from "@material-ui/core";

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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography sx={{ fontSize: 60 }}>404</Typography>
    </Card>
  </Box>
);

export default NotFound;
