import React, { useState } from "react";

//Router
import { useNavigate } from "react-router-dom";

const ResetPasswordLogin = () => {
  const [email, setEmail] = useState("");
  let navigate = useNavigate();
  return (
    <>
    <u>
      <h6>Reset Password</h6>
      </u>
      <input
        type="text"
        placeholder="Enter Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br></br>
      <button
        onClick={() => {
          fetch(process.env.REACT_APP_API_PATH + `/auth/request-reset`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
            }),
          })
            .then((response) => {
              if (response.status === 200) {
                sessionStorage.setItem("email", email);
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
        Send token
      </button>
    </>
  );
};

export default ResetPasswordLogin;
