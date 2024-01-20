import axios from "axios";
import { followFailure, followStart, followSuccess, loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess, unfollowFailure, unfollowStart, unfollowSuccess } from "./userRedux";

export const login = async (dispatch, user) => {
  // console.log(user);
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login" , user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(loginFailure());
  }
};

export const register = async(dispatch , user)=>{
  // console.log("LINE AT 17" , user);
  dispatch(registerStart());
  try {
    const res = await axios.post("http://localhost:5000/api/auth/register" , user);
    dispatch(registerSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(registerFailure());
  }
};



export const follow = async (dispatch , id , loggedUser) => {
  dispatch(followStart());
  try {
    const res = await axios.put(
      `http://localhost:5000/api/user/follow/${id}`,
      { loggedUser }
    );
    console.log(res.data);
    dispatch(followSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(followFailure());
  }
};

export const unfollow = async (dispatch , id , loggedUser) => {
  dispatch(unfollowStart());
  try {
    const res = await axios.put(
      `http://localhost:5000/api/user/unfollow/${id}`,
      { loggedUser }
    );
    console.log(res.data);
    dispatch(unfollowSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(unfollowFailure());
  }
};