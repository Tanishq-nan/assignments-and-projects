const {Router} = require("express");
const courseRouter = Router();

courseRouter.post("/Purschase",function(req,res){

});

courseRouter.get("/preview",function(req,res){

    res.json({
        msg:"courese preview endpoint"
    })

});

module.exports = {
    courseRouter: courseRouter
}