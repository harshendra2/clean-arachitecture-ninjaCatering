import React, { useEffect, useState} from "react";

import Card from "react-bootstrap/Card";
import "../styles/NinjaBox.css";
import { getninjabuffetpackage } from "../services/Apis";
import { Link ,useParams} from "react-router-dom";

function Ninjabuffetpackage() {
  const [user,setPackageItem] = useState([]);
  console.log(user);
  const { id } = useParams();
const categoryId = id;

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await getninjabuffetpackage();

      const filteredData = response.data.filter(
        (category) => category.category === categoryId
      );
      setPackageItem(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, [categoryId]); 
  

  return (
    <>
      <div className="space"></div>
      <div className="ninjaboxpackagebody">
        <h1 className="ninjaboxpackageheadding">
          Ninja<span style={{ color: " rgb(186, 12, 12)" }}>Buffet</span>{" "}
          Packages
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

export default Ninjabuffetpackage;
