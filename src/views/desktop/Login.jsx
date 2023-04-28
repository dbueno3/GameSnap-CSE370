import React, { useState } from "react";

//Router
import { useNavigate } from "react-router-dom";




const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  return (
    <div id="loginMain" class="container">
      <h1 className="center-text large-emoji-icon">🔐</h1>
        <h1 className="center-text">Login</h1>
      <label for="email">Email</label>
      <input
        type="text"
        name="email"
        placeholder="email"
        className="input-box-white"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <label for="password left">Password</label>
      <input
        type="password"
        name="password"
        placeholder="password"
        className="input-box-white"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <div>
        <p
          onClick={() => {
            navigate("/reset_password_info");
          }}
        >
          Forgot password?
        </p>
      </div>
      <button
      className="submit-button"
        onClick={() => {
          fetch(process.env.REACT_APP_API_PATH + "/auth/login", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          })
            .then((res) => res.json())
            .then(
              (result) => {
                if (result.userID) {
                  // set the auth token and user ID in the session state
                  sessionStorage.setItem("token", result.token);
                  sessionStorage.setItem("user", result.userID);
                  sessionStorage.setItem("email", email);

                  navigate("/home");
                } else {
                  // if the login failed, remove any infomation from the session state
                  sessionStorage.removeItem("token");
                  sessionStorage.removeItem("user");
                  sessionStorage.removeItem("email");
                }
              },
              (error) => {
                alert(error);
              }
            );
        }}
      >
        Login
      </button>
      <br />
      <button className="secondary-button"
          onClick={() => {
            navigate("/signup");
          }}
        >Sign up
        </button>
    </div>
  );
};

export default Login;
