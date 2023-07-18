import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { registerOtp } from "../services/Apis";
import "../styles/Login.css";

function Otpregister() {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const LoginUSer = async (e) => {
    e.preventDefault();
    if (otp === "") {
      toast.error("Enter Your Otp");
    } else if (!/[^a-zA-Z]/.test(otp)) {
      toast.error("Enter Valid Otp");
    } else if (otp.length < 6) {
      toast.error("Otp Length minimum 6 digit");
    } else {
      const data = {
        otp,
      };

      const response = await registerOtp(data);

      if (response.status === 200) {
        toast.success("SignUp Succesfully");

        navigate("/");
      } else {
        toast.error(response.response.data.error);
      }
    }
  };

  return (
    <MDBContainer fluid style={{ backgroundColor: "black", height: "750px" }}>
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
              <h2 className="fw-bold mb-2 text-center">OTP</h2>
              <p className="text-dark-50 mb-3">Please Enter Your OTP Here</p>
              <form>
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  name="otp"
                  onChange={(e) => setOtp(e.target.value)}
                  label=""
                  id="formControlLg"
                  type="text"
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />

                <MDBBtn size="lg" color="dark" onClick={LoginUSer}>
                  Submit
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

export default Otpregister;
