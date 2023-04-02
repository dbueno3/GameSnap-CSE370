//Router
import { useNavigate } from "react-router-dom";

import RenderProfile from "../../Component/RenderProfile.jsx";
const UserProfile = () => {
  let navigate = useNavigate();
  return (
    <RenderProfile userId={sessionStorage.getItem("user")}>
      <button
        onClick={() => {
          navigate("/edit_profile");
        }}
      >
        Edit
      </button>
    </RenderProfile>
  );
};

export default UserProfile;
