const mongoose = require("mongoose");


const ObjectId = mongoose.ObjectId;
const Schema = mongoose.Schema;



const userSchema = new Schema({
    userid:ObjectId,
    username:{type:String,unique:true},
    password:String,
    Fname:String,
    Lname:String
});

const adminSchema = new Schema({
    adminid:ObjectId,
    username:{type:String,unique:true},
    password:String,
    Fname:String,   
    Lname:String

});

const courseSchema = new Schema({
    courseId : ObjectId,
    title:String,
    des:String,
    price:Number,
    image:String,
    createId:ObjectId,

});

const purchaseSchema = new Schema({
    id :ObjectId,
    courseid :ObjectId,
    userid :ObjectId,
});


const userModel = mongoose.model('user',userSchema);
const adminModel = mongoose.model('admin',adminSchema);
const courseModel = mongoose.model('course',courseSchema);
const purchaseModel = mongoose.model('purchase',purchaseSchema);


module.exports ={
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}





