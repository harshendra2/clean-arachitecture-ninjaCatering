import React,{useState,useEffect} from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {getpackagecategory} from "../services/Apis"
import { Link } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [category,setCategory]=useState([])

  const handleLogout = async () => {
    localStorage.removeItem("userdbtoken");
    window.localStorage.removeItem("isLoggedIn")

    navigate("/");
  };

  const handleninjahome = () => {
    navigate("/dashboard");
  };


 

  const fetchData = async () => {
    try {
      const response = await getpackagecategory();
      setCategory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function profile(){
    navigate("/profile")
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              onClick={handleninjahome}
              style={{ color: " rgb(186, 12, 12)" }}
            >
              Home
            </Nav.Link>
            {/* sample testing */}
            {category.map((cate,index)=>(
               <Nav.Link
               as={Link}
               to={`/ninjabuffet/${cate._id}`}
               style={{ color: "rgb(186, 12, 12)" }}
               key={index}
             >
               {cate.category}
             </Nav.Link>
              ))}
                

            <Button
              variant="Nooutline-danger"
              class="bttn"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Nav>

          <h1 class="header" style={{ marginRight: "45%" }}>
            Cater<span class="ninja">Ninja</span>
          </h1>
          <Dropdown.Toggle variant="Nooutline-danger" onClick={profile} id="profile-dropdown">
  <FontAwesomeIcon icon={faUser} />
</Dropdown.Toggle>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
