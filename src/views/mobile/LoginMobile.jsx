import React, { useState } from "react";
//Router
import { useNavigate } from "react-router-dom";
import "../styles/styleguide.css";

const LoginMobile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  return (
    <div id="loginMain">
        <h1>Login</h1>
        <label className="label white left-align-text">
          Email:</label>
      <input
      className="input"
        type="text"
        name="email"
        placeholder="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <label className="label white left-align-text">
          Password:</label>
      <input
            className="input"
        type="password"
        name="passoword"
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <button 
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

                  navigate("/edit_profile_mobile");
                } else {
                  // if the login failed, remove any infomation from the session state
                  sessionStorage.removeItem("token");
                  sessionStorage.removeItem("user");
                }
              },
              (error) => {
                alert(error);
              }
            );
        }}
        className="submit-button">
        Login
      </button>
      <br/>
      <button className="secondary-button" onClick={() => navigate("/mobilesignup")}>Signup</button>
    </div>
  );
};

export default LoginMobile;
