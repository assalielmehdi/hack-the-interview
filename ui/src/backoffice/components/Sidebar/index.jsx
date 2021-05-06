import {useEffect, useContext, useState} from "react";
import {useLocation} from "react-router-dom";
import {
  Box,
  Drawer,
  Hidden,
  List,
  Typography,
  Grid,
  Switch,
} from "@material-ui/core";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import NavItem from "./NavItem";
import {ThemeContext} from "../../../App";

const items = [
  {
    href: "/backoffice/users",
    title: "Users",
  },
  {
    href: "/backoffice/topics",
    title: "Topics",
  },
  {
    href: "/backoffice/tags",
    title: "Tags",
  },
];

const BackofficeSidebar = ({
                             onMobileClose = () => {
                             },
                             openMobile = false,
                           }) => {
  const location = useLocation();

  const {toggleTheme} = useContext(ThemeContext);

  const [toggleChecked, setToggleChecked] = useState(false);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  const Toggle = () => {
    return (
      <Typography component="div">
        <Grid
          component="label"
          justifyContent="center"
          container
          alignItems="center"
          spacing={1}
          pb={3}
        >
          <Grid item sx={{display: "flex", pl: 0}}>
            <Brightness5Icon fontSize="small"/>
          </Grid>
          <Grid item>
            <Switch
              size="small"
              checked={toggleChecked}
              color="default"
              onChange={() => {
                toggleTheme();
                setToggleChecked(!toggleChecked);
              }}
            />
          </Grid>
          <Grid item sx={{display: "flex"}}>
            <Brightness2Icon fontSize="small"/>
          </Grid>
        </Grid>
      </Typography>
    );
  };

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box sx={{p: 2}}>
        <List>
          {items.map((item) => (
            <NavItem href={item.href} key={item.title} title={item.title}/>
          ))}
        </List>
      </Box>
      <Box sx={{flexGrow: 1}}/>
      <Toggle/>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256,
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: "calc(100% - 64px)",
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

export default BackofficeSidebar;
