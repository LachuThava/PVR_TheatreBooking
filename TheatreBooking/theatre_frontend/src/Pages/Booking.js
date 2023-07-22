import Header from "../components/Header";
import {
  Backdrop,
  Button,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { SEATS } from "../data/Seats";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import axios from "axios";
import env from "react-dotenv";
import { auth } from "../firebase";

const useStyles = makeStyles(() => ({
  seatDiv: {
    width: "50px",
    height: "50px",
    display: "grid",
    placeItems: "center",
    borderRadius: "5px",
    color: "lightsteelblue",
    marginRight: "2px",
    backgroundColor: "ButtonShadow",
  },
  seatDivActive: {
    color: "lightsteelblue",
    width: "50px",
    height: "50px",
    display: "grid",
    placeItems: "center",
    borderRadius: "5px",
    marginRight: "2px",
    backgroundColor: "green",
  },
  bookedSeatDiv: {
    cursor: "none",
    backgroundColor: "red",
  },
}));

const Booking = (props) => {
  const classes = useStyles();
  const [seats, setSeats] = useState(SEATS);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [time, setTime] = useState("");
  const [timeTable, setTimeTable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookedSeats, setBookedSeats] = useState([
    { id: "", seatName: "", check: false, book: false },
  ]);
  const location = useLocation();

  //when select the date from the select tag then it shows the available seats
  function checkSeatAvailable(time) {
    setSeats(SEATS);
    setSelectedSeats([]);
    console.log("time : ", time);
    setTime(time);
    axios
      .get(
        `${env.REACT_APP_THEATRE}/Booking/${location.state.movieName}/${time}`
      )
      .then((data) => {
        setBookedSeats(data.data);
        console.log(data.data);
        var temp = [];
        temp = data.data;

        setSeats(SEATS);
        temp.map((seat) => {
          console.log("AFTER : ", seat);
          handleBookingSeat(seat);
        });
      })
      .catch((err) => console.error(err));
  }

  // select tag shows the time schdeule for particular movie
  useEffect(() => {
    async function getTimeTable() {
      await axios
        .get(
          `${env.REACT_APP_THEATRE}/getTimeTable/${location.state.movieName}`
        )
        .then((data) => {
          setTimeTable(data.data);
        })
        .catch((error) => console.log(error));
    }

    return () => getTimeTable();
  }, []);

  useEffect(() => {
    console.log(selectedSeats);
  }, [selectedSeats]);

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const date = new Date(dateString);
    return date.toLocaleString("en-US", options);
  };

  // if click the book button then it works !!!!!!!
  const handleBook = async () => {
    setLoading(true);

    var ticketData = {
      email: auth.currentUser?.email,
      movieName: location.state.movieName,
      date: time,
      ticketSeats: selectedSeats,
    };
    await axios
      .post(`${env.REACT_APP_THEATRE}/Booking`, ticketData)
      .then((res) => console.log(res.data))

      .then(() => {
        selectedSeats.map((seat) => handleBookingSeat(seat));
      })
      .then(() => setSelectedSeats([]))
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  };

  // set the selected seats become red and not available
  const handleBookingSeat = (id) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.seatName === id
          ? { ...seat, check: false, book: !seat.book }
          : seat
      )
    );
  };

  // green color button color when we select the seat
  const handleSeatSelect = (id) => {
    setSeats((prevSeats) => {
      return prevSeats.map((seat) => {
        if (seat.id === id) {
          const updatedSeat = { ...seat, check: !seat.check };
          if (updatedSeat.check) {
            setSelectedSeats((prevSelectedSeats) => {
              // Check if the seat is already selected
              if (prevSelectedSeats.includes(updatedSeat.seatName)) {
                return prevSelectedSeats;
              }
              return [...prevSelectedSeats, updatedSeat.seatName];
            });
          } else {
            setSelectedSeats((prevSelectedSeats) =>
              prevSelectedSeats.filter(
                (prevSeat) => prevSeat !== updatedSeat.seatName
              )
            );
          }
          return updatedSeat;
        }
        return seat;
      });
    });
  };
  const seat = (id, check, book) => {
    const isSelectedSeat = check && !book; // Selected but not booked

    return (
      <div
        key={id}
        className={`${classes.seatDiv} ${
          isSelectedSeat ? classes.seatDivActive : ""
        } ${book ? classes.bookedSeatDiv : classes.seatDiv}`}
        id={id}
        onClick={() => handleSeatSelect(id, isSelectedSeat, book)}
      >
        {id}
      </div>
    );
  };
  return (
    <div>
      <Header handleDark={props.handleDark} />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container>
        <Grid container>
          {/* seats */}
          <Grid
            item
            lg={6}
            md={12}
            sm={12}
            style={{
              display: "grid",
              placeItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                marginTop: "5px",
                justifyContent: "center",
              }}
              id="row1"
            >
              {seats.map((item) => {
                if (item.id >= 1 && item.id <= 7) {
                  return seat(item.id, item.check, item.book);
                }
                return null;
              })}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "5px",
                justifyContent: "center",
              }}
              id="row2"
            >
              {seats.map((item) => {
                if (item.id >= 8 && item.id <= 16) {
                  return seat(item.id, item.check, item.book);
                }
                return null;
              })}
            </div>

            <div
              style={{
                marginTop: "40px",
                display: "grid",
                placeItems: "center",
              }}
            >
              <div style={{ display: "flex", marginTop: "5px" }} id="row3">
                {seats.map((item) => {
                  if (item.id >= 17 && item.id <= 27) {
                    return seat(item.id, item.check, item.book);
                  }
                  return null;
                })}
              </div>
              <div style={{ display: "flex", marginTop: "5px" }} id="row4">
                {seats.map((item) => {
                  if (item.id >= 28 && item.id <= 38) {
                    return seat(item.id, item.check, item.book);
                  }
                  return null;
                })}
              </div>
              <div style={{ display: "flex", marginTop: "5px" }} id="row5">
                {seats.map((item) => {
                  if (item.id >= 39 && item.id <= 49) {
                    return seat(item.id, item.check, item.book);
                  }
                  return null;
                })}
              </div>
              <div style={{ display: "flex", marginTop: "5px" }} id="row6">
                {seats.map((item) => {
                  if (item.id >= 50 && item.id <= 60) {
                    return seat(item.id, item.check, item.book);
                  }
                  return null;
                })}
              </div>
            </div>
            <div
              style={{
                marginTop: "40px",
                display: "grid",
                placeItems: "center",
              }}
            >
              <div style={{ display: "flex", marginTop: "5px" }} id="row7">
                {seats.map((item) => {
                  if (item.seatName >= 61 && item.seatName <= 71) {
                    return seat(item.id, item.check, item.book);
                  }
                  return null;
                })}
              </div>
              <div style={{ display: "flex", marginTop: "5px" }} id="row8">
                {seats.map((item) => {
                  if (item.id >= 72 && item.id <= 82) {
                    return seat(item.id, item.check, item.book);
                  }
                  return null;
                })}
              </div>
            </div>
          </Grid>
          {/* Records */}
          <Grid
            item
            lg={6}
            md={12}
            sm={12}
            style={{
              display: "flex",
              flexDirection: "column",
              // backgroundColor: "lightsalmon",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                marginBottom: "20px",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: "220px",
                  height: "300px",
                }}
                alt="Movie"
                image={location.state.movieUrl}
              />
              <div>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <Typography variant="caption">Director : &nbsp; </Typography>
                  <Typography variant="caption">
                    {location.state.director}
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <Typography variant="caption">Duration : &nbsp;</Typography>
                  <Typography variant="caption">
                    {location.state.duration}
                  </Typography>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <IconButton style={{ color: "green" }}>
                      <ThumbUp />
                    </IconButton>
                    <Typography variant="caption">
                      {location.state.likes}
                    </Typography>
                    <IconButton style={{ color: "red" }}>
                      <ThumbDown />
                    </IconButton>
                    <Typography variant="body1">
                      {location.state.dislikes}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
            <TextField
              fullWidth
              label="Movie"
              disabled
              InputLabelProps={{ shrink: true }}
              defaultValue={location.state.movieName}
              style={{ marginBottom: "10px" }}
            />

            <Select
              style={{ marginBottom: "10px" }}
              value={time}
              defaultValue={timeTable[0]}
              onChange={(e) => checkSeatAvailable(e.target.value)}
            >
              {timeTable.map((time, index) => {
                return (
                  <MenuItem key={index} value={time}>
                    {formatDate(time)}
                  </MenuItem>
                );
              })}
            </Select>

            <FormControl
              hiddenLabel
              variant="outlined"
              fullWidth
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                height: "60px",
                marginBottom: "20px",
              }}
            >
              <FormControlLabel
                control={
                  <div style={{ padding: "10px" }}>
                    {selectedSeats.map((seat, index) => (
                      <Chip
                        key={index}
                        label={seat}
                        style={{ marginRight: "5px" }}
                      />
                    ))}
                  </div>
                }
              />
            </FormControl>
            <Button variant="contained" onClick={handleBook} color="secondary">
              Book
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Booking;
