import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import env from "react-dotenv";
import {
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AddMovieForm from "../components/AddMovieForm";

const MenuAdmin = (props) => {
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([
    { movieName: "", director: "", duration: "" },
  ]);
  const [tempMovie, setTempMovie] = useState({
    movieName: "",
    movieUrl: "",
    director: "",
    duration: "",
    status: "",
    releaseDate: "",
    likes: 0,
    dislikes: 0,
    timeTable: [],
  });

  const [movieForm, setMovieForm] = useState(false);
  const [usersTable, setUsersTable] = useState(false);
  const [moviesTable, setMoviesTable] = useState(false);
  const [openMsg, setOpenMsg] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  // const [updateMovieForm, setUpdateMovieForm] = useState(false);

  useEffect(() => {
    console.log("movie : ", tempMovie);
  }, [tempMovie]);

  useEffect(() => {
    const getAllUsers = async () => {
      await axios
        .get(`${env.REACT_APP_THEATRE}/users`)
        .then((res) => setUsers(res.data))
        .catch((err) => console.log(err));
    };

    const getAllMovies = async () => {
      await axios
        .get(`${env.REACT_APP_THEATRE}/getMovies`)
        .then((res) => {
          setMovies(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    };

    return () => {
      getAllUsers();
      getAllMovies();
    };
  }, []);

  function handleOpen(movie) {
    console.log(movie);
    setTempMovie(movie);
    setOpenMsg(true);
    setOpenUpdateDialog(true);
  }

  return (
    <div>
      <Header handleDark={props.handleDark} />

      <Container
        style={{
          display: "flex",
          marginBottom: "20px",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            setUsersTable(!usersTable);
          }}
          style={{ marginRight: "5px" }}
        >
          Users
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setUsersTable(!usersTable);
          }}
          style={{ marginRight: "5px" }}
        >
          Add Admin
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setMoviesTable(!moviesTable);
          }}
          style={{ marginRight: "5px" }}
        >
          MOVIES
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setMovieForm(!movieForm);
          }}
          style={{ marginRight: "5px" }}
        >
          ADD MOVIE
        </Button>
      </Container>
      <Container style={{ marginTop: "10px" }}>
        {usersTable && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center"> No.</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Role</TableCell>
                  <TableCell align="center">Age</TableCell>
                  <TableCell align="center">Gender</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Uid</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, id) => (
                  <TableRow
                    key={user.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{id + 1}</TableCell>
                    <TableCell align="center">{user.name}</TableCell>
                    <TableCell align="center">{user.role}</TableCell>
                    <TableCell align="center">{user.age}</TableCell>
                    <TableCell align="center">{user.gender}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.uid}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
      <Container
        style={{
          display: "grid",
          // placeItems: "center",
        }}
      >
        {movieForm && <AddMovieForm />}
      </Container>
      <Container style={{ marginTop: "10px" }}>
        {moviesTable && movies.length > 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No .</TableCell>
                  <TableCell>Movie</TableCell>
                  <TableCell>Director</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Release Date</TableCell>
                  <TableCell>Likes</TableCell>
                  <TableCell>DisLikes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movies.map((movie, index) => (
                  <TableRow
                    onClick={() => handleOpen(movie)}
                    key={movie.movieName}
                    style={{ cursor: "pointer" }}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{movie.movieName}</TableCell>
                    <TableCell>{movie.director}</TableCell>
                    <TableCell>{movie.duration}</TableCell>
                    <TableCell>{movie.status}</TableCell>
                    <TableCell>{movie.releaseDate}</TableCell>
                    <TableCell>{movie.likes}</TableCell>
                    <TableCell>{movie.dislikes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
      {openMsg && (
        <Dialog
          open={openUpdateDialog}
          onClose={() => setOpenUpdateDialog(false)}
          maxWidth={"lg"}
        >
          <DialogTitle>
            <Typography variant="h3">Update the Movie Information</Typography>
          </DialogTitle>

          <Divider />

          <Grid
            container
            style={{
              display: "flex",
              flexDirection: "column",
              width: "800px",
              padding: "15px",
            }}
          >
            <TextField
              label="Movie"
              style={{ marginBottom: "10px" }}
              value={tempMovie.movieName}
            />
            <TextField
              label="Movie Image URL"
              style={{ marginBottom: "10px" }}
              value={tempMovie.movieUrl}
            />
            <TextField
              label="Director"
              style={{ marginBottom: "10px" }}
              value={tempMovie.director}
            />
            <TextField
              label="Duration"
              style={{ marginBottom: "10px" }}
              value={tempMovie.duration}
            />
            <FormControl style={{ marginBottom: "10px" }}>
              <InputLabel>Status</InputLabel>
              <Select value={tempMovie.status} style={{ marginBottom: "10px" }}>
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

            <Button variant="contained">Submit</Button>
          </Grid>
        </Dialog>
      )}
    </div>
  );
};

export default MenuAdmin;
