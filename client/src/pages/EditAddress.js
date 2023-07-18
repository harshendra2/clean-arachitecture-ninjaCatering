import React,{useState,useEffect} from "react";
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
import {addaddress } from "../services/Apis"
import {Editaddress } from "../services/Apis"
import { useParams } from "react-router-dom";
import { getEditAdress} from "../services/Apis"


function EditAddress(){
    const navigate=useNavigate()
    const {id}=useParams();
const [country,setCountry]=useState("")
const [address,setAddress]=useState("")
const [city,setCity]=useState("")
const [ state,setState]=useState("")
const [postcode,setPostcode]=useState("")
const [phone,setPhone]=useState("")


const fetchData = async () => {
    try {
      const response = await getEditAdress({ id });
      if (response.status === 200) {
        const addressData = response.data; 
        setCountry(addressData.Address[0].country);
        setAddress(addressData.Address[0].address);
        setCity(addressData.Address[0].city);
        setState(addressData.Address[0].state);
        setPostcode(addressData.Address[0].postcode);
        setPhone(addressData.Address[0].phone);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  

useEffect(()=>{
fetchData()
},[])



const [user, setUser] = useState({});

useEffect(() => {
  const token = localStorage.getItem('userdbtoken');
  if (token) {
    const userObject = jwt_decode(token);
    setUser(userObject);
  }
}, []);

    
     const userId=user._id

      const submit=async(e)=>{
        e.preventDefault();
       const inputdata={ 
       userId,
        country
        ,address
        ,city,
        state,
        postcode,
        phone}
        if(!country){
            toast.error("Please Enter your Country")
        }else if(!address){
            toast.error("Please Enter Address")
        }else if(!city){
            toast.error("Please Enter City")
        }else if(!state){
            toast.error("Please Enter State")
        }else if(!postcode){
            toast.error("Please Enter Post Code")
        }else if(!phone){
            toast.error("Please Enter Phone Number")
        }else{
          const response = await Editaddress({id,...inputdata})
          if(response.status===200){
            navigate("/profile")
            toast.success("Address Edit succesfully")
          }else{
            toast.error(response.response.data.error);
          }
        }

      }

    return(
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
                <h2 className="fw-bold mb-2 text-center">Edit Address</h2>
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  name="country"
                 value={country}
                 onChange={(e)=>setCountry(e.target.value)}
                  label=" Country"
                  id="formControlLg"
                  type="text"
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  name="address"
                 value={address}
                 onChange={(e)=>setAddress(e.target.value)}
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
                 value={city}
                 onChange={(e)=>setCity(e.target.value)}
                  id="formControlLg"
                  type="text"
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="State"
                  name="state"
                value={state}
                onChange={(e)=>setState(e.target.value)}
                  type="text"
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />
                 <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Post Code"
                  name="postcode"
                  value={postcode}
                  onChange={(e)=>setPhone(e.target.value)}
                  type="number"
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />
                  <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Phone"
                  name="phone"
                 value={phone}
                 onChange={(e)=>setPhone(e.target.value)}
                  type="number"
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
    )
}

export default EditAddress;