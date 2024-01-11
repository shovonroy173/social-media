import React from 'react';
import "./post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
const Post = ({post}) => {
  return (
    <div className='post'>
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img src="/assets/1.jpg" alt="" className='postProfileImg' />
            <span className='postUsername'>John Doe</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon/>
          </div>
        </div>
        <div className="postCenter">
          <span className='postText'>{post.desc}</span>
          <img src="/assets/1.jpg" alt="" className='postImg' />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img src="/assets/like.png" alt="" className='likeIcon' />
            <img src="/assets/heart.png" alt="" className='likeIcon' />
            <span className='postLikeCounter'>{post.like} peoples like it</span>
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