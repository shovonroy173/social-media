const express = require("express");
const User = require("../model/User");
const router = express.Router();
const bcrypt = require("bcrypt");
//uodate user
router.put("/:id" , async(req , res)=>{
    // const user = await User.findById(req.params.id);
    // const  findUserByGivenPass = await User.find({password : req.body});
    // if(user._id === findUserByGivenPass._id){
    //     try {
    //         const salt = await bcrypt.genSalt(10);
    //         const hashedPassword = 
    //     } catch (error) {
    //         res.status(500).json("Authentication Error!");
    //     }
    // }
    try {
        const user = await User.findByIdAndUpdate(req.params.id , 
            {$set: req.body},
            {new :true} , 
        );
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
    
});

// delete a user
router.delete("/:id" , async(req , res)=>{
    
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(204).json("Account has been deleted!");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});