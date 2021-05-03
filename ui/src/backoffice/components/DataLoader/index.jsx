import { Button, Box, Typography, LinearProgress } from "@material-ui/core";

const DataLoader = ({ isLoading, isError, onReload, children }) => {
  return (
    <>
      {isError && (
        <Box
          sx={{ width: "100%" }}
          display="flex"
          justifyContent="center"
          p={5}
        >
          <Typography variant="h4">
            Error when attempting to fetch resources.{" "}
            <Button onClick={onReload}>Try again</Button>
          </Typography>
        </Box>
      )}
      {isLoading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      {!isLoading && !isError && children}
    </>
  );
};

export default DataLoader;
