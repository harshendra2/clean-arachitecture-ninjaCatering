import { commonrequest } from "./ApiCall";
import { BACKEND_URL } from "./helper";
let token = localStorage.getItem("userdbtoken");

export const registerfunction = async (data) => {
  return await commonrequest ("POST", `${BACKEND_URL}/user/register`, data);
};

export const registerOtp = async (data) => {
  return await commonrequest ("POST", `${BACKEND_URL}/user/registerotp`, data);
};

export const sentOtpFunction = async (data) => {
  return await commonrequest  ("POST", `${BACKEND_URL}/user/sendotp`, data);
};

export const userVerify = async (data) => {
  return await commonrequest ("POST", `${BACKEND_URL}/user/login`, data);
};

export const googleLogin = async (data) => {
  return await commonrequest ("POST", `${BACKEND_URL}/user/googlelogin`, data);
};

export const emailforgetpassword = async (data) => {
  return await commonrequest (
    "POST",
    `${BACKEND_URL}/user/forgetpassword`,
    data
  );
};

export const otpsendforforgetpassword = async (data) => {
  return await commonrequest ("POST", `${BACKEND_URL}/user/passwordotp`, data);
};

export const getninjaboxpackage = async (data) => {
  return await commonrequest ("GET", `${BACKEND_URL}/user/ninjabox`, data,token);
};

export const getninjabuffetpackage = async (data) => {
  return await commonrequest ("GET", `${BACKEND_URL}/user/ninjabuffet`, data, token);
};

export const getcustomeItem = async (data) => {
  return await commonrequest ("GET", `${BACKEND_URL}/user/getcustomeitem`, data, token);
};

export const getPackagesItems = async (data) => {
  return await commonrequest ("POST", `${BACKEND_URL}/user/getpackageitem`, data, token);
};

export const getpackagecategory = async(data)=>{
  return await commonrequest ("GET",`${BACKEND_URL}/user/getpackagecategory`, data, token)
}

export const getUserProfile = async(data)=>{
  return await commonrequest ("POST",`${BACKEND_URL}/user/getuserprofile`, data, token)
}

export const addaddress = async(data)=>{
  return await commonrequest("POST",`${BACKEND_URL}/user/addadress`, data, token)
}

export const getaddress = async(data)=>{
  return await commonrequest("POST",`${BACKEND_URL}/user/getaddress`, data, token)
}

export const deleteaddress = async(data)=>{
  return await commonrequest("DELETE",`${BACKEND_URL}/user/deleteaddress`, data, token)
}
 
export const getEditAdress = async(data)=>{
  return await commonrequest("POST",`${BACKEND_URL}/user/getEditaddress`, data, token)
}
    
export const Editaddress = async(data)=>{
  return await commonrequest("PUT",`${BACKEND_URL}/user/Editaddress`, data, token)
}

export const OrderItem = async(data)=>{
return await commonrequest("POST",`${BACKEND_URL}/user/orderitem`, data, token)
}

export const addcustomepageadress = async(data)=>{
  return await commonrequest("POST",`${BACKEND_URL}/user/addnewaddress`, data, token)
}

export const getOrderdetails = async(data)=>{
  return await commonrequest("POST",`${BACKEND_URL}/user/ordereddetails`, data, token)
}

export const OrderCancel=async(data)=>{
  return await commonrequest("POST",`${BACKEND_URL}/user/ordercancel`, data, token)
}

export const getviewOrder=async(data)=>{
  return await commonrequest("POST",`${BACKEND_URL}/user/viewOrders`, data, token)
}