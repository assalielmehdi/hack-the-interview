import {useState, useEffect} from "react";
import {Link as RouterLink} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
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
} from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import {getUsers} from "../../../api/userApi";
import DataLoader from "../DataLoader";

const columns = [
  {
    key: "id",
    label: "Id",
    show: true,
  },
  {
    key: "email",
    label: "Email",
    show: true,
  },
  {
    key: "name",
    label: "First Name",
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

const Users = () => {
  const classes = useStyles();

  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  const [users, setUsers] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState({text: "", users});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setUsers(users);
        setFilter({text: "", users});
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [isLoading]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <DataLoader
      isError={isError}
      isLoading={isLoading}
      onReload={() => {
        setError(false);
        setLoading(true);
      }}
    >
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Box display="flex" alignItems="flex-end" mb={4}>
            <SearchOutlinedIcon
              sx={{color: "action.active", mr: 1, my: 0.5}}
            />
            <TextField
              label="Filter"
              variant="standard"
              value={filter.text}
              onChange={(e) =>
                setFilter({
                  text: e.target.value,
                  users: users.filter(
                    (user) =>
                      Object.values(user).find((field) =>
                        String(field)
                          .toLowerCase()
                          .includes(e.target.value.toLowerCase())
                      ) !== undefined
                  ),
                })
              }
            />
          </Box>

          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns
                      .filter(({show}) => show)
                      .map(({label, key}) => (
                        <TableCell key={key}>{label}</TableCell>
                      ))}
                    <TableCell/>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filter.users
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={user.id}
                        >
                          {columns
                            .filter(({show}) => show)
                            .map(({key}) => {
                              return (
                                <TableCell key={`${user.id}-${key}`}>
                                  {user[key]}
                                </TableCell>
                              );
                            })}
                          <TableCell>
                            <RouterLink to={`/backoffice/users/${user.id}`}>
                              <IconButton sx={{color: "text.primary"}}>
                                <OpenInNewIcon fontSize="small"/>
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
              count={filter.users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Container>
      </Box>
    </DataLoader>
  );
};

export default Users;
