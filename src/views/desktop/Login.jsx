import React, { useState } from "react";

//Router
import { useNavigate } from "react-router-dom";




const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  return (
    <div id="loginMain">
      <u>
        <h1>Login</h1>
      </u>
      <input
        type="text"
        name="email"
        placeholder="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <input
        type="password"
        name="passoword"
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <div
        style={{
          width: "100vw",
          textAlign: "center",
          justifyContent: "center",
          display: "inline",
        }}
      >
        <p
          style={{
            fontSize: "10px",
            cursor: "pointer",
            justifyContent: "center",
            width: "fit-content",
            display: "inline",
          }}
          onClick={() => {
            navigate("/signup");
          }}
        >
          Don't have an account? Create one
        </p>
        <br />
        {/* <p
        style={{
          fontSize: "10px",
          cursor: "pointer",
          justifyContent: "center",
          width: "fit-content",
          display: "inline",
        }}
        onClick={() => {
          navigate("/reset_password");
        }}
        > 
        Forgot Your Password? Click Here!! 
        </p> */}
      </div>
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
                  sessionStorage.setItem("email", email);

                  navigate("/profile");
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
    </div>
  );
};

export default Login;
