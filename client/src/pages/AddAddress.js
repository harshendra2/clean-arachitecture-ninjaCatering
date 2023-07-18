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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { addaddress } from "../services/Apis";
import * as Yup from 'yup';

function Address() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const validationSchema = Yup.object().shape({
    country: Yup.string().required('Please enter your Country'),
    address: Yup.string().required('Please enter Address'),
    city: Yup.string().required('Please enter City'),
    state: Yup.string().required('Please enter State'),
    postcode: Yup.string().required('Please enter Post Code'),
    phone: Yup.string().matches(/^\d{10}$/, 'Please enter a valid 10-digit phone number').required('Please enter Phone Number'),
    email: Yup.string().email('Please enter a valid Email').required('Please enter Email'),
  });

  useEffect(() => {
    const token = localStorage.getItem("userdbtoken");
    if (token) {
      const userObject = jwt_decode(token);
      setUser(userObject);
    }
  }, []);

  let id = user._id;

  const [inputdata, setInputdata] = useState({
    country: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
    phone: "",
    email: "",
  });

  //set input value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    const { country, address, city, state, postcode, phone, email } = inputdata;
    
    try {
      await validationSchema.validate({
        country,
        address,
        city,
        state,
        postcode,
        phone,
        email,
      });
      
      const response = await addaddress({ id, ...inputdata });
      if (response.status === 200) {
        navigate("/profile");
        toast.success("Address Added successfully");
      } else {
        toast.error("An error occurred");
      }
    } catch (error) {
      const { message } = error;
      toast.error(message);
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
                <h2 className="fw-bold mb-2 text-center">Add Address</h2>
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  name="country"
                  onChange={handleChange}
                  label=" Country"
                  id="formControlLg"
                  type="text"
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  name="address"
                  onChange={handleChange}
                  label="Address"
                  id="formControlLg"
                  type="text"
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="City"
                  name="city"
                  onChange={handleChange}
                  id="formControlLg"
                  type="text"
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="State"
                  name="state"
                  onChange={handleChange}
                  type="text"
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Post Code"
                  name="postcode"
                  onChange={handleChange}
                  type="number"
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Phone"
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  type="email"
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />

                <MDBBtn size="lg" onClick={submit} color="dark">
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

export default Address;
