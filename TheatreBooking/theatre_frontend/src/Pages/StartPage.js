import { Button, Container } from "@mui/material";
import { React } from "react";
import env from "react-dotenv";
import { useNavigate } from "react-router-dom";
import startImage from "../assets/start_page.jpg";
const StartPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Login");
  };
  console.log(env.REACT_APP_START_BRIGHTNESS);

  return (
    <div
      style={{
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        filter: "brightness(0.75)",
        backgroundImage: `url(${startImage})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* <Header handleDark={props.handleDark} /> */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100vh",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textShadow: "none",
          }}
        >
          <section
            style={{
              fontSize: "80px",
              fontFamily: "Kufam",
              fontWeight: "bolder",
              // filter: "brightness(1.4)",
            }}
          >
            Welcome To OGF Theatre{" "}
          </section>
          <section
            style={{
              fontSize: "30px",
              textAlign: "center",
              fontWeight: "revert-layer",
              // filter: "brightness(1.4)",
            }}
          >
            Hurry Up! <br />
            Book your Seat and Enjoy your show
          </section>
          <Button
            variant="contained"
            style={{
              // backgroundColor: "black",
              borderRadius: "30px",
              marginTop: "50px",
              maxWidth: "50%",
            }}
            onClick={handleClick}
          >
            Get Started
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default StartPage;
