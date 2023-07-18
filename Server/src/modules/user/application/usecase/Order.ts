import userRepositories from "../../infrastructure/repositories/userRepositories";

async function orderitem(datas: { combinedData:any,grandtotal:string ,data:any, useDetails:any
}) {
  const { combinedData, grandtotal, data, useDetails } = datas;

  return await userRepositories.ORDERITEM(datas);
}

async function ordereddetails(data:{id:string}){
const {id}=data;
return await userRepositories.ORDEREDDETAILS(id)
}

async function ordercancle(data:{id:string}){
  const {id}=data;
  return await userRepositories.ORDEREDCANCLE(id)
  }


  async function vieworder(data:{id:string}){
    const {id}=data;
    return await userRepositories.ORDEREDETAILS(id)
    }
  

export { orderitem,ordereddetails,ordercancle,vieworder };
