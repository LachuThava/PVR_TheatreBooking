import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import axios from "axios";
import React, { useEffect, useState } from "react";
import env from "react-dotenv";
import dayjs from "dayjs";
import { CheckCircleOutline, DangerousRounded } from "@mui/icons-material";

const AddMovieForm = () => {
  const [movie, setMovie] = useState();
  const [movieUrl, setMovieUrl] = useState();
  const [director, setDirector] = useState();
  const [duration, setDuration] = useState();
  const [status, setStatus] = useState("");
  const [releaseDate, setReleaseDate] = useState(dayjs("1997-06-18"));
  const [closingDate, setClosingDate] = useState(dayjs("2023-06-18"));
  const [alertMessage, setAlertMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [timeTable, setTimeTable] = useState([]);
  const [days, setDays] = useState([]);

  useEffect(() => {
    const retrieveTimeTable = async () => {
      axios
        .get(`${env.REACT_APP_THEATRE}/days`)
        .then((data) => {
          setDays(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return () => retrieveTimeTable();
  }, []);

  const handleAddMovie = async () => {
    var movieData = {
      movieName: movie,
      director: director,
      duration: duration,
      status: status,
      releaseDate: releaseDate.$d,
      closeDate: closingDate.$d,
      likes: 0,
      dislikes: 0,
      comments: [""],
      timeTable: timeTable,
    };

    await axios
      .post(`${env.REACT_APP_THEATRE}/addMovie`, movieData)
      .then((res) => res.data)
      .then(() => setAlertMessage(true))
      .catch((err) => {
        console.log(err);
        setErrorMessage(true);
      });
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <Box
        maxWidth="md"
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          // backgroundColor: "brown",
          width: "100%",
        }}
      >
        <Typography variant="h3" sx={{ fontStyle: "Signika+Negative" }}>
          Add Movie
        </Typography>
        <TextField
          label="Movie"
          style={{ marginBottom: "10px" }}
          onChange={(e) => setMovie(e.target.value)}
        />
        <TextField
          label="Movie Image URL"
          style={{ marginBottom: "10px" }}
          onChange={(e) => setMovieUrl(e.target.value)}
        />
        <TextField
          label="Director"
          style={{ marginBottom: "10px" }}
          onChange={(e) => setDirector(e.target.value)}
        />
        <TextField
          label="Duration"
          style={{ marginBottom: "10px" }}
          onChange={(e) => setDuration(e.target.value)}
        />
        <FormControl style={{ marginBottom: "10px" }}>
          <InputLabel>Status</InputLabel>
          <Select
            onChange={(e) => setStatus(e.target.value)}
            style={{ marginBottom: "10px" }}
          >
            <MenuItem key={1} value={"COMING_SOON"}>
              COMING SOON
            </MenuItem>
            <MenuItem key={2} value={"AVAILABLE"}>
              AVAILABLE
            </MenuItem>
            <MenuItem key={3} value={"CLOSED"}>
              CLOSED
            </MenuItem>
          </Select>
        </FormControl>
        <div
          style={{
            marginBottom: "10px",
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Release Date"
              value={releaseDate}
              onChange={(newValue) => setReleaseDate(newValue)}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Closing Date"
              value={closingDate}
              onChange={(newValue) => setClosingDate(newValue)}
            />
          </LocalizationProvider>
        </div>
        <FormControl variant="outlined" sx={{ m: 1, width: 500 }}>
          <InputLabel>Add Time</InputLabel>
          <Select
            multiple
            value={timeTable}
            label="Add Time"
            onChange={(e) => setTimeTable(e.target.value)}
            input={<OutlinedInput label="Multiple Select" />}
            renderValue={(selected) => (
              <div>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </div>
            )}
          >
            {days.map((day, i) => (
              <MenuItem value={day} key={i}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleAddMovie}>
          Submit
        </Button>
      </Box>

      <Dialog
        open={alertMessage}
        onClose={() => setAlertMessage(!alertMessage)}
      >
        <DialogTitle
          color="green"
          style={{ display: "flex", placeItems: "center" }}
        >
          <CheckCircleOutline />
          <hr />
          SuccessFully added
        </DialogTitle>
      </Dialog>
      <Dialog
        open={errorMessage}
        onClose={() => setErrorMessage(!errorMessage)}
      >
        <DialogTitle
          color="red"
          style={{ display: "flex", placeItems: "center" }}
        >
          <DangerousRounded />
          <hr />
          Processs Failed
        </DialogTitle>
      </Dialog>
    </div>
  );
};

export default AddMovieForm;
