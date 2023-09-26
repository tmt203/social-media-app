import "./login.css";
import { useRef } from 'react';

export default function Login() {
  const email = useRef();
  const password = useRef();

  const handleClick = (e) => {
    e.preventDefault();

    console.log('email:', email.current.value);
    console.log('password:', password.current.value);
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
          <form className="loginBox" onSubmit={(e) => handleClick(e)}>
            <input className="loginInput" type="email" placeholder="Email" ref={email} required />
            <input className="loginInput" type="password" placeholder="Password" ref={password} required minLength={6} />
            <button type="submit" className="loginButton">Log In</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">Create a new account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
