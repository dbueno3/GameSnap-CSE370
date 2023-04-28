import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styleguide.css";

const SignUpMobile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
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
          console.log(JSON.stringify({ email: email, password: password }));
          console.log("Testing");
          if (result.userID) {
            sessionStorage.setItem("token", result.token);
            sessionStorage.setItem("user", result.userID);
            sessionStorage.setItem("email", result.email);
            navigate("/edit_profile_mobile");
          } else {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("email");
          }
        },
        (error) => {
          alert(error);
        }
      );
  };

  return (
    <div id="signUpMain">
      <h1 className="white">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label className="label white left-align-text">Email:</label>
        <input type="text" name="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label className="label white left-align-text">Password:</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button className="submit-button" type="submit">
          Register
        </button>
        <br />
        <button className="secondary-button" onClick={() => navigate("/mobilelogin")}>
          Login
        </button>
      </form>
    </div>
  );
};

export default SignUpMobile;
