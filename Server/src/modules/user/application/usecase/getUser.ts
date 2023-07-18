import userRepositories from "../../infrastructure/repositories/userRepositories";

async function getUser(email: string, password: string) {
  return await userRepositories.findUser(email, password);
}

async function getuserprofile(data:{id:string}) {
  const {id}=data
  return await userRepositories.GETUSERPROFILE(id);
}


export {getUser,getuserprofile};