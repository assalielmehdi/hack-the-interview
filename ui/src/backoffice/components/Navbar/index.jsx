import { useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  Breadcrumbs,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const BackofficeNavbar = ({ onMobileNavOpen, ...rest }) => {
  const { pathname } = useLocation();

  const breadcrumbs = pathname
    .split("/")
    .filter((word) => word !== "")
    .map((word) => word[0].toUpperCase() + word.slice(1));

  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <Breadcrumbs color="primary.contrastText">
          {breadcrumbs.map((item, idx) => (
            <Typography key={`breadcrumbs-${idx}`}>{item}</Typography>
          ))}
        </Breadcrumbs>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgDown>
          <Typography variant="subtitle1">admin@gmail.com</Typography>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default BackofficeNavbar;
