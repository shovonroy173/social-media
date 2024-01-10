import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import "./topbar.css";
const Topbar = () => {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Social-media</span>
      </div>
      <div className="topbarCenter">
        <div className="searchBar">
        <SearchIcon className="searchIcon"/>
          <input type="text" placeholder="Search people or post..." className="searchInput"/>
          
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
            <span className="topbarLink">HomePage</span>
            <span className="topbarLink">TimeLine</span>
        </div>
        <div className="topbarIcons">
            <div className="topbarIconItem">
                <PersonIcon/>
                <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
                <ChatIcon/>
                <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
                <NotificationsIcon/>
                <span className="topbarIconBadge">1</span>
            </div>
        </div>
        <div>
          <img src="../../assets/1.jpg" alt="" className="topbarImg"/>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
