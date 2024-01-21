import React, { useEffect, useState } from 'react'
import "./feed.css";
import Share from '../share/Share';
import Post from '../post/Post';
import axios from 'axios';
import { useSelector } from 'react-redux';
const Feed = () => {
  const [posts , setPosts] = useState([]);
  // console.log("LINE AT 9" , posts);
  const loggedUser = useSelector((state) => state.user);
  const userId = loggedUser?.currentUser?._id;
  // console.log("LINE AT 12" , userId);

  useEffect(()=>{
    const getPosts = async()=>{
      const res = await axios.get(`http://localhost:5000/api/post/timeline/${userId}`);
      setPosts(res.data)
    };

    getPosts();
  } , [userId]);
  return (
    <div className='feed'>
      <div className="feedWrapper">
        <Share/>
        {posts.map((p)=>(
          <Post key = {p.id} post = {p}/>
        ))}
      </div>
    </div>
  )
}

export default Feed;