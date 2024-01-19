import React, { useEffect, useState } from 'react'
import "./sidebar.css"
import {RssFeed , Chat , PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,} from '@mui/icons-material';

import Closefriend from '../closefriend/Closefriend';
import axios from "axios";

const Sidebar = () => { 
  // const user = useSelector((state)=>(state.user));
  // console.log("LINE AT 17" , user);
  // const [closeFriendsData , setCloseFriendsData] = useState({});
  // useEffect(()=>{
  //   const getCloseFriend = async()=>{
      
  //     try {
  //       const closeFriends = await axios.get(`http://localhost:5000/api/user/friends/${user.currentUser?._id}`);
  //       setCloseFriendsData(closeFriends.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getCloseFriend();
  // } , [user.currentUser._id]);

  const [users , setUsers] = useState([]);
  useEffect(()=>{
    const getCloseFriend = async()=>{
      
      try {
        const users = await axios.get(`http://localhost:5000/api/user/`);
        setUsers(users.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCloseFriend();
  } , []);
  // console.log("LINE AT 31"  , users);
  return (
    <div className='sidebar'>
      <div className="sidebarWrapper">
      <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className='sidebarFriendList'>
          {users.map((u)=>(
            <Closefriend key={u._id} user={u}/>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar