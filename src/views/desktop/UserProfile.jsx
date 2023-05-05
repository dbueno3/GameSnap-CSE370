//Router
import { useNavigate } from "react-router-dom";

import RenderProfile from "../../Component/RenderProfile.jsx";
import NavbarOwn from "../../Component/NavbarOwn.jsx";
import UserGame from "../../Component/UserGame.jsx";
import UserPosts from "../../Component/UserPosts.jsx";

const UserProfile = () => {
  let navigate = useNavigate();
  let userId = sessionStorage.getItem("user");
  return (
    <div className="container">
      <NavbarOwn />
      <br />
      <br />
      <RenderProfile userId={sessionStorage.getItem("user")}>
        <br/>
        <button
          className="submit-button"
          onClick={() => {
            navigate("/edit_profile_mobile");
          }}
        >
          Edit Account
        </button>
        <button
          className="view_top"
          onClick={() => {
            navigate("/top_games");
          }}
        >
          View the top rated games!
        </button>
        
        {/* {we dont need reset password here ?} */}
        {/* <button
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
          Reset Password
        </button> */}
        <div className="grow-vertical">
          <UserGame user={userId} />
          <br/>
          <div>
            <h4 className="nobottom-margin left-text">Posts</h4>
            <UserPosts user={userId} />
          </div>
        </div>
      </RenderProfile>
      
    </div>
  );
};

export default UserProfile;
