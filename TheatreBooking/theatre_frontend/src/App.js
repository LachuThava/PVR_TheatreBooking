import React, { useState } from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPage from "./Pages/StartPage";
import Login from "./Pages/Login";
import { CssBaseline, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import SIgnup from "./Pages/SIgnup";
import MenuPage from "./Pages/MenuPage";
import MenuAdmin from "./Pages/MenuAdmin";
import Booking from "./Pages/Booking";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const light = {
    palette: {
      mode: "light",
    },
  };
  const dark = {
    palette: {
      mode: "dark",
    },
  };

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider
      theme={darkMode === true ? createTheme(dark) : createTheme(light)}
    >
      <CssBaseline />
      {/* <Header handleDark={handleDarkMode} /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage handleDark={handleDarkMode} />} />
          <Route
            path="/Login"
            element={<Login handleDark={handleDarkMode} />}
          />
          <Route
            path="/Signup"
            element={<SIgnup handleDark={handleDarkMode} />}
          />
          <Route
            path="/Menu"
            element={<MenuPage handleDark={handleDarkMode} />}
          />
          <Route
            path="/MenuAdmin"
            element={<MenuAdmin handleDark={handleDarkMode} />}
          />
          <Route
            path="/Booking"
            element={<Booking handleDark={handleDarkMode} />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
