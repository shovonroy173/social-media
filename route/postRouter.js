const express = require("express");
const router = express.Router();
const Post = require("../model/Post");
const User = require("../model/User");

router.post("/", async (req, res) => {
    // console.log("LINE AT 6" , req.body);
  try {
    const post = new Post(req.body);
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/update/:postId", async (req, res) => {
  try {
    if (req.params.postId === req.body.userId) {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.postId,
        {
          $set: { desc: req.body.desc },
        },
        {
          $set: { img: req.body.img },
        },
        { $set: { likes: req.body.likes } },
        { new: true }
      );
      return res.status(200).json(updatedPost);
    } else {
      return res.status(403).json("Not allowed to post!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id" , async(req , res)=>{
  try {
    const post = await Post.findById({_id:req.params.id});
    if(post.userId === req.body.loggedUserId){
      await post.delete();
     res.status(200).json('Post is deleted!');
    }
    else{
      res.status(401).json("Not authorized!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/like/:id" , async(req , res)=>{
  try {
    const post = await Post.findById({_id : req.params.id});
    if(!post.likes.includes(req.body.loggedUserId)){
      await post.updateOne({$push:{likes:req.body.loggedUserId}});
    }
    else{
      await post.updateOne({$pull:{likes:req.body.loggedUserId}});
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id" , async(req , res)=>{
  try {
  const post = await Post.findById({_id:req.params.id});
  res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }

});

router.get("/timeline/:userId" , async(req , res)=>{
  try {
    const currentUser = await User.findById({_id:req.params.userId});
    const userPosts = await Post.find({userId:req.params.userId});
    const friendsPosts = await Promise.all(
      currentUser.followings.map((id)=>{
        return Post.find({userId : id})
      })
    );
    res.status(200).json(userPosts.concat(friendsPosts));
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/userposts/:userId" , async(req , res)=>{
  try {
    const userPosts = await Post.find({userId:req.params.userId});
    res.status(200).json(userPosts);
  } catch (error) {
    res.status(500).json(error);
  }
})

module.exports = router;