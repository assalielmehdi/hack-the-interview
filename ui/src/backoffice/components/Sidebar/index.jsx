import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Drawer, Hidden, List } from "@material-ui/core";
import NavItem from "./NavItem";

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
    href: "/backoffice/levels",
    title: "Levels",
  },
  {
    href: "/backoffice/questions",
    title: "Questions",
  },
];

const BackofficeSidebar = ({
  onMobileClose = () => {},
  openMobile = false,
}) => {
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem href={item.href} key={item.title} title={item.title} />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
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
