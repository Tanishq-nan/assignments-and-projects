const bcrypt = require("bcrypt");
const {Router} = require("express");
const jwt = require("jsonwebtoken");   
const {z} = require("zod");
const {userModel} = require("../cdb");
const jwt_user_password = ('Nanu@1234');

const userRouter = Router();

userRouter.post("/signup",async function(req,res){

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
    await userModel.create({
        username:username,
        password:hashedpassword,
        Fname:Fname,
        Lname:Lname
    });
}catch(e){
    console.log("some incorrect crdential");
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

userRouter.post("/signin",async function(req,res){

    const {username,password} = req.body;
    
    const user = await userModel.findOne({
        username:username
    });

    if(!user){
        res.json({
            msg:"user not find"
        })
        return
    }

    const passwordmatch = await bcrypt.compare(password,user.password);

    console.log(user);

    if(passwordmatch){

        const token = jwt.sign({
            id:user._id.toString()
        },jwt_user_password);
        
        res.jsonp({
            token:token 
        })
    }
    else{
        res.status(403).json({
            msg:"invalid data"
        })
    }

})

userRouter.post("/purchaseCourse", function(req,res){

});



module.exports = {
    userRouter : userRouter
}