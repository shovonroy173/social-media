import React, { useEffect, useState } from "react";
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Profile = () => {
  const loggedUser = useSelector((state) => state.user);

  const id = useParams().id;
  console.log("LINE AT 15" , loggedUser.currentUser) ;
  const isFollowing = loggedUser.currentUser.followings.includes(id);
  console.log(isFollowing);
  const [user, setUser] = useState({});
  const [followText, setFollowText] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/${id}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProfile();
  }, [id]);
  // console.log(LINE AT 27 , user);
  const handleClick = async()=>{
    try {
      const res = await axios.put(`http://localhost:5000/api/user/follow/${id}` , {loggedUser});
      console.log(res.data);
      setFollowText(res.data);
    } catch (error) {
      console.log(error);
    }
    
  }
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img src="/assets/1.jpg" className="profileCoverImg" alt="" />
              <img src="/assets/1.jpg" className="profileUserImg" alt="" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.name}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          {id !== loggedUser.currentUser._id &&  (
            <button className="btn btn-intermediate" onClick={handleClick}>
              {isFollowing ? ("Following") : ("Click me") }
              </button>
          )}
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
