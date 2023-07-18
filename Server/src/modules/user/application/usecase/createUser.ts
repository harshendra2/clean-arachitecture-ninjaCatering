import userRepositories from "../../infrastructure/repositories/userRepositories";

async function registerUser(data: { email: string; name: string; password: string; mobile: number }) {
  const { email, name, password, mobile } = data;
  const userExist: any = await userRepositories.findUser(email, password);
  if (userExist) return await userRepositories.resgisterUser(data);
}

async function OTPMatching(data: { otp:number }) {
  const { otp } = data;
  return await userRepositories.MatchingOTP(data);
}

export { registerUser, OTPMatching };

