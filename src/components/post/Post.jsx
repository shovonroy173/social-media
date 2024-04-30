import React, { useEffect, useState } from "react";
import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { like } from "../../redux/apiCalls";
import SendIcon from '@mui/icons-material/Send';
import Modal from "../modal/Modal";
const Post = ({ post }) => {
  const localPost = useSelector((state) => state.post);
  const {currentUser} = useSelector((state) => state.user);
  // console.log("LINE AT 9", localPost);
  const [creator, setCreator] = useState("");
  const loggedUserId = currentUser._id;
  // console.log("LINE AT 5", post);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const getCreator = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/${post?.userId}`
        );
        const user = res?.data;
        const name = user?.name;
        // const id = user?._id;
        setCreator(name);

      } catch (error) {
        console.log(error);
      }
    };
    getCreator();
  });
  const dispatch = useDispatch();
  const id = post._id;
  const handleLike = () => {
    like(dispatch, id, loggedUserId);
    window.location.reload();
  };

  const [comment , setComment] = useState("");
  const [open , setOpen] = useState(false);

  const handleClick = async()=>{
    try {
       await axios.post("http://localhost:5000/api/comment/" , {loggedUserId , id , comment});
      setComment("")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img src={"/assets/1.jpg"} alt="" className="postProfileImg" />
            <span className="postUsername">{creator}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img src={post?.imgUrl} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src="/assets/like.png"
              alt=""
              className="likeIcon"
              onClick={handleLike}
            />
            <span className="postLikeCounter">
              {localPost?.currentPost?._id === id
                ? localPost?.currentPost?.likes.length
                : post?.likes.length}
              peoples like it
            </span>
          </div>

          <div className="postBottomCenter">
            <span className="postBottomCenterComments" onClick={()=>setOpen(true)}>comments</span>
            {open && <Modal setOpen={setOpen} userId={loggedUserId} postId={id}/>}
          </div>

          <div className="postBottomRight">
            <input type="text" placeholder="comment.." value={comment} onChange={(e)=> setComment(e.target.value)}  className="postBottomRightInput"/>
            <SendIcon style={{"color":"#1877f2"}} onClick={handleClick}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
