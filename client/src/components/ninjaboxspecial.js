import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../styles/NinjaBox.css";
import { IoIosCheckboxOutline } from "react-icons/io";

function Ninjaboxspecial() {
  return (
    <>
      <h1 className="specialboxheadding">
        What Makes Ninja<span style={{ color: " rgb(186, 12, 12)" }}>Box</span>{" "}
        Special?
      </h1>
      <div className="row" style={{ marginLeft: "6%" }}>
        <div className="col-lg-3 col-md-4 col-sm-12">
          <Card
            style={{
              width: "15rem",
              borderRadius: "1.2rem",
              backgroundColor: "rgb(600,200,10)",
            }}
          >
            <Card.Body className="cardbody">
              <Card.Title className="cardtitle">
                Portable Bulk Food Packaging
              </Card.Title>
            </Card.Body>
            <Card.Body>
              <Card className="cardColor">
                <p className="cardpara">
                  <IoIosCheckboxOutline className="Iconcolor" />
                  Trendy Bulk Packaging
                </p>
                <p className="cardpara">
                  <IoIosCheckboxOutline className="Iconcolor" />
                  Premium BioFriendly Disposable
                </p>
                <p className="cardpara">
                  <IoIosCheckboxOutline className="Iconcolor" />
                  No Utensile - Direct To Table
                </p>
              </Card>
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-3 col-md-4 col-sm-12">
          <Card
            style={{
              width: "15rem",
              borderRadius: "1.2rem",
              backgroundColor: "rgb(600,200,10)",
            }}
          >
            <Card.Body className="cardbody">
              <Card.Title className="cardtitle">
                Complete Party Solution
              </Card.Title>
            </Card.Body>
            <Card.Body>
              <Card className="cardColor">
                <p className="cardpara">
                  <IoIosCheckboxOutline className="Iconcolor" />
                  Large Cuisine Variety
                </p>
                <p className="cardpara">
                  <IoIosCheckboxOutline className="Iconcolor" /> Custom Choice
                  Menu
                </p>
                <p className="cardpara">
                  <IoIosCheckboxOutline className="Iconcolor" /> Great Value for
                  Money
                </p>
              </Card>
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-3 col-md-4 col-sm-12">
          <Card
            style={{
              width: "15rem",
              borderRadius: "1.2rem",
              backgroundColor: "rgb(600,200,10)",
            }}
          >
            <Card.Body className="cardbody">
              <Card.Title className="cardtitle">
                {" "}
                Prepared With Care And Hygiene
              </Card.Title>
            </Card.Body>
            <Card.Body>
              <Card className="cardColor">
                <p className="cardpara">
                  <IoIosCheckboxOutline className="Iconcolor" />
                  Strict NinjaKitchen Protocols
                </p>
                <p className="cardpara">
                  <IoIosCheckboxOutline className="Iconcolor" /> Highest Safety
                  Standards
                </p>
                <p className="cardpara">
                  <IoIosCheckboxOutline className="Iconcolor" />
                  Trained Chef & Delivery Ninja
                </p>
              </Card>
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-3 col-md-4 col-sm-12">
          <Card
            style={{
              width: "15rem",
              borderRadius: "1.2rem",
              backgroundColor: "rgb(600,200,10)",
            }}
          >
            <Card.Body className="cardbody">
              <Card.Title className="cardtitle">
                {" "}
                Hassle Free Solution
              </Card.Title>
            </Card.Body>

            <Card.Body>
              <Card className="cardColor">
                <p className="cardpara">
                  <IoIosCheckboxOutline className="Iconcolor" /> Convenient
                  Ordering
                </p>
                <p className="cardpara">
                  <IoIosCheckboxOutline className="Iconcolor" /> Professional
                  Support
                </p>
                <p className="cardpara">
                  <IoIosCheckboxOutline className="Iconcolor" />
                  On Time Delivery
                </p>
              </Card>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Ninjaboxspecial;
