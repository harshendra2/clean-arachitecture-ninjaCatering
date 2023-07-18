import React, { useState, useEffect } from "react";
import "../styles/ProfilePage.css";
import Header from "../components/Header";
import jwt_decode from "jwt-decode";
import { getUserProfile } from "../services/Apis";
import { getaddress } from "../services/Apis";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { deleteaddress } from "../services/Apis";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { getOrderdetails } from "../services/Apis";
import { OrderCancel } from "../services/Apis";

const ProfilePage = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState([]);
  const [address, setaddress] = useState([]);
  const [view, setView] = useState([]);

  // Function to fetch user profile based on user ID
  const fetchUserProfile = async (userId) => {
    try {
      const response = await getUserProfile({ id: userId });
      setProfile(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchuseraddress = async (userId) => {
    try {
      const response = await getaddress({ id: userId });
      setaddress(response.data.Address);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchorderdetails = async (userId) => {
    try {
      const response = await getOrderdetails({ id: userId });
      setView(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("userdbtoken");
    if (token) {
      const userObject = jwt_decode(token);

      // Fetch user profile after setting the user
      fetchUserProfile(userObject._id);
      fetchuseraddress(userObject._id);
      fetchorderdetails(userObject._id);
    }
  }, []);

  const addadress = () => {
    navigate("/addadress");
  };

  const token = localStorage.getItem("userdbtoken");

  const userId = jwt_decode(token);

  const Delete = async (id) => {
    const data = {
      id,
      userId,
    };
    const response = await deleteaddress(data);
    if (response.status === 200) {
      toast.success("Address deleted succefully");
      fetchuseraddress(userId);
    }
  };

  const cancleOrder = async (id) => {
    const response = await OrderCancel({ id });
    const token = localStorage.getItem("userdbtoken");

    const userId = jwt_decode(token);
    if (response.status === 200) {
      fetchorderdetails(userId._id);
    }
  };

  return (
    <>
      <Header />
      <div className="padding">
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <img
                className="card-img-top"
                src="https://i.imgur.com/K7A78We.jpg"
                alt="Card image cap"
              />
              <div className="card-body little-profile text-center">
                <div className="pro-img">
                  <img src="https://i.imgur.com/8RKXAIV.jpg" alt="user" />
                </div>
                <h3 className="m-b-0">{profile.fname}</h3>
                <p>{profile.email}</p>
                <div className="row text-center m-t-20">
                  <div className="col-lg-4 col-md-4 m-t-20">
                    <h3 className="m-b-0 font-light"></h3>
                    <small></small>
                  </div>

                  <div className="col-lg-4 col-md-4 m-t-20">
                    {/* Button trigger modal */}
                    <button
                      type="button"
                      className="btn btn-success btn-lg"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal1"
                    >
                      Ordered Item
                    </button>

                    <div
                      className="modal fade"
                      id="exampleModal1"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-xl">
                        <div
                          className="modal-content text-white"
                          style={{
                            backgroundColor: "#6d5b98",
                            borderRadius: "10px",
                          }}
                        >
                          <div className="modal-header border-bottom-0">
                            <button
                              type="button"
                              className="btn-close btn-close-white"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body text-start px-4 pt-0 pb-4">
                            <div className="text-center">
                              <h5 className="mb-3" style={{ color: "white" }}>
                                Ordered Details
                              </h5>
                            </div>

                            <MDBTable
                              responsive
                              style={{
                                marginTop: "50px",
                                width: "70rem",
                                marginLeft: "10rem",
                              }}
                            >
                              <MDBTableHead>
                                <tr>
                                  <th scope="col">No</th>
                                  <th scope="col">Order Id</th>
                                  <th scope="col">Price</th>
                                  <th scope="col">Order Status</th>
                                  <th scope="col">Action</th>
                                  <th scope="col">View</th>
                                </tr>
                              </MDBTableHead>
                              <MDBTableBody>
                                {view &&
                                  view.map((cate, index) => (
                                    <tr key={index}>
                                      <th scope="row">{index + 1}</th>
                                      <td>{cate.orderId}</td>
                                      <td>
                                        {" "}
                                        <span>&#8377;</span>
                                        {cate.subtotal}
                                      </td>
                                      <td>{cate.status}</td>
                                      <td>
                                        <button
                                          className="btn btn-danger btn-md"
                                          onClick={() => cancleOrder(cate._id)}
                                        >
                                          Cancel Order
                                        </button>
                                      </td>
                                      <td>
                                      <Link
  to={`/vieworders/${cate._id}`}
  className="btn btn-md btn-success link-button"
>
  View Orders
</Link>
                                      </td>
                                    </tr>
                                  ))}
                              </MDBTableBody>
                            </MDBTable>
                          </div>
                          <div className="d-flex justify-content-between mb-5"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4 m-t-20">
                    <h3 className="m-b-0 font-light"></h3>
                    <small></small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4" style={{ textAlign: "right" }}>
            <Button variant="primary" style={{display:"flex",marginLeft:"33%"}} onClick={addadress}>
              Add Address
            </Button>
            {address.map((add, index) => (
              <Card className="text-center" key={add._id}>
                <Card.Body>
                  <Card.Text>County: {add.country}</Card.Text>
                  <Card.Text>Address: {add.address}</Card.Text>
                  <Card.Text>City: {add.city}</Card.Text>
                  <Card.Text>PostCode: {add.postcode}</Card.Text>
                  <Card.Text>Phone Number: {add.phone}</Card.Text>
                  <Link
  to={`/Editaddress/${add._id}`}
  className="btn btn-xxl btn-success link-button"
>
  Edit
</Link>

                  <Button variant="btn btn-xxl btn-danger link-button" onClick={() => Delete(add._id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ProfilePage;
