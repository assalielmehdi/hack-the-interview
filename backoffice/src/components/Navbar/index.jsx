import {Link as RouterLink, useLocation} from "react-router-dom";
import {AppBar, Box, Breadcrumbs, Hidden, IconButton, Toolbar, Typography,} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const BackofficeNavbar = ({onMobileNavOpen, ...rest}) => {
  const {pathname} = useLocation();

  const breadcrumbsLabels = pathname.split("/").filter((word) => word !== "");

  const breadcrumbs = breadcrumbsLabels.map((word, idx) => ({
    label: word[0].toUpperCase() + word.slice(1),
    href: `/${breadcrumbsLabels.slice(0, idx + 1).join("/")}`,
  }));

  return (
    <AppBar elevation={1} {...rest}>
      <Toolbar
        sx={{
          backgroundColor: "background.paper",
          color: "text.primary",
        }}
      >
        <Breadcrumbs
          sx={{
            color: "text.primary",
          }}
        >
          {breadcrumbs.map(({label, href}, idx) => (
            <RouterLink key={`breadcrumbs-${idx}`} to={href}>
              <Typography
                sx={{
                  color: "text.primary",
                }}
              >
                {label}
              </Typography>
            </RouterLink>
          ))}
        </Breadcrumbs>
        <Box sx={{flexGrow: 1}}/>
        <Hidden lgDown>
          <Typography variant="subtitle1">admin@gmail.com</Typography>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon/>
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default BackofficeNavbar;
