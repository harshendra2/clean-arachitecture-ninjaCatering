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

function Password() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const setVal = (e) => {
    setEmail(e.target.value);
  };

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/user/sendpasswordlink", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.status === 201) {
      setEmail("");
      setMessage(true);
    } else {
      toast.error("Invalid User");
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
              {message ? (
                <p style={{ color: "green", fontWeight: "bold" }}>
                  password reset link successfully in your Email
                </p>
              ) : (
                ""
              )}
              <p className="text-dark-50 mb-3">Enter Your Email</p>
              <form onSubmit={submit}>
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  name="email"
                  onChange={setVal}
                  value={email}
                  label=""
                  id="email"
                  type="email"
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

export default Password;
