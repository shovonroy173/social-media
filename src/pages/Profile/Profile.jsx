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
  const { currentUser } = useSelector((state) => state.user);

  const id = useParams().id;
  const userId = currentUser._id;
  const [user, setUser] = useState({});
  const [isFollowing, setIsFollowing] = useState(Boolean);

  console.log(id);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/${id}`);
        console.log(res.data);
        setUser(res.data);
        setIsFollowing(res.data?.follower.includes(userId))
      } catch (error) {
        console.log(error);
      }
    };
    getProfile();
  }, [id , userId]);
  console.log("LINE AT 33", user);

  // const isFollowing = user && user?.follower.includes(userId);

  console.log("LINE AT 19" , isFollowing);
  // console.log(LINE AT 27 , user);
  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      follow(dispatch, id, userId);
      window.location.reload();
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
              <h4 className="profileInfoName">{user?.name}</h4>
              <span className="profileInfoDesc">{user?.desc}</span>
            </div>
          </div>
          {id !== userId && (
            <>
               <button
                    className="btn btn-intermediate"
                    onClick={handleClick}
                  >
                    {isFollowing ? "Following" : "Unfollowing"}
                  </button>
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
