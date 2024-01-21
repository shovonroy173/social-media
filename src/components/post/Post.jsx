import React, { useEffect, useState } from 'react';
import "./post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import { like } from '../../redux/apiCalls';
const Post = ({post}) => {
  const localPost = useSelector(((state)=>(state.post))); 
  // console.log(localPost.currentPost);
  const [creator , setCreator] = useState("");
  const [loggedUserId , setLoggedUserId] = useState("");
  console.log("LINE AT 5" , post);
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
useEffect(()=>{
  const getCreator = async()=>{
    const res = await axios.get(`http://localhost:5000/api/user/${post?.userId}`)
    const user = res.data;
    const name = user.name;
    const id = user._id;
    setCreator(name);
    setLoggedUserId(id);
  }
  getCreator();
});
const dispatch = useDispatch();
const id = post._id;
const handleLike = ()=>{
  like(dispatch , id , loggedUserId);
  // window.location.reload();
};

  return (
    <div className='post'>
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img src= {"/assets/1.jpg"} alt="" className='postProfileImg' />
            <span className='postUsername'>{creator}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon/>
          </div>
        </div>
        <div className="postCenter">
          <span className='postText'>{post.desc}</span>
          <img src={PF + post?.img} alt="" className='postImg' />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img src="/assets/like.png" alt="" className='likeIcon' onClick={handleLike} />
            <img src="/assets/heart.png" alt="" className='likeIcon' />
            <span className='postLikeCounter'>{(!localPost)?post.likes:localPost?.currentPost.likes.length} peoples like it</span>
          </div>
         
          <div className="postBottomRight">
            <span className='postCommentText'>{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post