const express = require("express");
const User = require("../model/User");
const router = express.Router();
const bcrypt = require("bcrypt");
//uodate user
router.put("/:id" , async(req , res)=>{
    const user = await User.findById(req.params.id);
    const  findUserByGivenPass = await User.find({password : req.body});

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

// get a user
router.get('/:id',async (req,res)=> {
    try {
        const userData = await User.findById({_id:  req.params.id});
        console.log(userData);
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;