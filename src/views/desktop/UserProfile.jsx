//Router
import { useNavigate } from "react-router-dom";

import RenderProfile from "../../Component/RenderProfile.jsx";
import NavbarOwn from "../../Component/NavbarOwn.jsx";

const UserProfile = () => {
  let navigate = useNavigate();
  return (
    <>
      <NavbarOwn />
      <br />
      <br />
      <RenderProfile userId={sessionStorage.getItem("user")}>
        <button
          onClick={() => {
            navigate("/edit_profile");
          }}
        >
          Edit Account
        </button>
        <button
          onClick={() => {
            console.log(sessionStorage.getItem("email"));
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
          Reset Password
        </button>
      </RenderProfile>
    </>
  );
};

export default UserProfile;
