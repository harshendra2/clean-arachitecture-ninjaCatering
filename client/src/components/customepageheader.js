import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function CustomeHeader() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const sendDataToServer = () => {
    // Send the location data to your server using an HTTP request (e.g., fetch or axios)
    fetch("/api/location", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ latitude, longitude }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server if needed
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <div>
        <Carousel interval={3000}>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src="http://res.cloudinary.com/dcgrqxvbk/image/upload/v1688018230/yvihbss7fefgxcmyeruh.png"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src="http://res.cloudinary.com/dcgrqxvbk/image/upload/v1688018696/vemlfnt1ptu68gq6e46x.png"
              alt="Second slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>

    </>
  );
}

export default CustomeHeader;
