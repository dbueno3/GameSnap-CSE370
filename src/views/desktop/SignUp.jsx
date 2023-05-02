import React, { useState } from "react";

//Router
import { useNavigate } from "react-router-dom";

import logo_mini from "../../assets/logo_mini.png";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let navigate = useNavigate();
  return (
    <div id="signUpContainer" className="container">
      <div class="container left landingLogo">
        <img src={logo_mini} style={{ height: "100px" }} />
        <br />
        <h1>GameSnap</h1>
        <h6>Share Your Best Game Moments with Friends - One Moment at A Time</h6>
      </div>
      <div id="signupMain" class="container right">
        <h1 className="center-text large-emoji-icon">🔏</h1>
        <h1 className="white center-text">Sign Up</h1>
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
        <label for="password">Password</label>
        <input
          type="password"
          name="passoword"
          className="input-box-white"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label for="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          className="input-box-white"
          placeholder="Confirm Password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
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
              fontSize: "16px",
              cursor: "pointer",
              justifyContent: "center",
              width: "fit-content",
              display: "inline",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            Already have an account? Log in
          </p>
        </div>
        <br />
        <button
          onClick={() => {
            if (email === "" || !email.includes("@")) {
              alert("Please input a valid email");
            } else if (password !== confirmPassword) {
              alert("password don't match");
            } else {
              fetch(process.env.REACT_APP_API_PATH + "/auth/signup", {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: email,
                  password: password,
                  attributes: {
                    username: "",
                    firstName: "",
                    lastName: "",
                    bio: "",
                    profilePicture: "",
                  },
                }),
              })
                .then((res) => res.json())
                .then(
                  (result) => {
                    console.log(
                      JSON.stringify({
                        email: email,
                        password: password,
                      })
                    );
                    console.log("Testing");
                    if (result.userID) {
                      // set the auth token and user ID in the session state
                      sessionStorage.setItem("token", result.token);
                      sessionStorage.setItem("user", result.userID);
                      sessionStorage.setItem("email", email);
                      navigate("/edit_profile_mobile");
                    } else {
                      // if the login failed, remove any infomation from the session state
                      sessionStorage.removeItem("token");
                      sessionStorage.removeItem("email");
                      sessionStorage.removeItem("user");
                    }
                  },
                  (error) => {
                    alert(error);
                  }
                );
            }
          }}
          className="submit-button"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default SignUp;
