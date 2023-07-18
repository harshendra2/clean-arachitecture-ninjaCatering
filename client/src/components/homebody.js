import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import image from "../Image/Section.png";
import "../styles/Homepage.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { IoIosCheckboxOutline } from "react-icons/io";
import YouTube from 'react-youtube';
import '../styles/VideoPlayer.css'; 

const Cardbody = () => {
  const navigate = useNavigate();



  const userValid = () => {
    let token = localStorage.getItem("userdbtoken");
    if (token) {
      console.log("user valid");
    } else {
      navigate("*");
    }
  };

  useEffect(() => {
    userValid();
  }, []);

  const [isFlipped, setIsFlipped] = useState(false);
  const [isFlipped1, setIsFlipped1] = useState(false);
  const [isFlipped2, setIsFlipped2] = useState(false);
  const [isFlipped3, setIsFlipped3] = useState(false);
  const [isFlipped4, setIsFlipped4] = useState(false);
  const [isFlipped5, setIsFlipped5] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleFlip1 = () => {
    setIsFlipped1(!isFlipped1);
  };
  const handleFlip2 = () => {
    setIsFlipped2(!isFlipped2);
  };

  const handleFlip3 = () => {
    setIsFlipped3(!isFlipped3);
  };

  const handleFlip4 = () => {
    setIsFlipped4(!isFlipped4);
  };
  const handleFlip5 = () => {
    setIsFlipped5(!isFlipped5);
  };

  const videoId = 'https://www.youtube.com/embed/o-s9E53Apq8'; // Replace with your YouTube video ID

  const handlePlayButtonClick = () => {
    // Handle the play button click event here
    console.log('Play button clicked');
  };

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <>
      <h1 className="bodyHeading">Our Services</h1>
      <div className="row" style={{ marginLeft: "6%" }}>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div
            className={`flip-card ${isFlipped ? "flipped" : ""}`}
            onMouseEnter={handleFlip}
            onMouseLeave={handleFlip}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <Card style={{ width: "30rem" }}>
                  <Card.Title>
                    <span className="cardheader">Ninja</span> Box
                  </Card.Title>

                  <Card.Body>
                    <Card.Img
                      variant="top"
                      class="Imagesize"
                      src="https://new.caterninja.com/_next/image?url=%2Fhome%2FourServices%2Fosf1.webp&w=256&q=75"
                    />
                    <Card.Text>
                      Door Step Deliver in a Convenient{" "}
                      <span style={{ color: "red" }}>Ready-to-Serve</span> box
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="flip-card-back">
                <Card
                  style={{
                    width: "30rem",
                    backgroundColor: "rgb(600, 200, 10)",
                  }}
                >
                  <Card.Body>
                    <Card className="cardColor">
                      <p>
                        <IoIosCheckboxOutline className="Iconcolor" /> No Mess
                        in Kitchen
                      </p>
                      <p>
                        <IoIosCheckboxOutline className="Iconcolor" /> No
                        Cleaning required
                      </p>
                      <p>
                        <IoIosCheckboxOutline className="Iconcolor" />
                        Include Disposalles
                      </p>
                    </Card>
                    <Card.Img
                      variant="top"
                      class="Imagesize"
                      src="https://new.caterninja.com/_next/image?url=%2Fhome%2FourServices%2Fbackpic.webp&w=256&q=75"
                    />

                    <Button variant="">View Details</Button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12">
          <div
            className={`flip-card ${isFlipped1 ? "flipped" : ""}`}
            onMouseEnter={handleFlip1}
            onMouseLeave={handleFlip1}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <Card style={{ width: "30rem" }}>
                  <Card.Title>
                    <span className="cardheader">Ninja</span> Buffet
                  </Card.Title>

                  <Card.Body>
                    <Card.Img
                      variant="top"
                      class="Imagesize"
                      src="https://new.caterninja.com/_next/image?url=%2Fhome%2FourServices%2Fosf22.webp&w=256&q=75"
                    />
                    <Card.Text>
                      Door Step Deliver in a Convenient{" "}
                      <span style={{ color: "red" }}>Ready-to-Serve</span> box
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="flip-card-back">
                <Card
                  style={{
                    width: "30rem",
                    backgroundColor: "rgb(600, 200, 10)",
                  }}
                >
                  <Card.Body>
                    <Card className="cardColor">
                      <p>
                        <IoIosCheckboxOutline className="Iconcolor" />
                        1-2 Trained Captains
                      </p>
                      <p>
                        <IoIosCheckboxOutline className="Iconcolor" /> Hot and
                        Delicious Food
                      </p>
                      <p>
                        <IoIosCheckboxOutline className="Iconcolor" />
                        Quick Setup And CleanUp
                      </p>
                    </Card>
                    <Card.Img
                      variant="top"
                      class="Imagesize"
                      src="https://new.caterninja.com/_next/image?url=%2Fhome%2FourServices%2Fbackpic2.webp&w=256&q=75"
                    />

                    <Button variant="">View Details</Button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12">
          <div
            className={`flip-card ${isFlipped2 ? "flipped" : ""}`}
            onMouseEnter={handleFlip2}
            onMouseLeave={handleFlip2}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <Card style={{ width: "30rem" }}>
                  <Card.Title>
                    <span className="cardheader">Ninja</span> Gourmet
                  </Card.Title>

                  <Card.Body>
                    <Card.Img
                      variant="top"
                      class="Imagesize1"
                      src="https://new.caterninja.com/_next/image?url=%2Fhome%2FourServices%2Fosf3.webp&w=256&q=75"
                    />
                    <Card.Text>
                      Door Step Deliver in a Convenient{" "}
                      <span style={{ color: "red" }}>Ready-to-Serve</span> box
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="flip-card-back">
                <Card
                  style={{
                    width: "30rem",
                    backgroundColor: "rgb(600, 200, 10)",
                  }}
                >
                  <Card.Body>
                    <Card className="cardColor">
                      <p>
                        <IoIosCheckboxOutline className="Iconcolor" /> Quick
                        Setup And CleanUp
                      </p>
                      <p>
                        <IoIosCheckboxOutline className="Iconcolor" /> OutDoor
                        Catering
                      </p>
                      <p>
                        <IoIosCheckboxOutline className="Iconcolor" />
                        1-2 Traines Captains
                      </p>
                    </Card>
                    <Card.Img
                      variant="top"
                      class="Imagesize"
                      src="https://new.caterninja.com/_next/image?url=%2Fhome%2FourServices%2Fbackpic6.webp&w=256&q=75"
                    />

                    <Button variant="">View Details</Button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ paddingTop: "30px" }}></div>
      <div className="row" style={{ marginLeft: "6%" }}>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div
            className={`flip-card ${isFlipped3 ? "flipped" : ""}`}
            onMouseEnter={handleFlip3}
            onMouseLeave={handleFlip3}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <Card style={{ width: "30rem" }}>
                  <Card.Title>
                    <span className="cardheader">Ninja</span>Classic
                  </Card.Title>

                  <Card.Body>
                    <Card.Img
                      variant="top"
                      class="Imagesize"
                      src="https://new.caterninja.com/_next/image?url=%2Fhome%2FourServices%2Fnc1.webp&w=384&q=75"
                    />
                    <Card.Text>
                      Catering for{" "}
                      <span style={{ color: "red" }}>Large gethering </span> of
                      50+ guests
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="flip-card-back">
                <Card
                  style={{
                    width: "30rem",
                    backgroundColor: "rgb(600, 200, 10)",
                  }}
                >
                  <Card.Body>
                    <Card className="cardColor">
                      <p>
                        <IoIosCheckboxOutline className="Iconcolor" /> 1-2
                        Trained Captains
                      </p>
                      <p>
                        <IoIosCheckboxOutline className="Iconcolor" /> Outdoor
                        Catering
                      </p>
                      <p>
                        <IoIosCheckboxOutline className="Iconcolor" />
                        Quick Setup - Clean up
                      </p>
                    </Card>
                    <Card.Img
                      variant="top"
                      class="Imagesize"
                      src="https://new.caterninja.com/_next/image?url=%2Fhome%2FourServices%2Fbackpic3.webp&w=256&q=75"
                    />

                    <Button variant="">View Details</Button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12">
          <div
            className={`flip-card ${isFlipped4 ? "flipped" : ""}`}
            onMouseEnter={handleFlip4}
            onMouseLeave={handleFlip4}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <Card style={{ width: "30rem" }}>
                  <Card.Title>
                    <span className="cardheader">Ninja</span> MealBox
                  </Card.Title>

                  <Card.Body>
                    <Card.Img
                      variant="top"
                      class="Imagesize"
                      src="https://new.caterninja.com/_next/image?url=%2Fhome%2FourServices%2Fosf4.webp&w=256&q=75"
                    />
                    <Card.Text>
                      Individual{" "}
                      <span style={{ color: "red" }}>Boxed Meals/</span> Packed
                      Lunches
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="flip-card-back">
                <Card
                  style={{
                    width: "30rem",
                    backgroundColor: "rgb(600, 200, 10)",
                  }}
                >
                  <Card.Body>
                    <Card className="cardColor">
                      <p>
                        <IoIosCheckboxOutline className="Iconcolor" />
                        Huge Variety Of Menu
                      </p>
                      <p>
                        <IoIosCheckboxOutline className="Iconcolor" /> Unique
                        Packeging
                      </p>
                      <p>
                        <IoIosCheckboxOutline className="Iconcolor" />
                        Hassel Free Catering
                      </p>
                    </Card>
                    <Card.Img
                      variant="top"
                      class="Imagesize"
                      src="https://new.caterninja.com/_next/image?url=%2Fhome%2FourServices%2Fbackpic4.webp&w=256&q=75"
                    />

                    <Button variant="">View Details</Button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12">
          <div
            className={`flip-card ${isFlipped5 ? "flipped" : ""}`}
            onMouseEnter={handleFlip5}
            onMouseLeave={handleFlip5}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <Card style={{ width: "30rem" }}>
                  <Card.Title>
                    <span className="cardheader">Ninja</span>SnackBox
                  </Card.Title>

                  <Card.Body>
                    <Card.Img
                      variant="top"
                      class="Imagesize1"
                      src="https://new.caterninja.com/_next/image?url=%2Fhome%2FourServices%2Fezgif.com-gif-maker.webp&w=256&q=75"
                    />
                    <Card.Text>
                      Perfect box of healthy
                      <span style={{ color: "red" }}>delicious</span> snacks and
                      beverages
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="flip-card-back">
                <Card
                  style={{
                    width: "30rem",
                    backgroundColor: "rgb(600, 200, 10)",
                  }}
                >
                  <Card.Body>
                    <Card className="cardColor">
                      <p>
                        <IoIosCheckboxOutline className="Iconcolor" /> No
                        Cleaning Hassel
                      </p>
                      <p>
                        <IoIosCheckboxOutline className="Iconcolor" /> Doorstep
                        delivery
                      </p>
                      <p>
                        <IoIosCheckboxOutline className="Iconcolor" />
                        Hot and Delicious Food
                      </p>
                    </Card>
                    <Card.Img
                      variant="top"
                      class="Imagesize"
                      src="https://new.caterninja.com/_next/image?url=%2Fhome%2FourServices%2Fbackpic5.webp&w=256&q=75"
                    />

                    <Button variant="">View Details</Button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="video-player-container">
      <div className="play-button" onClick={handlePlayButtonClick} />
      <YouTube videoId={videoId} opts={opts} />
    </div>
    </>
  );
};

export default Cardbody;
