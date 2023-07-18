import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";

function Newpass() {
  const { id, token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const userValid = async () => {
    const res = await fetch(
      `http://localhost:4000/user/forgetpassword/${id}/${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    if (res.status === 201) {
      console.log("user Valid");
    } else {
      navigate("*");
    }
  };

  const setVal = (e) => {
    setPassword(e.target.value);
  };

  const sendpassword = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:4000/user/${id}/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();
    if (res.status === 201) {
      setPassword("");
      setMessage(true);
    } else {
      toast.error("! Token Expire generate new Link");
    }
  };

  useEffect(() => {
    userValid();
  }, []);

  const userValids = () => {
    let token = localStorage.getItem("userdbtoken");
    if (!token) {
     navigate("/")
    } else {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    userValids();
  }, []);

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
              <h2 className="fw-bold mb-2 text-center"></h2>
              {message ? (
                <p style={{ color: "green", fontWeight: "bold" }}>
                  Password Successfully Updated
                </p>
              ) : (
                ""
              )}
              <p className="text-dark-50 mb-3">Enter Your New password</p>
              <form onSubmit={sendpassword}>
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  value={password}
                  name="password"
                  onChange={setVal}
                  label=""
                  id="password"
                  type="password"
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />

                <MDBBtn size="lg" color="dark">
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

export default Newpass;
