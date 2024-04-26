import React, { useEffect, useState } from "react";
import "./share.css";
import {
  AddToPhotos,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

const Share = () => {
  const loggedUser = useSelector((state) => state.user);
  const userId = loggedUser?.currentUser?._id;
  // console.log("LINE AT 9", userId);
  const [desc, setdesc] = useState("");
  const [img, setImg] = useState("");
  const [file, setFile] = useState(undefined);
  // const [upload, setUpload] = useState(null);
  // console.log("LINE AT 13", file);
  const [imgUrl, setImgUrl] = useState("");
  const [imgPerc, setImgPerc] = useState(0);


  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPerc(Math.round(progress)) ;
        console.log(progress);
        // switch (snapshot.state) {
        //   case 'paused':
        //     console.log('Upload is paused');
        //     break;
        //   case 'running':
        //     console.log('Upload is running');
        //     break;
        // }
      },
      (error) => {
        console.log(error);
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        // switch (error.code) {
        //   case 'storage/unauthorized':
        //     console.log("User doesn't have permission to access the object")
        //     break;
        //   case 'storage/canceled':
        //     console.log("User canceled the upload")
        //     break;
        //   case 'storage/unknown':
        //     console.log("Unknown error occurred, inspect error.serverResponse")
        //     break;
        // }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
  };

  useEffect(() => {
    file && uploadFile(file, "imgUrl");
  }, [file]);
  const handleClick = async (e) => {
    e.preventDefault();
    // if (file) {
    //   const data = new FormData();
    //   const fileName = Date.now()+file.name;
    //   data.append("fileName", fileName);
    //   data.append("file", file);
    //   setImg(fileName);
    //   // console.log(img);
    //   try {
    //     const res = await axios.post("http://localhost:5000/upload", imgUrl);
    //     setUpload(res.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    try {
      const post = await axios.post("http://localhost:5000/api/post/", {
        userId,
        desc,
        imgUrl,
      });
      console.log(post.data);
      setTimeout(() => {
        window.location.reload();
      }, 10000);
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
        {imgUrl && (
          <div className="shareImgContainer">
            <img className="shareImg" src={imgUrl} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
            <p>Uploading {imgPerc}%</p>
          </div>
        )}

        <form className="shareBottom" onSubmit={handleClick}>
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
          <button
            className="shareButton"
            type="submit"
            disabled={imgPerc === 100 && desc === ""}
          >
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
