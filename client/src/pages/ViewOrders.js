import React,{useState,useEffect} from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import {getviewOrder} from "../services/Apis"

function ViewOrder(){
    const {id}=useParams()
    const [view,setView]=useState({})

    const fetch =async()=>{
    const response = await getviewOrder({id})
    setView(response.data)
    }
    useEffect(()=>{
      fetch()
    },[])

    return(
        <>
        <Header/>
         
        <div className="modal-dialog modal-xl">
          <div
            
            style={{ backgroundColor: "#6d5b98", borderRadius: "10px" }}
          >
            <div className="modal-header border-bottom-0">
             
            </div>
            <div className="modal-body text-start px-4 pt-0 pb-4">
              <div className="text-center">
                <h5 className="mb-3" style={{color:"white"}}>Ordered Details</h5>
                <h5 className="mb-5"  style={{color:"white"}}>Order Id-{view.orderId}</h5>
              </div>
             
              

              
              <div className="d-flex justify-content-between mb-5">
                <MDBTable
                  responsive
                  style={{
                    marginTop: "50px",
                    width: "70rem",
                    marginLeft: "",
                  }}
                >
                  <MDBTableHead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Image</th>
                      <th scope="col">Name</th>
                      <th scope="col">count</th>
                      <th scope="col">Guest</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {view.product &&
                      view.product.map((cate, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>
                            <img
                              className="circle-image"
                              src={cate.img}
                              alt="Product"
                            />
                          </td>
                          <td>{cate.name}</td>
                          <td>
                            {cate.quantity} {cate.foodType}
                          </td>
                          <td>{cate.Nonveg}</td>
                        </tr>
                      ))}
                  </MDBTableBody>
                </MDBTable>
              </div>

              <div className="row justify-content-center">
                <div className="col-md-4 text-center">
                  <p className="lead fw-normal"  style={{color:"white"}}>Order Time</p>
                </div>
                <div className="col-md-4 text-center">
                
                </div>
                <div className="col-md-4 text-center">
                  <p className="lead fw-normal"  style={{color:"white"}}>Grand Total</p>
                </div>
                <div className="col-md-2 text-center">
                  <i className="fas fa-phone fa-lg"></i>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-md-4 text-center">
                  <p className="lead fw-normal" style={{color:"white"}}>{view.time}</p>
                </div>
                <div className="col-md-4 text-center">
                 
                </div>
                <div className="col-md-4 text-center">
                  <p className="lead fw-normal"  style={{color:"white"}}>{view.subtotal}</p>
                </div>
                <div className="col-md-2 text-center">
                  <i className="fas fa-envelope fa-lg"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
    )
}

export default ViewOrder;