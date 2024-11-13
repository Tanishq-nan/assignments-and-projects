const bcrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const {userRouter} = require("./routs/user");
const {courseRouter} = require("./routs/course");
const {adminRouter} = require("./routs/admin")


app.use(express.json());

app.use("/user",userRouter);
app.use("/course",courseRouter);
app.use("/admins",adminRouter)

async function main(){

    await mongoose.connect("mongodb+srv://tanishqdheejpuriya:Tanishq%408290@cluster0.ibdja.mongodb.net/User-info");
    app.listen(3000);
    console.log("listinging");
}

main();