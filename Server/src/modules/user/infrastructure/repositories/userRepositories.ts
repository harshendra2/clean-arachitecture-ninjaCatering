import connectDb from "../../utils/DBconnection";
import userModel from "../../domain/entities/userSchema";
import userotp from "../../domain/entities/userOtp"
import packageitem from "../../domain/entities/packageitem"
import customitem from "../../domain/entities/customeitemschema"
import PackageCategory from "../../domain/entities/package_categorySchama"
import order from "../../domain/entities/OrderSchema"
import bcrypt from 'bcryptjs';
import nodemailer from "nodemailer"
import {Request,Response} from 'express'
import generateAuthToken from "../../domain/entities/userSchema"

connectDb()

let fnamee: string;
let emaill: string;
let passwordd: string;
let mobilee: number;
let sendOtp: number;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "harsendraraj20@gmail.com",
    pass: "ukiovyhquvazeomy",
  },
});

export default{

    resgisterUser : async(data: { email: string; name: string; password: string ,mobile:number})=>{
        const {email,name,password,mobile} = data

        fnamee = name;
      emaill = email;
      mobilee = mobile;
      passwordd = password;


      const OTP = Math.floor(100000 + Math.random() * 900000);
      sendOtp = OTP;
      const mailOption = {
        from: "harsendraraj20@gmail.com",
        to: email,
        subject: "Sending Email For Otp signup",
        text: `OTP:- ${OTP}`,
      };
        
        transporter.sendMail(mailOption, (error, info) => {
          if (error) {
           return error
          } else {
            return true
          }
        });
        
    },

    MatchingOTP:async(data:{otp:number})=>{
      const {otp}=data;
       if(otp == sendOtp){
       const user = new userModel({
            name:fnamee,
            email:emaill,
            password:passwordd,
            mobile:mobilee
        })
        await user.save()
        return user
       }else{
        return false
       }
       
    },
    
    findUser: async (email: string, password: string) => {
        const user = await userModel.findOne({ email: email });
        let passwordMatch = false; 
    
        if (user) {
          passwordMatch = await bcrypt.compare(password, user.password);
        }
        if(passwordMatch){
          return user
        }
        
      },
    findUsers: async (email: string, password: string) => {
        const user = await userModel.findOne({ email: email });
        let passwordMatch = false; 
    
        if (user) {
          passwordMatch = await bcrypt.compare(password, user.password);
        }
        if(passwordMatch){
          return user
        }
        
      },

      SENDOTP: async (email: string, res: Response) => {
        const OTP = Math.floor(100000 + Math.random() * 900000);
      
        const existEmail = await userotp.findOne({ email: email });
        if (existEmail) {
          const updateDate = await userotp.findByIdAndUpdate(
            { _id: existEmail._id },
            {
              otp: OTP,
            },
            { new: true }
          );
          if (updateDate) {
            await updateDate.save();
          } 
      
          const mailOption = {
            from: "harsendraraj20@gmail.com",
            to: email,
            subject: 'Sending Email For Otp Validation',
            text: `OTP:- ${OTP}`,
          };
      
          transporter.sendMail(mailOption, (error, info) => {
            if (error) {
              return res.status(400).json({ error: 'Email Not Send' });
            } else {
              return res.status(200).json({ message: 'Email send Successfully' });
            }
          });
        } else {
          const saveOtpData = new userotp({
            email,
            otp: OTP,
          });
          await saveOtpData.save();
      
          const mailOption = {
            from:"harsendraraj20@gmail.com",
            to: email,
            subject: 'Sending Email For Otp Validation',
            text: `OTP:- ${OTP}`,
          };
      
          transporter.sendMail(mailOption, (error, info) => {
            if (error) {
              console.log('error', error);
              return res.status(400).json({ error: 'Email Not Send' });
            } else {
              console.log('Email Send', info.response);
              return res.status(200).json({ message: 'Email send Successfully' });
            }
          });
        }
      },

      OTPCHECKING: async (email: string, otp: string, res: Response) => {
        if (!otp || !email) {
          return res.status(400).json({ error: "Please Enter Your OTP and email" });
        }
        
        try {
          const otpverification = await userotp.findOne({ email: email });
             console.log("otp verification",otpverification)
          if (otpverification && otpverification.otp.toString() === otp) {
            const preuser = await userModel.findOne({ email: email });
             console.log("preuser",preuser)
            if (preuser) {
              // Token generation
              const token = await preuser.generateAuthToken();
              return token
            } else {
              return res.status(400).json({ error: "Invalid User" });
            }
          } else {
            return res.status(400).json({ error: "Invalid OTP" });
          }
        } catch (error) {
          return res.status(400).json({ error: "Invalid Details"});
        }
      },

      USERGOOGLELOGIN:async(fname:string,mobile:string,password:string,email:string)=>{
          try{
            console.log("backed google login")
            const preuser = await userModel.findOne({ email: email });
    if (preuser) {
      const passwordMatch = await bcrypt.compare(password, preuser.password);
      if (passwordMatch) {
        const token = await preuser.generateAuthToken();

        return token
      }
    }
    const userregister = new userModel({
      fname: fname,
      email: email,
      mobile: mobile,
      password: password,
    });

    const storeData = await userregister.save();
    if (storeData) {
     
    }

          }catch(error){
           console.log(error) 
          }
      },

      GETPACKAGE: async () => {
        try {
          const data = await packageitem.find({});
          return data;
        } catch (error) {
         console.log(error)
        }
      },
      
      GETCUSTOMEITEM:async()=>{
        try{
          const data = await customitem.find({});
          return data;
        }catch(error){
          console.log(error)
        }
      },

      GETPACKAGEITEMUSEINGID:async(id:string)=>{
        try{
           const data=await packageitem.findById(id)
           if(data){
            return data
           }
        }catch(error){
          console.log(error)
        }
      },

      GETPACKAGECATEGORY:async()=>{
        try{
          const data = await PackageCategory.find({});
          if (data) {
            return data
          }
        }catch(error){
          console.log(error)
        }
      },

      GETUSERPROFILE:async(id:string)=>{
         try{

          const data= await userModel.findById(id)
          if(data){
            return data;
          }
         }catch(error){
          console.log(error)
         }
      },

      ADDADDRESS:async(data:{country:string ,address:string ,city:string, state:string , postcode:string ,phone:string, email:string ,id:string})=>{
        try{
          const {country,address,city,state,postcode,phone,email,id}=data;
          const updatedUser = await userModel.findByIdAndUpdate(id, {
            $push: {
              Address: {
                country,
                address,
                city,
                state,
                postcode,
                phone,
                email,
              },
            },
          });

          if (updatedUser) {
            return updatedUser;
          } 

        }catch(error){
          console.log(error)
        }
      },

      GETADDRESS:async(id:string)=>{
        try{
          const data = await userModel.findById(id);
          if (data) {
            return data
          }
        }catch(error){
         console.log(error)
        }
     },

     DELETEADDRESS:async(id:string ,userId:string)=>{
      try{
        const updateResult = await userModel.updateOne(
          {
            _id: userId,
            "Address._id": id,
          },
          {
            $pull: {
              Address: { _id: id },
            },
          }
        );
        if(updateResult){
          return updateResult
        }

      }catch(error){
        console.log(error)
      }
     },

     GETEDITADDRESS:async(id:string)=>{
      try{
        const data = await userModel.findOne(
          { Address: { $elemMatch: { _id: id } } },
          { "Address.$": 1, _id: 0 }
        );
        if (data) {
          return data
        }

      }catch(error){
        console.log(error)
      }
      
     },

     EDITADDRESS:async(data:{country:string ,address:string ,city:string, state:string , postcode:string ,phone:string, email:string ,id:string,userId:string})=>{
      const {country,address,city,state,postcode,phone,email,id,userId}=data;
      try{

        const updateResult = await userModel.updateOne(
          {
            _id: userId,
            "Address._id": id,
          },
          {
            $set: {
              "Address.$.country": country,
              "Address.$.address": address,
              "Address.$.city": city,
              "Address.$.state": state,
              "Address.$.postcode": postcode,
              "Address.$.phone": phone,
            },
          }
        );
        if(updateResult){
          return updateResult
        }
    

      }catch(error){
        console.log(error);
      }
     },
    
     ORDERITEM: async (datas:{ combinedData:any[],grandtotal:string,data: { userId: string },useDetails: {
      selectedDate: string;
      orderAddress: string;
      times: string;
      vegguest: string;
      latitude: number;
      longitude: number;
      Nonvegguest: string;
    };}) => {
       const { combinedData,grandtotal,data,useDetails} = datas;
       
      try {
        const result = Math.random().toString(36).substring(2, 7);
        const id = Math.floor(100000 + Math.random() * 900000);
        const orderId = result + id;
    
        const organiproduct = combinedData.flatMap((item) => ({
          id: item._id,
          name: item.name,
          price: item.price,
          quantity: item.count,
          foodType: item.foodType,
          Nonveg: item.Nonveg,
          img: item.img,
        }));
    
        let orderData = {
          userId: data.userId,
          product: organiproduct,
          orderId: orderId,
          date: useDetails.selectedDate,
          foodType: organiproduct[0].foodType, 
          status: "processing",
          address: useDetails.orderAddress,
          time: useDetails.times,
          subtotal: parseFloat(grandtotal) / 2, 
          veguest: useDetails.vegguest,
          latitude: useDetails.latitude,
          longitude: useDetails.longitude,
          Nonvegguest: useDetails.Nonvegguest,
        };
    
      
        const orderPlacement = await order.insertMany(orderData);
        if (orderPlacement) {
          return orderPlacement;
        }
      } catch (error) {
        console.log(error);
      }
    },
    
    ADDADDRESSCUSTOME:async(data:{country:string ,address:string ,city:string, state:string , postcode:string ,phone:string, email:string ,id:string})=>{
      try{
        const {country,address,city,state,postcode,phone,email,id}=data;
        const updatedUser = await userModel.findByIdAndUpdate(id, {
          $push: {
            Address: {
              country,
              address,
              city,
              state,
              postcode,
              phone,
              email,
            },
          },
        });

        if (updatedUser) {
          return updatedUser;
        } 

      }catch(error){
        console.log(error)
      }
    },

    ORDEREDDETAILS:async(id:string)=>{
      try{
        const data = await order.find({ userId: id });
        if(data){
          return data;
        }

      }catch(error){
        console.log(error)
      }
    },

    ORDEREDCANCLE:async(id:string)=>{
      try{
        const data = await order.findById(id);
    if (data && data.status == "processing") {
      const setusertoken = await order.findByIdAndUpdate(
        id,
        {
          status: "Cancle Order",
        },
        { new: true }
      );

      if (setusertoken) {
        return setusertoken
      }
    } else if (data && data.status == "Order Confirm") {
      const setusertoken = await order.findByIdAndUpdate(
        id,
        {
          status: "Cancle Order",     
        },
        { new: true }
      );

      if (setusertoken) {
        return setusertoken
      }
    }
      }catch(error){
        console.log(error)
      }
    },


    ORDEREDETAILS:async(id:string)=>{
      try{
        const data = await order.find({ userId: id });
        if(data){
          return data;
        }

      }catch(error){
        console.log(error)
      }
    },


    
      

    }
    