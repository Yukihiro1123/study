import React, { useState } from "react";
import { Container } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  orange,
  lightBlue,
  deepPurple,
  deepOrange,
} from "@mui/material/colors";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import Charts from "./components/Charts/Charts";

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

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
  const useAuth = () => {
    if (user) return true;
    else return false;
  };
  const ProtectedRoutes = () => {
    const auth = useAuth();

    return auth ? <Outlet /> : <Navigate to="/auth" />;
  };
  const PublicRoutes = () => {
    const auth = useAuth();
    return auth ? <Navigate to="/home" /> : <Outlet />;
  };
  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <Container>
          <Navbar
            darkState={darkState}
            setDarkState={setDarkState}
            user={user}
            setUser={setUser}
          />
          <Routes>
            <Route path="/" element={<ProtectedRoutes />}>
              <Route path="/" element={<Navigate replace to="home" />} />
              <Route path="/home" element={<Home darkState={darkState} />} />
              <Route
                path="/charts"
                element={<Charts darkState={darkState} />}
              />
            </Route>
            <Route path="auth" element={<PublicRoutes />}>
              <Route path="/auth" element={<Auth />} />
            </Route>
          </Routes>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
