import React, { useState } from "react";

//Router
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  return (
    <div id="signUpMain">
        <h1 className="white">Sign Up</h1>
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
      <button
        onClick={() => {
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

                  navigate("/profile");
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
      >
        Register
      </button>
    </div>
  );
};

export default SignUp;
