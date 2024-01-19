import React from 'react'
import "./closefriend.css"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
const Closefriend = ({user}) => {
    const loggedUser = useSelector((state)=>(state.user));
    // console.log("LINE AT 7" , user);


  return (
    <>
    {(loggedUser.currentUser._id === user._id) ? null :    (<Link to={`/profile/${user._id}`} className='sidebarFriend'>
    <li >
        <img src={user.profilePicture} alt="" 
        className='sidebarFriendImg'/>
        <span className='sidebarFriendName'>{user.name}</span>
    </li>
    </Link>) }
    </>
  )
} 

export default Closefriend