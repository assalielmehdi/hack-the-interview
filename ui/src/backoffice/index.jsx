import React, {useState} from "react";
import Helmet from "react-helmet";
import {Outlet} from "react-router-dom";
import {experimentalStyled} from "@material-ui/core";
import BackofficeNavbar from "./components/Navbar";
import BackofficeSidebar from "./components/Sidebar";

const BackofficeLayoutRoot = experimentalStyled("div")(({theme}) => ({
  backgroundColor: theme.palette.background.default,
  display: "flex",
  height: "100%",
  overflow: "hidden",
  width: "100%",
}));

const BackofficeLayoutWrapper = experimentalStyled("div")(({theme}) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 256,
  },
}));

const BackofficeLayoutContainer = experimentalStyled("div")({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
});

const BackofficeLayoutContent = experimentalStyled("div")({
  flex: "1 1 auto",
  height: "100%",
  overflow: "auto",
});

const Backoffice = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Backoffice | Hack The Interview</title>
      </Helmet>
      <BackofficeLayoutRoot>
        <BackofficeNavbar onMobileNavOpen={() => setMobileNavOpen(true)}/>
        <BackofficeSidebar
          onMobileClose={() => setMobileNavOpen(false)}
          openMobile={isMobileNavOpen}
        />
        <BackofficeLayoutWrapper>
          <BackofficeLayoutContainer>
            <BackofficeLayoutContent>
              <Outlet/>
            </BackofficeLayoutContent>
          </BackofficeLayoutContainer>
        </BackofficeLayoutWrapper>
      </BackofficeLayoutRoot>
    </>
  );
};

export default Backoffice;
