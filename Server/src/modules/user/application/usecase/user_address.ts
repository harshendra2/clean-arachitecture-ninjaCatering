import userRepositories from "../../infrastructure/repositories/userRepositories";

async function addadresss(data:{country:string ,address:string ,city:string, state:string , postcode:string ,phone:string, email:string ,id:string}){
  const {country,address,city,state,postcode,phone,email,id}=data;

  return await userRepositories.ADDADDRESS(data);
}

async function getaddress(data:{id:string}) {
    const {id}=data
    return await userRepositories.GETADDRESS(id);
  }

  async function deleteaddress(data:{id:string,userId:string}){
    const {id,userId}=data
    return await userRepositories.DELETEADDRESS(id,userId)
  }

  async function geteditaddress(data:{id:string}){
    const {id}=data
    return await userRepositories.GETEDITADDRESS(id)
  }

  async function editadress(data:{country:string ,address:string ,city:string, state:string , postcode:string ,phone:string, email:string ,id:string,userId:string}){
    const {country,address,city,state,postcode,phone,email,id,userId}=data;
  
    return await userRepositories.EDITADDRESS(data);
  }

  async function addadresscusomepage(data:{country:string ,address:string ,city:string, state:string , postcode:string ,phone:string, email:string ,id:string}){
    const {country,address,city,state,postcode,phone,email,id}=data;
  
    return await userRepositories.ADDADDRESSCUSTOME(data);
  }


export {addadresss, getaddress,deleteaddress,geteditaddress,editadress,addadresscusomepage}