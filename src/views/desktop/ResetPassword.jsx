//Router
import { useNavigate } from "react-router-dom";

import { useState } from "react";

const ResetPassword = () => {
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  let navigate = useNavigate();
  return (
    <>
      <h5 style={{ color: "green" }}>A one time auth token was sent to {sessionStorage.getItem("email")}</h5>
      <p style={{ fontSize: "10px" }}>If you did not receive the email, you can try again using the button below</p>
      <button
        onClick={() => {
          fetch(process.env.REACT_APP_API_PATH + `/auth/request-reset`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
            body: JSON.stringify({
              email: sessionStorage.getItem("email"),
            }),
          })
            .then((response) => {
              if (response.status === 200) {
                navigate("/reset_password");
              } else {
                alert("Error:", response.status);
              }
            })
            .catch((error) => {
              alert("An error occurred while sending the token to your email. Please try again later.");
            });
        }}
      >
        Send token again
      </button>
      <u>
        <h6>Reset Password</h6>
      </u>
      <input
        type="text"
        placeholder="auth token*"
        onChange={(e) => {
          setToken(e.target.value);
        }}
      />
      <br />
      <input
        type="password"
        placeholder="new password*"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <input
        type="password"
        placeholder="confirm password*"
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
      />
      <br />
      <p style={{ color: "red", fontSize: "10px" }}>{error}</p>
      <button
        onClick={() => {
          if (password !== confirmPassword) {
            setError("Passwords don't match");
          } else {
            fetch(process.env.REACT_APP_API_PATH + `/auth/reset-password`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("token"),
              },
              body: JSON.stringify({
                token: token,
                password: password,
              }),
            })
              .then((response) => {
                if (response.status === 200) {
                  navigate("/");
                } else {
                  setError("Something went wrong, please verify you have the right auth token");
                }
              })
              .catch((error) => {
                alert("An error occurred while sending the token to your email. Please try again later.");
              });
          }
        }}
      >
        Reset
      </button>
    </>
  );
};

export default ResetPassword;
