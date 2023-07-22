import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import Header from "../components/Header";
import Carousel from "react-material-ui-carousel";
import axios from "axios";
import env from "react-dotenv";
import { useNavigate } from "react-router-dom";
const MenuPage = (props) => {
  const movies = [
    "https://cdn.wallpapersafari.com/63/91/EGjUcK.jpg",
    "https://www.hdwallpapers.in/download/terminator_dark_fate_movie_poster_4k_8k_hd-HD.jpg",
    "https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/01/john-wick-4-total-film-social-featured.jpg",
    "https://images7.alphacoders.com/131/1314905.jpeg",
  ];

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [autoplayPaused, setAutoplayPaused] = React.useState(false);
  const [movieList, setMovieList] = React.useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getAllMovies = async () => {
      await axios
        .get(`${env.REACT_APP_THEATRE}/getMovies`)
        .then((res) => setMovieList(res.data))
        .catch((err) => console.log(err));
    };
    return () => {
      getAllMovies();
    };
  }, []);

  const handleSlideChange = (_, index) => {
    setCurrentSlide(index);
  };

  const handleMouseEnter = () => {
    setAutoplayPaused(true);
  };

  const handleMouseLeave = () => {
    setAutoplayPaused(false);
  };

  return (
    <div>
      <Header handleDark={props.handleDark} />
      <Container
        style={{ position: "relative" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Carousel
          autoPlay={!autoplayPaused}
          onChange={handleSlideChange}
          timeout={1000}
        >
          {movies.map((item, index) => (
            <div key={index}>
              <img src={item} height="auto" width="100%" alt="logo" />
              {index === currentSlide && (
                <Typography
                  variant="h2"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "lightgrey",
                    fontWeight: "revert-layer",
                  }}
                >
                  Upcoming Movies
                </Typography>
              )}
            </div>
          ))}
        </Carousel>
        <div style={{ display: "flex", marginTop: "20px" }}>
          {movieList.map((movie, index) => {
            return (
              <Card
                key={index}
                elevation={3}
                sx={{ marginRight: "20px" }}
                onClick={() =>
                  navigate("/Booking", {
                    state: {
                      movieName: movie.movieName,
                      duration: movie.duration,
                      director: movie.director,
                      likes: movie.likes,
                      dislikes: movie.dislikes,
                      movieUrl: movie.movieUrl,
                    },
                  })
                }
              >
                <CardMedia
                  component="img"
                  sx={{ width: "250px", height: "200px" }}
                  alt="Movie"
                  image={movie.movieUrl}
                />
                <Box>
                  <CardContent component="menu">
                    <Typography variant="h4">{movie.movieName}</Typography>
                    <Typography variant="body2">{movie.director}</Typography>
                    <Typography variant="body2">{movie.duration}</Typography>
                    <Typography
                      style={{
                        fontSize: "20px",
                        color: movie.status === "AVAILABLE" ? "green" : "red",
                      }}
                      variant="body2"
                    >
                      {movie.status}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default MenuPage;
