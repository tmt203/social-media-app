import "./register.css";

export default function Register() {
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
          <div className="loginBox">
            <input className="loginInput" type="text" placeholder="Username" />
            <input className="loginInput" type="email" placeholder="Email" />
            <input className="loginInput" type="password" placeholder="Password" />
            <input className="loginInput" type="password" placeholder="Confirm Password" />
            <button className="loginButton">Sign Up</button>
            <button className="loginRegisterButton">Login to your account</button>
          </div>
        </div>
      </div>
    </div>
  );
}
