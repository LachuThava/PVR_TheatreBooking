import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import SignupIcon from "../assets/Signup.png";
import axios from "axios";
import env from "react-dotenv";
import Header from "../components/Header";

const SIgnUp = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleGender = (e) => {
    setGender(e.target.value);
  };
  const handleAge = (e) => {
    setAge(e.target.value);
  };

  const handleSignUp = async () => {
    setLoading(true);
    const userData = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      age: age.trim(),
      gender: gender.trim(),
      role: "user",
      ticketList: [{}],
    };

    await axios
      .post(`${env.REACT_APP_THEATRE}/createUser`, userData)
      .then((response) => console.log(response.data))
      .then(() => setLoading(false))
      .then(() => (window.location.href = "/Menu"))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Header handleDark={props.handleDark} />
      <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
        <img src={SignupIcon} width="auto" height="220px" alt="logo" />
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
            width: "100%",
            display: "grid",
            flexDirection: "column",
            placeItems: "center",
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Username"
            type="text"
            value={name}
            onChange={handleName}
            label="Username"
            style={{ widht: "100%", marginTop: "20px", marginBottom: "10px" }}
          />
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Email"
            value={email}
            onChange={handleEmail}
            type="email"
            label="email"
            style={{ widht: "100%", marginTop: "20px", marginBottom: "10px" }}
          />
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Password"
            type="password"
            value={password}
            onChange={handlePassword}
            label="Password"
            style={{ widht: "100%", marginTop: "20px", marginBottom: "10px" }}
          />
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Age"
            type="text"
            value={age}
            onChange={handleAge}
            label="Age"
            style={{ widht: "100%", marginTop: "20px", marginBottom: "20px" }}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gender}
              fullWidth
              style={{ widht: "100%", marginTop: "20px", marginBottom: "30px" }}
              onChange={handleGender}
            >
              <MenuItem value="">Select Gender</MenuItem>
              <MenuItem value="MALE">Male</MenuItem>
              <MenuItem value="FEMALE">Female</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleSignUp}
          >
            Create Your Account
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default SIgnUp;
