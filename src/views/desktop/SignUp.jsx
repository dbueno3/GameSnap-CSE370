// import React, { useState } from "react";

// //Router
// import { useNavigate } from "react-router-dom";

// import logo_mini from "../../assets/logo_mini.png";

// import Alert from "../../Component/Alert.jsx";

// const SignUp = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   //Constraints
//   const [passLen, setPassLen] = useState(0);
//   const [checkNum, setCheckNum] = useState(false);
//   const [capital, setCapital] = useState(false);
//   const [specialChar, setSpecialChar] = useState(false);

//   const [showAlert, setShowAlert] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleShowAlert = () => {
//     setShowAlert(true);
//   };

//   const handleOkButtonAction = () => {
//     setShowAlert(false);
//   };

//   let navigate = useNavigate();
//   return (
//     <div id="signUpContainer" className="container">
//       <Alert showAlert={showAlert} message={errorMessage} alertType="error" okButtonAction={handleOkButtonAction} />
//       <div id="signupMain" class="container">
//         <div style={{ textAlign: "center" }}>
//           <div class="container landingLogo" style={{ display: "inline-block" }}>
//             <img src={logo_mini} style={{ height: "80px" }} />
//             <br />
//             <h1>GameSnap</h1>
//             <h6>Share Your Best Game Moments with Friends - One Moment at A Time</h6>
//           </div>
//           <hr />
//         </div>
//         <label for="email">Email</label>
//         <input
//           type="text"
//           name="email"
//           placeholder="email"
//           className="input-box-white"
//           onChange={(e) => {
//             setEmail(e.target.value);
//           }}
//         />
//         <label for="password">Password</label>
//         <input
//           type="password"
//           name="passoword"
//           className="input-box-white"
//           placeholder="password"
//           onChange={(e) => {
//             let pass = e.target.value;
//             setPassword(pass);
//             setPassLen(pass.length);
//             //Num
//             if (/\d/.test(pass)) {
//               setCheckNum(true);
//             } else {
//               setCheckNum(false);
//             }

//             //special Char
//             if (/[~`!#$%\^&*+=\-\[\]\\';,/{}@|\\":<>\?]/g.test(pass)) {
//               setSpecialChar(true);
//             } else {
//               setSpecialChar(false);
//             }

//             if (pass.length >= 1) {
//               for (var i = 0; i < pass.length; i++) {
//                 if (pass.charAt(i) == pass.charAt(i).toUpperCase() && pass.charAt(i).match(/[a-z]/i)) {
//                   setCapital(true);
//                   return;
//                 } else {
//                   setCapital(false);
//                 }
//               }
//             } else {
//               setCapital(false);
//             }
//           }}
//         />
//         <div>
//           <div style={{ display: "inline" }} className="left">
//             <p className="passwordConstraint" style={passLen >= 8 ? { color: "green" } : { color: "#5F6A82" }}>
//               Password is more than 8 characters
//             </p>
//             <br />
//             <p className="passwordConstraint" style={capital ? { color: "green" } : { color: "#5F6A82" }}>
//               Password has 1 capital letter
//             </p>
//           </div>
//           <div style={{ display: "inline" }} className="right">
//             <p className="passwordConstraint" style={specialChar ? { color: "green" } : { color: "#5F6A82" }}>
//               Password has one special character
//             </p>
//             <br />
//             <p className="passwordConstraint" style={checkNum ? { color: "green" } : { color: "#5F6A82" }}>
//               Password has a number
//             </p>
//           </div>
//         </div>
//         <br />
//         <br />
//         <br />
//         <label for="confirmPassword">Confirm Password</label>
//         <input
//           type="password"
//           name="confirmPassword"
//           className="input-box-white"
//           placeholder="Confirm Password"
//           onChange={(e) => {
//             setConfirmPassword(e.target.value);
//           }}
//         />
//         <div
//           style={{
//             width: "100vw",
//             textAlign: "center",
//             justifyContent: "center",
//             display: "inline",
//           }}
//         >
//           <p
//             style={{
//               fontSize: "16px",
//               cursor: "pointer",
//               justifyContent: "center",
//               width: "fit-content",
//               display: "inline",
//             }}
//             onClick={() => {
//               navigate("/");
//             }}
//           >
//             Already have an account? Log in
//           </p>
//         </div>
//         <br />
//         <button
//           onClick={() => {
//             //NEED TO FIX ALERTS
//             if (email === "" || !email.includes("@")) {
//               handleShowAlert();
//               setErrorMessage("Please input a valid email");
//             } else if (password !== confirmPassword) {
//               handleShowAlert();
//               setErrorMessage("password don't match");
//             } else if (passLen < 8) {
//               handleShowAlert();
//               setErrorMessage("Password is too short");
//             } else if (!checkNum) {
//               handleShowAlert();
//               setErrorMessage("Password does not contain a number");
//             } else if (!capital) {
//               handleShowAlert();
//               setErrorMessage("Password does not contain a capital letter");
//             } else if (!specialChar) {
//               handleShowAlert();
//               setErrorMessage("Password does not contain a special character");
//             } else {
//               fetch(process.env.REACT_APP_API_PATH + "/auth/signup", {
//                 method: "post",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                   email: email,
//                   password: password,
//                   attributes: {
//                     username: "",
//                     firstName: "",
//                     lastName: "",
//                     bio: "",
//                     profilePicture: "",
//                   },
//                 }),
//               })
//                 .then((res) => res.json())
//                 .then(
//                   (result) => {
//                     console.log(
//                       JSON.stringify({
//                         email: email,
//                         password: password,
//                       })
//                     );
//                     console.log("Testing");
//                     if (result.userID) {
//                       // set the auth token and user ID in the session state
//                       sessionStorage.setItem("token", result.token);
//                       sessionStorage.setItem("user", result.userID);
//                       sessionStorage.setItem("email", email);
//                       navigate("/edit_profile_mobile");
//                     } else {
//                       // if the login failed, remove any infomation from the session state
//                       sessionStorage.removeItem("token");
//                       sessionStorage.removeItem("email");
//                       sessionStorage.removeItem("user");
//                     }
//                   },
//                   (error) => {
//                     alert(error);
//                   }
//                 );
//             }
//           }}
//           className="submit-button"
//         >
//           Register
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
