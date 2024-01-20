import React, { useEffect, useState } from "react";
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { follow, unfollow } from "../../redux/apiCalls";

const Profile = () => {
  const loggedUser = useSelector((state) => state.user);

  const id = useParams().id;
  console.log("LINE AT 15", loggedUser);
  const isFollowing = loggedUser?.currentUser?.followings?.includes(id);
  console.log("LINE AY 17", isFollowing);
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
  const dispatch = useDispatch();
  const handleClick = async () => {
    try {
      follow(dispatch, id, loggedUser);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickUnfollow = async () => {
    try {
     unfollow(dispatch , id , loggedUser);
      // setFollowText(res.data);
    } catch (error) {
      console.log(error);
    }
  };
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
          {id !== loggedUser.currentUser._id && (
            <>
              <>
                {" "}
                {!isFollowing && (
                  <button
                    className="btn btn-intermediate"
                    onClick={handleClick}
                  >
                    {isFollowing ? "Following" : "Unfollowing"}
                  </button>
                )}
              </>
              <>
                {isFollowing && (
                  <button
                    className="btn btn-intermediate"
                    onClick={handleClickUnfollow}
                  >
                    {!isFollowing ? "Unfollowing" : "Following"}
                  </button>
                )}
              </>
            </>
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
