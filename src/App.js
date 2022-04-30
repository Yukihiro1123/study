import React, { useState } from "react";
import { Container } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  orange,
  lightBlue,
  deepPurple,
  deepOrange,
} from "@mui/material/colors";

import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import Charts from "./components/Charts/Charts";

const App = () => {
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? orange[500] : lightBlue[500];
  const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];
  const darkTheme = createTheme({
    palette: {
      mode: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <Container>
          <Navbar darkState={darkState} setDarkState={setDarkState} />
          <Routes>
            <Route path="/" element={<Home darkState={darkState} />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/charts" element={<Charts darkState={darkState} />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
