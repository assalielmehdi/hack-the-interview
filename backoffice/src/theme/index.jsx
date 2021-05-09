import {colors, createMuiTheme} from "@material-ui/core";
import shadows from "./shadows";
import typography from "./typography";

export const lightTheme = createMuiTheme({
  palette: {
    background: {
      default: "#F2F6FA",
      paper: colors.common.white,
    },
    primary: {
      contrastText: "#ffffff",
      main: "#0056bf",
    },
    text: {
      primary: "#172b4d",
      secondary: "#6b778c",
    },
  },
  shadows,
  typography,
});

export const darkTheme = createMuiTheme({
  palette: {
    background: {
      default: "#031f30",
      paper: "#0e161b",
    },
    primary: {
      contrastText: "#031f30",
      main: "#ffffff",
    },
    text: {
      primary: "#ffffff",
      secondary: "#9cd4f7",
    },
  },
  shadows,
  typography,
});
