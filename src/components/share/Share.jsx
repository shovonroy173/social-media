import React from 'react'
import "./share.css";
import {AddToPhotos , Label,Room, EmojiEmotions} from '@mui/icons-material';
const Share = () => {
  return (
    <div className='share'>
        <div className="shareWrapper">
            <div className="shareTop">
                <img src="/assets/1.jpg" alt="" className='shareProfileImg'/>
                <input placeholder= "What's in your mind?" className='shareInput' />
            </div>
            <hr className='shareHr' />
            <div className="shareBottom">
                <div className="shareOptions">
                    <div className="shareOption">
                        <AddToPhotos htmlColor="tomato" className='shareIcon'/>
                        <span className='shareOptionText'>Photos or Videos</span>
                    </div>
                    <div className="shareOption">
                        <Label htmlColor="blue" className='shareIcon'/>
                        <span className='shareOptionText'>Tag</span>
                    </div>
                    <div className="shareOption">
                        <Room htmlColor="green" className='shareIcon'/>
                        <span className='shareOptionText'>Location</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotions htmlColor="golden" className='shareIcon'/>
                        <span className='shareOptionText'>Emotions</span>
                    </div>
                    
                </div>
                <button className="shareButton">Share</button>
            </div>
        </div>
    </div>
  )
}

export default Share