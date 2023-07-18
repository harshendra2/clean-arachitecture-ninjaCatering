import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import image from "../Image/Section.png";
import "../styles/Homepage.css";

import Cardbody from "../components/homebody";
import Cards from "../components/cardwork";
import  CustomFooter from "../components/customepageFooter";

function Dashboard() {
  const navigate = useNavigate();

  const userValid = () => {
    let token = localStorage.getItem("userdbtoken");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    userValid();
  }, []);

  return (
    <>
      <Header />
      <div>
        <img className="banner" src={image} />
      </div>
      <Cardbody />

      <div className="workcards">
        <h1 className="workcardheader">How it Works</h1>
      </div>
      <Cards />
      <div style={{marginTop:"50px"}}>
        </div>
      <CustomFooter/>
    </>
  );
}

export default Dashboard;
