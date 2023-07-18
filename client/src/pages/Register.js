import React, { useState,useEffect } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerfunction } from "../services/Apis";
import { useNavigate } from "react-router-dom";

function Register() {
  const [inputdata, setInputdata] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
  });

  const navigate = useNavigate();
  //set input value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    const { FirstName, email, mobile, password } = inputdata;

    if (FirstName === "") {
      toast.error("Enter your First Name");
    } else if (email === "") {
      toast.error("Enter Your Eamil");
    } else if (!email.includes("@")) {
      toast.error("Enter valid Email");
    } else if (!mobile.length === 10) {
      toast.error("Enter Your Mobile Number");
    } else if (password === "") {
      toast.error("Enter Your Password");
    } else {
      const response = await registerfunction(inputdata);
      if (response.status === 200) {
        setInputdata({
          ...inputdata,
          fname: "",
          email: "",
          mobile: "",
          password: "",
        });
        navigate("/user/registerOtp");
      } else {
        toast.error(response.response.data.error);
      }
    }
  };



  return (
    <MDBContainer fluid style={{ backgroundColor: "black" }}>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "500px" }}
          >
            <MDBCardBody className="p-5 w-100 d-flex flex-column">
              <h1 class="header">
                <img
                  class="logo"
                  src="https://th.bing.com/th/id/OIP.-dMwENv0NzjkqP_TttR5hwHaF7?pid=ImgDet&rs=1"
                  alt="Logo"
                />
                Cater<span class="ninja">Ninja</span>
              </h1>
              <form>
                <h2 className="fw-bold mb-2 text-center">Sign Up</h2>
                <p className="text-white-50 mb-3">
                  Please enter your login and password!
                </p>
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  name="fname"
                  onChange={handleChange}
                  label=" Name"
                  id="formControlLg"
                  type="text"
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  name="email"
                  onChange={handleChange}
                  label="Email address"
                  id="formControlLg"
                  type="email"
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Mobile Number"
                  name="mobile"
                  onChange={handleChange}
                  id="formControlLg"
                  type="number"
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />

                <MDBBtn size="lg" onClick={submit} color="dark">
                  Sign Up
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <ToastContainer />
    </MDBContainer>
  );
}

export default Register;
