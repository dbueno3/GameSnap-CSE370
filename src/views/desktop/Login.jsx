import React, { useState } from "react";

//Router
import { useNavigate } from "react-router-dom";

// import logo_mini from "../../assets/logo_mini.png";
import Alert from "../../Component/Alert.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleOkButtonAction = () => {
    console.log("OK button clicked!");
    // Perform any desired action here
    setShowAlert(false);
  };

  // const handleCancelButtonAction = () => {
  //   console.log("Cancel button clicked!");
  //   // Perform any desired action here
  //   setShowAlert(false);
  // };


  return (
    <div id="loginMainContainer" className="container">
      <Alert
        showAlert={showAlert}
        message={errorMessage}
        alertType="error"
        okButtonAction={handleOkButtonAction}
      />

      <div id="loginMain" class="container" style={{ display: "inline" }}>
        <div style={{ textAlign: "center" }}>
          {/* <div class="container landingLogo" style={{ display: "inline-block" }}>
            <img src={logo_mini} style={{ height: "80px" }} />
            <br />
            <h1>GameSnap</h1>
            <h6>Share Your Best Game Moments with Friends - One Moment at A Time</h6>
          </div> */}
          <hr />
        </div>
        <br />
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
              .then((res) =>{
                if(res.ok){
                  return res.json();
                } else  {
                  throw new Error("Login failed");
                }
              }).then(
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
                }).catch((error) => {
                  console.log(error);
                  setErrorMessage(error.message);
                  handleShowAlert();
                }
              );
          }}
        >
          Login
        </button>
        <br />
        <button
          className="secondary-button"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign up
        </button>
        <div className="credits">
          <p>Made with 💗 by </p>
          <p>Team Hooligans</p>
          <br/>
          <button
          className="button"
          onClick={(e) => {
            navigate("/about/dev/Shad");
          }}
        >
          Shad
        </button>
        <button
          className="button"
          onClick={(e) => {
            navigate("/about/dev/Ze");
          }}
        >
          Ze
        </button>
        <button
          className="button"
          onClick={(e) => {
            navigate("/about/dev/Daniel");
          }}
        >
          Daniel
        </button>
        <a href="./dheeraj.html">
          <button className="button">Dheeraj</button>
        </a>
        <button
          className="button"
          onClick={(e) => {
            navigate("/about/dev/Eric");
          }}
        >
          Eric
        </button>
        <br/>
        <a href="./styleguide.html">
        <button className="submit-button-small"
        >Style Guide</button>
        </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
