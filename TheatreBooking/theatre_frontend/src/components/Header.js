import { DarkMode, LightMode } from "@mui/icons-material";
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogTitle,
  Divider,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth as AUTH } from "../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import env from "react-dotenv";

const Header = (props) => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState();
  const [openSettings, setOpenSettings] = useState(false);
  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(AUTH, (user) => {
      if (user) {
        setAuth(user.uid);
      } else {
        setAuth();
      }
    });

    return () => {
      unsubscribe();
      setDarkMode(JSON.stringify(localStorage.getItem("darkMode")));
    };
  }, []);

  const handleDarkMode = () => {
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
    setDarkMode(!darkMode);
    console.log(localStorage);
    props.handleDark();
  };

  const handleSignOut = async () => {
    setLoading(true);
    await signOut(AUTH)
      .then(() => {
        setLoading(false);
      })
      .then(() => {
        navigate("/Login", { replace: true });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleGetUser = async () => {
    console.log("auth", auth);
    await axios
      .get(`${env.REACT_APP_THEATRE}/user/${auth}`)
      .then((data) => setUser(data.data))
      .catch((error) => console.log(error));

    setOpenSettings(true);
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleClick = () => {
    // navigate("/Signup");
    window.location.href = "/Signup";
  };

  return (
    <div
      style={{
        width: "100%",
        marginRight: "50px",
        marginTop: "20px",
        // backgroundColor: "lightpink",
        display: "flex",
        marginBottom: "30px",
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container
        style={{
          width: "100%",
          padding: "20px",
          borderBottom: "1px solid  rgb(191 219 254)",
        }}
      >
        <Grid container>
          <Grid
            item
            md={6}
            lg={6}
            sm={6}
            style={{ display: "grid", placeItems: "start" }}
          >
            <Typography variant="h3">PVR THEATRE</Typography>
          </Grid>
          <Grid
            item
            md={6}
            lg={6}
            sm={6}
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            {auth === undefined && (
              <Button
                variant="contained"
                style={{ marginRight: "10px", borderRadius: "20px" }}
                onClick={handleClick}
              >
                SignUp
              </Button>
            )}

            {auth !== undefined && (
              <Button
                variant="outlined"
                style={{ marginRight: "10px", borderRadius: "20px" }}
                onClick={handleGetUser}
              >
                Settings
              </Button>
            )}
            {auth !== undefined && (
              <Button
                variant="outlined"
                style={{ marginRight: "10px", borderRadius: "20px" }}
                onClick={handleSignOut}
              >
                SignOut
              </Button>
            )}
            {!darkMode && <LightMode />}
            {darkMode && <DarkMode />}
            <Switch {...label} onClick={handleDarkMode} />
          </Grid>
        </Grid>
      </Container>
      <Dialog open={openSettings} onClose={() => setOpenSettings(false)}>
        <DialogTitle>
          <Typography variant="h3">Settings</Typography>
        </DialogTitle>
        <Divider />
        <Grid
          container
          style={{
            display: "flex",
            flexDirection: "column",
            width: "500px",
            height: "600px",
            padding: "15px",
          }}
        >
          <TextField
            label="NAME"
            disabled
            style={{ marginBottom: "10px" }}
            value={user.name}
          />
          <TextField
            label="EMAIL"
            disabled
            style={{ marginBottom: "10px" }}
            value={user.email}
          />
          <TextField
            label="GENDER"
            disabled
            style={{ marginBottom: "10px" }}
            value={user.gender}
          />
        </Grid>
      </Dialog>
    </div>
  );
};

export default Header;
