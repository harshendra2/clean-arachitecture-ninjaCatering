import React, { useEffect, useState, useRef } from "react";

import Card from "react-bootstrap/Card";
import "../styles/NinjaBox.css";
import { getninjaboxpackage } from "../services/Apis";
import { Link } from "react-router-dom";

function Ninjaboxpackage() {
  const [user, setUser] = useState([]);
  console.log(user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getninjaboxpackage();
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="space"></div>
      <div className="ninjaboxpackagebody">
        <h1 className="ninjaboxpackageheadding">
          Ninja<span style={{ color: " rgb(186, 12, 12)" }}>Box</span> Packages
        </h1>
        <div className="row" style={{ marginLeft: "6%" }}>
          {user.map((userData, index) => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
              <Card className="packagecard">
                <Card.Title className="cardtitle">{userData.name}</Card.Title>
                <Card.Body>
                  <Card.Img variant="top" src={userData.img} />
                  <Card.Text className="cardtext">
                    {userData.starters} Starters + {userData.mains} Mains +{" "}
                    {userData.desserts} Dessert
                  </Card.Text>
                  <Card.Text className="cardtext">
                    <h3>
                      <span>&#8377;</span>
                      {userData.price}/-
                    </h3>
                    <p>(Min. Order {userData.minOrder} Guests)</p>
                  </Card.Text>
                  <Link
                    to={`/customise/${userData._id}`}
                    className="cardbutton"
                  >
                    Customise & Book Now
                  </Link>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Ninjaboxpackage;
