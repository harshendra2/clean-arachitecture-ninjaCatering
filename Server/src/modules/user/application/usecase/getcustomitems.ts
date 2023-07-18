import userRepositories from "../../infrastructure/repositories/userRepositories";

async function getcustomeitem() {
    
return await userRepositories.GETCUSTOMEITEM();
  }

  
  
  export {getcustomeitem}