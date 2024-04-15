import { useState } from "react";
import "./login.css";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";
import { Link, Navigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  // console.log("LINE AT 6 " , email);
  const [password, setPassword] = useState("");
  // console.log("LINE AT 9 " , password);

  const dispatch = useDispatch();

  const handleClick = () => {
    try {
      login(dispatch, { email, password });
      <Navigate to="/" />;
    } catch (error) {
      console.log(error);
    }
  };

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
            <input
              placeholder="Email"
              className="loginInput"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="loginButton" onClick={handleClick}>
              Log In
            </button>
            <Link to="/register">
              <button className="loginRegisterButton">
                Create a New Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
