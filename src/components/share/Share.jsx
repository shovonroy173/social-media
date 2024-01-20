import React, {  useState } from "react";
import "./share.css";
import { AddToPhotos, Label, Room, EmojiEmotions } from "@mui/icons-material";
import { useSelector } from "react-redux";
import axios from "axios";

const Share = () => {
  const loggedUser = useSelector((state) => state.user);
  const userId = loggedUser?.currentUser?._id;
  // console.log("LINE AT 9", userId);
  const [desc, setdesc] = useState("");
  const [img, setImg] = useState("");
  const [file, setFile] = useState([]);
  console.log("LINE AT 13", file);

  const handleClick = async (e) => {
    e.preventDefault();
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("fileName", fileName);
      data.append("file", file);
      setImg(fileName);
      console.log(img);
      try {
        axios.post("http://localhost:5000/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
        const post = await axios.post("http://localhost:5000/api/post/", {
        userId,
        desc,
        img,
      });
      console.log(post.data);
      // setTimeout(() => {
      //   window.location.reload();
      // }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img src="/assets/1.jpg" alt="" className="shareProfileImg" />
          <input
            placeholder="What's in your mind?"
            className="shareInput"
            onChange={(e) => setdesc(e.target.value)}
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <AddToPhotos htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photos or Videos</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png , .jpeg , .png"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>

            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="golden" className="shareIcon" />
              <span className="shareOptionText">Emotions</span>
            </div>
          </div>
          <button className="shareButton" onClick={handleClick}>
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default Share;
