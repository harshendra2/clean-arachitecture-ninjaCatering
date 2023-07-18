import userRepositories from "../../infrastructure/repositories/userRepositories";
import { Response } from 'express';

async function SendOTP(data: { email: string, password: string, res: Response }) {
  const { email, password, res } = data;
  const userExist: any = await userRepositories.findUsers(email, password);
  if (userExist) return await userRepositories.SENDOTP(email,res);
}

async function otpchecking(data:{email:string , otp:string,res: Response }) {
  const {email,otp,res}=data;
  return await userRepositories.OTPCHECKING(email,otp,res)
}

async function usergoolglogin(data:{fname:string ,mobile:string,password:string ,email:string}) {
  const {fname,mobile,password,email}=data;
  return await userRepositories.USERGOOGLELOGIN(fname,mobile,password,email)
}



export {SendOTP,otpchecking,usergoolglogin}

