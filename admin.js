const bcrypt = require("bcrypt");
const {Router} = require("express");
const jwt = require("jsonwebtoken");
const {z} = require("zod");
const {adminModel} = require("../cdb");
const jwt_admin_password = ('Tanu@1234');

const adminRouter = Router();


adminRouter.post("/signup",async function(req,res){

    const UserBody = z.object({
        username:z.string().min(3).max(100).email(),
        password:z.string().min(3).max(100),
        Fname:z.string().min(3).max(100),
        Lname:z.string().min(3).max(100)
   })


   const parsedwithsuccess = UserBody.safeParse(req.body);

   if(!parsedwithsuccess){
       res.json({
           msg:"incorrect crdentials",
           error:parsedwithsuccess.error   
       })
       return
   }

   console.log("success 1");

  const username = req.body.username;
  console.log("success 2");
  const password = req.body.password;
  const Fname = req.body.Fname;
  const Lname = req.body.Lname;


   let errorthrown = false;

   const hashedpassword = await bcrypt.hash(password,5);
   console.log(hashedpassword);
   
   
try{
   await adminModel.create({
       username:username,
       password:hashedpassword,
       Fname:Fname,
       Lname:Lname
   });
}catch(e){
   console.log(e);
   res.status(403).json({
       msg:"you are not signedup"
   })
}

   if(!errorthrown){
       res.json({
           msg:"you are successfully signedup"
       })  
   }

});

adminRouter.post("/signin",function(req,res){
  

});

adminRouter.post("/",function(req,res){

});

adminRouter.put("/",function(req,res){

});

adminRouter.get("/bulk",function(req,res){

    res.json({
        msg:"you are in"
    })
   
});
 
module.exports = {
    adminRouter: adminRouter 
}