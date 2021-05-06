import React, {useState} from "react";
import {useRoutes} from "react-router-dom";
import {ThemeProvider} from "@material-ui/core";
import "react-perfect-scrollbar/dist/css/styles.css";
import GlobalStyles from "./theme/GlobalStyles";
import {lightTheme, darkTheme} from "./theme";
import routes from "./routes";

export const ThemeContext = React.createContext({});

const App = () => {
  const routing = useRoutes(routes);

  const [activeTheme, setActiveTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setActiveTheme(activeTheme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeContext.Provider value={{activeTheme, toggleTheme}}>
      <ThemeProvider theme={activeTheme}>
        <GlobalStyles/>
        {routing}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
