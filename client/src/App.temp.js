import Login from "./pages/Login";
import Register from "./pages/Register";
import Otp from "./pages/Otp";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Otpregister from "./pages/Otpregister";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Newpass from "./pages/Newpassword";
import Password from "./pages/EmailForgetpassword";
import NinjaBuffet from "./pages/NinjaBuffet";
import DropdownComponent from "./pages/CustomePackage";
import Customise from "./pages/Customepage";
import Protect from "./services/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import Address from "./pages/AddAddress";
import EditAddress from "./pages/EditAddress";
import CustomepageAddress from "./pages/AddnewAdress";
import EditCustompageAddress from "./pages/EditAddressCustomepage";
import TrackingMap from "./pages/Livelocation";
import StripeChckout from "./pages/StripeCheckout";
import ViewOrder from "./pages/ViewOrders";



function AppTemp() {
   
  return (
   
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/Otp" element={<Otp />} />
        <Route path="/user/registerOtp" element={<Otpregister />} />
        <Route path="/user/forgetpassword" element={<Password />} />
        <Route path="/user/forgetpassword/:id/:token" element={<Newpass />} />
        <Route element={<Protect />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ninjabuffet/:id" element={<NinjaBuffet/>} />
        <Route path="/DropdownComponent" element={<DropdownComponent/>}/>
        <Route path="/customise/:id" element={<Customise/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/addadress" element={<Address/>}/>
        <Route path="/Editaddress/:id" element={<EditAddress/>}/>
        <Route path="/addcustomepageadress" element={<CustomepageAddress/>} />
        <Route path="/editcustomepageaddress/:id" element={<EditCustompageAddress/>}/>
        <Route path="/livalovation" element={<TrackingMap/>}/>
        <Route path="/stripe-checkout" element={<StripeChckout/>}/>
        <Route path="/vieworders/:id" element={<ViewOrder/>}/>
        <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppTemp;