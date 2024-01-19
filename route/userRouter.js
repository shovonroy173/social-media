const express = require("express");
const User = require("../model/User");
const router = express.Router();
const bcrypt = require("bcrypt");

//update user
router.put("/:id", async (req, res) => {
  const user = await User.findById({ _id: req.params.id });
  const loggedUser = await User.findById({ _id: req.body.userId });
  if (loggedUser._id.equals(user._id)) {
    // update password
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    }
    else{
       // update username and description
      try {
        const user = await User.findByIdAndUpdate(
          req.params.id,
          { $set: { name: req.body.name } },
          { $set: { desc: req.body.desc } },
          { new: true }
        );
        res.status(200).json(user);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    }
  } else {
    return res.status(401).json("Only own account can be updated!");
  }
});

// delete a user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    const loggedUser = await User.findById({ _id: req.body.userId });
    if (loggedUser._id.equals(user._id)) {
      await User.findByIdAndDelete({ _id: req.params.id });

      res.status(200).json("Account has been deleted!");
    } else {
      return res
        .status(401)
        .json("You do not have permission to perform this!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// get logged user
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findById({ _id: req.params.id });
    console.log(userData);
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// search a user
router.get("/search" , async(req , res)=>{
    try {
        const query = req.query.text;
        const user = await User.find({name:{$regex:query , options:"i"}});
        re.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// get a friend profile
router.get("/friend/:id" , async(req , res)=>{
    try {
    const userData = await User.findById({_id : req.params.id});
    res.status(200).json(userData);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// get close friends of a currentUser
router.get("/friends/:userId" , async(req , res)=>{
  try {
    const user = await User.findById({_id : req.params.id});
    const closeFriends = await Promise.all(
      user.followings.map((id)=>{
        return User.findById({_id:id});
      })
    );
    const friendList = [];
    closeFriends.map((friend)=>{
      const {_id , name} = friend;
      friendList.push({_id , name});
    });
    res.status(200).json(friendList);
  } catch (error) {
    res.status(500).json(error);
  }
});

// follow an user
router.put("follow/:id" , async(req , res)=>{
  if(!req.params.id === req.body.userId){
   const user = await User.findById({_id:req.params.id});
   const currentUser = await User.findById({_id:req.body.userId});
   if(!user.follower.includes(req.body.userId)){
    await User.findByOne(req.params.id , {
      $push:{followers:req.body.userId},
     });
    //  await User.findByIdAndUpdate(req.params.id , {
    //   // $push:{"followers":req.body.userId},
    //   $set:{follower:req.body.userId} , 
    //  });
     await User.findone(req.body.id , {
      $push:{followings:req.params.id},
     });
    //  await User.findByIdAndUpdate(req.body.userId , {
    //   // $push:{"followers":req.body.userId},
    //   $set:{followings:req.params.id}
    //  });

   }
   else{
    return res.status(403).json('You are already following this person');
   }
  }
  else{
    return res.status(403).json("You can't follow yourself!");
  }
});

// unfollow an user
router.put("unfollow/:id" , async(req , res)=>{
  if(req.params.id !== req.body.userId){
    const user = await User.findById({_id : req.params.id});
    const currentUser = await User.findById({_id:req.body.userId});
    if(user.follower.includes(req.body.userId)){
      try {
        await user.findOne({
          $pull :{follower:req.body.userId}
        });
        await currentUser.findOne({
          $pull :{followings:req.params.id}
        });
      } catch (error) {
        res.status(500).json(error);
      }
    }
    else{
      return res.status(403).json("Not followed!")
    }
  }
  else{
    return res.status(403).json("You can't unfollow!");
  }
})

module.exports = router;
