import React, { useEffect, useState } from "react";
import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@mui/icons-material";

import Closefriend from "../closefriend/Closefriend";
import axios from "axios";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";

const Sidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log("LINE AT 21", currentUser?._id);
  const [closeFriendsData, setCloseFriendsData] = useState([]);
  useEffect(() => {
    const getCloseFriend = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/friends/${currentUser?._id}`
        );
        // console.log(res.data);
        setCloseFriendsData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCloseFriend();
  }, [currentUser._id]);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await axios.get(`http://localhost:5000/api/user/`);
        setUsers(users.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);
  const currentDate = new Date();
  const newYear = currentDate.getFullYear();
  const newMonth = currentDate.getMonth();
  const newDate = currentDate.getDate();
  console.log(newYear , newMonth , newDate);
  const bUsers = users.filter((item) => {
    const bDay = new Date(item.birthday);
    const year = bDay.getFullYear();
    const month = bDay.getMonth();
    const date = bDay.getDate();
    console.log(year , month , date);
    return year === newYear && month === newMonth && date === newDate;
  });
const navigate = useNavigate()
  console.log("LINE AT 50", bUsers);
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="birthdayContainer">
          <img src={"/assets/gift.png"} alt="" className="birthdayImg" />
          <div className="birthdayUsers">
            {bUsers.length !== 0 ? 
            <>
              {bUsers.map((item , index)=>(
              <b onClick={()=> navigate(`/profile/${item?._id}`)} key={index} className="birthdayUsersName">{item.name} , </b>
            ))}
            <>has birthday today</>
            </> 
            : "No one has a birthday today!"}
            
          </div>
        </div>
        <hr className="sidebarHr" />
        <div className="sidebarFriendsText">Friends</div>
        <ul className="sidebarFriendList">
          {closeFriendsData ? (
            <>
              {closeFriendsData?.map((u) => (
                <Closefriend key={u._id} user={u} />
              ))}
            </>
          ) : (
            "No friends till now!"
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
