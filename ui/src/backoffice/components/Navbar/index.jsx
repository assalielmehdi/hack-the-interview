import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const BackofficeNavbar = ({ onMobileNavOpen, ...rest }) => (
  <AppBar elevation={0} {...rest}>
    <Toolbar>
      <Typography variant="h3">Backoffice</Typography>
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

export default BackofficeNavbar;
