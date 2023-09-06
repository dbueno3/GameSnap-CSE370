// //Router
// import { useNavigate } from "react-router-dom";

// import { useState } from "react";
// import { BsFileEarmarkImage } from "react-icons/bs";

// const ResetPassword = () => {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [token, setToken] = useState("");
//   let navigate = useNavigate();

//   return (
//     <div className="container">
//       <div class="alert alert-success">
//       <h4>A one time auth token was sent to {sessionStorage.getItem("email")}</h4>
//       <p>If you did not receive the email, you can try again using the button below</p>
//       <br></br>
//       <button
//         className="small-button-green"
//         onClick={() => {
//           fetch(process.env.REACT_APP_API_PATH + `/auth/request-reset`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: "Bearer " + sessionStorage.getItem("token"),
//             },
//             body: JSON.stringify({
//               email: sessionStorage.getItem("email"),
//             }),
//           })
//             .then((response) => {
//               if (response.status === 200) {
//                 navigate("/reset_password");
//               } else {
//                 alert("Error:", response.status);
//               }
//             })
//             .catch((error) => {
//               alert("An error occurred while sending the token to your email. Please try again later.");
//             });
//         }}
//       >
//         Send token again
//       </button>
//       </div>
      
//       <h1 className="large-emoji-icon">🤦‍♂️</h1>
//       <h1>Reset Password</h1>
//       <label>Auth Token</label>
//       <input
//       className="input-box-white"
//         type="text"
//         placeholder="auth token"
//         onChange={(e) => {
//           setToken(e.target.value);
//         }}
//       />
//       <label>New Password</label>
//       <input
//         type="password"
//         className="input-box-white"
//         placeholder="New password"
//         onChange={(e) => {
//           setPassword(e.target.value);
//         }}
//       />
//       <label>Confirm Password</label>
//       <input
//         type="password"
//         className="input-box-white"
//         placeholder="Confirm password*"
//         onChange={(e) => {
//           setConfirmPassword(e.target.value);
//         }}
//       />
//       { error &&(
//         <div class="alert alert-error">
//         <p style={{ fontSize: "10px" }}>{error}</p>
//       </div>
//       )}

//       <button
//         className="submit-button"
//         onClick={() => {
//           if (password !== confirmPassword) {
//             setError("Passwords don't match");
//           } else {
//             fetch(process.env.REACT_APP_API_PATH + `/auth/reset-password`, {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({
//                 token: token,
//                 password: password,
//               }),
//             })
//               .then((response) => {
//                 if (response.status === 200) {
//                   navigate("/");
//                 } else {
//                   setError("Something went wrong, please verify you have the right auth token");
//                 }
//               })
//               .catch((error) => {
//                 alert("An error occurred while sending the token to your email. Please try again later.");
//               });
//           }
//         }}
//       >
//         Reset
//       </button>
//     </div>
//   );
// };

// export default ResetPassword;
