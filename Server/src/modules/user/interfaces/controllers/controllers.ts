import {Request,Response, response} from 'express'
import {getUser} from '../../application/usecase/getUser'
import {registerUser} from '../../application/usecase/createUser'
import {OTPMatching} from "../../application/usecase/createUser"
import {SendOTP,usergoolglogin} from "../../application/usecase/userLogin"
import {otpchecking} from "../../application/usecase/userLogin"
import {getninjabuffets} from "../../application/usecase/getpackage"
import {getcustomeitem} from "../../application/usecase/getcustomitems"
import {getpackageitemsusingid} from "../../application/usecase/getpackage"
import {gatcategorypackage} from "../../application/usecase/package_category"
import {getuserprofile} from "../../application/usecase/getUser"
import {addadresss} from "../../application/usecase/user_address"
import {getaddress,deleteaddress,geteditaddress,editadress,addadresscusomepage} from "../../application/usecase/user_address"
import {orderitem,ordereddetails,ordercancle,vieworder} from "../../application/usecase/Order"

export default {
  userSignUp: async (req: Request, res: Response) => {
    const data: any = await registerUser(req.body);
    if (data) res.status(400).json({ message: "OTP not send", data });
    else res.status(200).json({ message: "Email send Successfully" });
  },

  matchotp: async (req: Request, res: Response) => {
    const data: any = await OTPMatching(req.body);
    if (data) res.status(200).json({ message: "USer SignUp Successfully" });
    else res.status(400).json({ message: "Invalid Otp" });
  },

  userFind: async (req: Request, res: Response) => {
    const { email, password } = req.query as {
      email: string;
      password: string;
    };
    const data: any = await getUser(email, password);
    if (data) res.status(200).json({ data });
    else res.status(404).json({ message: "No such user" });
  },

  SENDOTP: async (req: Request, res: Response) => {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ error: "Please Enter Your Email and Password" });
    }

    try {
      const data: any = await SendOTP(req.body);
      if (!data) {
        return res.status(200).json({ message: "Email sent Successfully" });
      } else {
        return res.status(400).json({ error: data });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  USERLOGIN: async (req: Request, res: Response) => {
    if (!req.body.otp || !req.body.email) {
      return res.status(400).json({ error: "Please Enter Your OTP and email" });
    }
    try {
      const data: any = await otpchecking(req.body);
      if (data) {
        return res
          .status(200)
          .json({ message: "User Login Successfully", userToken: data });
      } else {
        return res.status(400).json({ error: data });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  GOOGLELOGIN:async(req:Request,res:Response)=>{
    try{
        const { fname,mobile,password,email} = req.body;
  if (!fname || !mobile || !password || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }else{
        const data: any = await usergoolglogin(req.body);
        if (data) {
            return res
          .status(200)
          .json({ message: "User Login Successfully", userToken: data });
        }
      
  }
   
    }catch(error){
        return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  GETNINJABUFFET: async (req: Request, res: Response) => {
    const data: any = await getninjabuffets();
    if (data) {
        return res.status(200).send(data);
    }
  },

  GETCUSTOMITEM: async (req: Request, res: Response) => {
    const data: any = await getcustomeitem();
    if (data) {
        return res.status(200).send(data);
    }
  },

  GETPACKAGEITEMUSINGID: async (req: Request, res: Response) => {
    const data: any = await getpackageitemsusingid(req.body);
    if (data) {
        return res.status(200).send(data);
    }
  },

  GETCATEGORY: async (req: Request, res: Response) => {
    try {
      const data: any = await gatcategorypackage();
      if (data) {
        return res.status(200).send(data);
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  GETPROFILE: async (req: Request, res: Response) => {
    try {
      const data: any = await getuserprofile(req.body);
      if (data) {
        return res.status(200).send(data);
      }
    } catch (error) {
      return res.status(400).json({ error: "Internal Server Error" });
    }
  },

  ADDADRESS: async (req: Request, res: Response) => {
    try {
      if (
        !req.body.country ||
        !req.body.address ||
        !req.body.city ||
        !req.body.state ||
        !req.body.postcode ||
        !req.body.phone ||
        !req.body.id
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      } else {
        const data: any = await addadresss(req.body);
        if (data) {
          return res
            .status(200)
            .json({ message: "Address added successfully" });
        } else {
          return res.status(404).json({ error: "User not found" });
        }
      }
    } catch (error) {
      return res.status(400).json({ error: "Internal Server Error" });
    }
  },

  GETADDRESS: async (req: Request, res: Response) => {
    try {
      const data: any = await getaddress(req.body);
      if (data) {
        return res.status(200).send(data);
      }
    } catch (error) {
      return res.status(400).json({ error: "Internal Server Error" });
    }
  },

  DELETEADDRESS: async (req: Request, res: Response) => {
    try {
      if (!req.body.id || !req.body.userId) {
        return res.status(400).json({ error: "Missing required fields" });
      } else {
        const data: any = await deleteaddress(req.body);
        if (data) {
          return res
            .status(200)
            .json({ message: "Address Delete successfully" });
        }
      }
    } catch (error) {
      return res.status(400).json({ error: "Internal Server Error" });
    }
  },

  GETEDITADDRESS: async (req: Request, res: Response) => {
    try {
      const data: any = await geteditaddress(req.body);
      if (data) {
        return res.status(200).send(data);
      }
    } catch (error) {
      return res.status(400).json({ error: "Internal Server Error" });
    }
  },

  EDITADDRESS: async (req: Request, res: Response) => {
    try {
      if (
        !req.body.country ||
        !req.body.address ||
        !req.body.city ||
        !req.body.state ||
        !req.body.postcode ||
        !req.body.phone
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      } else {
        const data: any = await editadress(req.body);
        if (data) {
          return res.status(200).json({ message: "Address Edit successfully" });
        } else {
          return res
            .status(404)
            .json({ error: "Address not found or no changes made" });
        }
      }
    } catch (error) {
      return res.status(400).json({ error: "Internal Server Error" });
    }
  },

  ORDERITEM: async (req: Request, res: Response) => {
    try {
      const data: any = await orderitem(req.body);
      if (data) {
        return res.status(200).json({ message: "Order placed successfully" });
      }
    } catch (error) {
      return res.status(400).json({ error: "Internal Server Error" });
    }
  },

  ADDADDRESSCUSTOMEPAGE:async(req:Request,res:Response)=>{
    try{
        if (
            !req.body.country ||
            !req.body.address ||
            !req.body.city ||
            !req.body.state ||
            !req.body.postcode ||
            !req.body.phone ||
            !req.body.id
          ) {
            return res.status(400).json({ error: "Missing required fields" });
          } else {
            const data: any = await addadresscusomepage(req.body);
            if (data) {
              return res
                .status(200)
                .json({ message: "Address added successfully" });
            } else {
              return res.status(404).json({ error: "User not found" });
            }
          }

    }catch(error){
        return res.status(400).json({ error: "Internal Server Error" });
    }
  },

  ORDEREDDETAILS:async(req:Request,res:Response)=>{
    try{
        const data: any = await ordereddetails(req.body);
        if (data) {
            return res.status(200).send(data);
        }

    }catch(error){
        return res.status(400).json({ error: "Internal Server Error" });  
    }
  },

  ORDERCANCLE:async(req:Request,res:Response)=>{
    try{
        const data: any = await ordercancle(req.body);
        if (data) {
          return res.status(200).json({message:"Order status changed successfully", data });
        }

    }catch(error){
        return res.status(400).json({error:"Internal Server Error"})
    }
  },

  VIEWORDERS:async(req:Request,res:Response)=>{
    try{
        const data:any=await vieworder(req.body)
        if(data){
            return res.status(200).send(data);
        }

    }catch(error){
        return res.status(400).json({error:"Internal Server Error"})
    }
  }
};