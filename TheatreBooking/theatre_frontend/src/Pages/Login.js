import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Header from "../components/Header";
import axios from "axios";
import env from "react-dotenv";

const Login = (props) => {
  const logo = require("../assets/favicon.png");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    age: 0,
    gender: "",
    password: "",
    role: "",
    ticketList: [],
    uid: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (data.role === "user") {
      navigate("/Menu", { replace: true });
    }
    if (data.role === "admin") {
      navigate("/MenuAdmin", { replace: true });
    }
  }, [data, navigate]);

  const handleSignIn = async () => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await axios
          .get(`${env.REACT_APP_THEATRE}/user/${userCredential.user.uid}`)
          .then((res) => setData(res.data))
          .catch((err) => console.log(err));
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <Header handleDark={props.handleDark} />
      <div
        style={{
          width: "100%",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          // onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Box
          component="form"
          maxWidth="sm"
          sx={{
            //   backgroundColor: "blue",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            boxSizing: "border-box",
            boxShadow: 2,
            padding: "10px",
          }}
        >
          <div style={{ display: "grid", placeItems: "center" }}>
            <img src={logo} alt="logo" width="200px" height="200px" />
          </div>

          <TextField
            variant="outlined"
            label="Email"
            type="email"
            placeholder="example@gmail.com"
            style={{ widht: "100%", marginTop: "20px", marginBottom: "10px" }}
            onChange={(e) => {
              setEmail(e.target.value);
              console.log(email);
            }}
          />
          <TextField
            variant="outlined"
            label="password"
            type="password"
            style={{ widht: "100%", marginTop: "20px", marginBottom: "10px" }}
            onChange={(e) => {
              setPassword(e.target.value);
              console.log(password);
            }}
          />

          <Button variant="contained" color="secondary" onClick={handleSignIn}>
            Sign In
          </Button>

          <Grid
            container
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <Grid item>
              <Link style={{ textDecoration: "none" }}>Forget Password?</Link>
            </Grid>
            <Grid item>
              <Link style={{ textDecoration: "none" }}>SignUp</Link>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Login;
