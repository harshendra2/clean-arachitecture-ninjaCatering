import userRepositories from "../../infrastructure/repositories/userRepositories";

async function getninjabuffets() {
    
return await userRepositories.GETPACKAGE();
  }

  async function getpackageitemsusingid(data:{id:string}){
    const {id}=data
    return await userRepositories.GETPACKAGEITEMUSEINGID(id)
  }
  
  
  export {getninjabuffets,getpackageitemsusingid}