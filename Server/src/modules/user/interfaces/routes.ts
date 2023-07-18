import express,{Application} from 'express'
import controllers from './controllers/controllers'
const userRoute:Application = express()

userRoute.post('/register',controllers.userSignUp)
userRoute.post("/sendotp",controllers.matchotp)
userRoute.get('/find-user',controllers.userFind)
userRoute.post("/sendotpforregister",controllers.SENDOTP)
userRoute.post("/login",controllers.USERLOGIN)
userRoute.post("/googlelogin",controllers.GOOGLELOGIN)
userRoute.get("/ninjabuffet",controllers.GETNINJABUFFET)
userRoute.get("/getcustomeitem",controllers.GETCUSTOMITEM)
userRoute.post("/getpackageitem",controllers.GETPACKAGEITEMUSINGID)
userRoute.get("/getpackagecategory",controllers.GETCATEGORY)
userRoute.post("/getuserprofile",controllers.GETPROFILE)
userRoute.post("/addadress",controllers.ADDADRESS)
userRoute.post("/getaddress",controllers.GETADDRESS)
userRoute.delete("/deleteaddress",controllers.DELETEADDRESS)
userRoute.post("/getEditaddress",controllers.GETEDITADDRESS)
userRoute.put("/Editaddress",controllers.EDITADDRESS)
userRoute.post("/orderitem",controllers.ORDERITEM)
userRoute.post("/addnewaddress",controllers.ADDADDRESSCUSTOMEPAGE)
userRoute.post("/ordereddetails",controllers.ORDEREDDETAILS)
userRoute.post("/ordercancel",controllers.ORDERCANCLE)
userRoute.post("/viewOrders",controllers.VIEWORDERS)


export default userRoute