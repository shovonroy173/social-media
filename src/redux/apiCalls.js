import axios from "axios";
import { loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess } from "./userRedux";

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

export const follow = async(dispatch , user)=>{
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
