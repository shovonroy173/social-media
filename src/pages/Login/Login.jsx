import { useState } from "react";
import "./login.css";
import axios from "axios";
export default function Login() {
    const [email , setEmail] = useState("");
    // console.log("LINE AT 6 " , email);
    const [password, setPassword] = useState("") ;
    // console.log("LINE AT 9 " , password);

    // const loginFunc = async()=>{
    //     const login = await axios.post("http://localhost:5000/api/auth/login" , {email , password} );

    // }
    const handleClick = ()=>{
        
    }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">social-media</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on social-media.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input placeholder="Email" className="loginInput" onChange={((e)=>(setEmail(e.target.value)))} />
            <input placeholder="Password" className="loginInput" onChange={((e)=>(setPassword(e.target.value)))} />
            <button className="loginButton" onClick={handleClick}>Log In</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}