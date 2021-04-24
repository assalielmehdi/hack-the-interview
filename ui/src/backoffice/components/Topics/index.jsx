import { useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  IconButton,
  Grid,
  Button,
} from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { Context } from "../../../context";

const columns = [
  {
    key: "name",
    label: "Name",
    show: true,
  },
  {
    key: "description",
    label: "Description",
    show: true,
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const Topics = () => {
  const classes = useStyles();

  const { topics } = useContext(Context);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState({ text: "", topics });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
      }}
    >
      <Container maxWidth={false}>
        <Grid container mb={3}>
          <Grid item xs={12} sm={6} display="flex" alignItems="flex-end" mb={1}>
            <SearchOutlinedIcon
              sx={{ color: "action.active", mr: 1, my: 0.5 }}
            />
            <TextField
              label="Filter"
              variant="standard"
              value={filter.text}
              onChange={(e) =>
                setFilter({
                  text: e.target.value,
                  topics: topics.filter(
                    (topic) =>
                      Object.values(topic).find((field) =>
                        String(field)
                          .toLowerCase()
                          .includes(e.target.value.toLowerCase())
                      ) !== undefined
                  ),
                })
              }
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            display="flex"
            alignItems="flex-end"
            justifyContent="flex-end"
          >
            <RouterLink to="/backoffice/topics/add">
              <Button>Add Topic</Button>
            </RouterLink>
          </Grid>
        </Grid>

        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns
                    .filter(({ show }) => show)
                    .map(({ label, key }) => (
                      <TableCell key={key}>{label}</TableCell>
                    ))}
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {filter.topics
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((topic) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={topic.id}
                      >
                        {columns
                          .filter(({ show }) => show)
                          .map(({ key }) => {
                            return (
                              <TableCell key={`${topic.id}-${key}`}>
                                {topic[key]}
                              </TableCell>
                            );
                          })}
                        <TableCell>
                          <RouterLink to={`/backoffice/topics/${topic.id}`}>
                            <IconButton>
                              <OpenInNewIcon fontSize="small" />
                            </IconButton>
                          </RouterLink>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={filter.topics.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </Box>
  );
};

export default Topics;
