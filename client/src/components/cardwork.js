import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../styles/Homepage.css";

const Cards = () => {
  return (
    <>
      <div className="row" style={{ marginLeft: "6%" }}>
        <div className="col-lg-3 col-md-4 col-sm-12">
          <Card style={{ width: "18rem", borderRadius: "1.2rem" }}>
            <Card.Img
              variant="top"
              src="https://new.caterninja.com/home/howItWorks/how-it-works-1.png"
            />
            <Card.Body>
              <Card.Title> Select Menu And Get Price</Card.Title>

              <Card.Text>
                Select Your Own Menu and Get Instant Price or Live Chat to Get
                Fixed Menu Packages
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-3 col-md-4 col-sm-12">
          <Card style={{ width: "18rem", borderRadius: "1.2rem" }}>
            <Card.Img
              variant="top"
              src="https://new.caterninja.com/home/howItWorks/how-it-works-2.png"
            />
            <Card.Body>
              <Card.Title>Multiple Quotations </Card.Title>
              <Card.Text>
                Select Your Own Menu and Get Instant Price or Live Chat to Get
                Fixed Menu Packages
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-3 col-md-4 col-sm-12">
          <Card style={{ width: "18rem", borderRadius: "1.2rem" }}>
            <Card.Img
              variant="top" 
              src="https://new.caterninja.com/home/howItWorks/how-it-works-3.png"
            />
            <Card.Body>
              <Card.Title>Easy Online Ordering</Card.Title>
              <Card.Text>
                Catering Experts Available Online For You, Call / Whatsapp Us,
                We Would Be Happy To Help You!
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-3 col-md-4 col-sm-12">
          <Card style={{ width: "18rem", borderRadius: "1.2rem" }}>
            <Card.Img
              variant="top"
              src="https://new.caterninja.com/home/howItWorks/how-it-works-4.png"
            />
            <Card.Body>
              <Card.Title>Guaranteed Best Price</Card.Title>
              <Card.Text>
                Pre-Negotiated Prices For Bulk Order, Premium Restaurant Quality
                Food at 50% Discounted Rates!
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Cards;
