import { useRef } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import "./register.css";

export default function Register() {
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const passwordConfirm = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.current.value !== passwordConfirm.current.value) {
      passwordConfirm.current.setCustomValidity("Confirm password do not match.");
    } else {
      const user = {
        email: email.current.value,
        username: username.current.value,
        password: password.current.value,
        passwordConfirm: passwordConfirm.current.value
      };

      try {
        await axios.post(`${process.env.REACT_APP_API_HOST}/api/users/register`, user);
        navigate('/login');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Facebook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Facebook.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              className="loginInput"
              type="text"
              placeholder="Username"
              ref={username}
              required
            />
            <input
              className="loginInput"
              type="email"
              placeholder="Email"
              ref={email}
              required
            />
            <input
              className="loginInput"
              type="password"
              placeholder="Password"
              ref={password}
              required
              minLength={6}
            />
            <input
              className="loginInput"
              type="password"
              placeholder="Confirm Password"
              ref={passwordConfirm}
              required
              minLength={6}
            />
            <button type="submit" className="loginButton">
              Sign Up
            </button>
            <button className="loginRegisterButton">
              Login to your account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
