import React from "react";
import "./online.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Online = ({ user }) => {
  const loggedUser = useSelector((state) => state.user);

  return (
    <>
      {loggedUser.currentUser._id === user._id ? null : (
        <Link to={`/profile/${user._id}`} style={{"color":"inherit" , "textDecoration":"none"}}>
          <li>
            <div className="rightbarFriend">
              <div className="rightbarProfileImgContainer">
                <img
                  className="rightbarProfileImg"
                  src="/assets/1.jpg"
                  alt=""
                />
                <span className="rightbarOnline"></span>
              </div>
              <div className="rightbarUsername">{user?.name}</div>
            </div>
          </li>
        </Link>
      )}
    </>
  );
};

export default Online;
