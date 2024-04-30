import React, { useEffect, useState } from "react";
import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import axios from "axios";
import PublicIcon from '@mui/icons-material/Public';
import DatePicker from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import {useLocation} from "react-router-dom"
const Rightbar = ({ profile }) => {
  const [users, setUser] = useState([]);
  const [img, setImg] = useState(null);
  const [dateValue, onDateChange] = useState(new Date());
  const birthday = dateValue.getTime();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/");
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);
  useEffect(() => {
    const getPhotos = async () => {
      try {
        const res = await axios.get("https://api.unsplash.com/photos/random?query=city&count=1&client_id=nPU6LujRhNfLTfkNkWDIjoPJGA2yGwdaoRP94s3lvQY");
        setImg(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPhotos();
  }, []);
  // console.log(img);
  const location = useLocation().pathname.split("/")[2];
  console.log(location);
  const handleUpdate = async()=>{
    try {
      const res = await axios.put(`http://localhost:5000/api/user/${location}` , {birthday});
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  const HomeRightbar = () => {
    return (
      <>
        
        <h2>Visit today <span className="rightbarAdText"><PublicIcon style={{"fontSize":"14px" }}/>sponsored</span></h2>
        <p>{ img && img[0]?.description}</p>
        <img src={ img && img[0]?.urls?.raw} alt="#ad" className="rightbarAd" />
        <hr className="rightbarHr" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {users?.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">New York</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">Madrid</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">Single</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <DatePicker onChange={onDateChange} value={dateValue} />  
        <button onClick={handleUpdate}>
          Update
        </button>
            </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};

export default Rightbar;
