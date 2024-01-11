import React from "react";
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

const Profile = () => {
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
              <h4 className="profileInfoName">Safak Kocaoglu</h4>
              <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>

          <div className="profileRightBottom">
          <Feed />
          <Rightbar profile/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
