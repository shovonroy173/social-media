const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{type:String ,  required:true , unique:true} , 
    email : { type: String, required:true , unique:true },
    password : { type : String , required:true , unique:true } , 
    follower:{type:Array , default:[]} , 
    followings:{type:Array , default:[]} , 
    desc:{type:String , 
    default:""} , 
    city:{type:String , max:50} , 
    from :{type:String} , 
    relationship:{
        type:Number , 
        enum : [1 ,2 , 3]
    } , 
   
} ,  {timestamps:true} , );

module.exports = mongoose.model( "User" , userSchema);
