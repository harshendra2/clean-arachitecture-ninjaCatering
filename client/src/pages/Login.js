import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

import jwt_decode from "jwt-decode";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sentOtpFunction } from "../services/Apis";
import { googleLogin } from "../services/Apis";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();

    if (email === "") {
      toast.error("Enter your Eamil !");
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email !");
    } else if (password === "") {
      toast.error("Enter your Password !");
    } else {
      const data = {
        email: email,
        password: password,
      };

      const response = await sentOtpFunction(data);
      if (response.status === 200) {
        navigate("/user/Otp", { state: email });
      } else {
        toast.error(response.response.data.error);
      }
    }
  };

  // signup with Google
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log("hdfuiuytff", userObject);

    setUser(userObject);
  }

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (
        window.google &&
        window.google.accounts &&
        window.google.accounts.id
      ) {
        window.google.accounts.id.initialize({
          client_id:
            "585711333789-j332iagr0aio3ebf0rkv0ct6jshjugem.apps.googleusercontent.com",
          callback: handleCallbackResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("signInDiv"),
          {
            theme: "outline",
            size: "large",
            text: "Sign in with Google",
            login_uri: false,
            request_visible_actions: "http://schema.org/AddAction",
            prompt_parent_id: "signInDiv",
            callback: handleCallbackResponse,
          }
        );
      } else {
        setTimeout(initializeGoogleSignIn, 100);
      }
    };

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = initializeGoogleSignIn;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const googlebutton = async (e) => {
    const googledata = {
      email: user.email,
      password: user.sub,
      fname: user.name,
      mobile: user.nbf,
    };
    const response = await googleLogin(googledata);

    if (response.status === 200) {
      localStorage.setItem("userdbtoken", response.data.userToken);
      toast.success(response.data.message);
      window.localStorage.setItem("isLoggedIn",true)
      navigate("/dashboard");
    } else {
    }
  };

  if (user) {
    googlebutton();
  }


  const userValid = () => {
    let token = localStorage.getItem("userdbtoken");
    if (!token) {
     navigate("/")
    } else {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    userValid();
  }, []);




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
              <h2 className="fw-bold mb-2 text-center">Login</h2>
              <p className="text-white-50 mb-3">
                Please enter your login and password!
              </p>
              <form onSubmit={sendOtp}>
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email address"
                  id="formControlLg"
                  type="email"
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />

                <MDBBtn size="lg" color="dark">
                  Login
                </MDBBtn>
              </form>
              <p>
                Don't have account{" "}
                <NavLink to="/register" style={{ color: "red" }}>
                  Sign Up
                </NavLink>{" "}
              </p>

              <hr className="my-4" />
              <p>
                <NavLink to="/user/forgetpassword" style={{ color: "blue" }}>
                  Forget password ?
                </NavLink>{" "}
              </p>

              <div id="signInDiv" style={{ marginLeft: "1px" }}></div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <ToastContainer />
    </MDBContainer>
  );
}

export default Login;
